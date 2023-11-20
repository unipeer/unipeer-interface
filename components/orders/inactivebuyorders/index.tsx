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
import { inactiveBuyRequest } from "redux-api/actions/inactive-buy-order-actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux-api/reducers/root-reducer";

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
  const loading = useSelector(
    (state: AppState) => state.inactiveBuyOrderReducer.loading,
  );
  const success = useSelector(
    (state: AppState) => state.inactiveBuyOrderReducer.success,
  );
  const error = useSelector(
    (state: AppState) => state.inactiveBuyOrderReducer.error,
  );
  const responseData = useSelector(
    (state: AppState) => state.inactiveBuyOrderReducer.responseData,
  );
  const dispatch = useDispatch<any>();
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

  useEffect(() => {
    dispatch(inactiveBuyRequest(address, chainId, Unipeer));
  }, [dispatch]);
  console.log("inactive buy orders: " + responseData)
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {responseData.map((order) => {
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
