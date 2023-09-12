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

const inactiveBuyOrdersData = [
  {
    id: 1,
    sentAmount: 1000,
    sentCurrency: "USD",
    sentProvider: "Paypal",
    sentProviderLogo: "ic_paypal.svg",
    receiveAmount: 990,
    receiveCurrency: "xDAI",
    receiveProvider: "xDAI",
    receiveProviderLogo: "xdai-logo.png",
    status: "Cancelled",
    statusCode: "CANCEL",
    timeLeft: "00:26:23",
  },
  {
    id: 2,
    sentAmount: 50,
    sentCurrency: "USD",
    sentProvider: "Venmo",
    sentProviderLogo: "ic_venmo.svg",
    receiveAmount: 48,
    receiveCurrency: "USDC",
    receiveProvider: "USDC",
    receiveProviderLogo: "usdc-logo.svg",
    status: "Cancelled",
    statusCode: "CANCEL",
    timeLeft: "00:23:23",
  },
];

type Props = {
  order: BuyOrder;
  buyerTimeout: number;
  sellerTimeout: number;
  isSeller: boolean;
};

const InActiveBuyOrders = () => {
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);

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

  const fetchOrderBuyEvents = async () => {
    const buyerFilter = Unipeer.filters.OrderBuy(null, address);
    const buyerResult = await Unipeer.queryFilter(
      buyerFilter,
      constants.block[chainId],
    );
    const events = await parseEvents(buyerResult);
    setBuyOrders(events);
  };

  useEffect(() => {
    if (isConnected) fetchOrderBuyEvents();
  }, [isConnected]);

  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {buyOrders.map((order) => {
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

export default InActiveBuyOrders;
