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
import OrderDetails from "./OrdersDetails";

export default function Orders() {
  const [orders, setOrders] = useState<{
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
  }[]
  >([]);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const chainId = chain?.id || constants.defaultChainId;

  const Dai = addresses.DAI[chainId];
  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });

  const { data: buyerTimeout } = useContractRead({
    addressOrName: Unipeer.address,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "buyerTimeout",
  });

  const { data: sellerTimeout } = useContractRead({
    addressOrName: Unipeer.address,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "sellerTimeout",
  });

  const fetchOrderBuyEvents = async () => {
    const filter = Unipeer.filters.OrderBuy(null, address);
    const result = await Unipeer.queryFilter(filter, constants.block[chainId]);

    const events = await Promise.all(result.map(async (log) => {
      const { status, lastInteraction } = await Unipeer.orders(log.args[0]);
      return {
        orderID: log.args[0].toNumber(),
        buyer: log.args[1],
        seller: log.args[2],
        paymentID: log.args[3],
        token: log.args[4],
        amount: log.args[5],
        feeAmount: log.args[6],
        sellerFeeAmount: log.args[7],
        status: status,
        lastInteraction: lastInteraction
      }
    }));

    setOrders(events);
  };

  useEffect(() => {
    if (isConnected) fetchOrderBuyEvents();
  }, [isConnected]);

  const ordersList =
    orders.length > 0 &&
    orders.map((item, i) => {
      return (
        <OrderDetails key={i} order={item!} buyerTimeout={Number(buyerTimeout)} sellerTimeout={Number(sellerTimeout)} />
      );
    });

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        {ordersList}
      </div>
  </div>);
}
