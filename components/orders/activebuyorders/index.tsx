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
import { useDispatch, useSelector } from "react-redux";
import { activeBuyRequest } from "redux-api/actions/active-buy-order-actions";
import { AppState } from "redux-api/reducers/root-reducer";

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
  const loading = useSelector(
    (state: AppState) => state.activeBuyOrderReducer.loading,
  );
  const success = useSelector(
    (state: AppState) => state.activeBuyOrderReducer.success,
  );
  const error = useSelector(
    (state: AppState) => state.activeBuyOrderReducer.error,
  );
  const responseData = useSelector(
    (state: AppState) => state.activeBuyOrderReducer.responseData,
  );
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
    dispatch(activeBuyRequest(address, chainId, Unipeer));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      console.log("active buy orders: " + responseData);
    }
  }, [success]);
  if (success) {
    console.log("active buy orders: " + responseData);
    return (
      <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
        {responseData?.map((order) => {
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
  } else {
    console.log("waiting for active results " + responseData);
    return <div></div>;
  }
};

export default ActiveBuyOrders;
