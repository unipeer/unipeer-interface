import React, { useState, useEffect } from "react";
import {BigNumber} from "@ethersproject/bignumber";

import {
  useAccount,
  useContract,
  useProvider,
  useNetwork,
} from "wagmi";

import { addresses } from "../util";
import {type Unipeer } from "../contracts/types";
import UNIPEER_ABI from "../contracts/Unipeer.json";

export default function SellerList() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const [sellers, setSellers] = useState<
    { sender: string; paymentId: number; paymentAddress: string; feeRate: BigNumber}[]
  >([]);

  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chain?.id || 10200 ],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  })

  const fetchSellerList = async () => {
    const filter = Unipeer.filters.SellerPaymentMethod();
    const result = await Unipeer.queryFilter(filter, 222028);
    console.log("seller", result);

    const events = result.map(log =>
      ({ sender: log.args[0], paymentId: log.args[1], paymentAddress: log.args[2], feeRate: log.args[3] })
    );

    setSellers(events)
  };

  useEffect(() => {
    if (isConnected) {
      fetchSellerList();
    }
  }, [isConnected]);

  const sellersList =
    sellers.length > 0 &&
    sellers.map((item, i) => {
      return (
        <tr key={i}>
          <td className="tb-border">
            {item!.paymentId}
          </td>
          <td className="tb-border">
            {item!.sender}
          </td>
          <td className="tb-border">
            {item!.paymentAddress}
          </td>
          <td className="tb-border">
            {item!.feeRate.toNumber() / 10000}%
          </td>
        </tr>
      );
    });

  return (
    <table className="table-auto border-separate border-spacing-1 border border-slate-300">
      <tr>
        <th className="tb-border">Payment Id</th>
        <th className="tb-border">Seller</th>
        <th className="tb-border">Payment Address</th>
        <th className="tb-border">Fee Rate</th>
      </tr>
      {sellersList}
    </table> 
  );
}
