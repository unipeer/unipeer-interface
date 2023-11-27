import SellOrderCard from "components/card/sellorder";
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
import { activeSellRequest } from "redux-api/actions/active-sell-order-actions";
import { AppState } from "redux-api/reducers/root-reducer";

const ActiveSellOrders = () => {
  const [sellOrders, setSellOrders] = useState<BuyOrder[]>([]);
  const loading = useSelector(
    (state: AppState) => state.activeSellOrderReducer.loading,
  );
  const success = useSelector(
    (state: AppState) => state.activeSellOrderReducer.success,
  );
  const error = useSelector(
    (state: AppState) => state.activeSellOrderReducer.error,
  );
  const responseData = useSelector(
    (state: AppState) => state.activeSellOrderReducer.responseData,
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
    dispatch(activeSellRequest(address, chainId, Unipeer));
  }, [dispatch]);
  if (success) {
    console.log("active sell orders: " + responseData);
    return (
      <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
        {responseData.map((order) => {
          return (
            <SellOrderCard
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

export default ActiveSellOrders;
