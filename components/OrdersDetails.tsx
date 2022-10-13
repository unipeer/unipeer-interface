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

type Order = {
    orderID: number;
    buyer: string;
    seller: string;
    paymentID: number;
    token: string;
    amount: BigNumber;
    feeAmount: BigNumber;
    sellerFeeAmount: BigNumber;
    status: number;
    lastInteraction: BigNumber;
};

type Props = {
  order: Order;
  buyerTimeout: number;
  sellerTimeout: number;
};

export default function Orders({ order, buyerTimeout, sellerTimeout }: Props) {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainId = chain?.id || constants.defaultChainId;

  const Dai = addresses.DAI[chainId];

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    functionName: "buyOrder",
    args: [],
    enabled: Boolean(false),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const truncate = (str) => {
      return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  }

  return (
    <div className="flex flex-col border-b">
      <div className="flex">
        <div>
          Amount: {formatEther(order.amount.toNumber())} WXDai
        </div>
        <div className="px-1">
          Seller:
          <a
            href={formatEtherscanLink("Account", [
              chainId,
              order.seller,
            ])}
            target="_blank"
            rel="noreferrer"
            className="px-1 text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out"
          >
            {truncate(order.seller)}
          </a>
        </div>
      </div>

      <div className="my-5">
        <div className="my-2">
        Status: {printStatus(order.status)}
        </div>
        <div className="flex">
        Time left: {moment.unix(order.lastInteraction.toNumber()+buyerTimeout).fromNow()}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}

        <button
          type="submit"
          disabled={!write || isLoading || isError}
          className="btn-blue m-auto"
        >
          {isLoading ? "Sending Tx..." : "Pay"}
        </button>
        </div>
      </div>
    </div>
  );
}
