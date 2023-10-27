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
import { useDispatch } from "react-redux";
import { activeBuyRequest } from "redux-api/actions/active-buy-order-actions";

const activeBuyOrdersData = [
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
    status: "Pay & Confirm",
    statusCode: "PC",
    timeLeft: "00:26:23",
  },
  {
    id: 2,
    sentAmount: 10000,
    sentCurrency: "USD",
    sentProvider: "Paypal",
    sentProviderLogo: "ic_paypal.svg",
    receiveAmount: 9995,
    receiveCurrency: "xDAI",
    receiveProvider: "xDAI",
    receiveProviderLogo: "xdai-logo.png",
    status: "Awaiting seller response",
    statusCode: "ASR",
    timeLeft: "00:23:23",
  },
  {
    id: 3,
    sentAmount: 25,
    sentCurrency: "USD",
    sentProvider: "Paypal",
    sentProviderLogo: "ic_paypal.svg",
    receiveAmount: 24.5,
    receiveCurrency: "USDT",
    receiveProvider: "USDT",
    receiveProviderLogo: "usdt-logo.svg",
    status: "Awaiting seller response",
    statusCode: "ASR",
    timeLeft: "00:00:00",
  },
  {
    id: 4,
    sentAmount: 50,
    sentCurrency: "USD",
    sentProvider: "Venmo",
    sentProviderLogo: "ic_venmo.svg",
    receiveAmount: 48,
    receiveCurrency: "USDC",
    receiveProvider: "USDC",
    receiveProviderLogo: "usdc-logo.svg",
    status: "Completed",
    statusCode: "C",
    timeLeft: "00:00:00",
  },
];

type Props = {
  order: BuyOrder;
  buyerTimeout: number;
  sellerTimeout: number;
  isSeller: boolean;
};

const ActiveBuyOrders = () => {
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
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(activeBuyRequest(address, chainId, Unipeer))
  }, [dispatch])
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

export default ActiveBuyOrders;
