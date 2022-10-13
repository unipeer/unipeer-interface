import React, { useReducer, useEffect, useState } from "react";

import { parseEther, formatEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import moment from "moment";

import {
  useAccount,
  useContract,
  useProvider,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";

import { addresses, constants, formatEtherscanLink } from "../util";
import { type Unipeer } from "../contracts/types";
import UNIPEER_ABI from "../contracts/Unipeer.json";
import IARBITRATOR_ABI from "../contracts/IArbitrator.json";

import {type Order} from "./OrdersWidget";

const printStatus = (code) => {
  switch (code) {
    case 0:
      return "Created";
    case 1:
      return "Paid";
    case 2:
      return "Completed";
    case 3:
      return "Cancelled";
    case 4:
      return "Disputed";
    case 5:
      return "Resolved";
  }
}

type Props = {
  order: Order;
  buyerTimeout: number;
  sellerTimeout: number;
  isSeller: boolean;
};

export default function Orders({ order, buyerTimeout, sellerTimeout, isSeller = false }: Props) {
  const [arbitrator, setArbitrator] = useState("");
  const [extraData, setExtraData] = useState("");

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const chainId = chain?.id || constants.defaultChainId;

  const buyerNextState = moment.unix(order.lastInteraction.toNumber() + buyerTimeout);
  const sellerNextState = moment.unix(order.lastInteraction.toNumber() + sellerTimeout);
  const isBuyerTimedOut = order.status == 0 && moment().isAfter(buyerNextState);
  const isSellerTimedOut = order.status == 1 && moment().isAfter(sellerNextState);

  const getFunctionName= (code) => {
    switch (code) {
      case 0:
        return isSeller ? "completeOrder" : "confirmPaid";
      case 1:
        return isSeller ? "completeOrder" : "";
      default:
        return "";
    }
  }

  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });
  useEffect(() => {
    const fetch = async () => {
      setArbitrator(await Unipeer.arbitrator());
      setExtraData(await Unipeer.arbitratorExtraData());
    };
    fetch();
  });

  const { data: arbCost } = useContractRead({
    addressOrName: arbitrator,
    contractInterface: IARBITRATOR_ABI.abi,
    functionName: "arbitrationCost",
    args: [extraData],
  });

  const {
    config: disputeConfig,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    functionName: "disputeOrder",
    args: [order.orderID],
    enabled: isSeller && order.status == 1 ,
    overrides: {
      value: arbCost!,
    },
  });
  const { data: dataDispute, isError: isErrorDispute, write: writeDispute } = useContractWrite(disputeConfig);

  const { isLoading: isLoadingDispute, } = useWaitForTransaction({
    hash: dataDispute?.hash,
  });

  const {
    config: timeoutConfig,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    functionName: isBuyerTimedOut ? "timeoutByBuyer" : "timeoutBySeller",
    args: [order.orderID],
    enabled: isSellerTimedOut || isBuyerTimedOut,
  });
  const { data: dataTO, isError: isErrorTO, write: writeTO } = useContractWrite(timeoutConfig);

  const { isLoading: isLoadingTO, } = useWaitForTransaction({
    hash: dataTO?.hash,
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    functionName: getFunctionName(order.status),
    args: [order.orderID],
    enabled: getFunctionName(order.status) != "",
  });
  const { data, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const truncate = (str: string) => {
      return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  }

  return (
    <div className="flex flex-col border-b py-2">
      <div className="flex">
        <div>
          Amount: {formatEther(order.amount)} WXDai
        </div>
        <div className="px-1">
          {isSeller ? ("Buyer:") : ("Seller:") }
          <a
            href={formatEtherscanLink("Account", [
              chainId,
              isSeller ? order.buyer: order.seller,
            ])}
            target="_blank"
            rel="noreferrer"
            className="px-1 text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out"
          >
            {truncate(order.seller)}
          </a>
        </div>
      </div>

      <div className="flex my-5">
        <div className="px-1">
        Status: {printStatus(order.status)}
        </div>
        {order.status == 0 || order.status ==1 && (<div className="px-1">
          Time left: {buyerNextState.fromNow()}
        </div>)}
      </div>

      <div className="flex">
      {(isBuyerTimedOut || isSellerTimedOut) && (
        <button
          onClick={() => writeTO?.()}
          disabled={!writeTO || isLoadingTO ||  isErrorTO}
          className="btn-blue m-auto"
        >
          {isLoadingTO ? "Sending Tx..." : isBuyerTimedOut ? "Cancel Order" : "Complete Order (by timeout)"}
        </button>)}

      {isSeller && order.status == 1 && (
        <button
          onClick={() => writeDispute?.()}
          disabled={!writeDispute || isLoadingDispute || isErrorDispute}
          className="btn-blue m-auto"
        >
          {isLoadingDispute ? "Sending Tx..." : "Dispute Order"}
        </button>)}

      {getFunctionName(order.status) != "" && (
        <button
          onClick={() => write?.()}
          disabled={!write || isLoading || isError}
          className="btn-blue m-auto"
        >
          {isLoading ? "Sending Tx..." : getFunctionName(order.status)}
        </button>)}
      </div>
    </div>
  );
}
