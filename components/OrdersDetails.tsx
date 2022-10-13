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
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainId = chain?.id || constants.defaultChainId;

  const Dai = addresses.DAI[chainId];

  const buyerNextState = moment.unix(order.lastInteraction.toNumber()+buyerTimeout);
  const sellerNextState = moment.unix(order.lastInteraction.toNumber()+sellerTimeout);
  const isBuyerTimedOut = moment().isAfter(buyerNextState);
  const isSellerTimedOut = moment().isAfter(sellerNextState);

  const getFunctionName= (code) => {
    switch (code) {
      case 0:
        if (isSeller)
          return "completeOrder"
        return isBuyerTimedOut ? "timeoutByBuyer" : "confirmPaid";
      case 1:
        if (!isSeller)
          return ""
        return "completeOrder";
        //return isSeller ? "disputeOrder" : "completeOrder";
      default:
        return "";
    }
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    functionName: isBuyerTimedOut ? "timeoutByBuyer" : "confirmPaid",
    args: [order.orderID],
    enabled: isConnected,
  });
  const { data, error, isError, write } = useContractWrite(config);

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
          Amount: {formatEther(order.amount.toNumber())} WXDai
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
        <div className="px-1">
        Time left: {buyerNextState.fromNow()}
        </div>
      </div>

      <div className="flex">
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}

        <button
          type="submit"
          disabled={!write || isLoading || isError}
          className="btn-blue m-auto"
        >
          {isLoading ? "Sending Tx..." : getFunctionName(order.status)}
        </button>
      </div>
    </div>
  );
}
