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
import { inactiveSellRequest } from "redux-api/actions/orders-actions";
import { AppState } from "redux-api/reducers/root-reducer";
import SellOrderCard from "components/card/sellorder";

const InActiveSellOrders = () => {
  const success = useSelector((state: AppState) => state.ordersReducer.success);
  const responseData = useSelector(
    (state: AppState) => state.ordersReducer.responseData,
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

  const { data: sellerTimeout } = useContractRead({
    addressOrName: Unipeer.address,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "sellerTimeout",
  });

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(inactiveSellRequest(address, chainId, Unipeer));
  }, [dispatch]);
  if (success) {
    console.log("inactive sell orders: " + responseData);
    return (
      <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
        {responseData?.map((order, index) => {
          return (
            <SellOrderCard
              key={index}
              id={order.orderID}
              timeLeft={Number(sellerTimeout)}
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

export default InActiveSellOrders;
