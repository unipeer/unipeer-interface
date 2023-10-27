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

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(activeSellRequest(address, chainId, Unipeer));
  }, [dispatch]);

  // const { loading, responseData } = useSelector(
  //   (state: any) => state.ac,
  // );
  return (
    <div className="mt-10 flex flex-col justify-center gap-4 mb-16">
      {sellOrders.map((order) => {
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
};

export default ActiveSellOrders;
