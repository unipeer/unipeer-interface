import BuyOrderCard from "components/card/buyorder";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useContractRead,
  useNetwork,
  useProvider,
} from "wagmi";
import { type Unipeer } from "../../../contracts/types";
import UNIPEER_ABI from "../../../contracts/Unipeer.json";
import { addresses } from "../../../util";
import { constants } from "../../../util";

const activeSellOrdersData = [
  {
    id: 1,
    sentAmount: 340,
    sentCurrency: "xDAI",
    sentProvider: "xDAI",
    sentProviderLogo: "xdai-logo.png",
    receiveAmount: 338,
    receiveCurrency: "USD",
    receiveProvider: "Venmo",
    receiveProviderLogo: "ic_venmo.svg",
    status: "Awaiting payment from buyer",
    statusCode: "APB",
    timeLeft: "00:00:00",
  },
  {
    id: 2,
    sentAmount: 70,
    sentCurrency: "xDAI",
    sentProvider: "xDAI",
    sentProviderLogo: "xdai-logo.png",
    receiveAmount: 68,
    receiveCurrency: "USD",
    receiveProvider: "Paypal",
    receiveProviderLogo: "ic_paypal.svg",
    status: "Payment done by buyer",
    statusCode: "PDB",
    timeLeft: "00:26:23",
  },
  {
    id: 3,
    sentAmount: 100,
    sentCurrency: "USDC",
    sentProvider: "USDC",
    sentProviderLogo: "usdc-logo.svg",
    receiveAmount: 98.5,
    receiveCurrency: "USD",
    receiveProvider: "Paypal",
    receiveProviderLogo: "ic_paypal.svg",
    status: "Order disputed by you",
    statusCode: "ODY",
    timeLeft: "00:00:00",
  },
  {
    id: 4,
    sentAmount: 10,
    sentCurrency: "USDC",
    sentProvider: "USDC",
    sentProviderLogo: "usdc-logo.svg",
    receiveAmount: 9,
    receiveCurrency: "USD",
    receiveProvider: "Paypal",
    receiveProviderLogo: "ic_paypal.svg",
    status: "Dispute resolved",
    statusCode: "ODY",
    timeLeft: "00:00:00",
  },
];

const ActiveSellOrders = () => {
  const [sellOrders, setSellOrders] = useState<BuyOrder[]>([]);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const chainId = chain?.id || constants.defaultChainId;

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

  const parseEvents = async (result) => {
    return await Promise.all(
      result
        .map(async (log) => {
          return await getOrderFromRawData(log, Unipeer);
        })
        .filter((order: BuyOrder) => {
          return (
            order.status === OrderStatus.COMPLETED ||
            order.status === OrderStatus.CANCELLED
          );
        }),
    );
  };

  const fetchOrderSellEvents = async () => {
    const sellerFilter = Unipeer.filters.OrderBuy(null, null, address);
    const sellerResult = await Unipeer.queryFilter(
      sellerFilter,
      constants.block[chainId],
    );
    const events = await parseEvents(sellerResult);
    setSellOrders(events);
  };

  useEffect(() => {
    if (isConnected) fetchOrderSellEvents();
  }, [isConnected]);
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {sellOrders.map((order) => {
        return (
          <BuyOrderCard
            id={order.orderID}
            timeLeft={Number(buyerTimeout)}
            order={order}
          />
        );
      })}
    </div>
  );
};

export default ActiveSellOrders;
