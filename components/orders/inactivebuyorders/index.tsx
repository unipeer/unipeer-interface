import BuyOrderCard from "components/card/buyorder";
import React, { useEffect } from "react";
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
import { inactiveBuyRequest } from "redux-api/actions/orders-actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux-api/reducers/root-reducer";

const InActiveBuyOrders = () => {
  const success = useSelector((state: AppState) => state.ordersReducer.success);
  const responseData = useSelector(
    (state: AppState) => state.ordersReducer.responseData,
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
  if (success) {
    console.log("inactive buy orders: " + responseData);
    return (
      <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
        {responseData?.map((order, index) => {
          return (
            <BuyOrderCard
              key={index}
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

export default InActiveBuyOrders;
