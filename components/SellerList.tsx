import React, { useState, useEffect } from "react";

import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";

import { useAccount, useContract, useProvider, useNetwork } from "wagmi";

import { addresses } from "../util";
import { type Unipeer } from "../contracts/types";
import UNIPEER_ABI from "../contracts/Unipeer.json";

export default function SellerList() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const [sellers, setSellers] = useState<
    {
      sender: string;
      paymentId: number;
      paymentAddress: string;
      feeRate: BigNumber;
      amount: BigNumber;
    }[]
  >([]);
  const Dai = addresses.DAI[chain?.id || 10200];

  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chain?.id || 10200],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });

  const fetchSellerList = async () => {
    const filter = Unipeer.filters.SellerPaymentMethod();
    const result = await Unipeer.queryFilter(filter, 222028);

    const events = await Promise.all(
      result.map(async (log) => {
        const bal = await Unipeer.tokenBalance(log.args[0], Dai);
        return {
          sender: log.args[0],
          paymentId: log.args[1],
          paymentAddress: log.args[2],
          feeRate: log.args[3],
          amount: bal,
        };
      }),
    );

    setSellers(events);
  };

  useEffect(() => {
    fetchSellerList();
  });

  const sellersList =
    sellers.length > 0 &&
    sellers.map((item, i) => {
      return (
        <tr key={i} className="bg-white border-b">
          <td className="td">{item!.paymentId}</td>
          <td className="td">{item!.sender}</td>
          <td className="td">{item!.paymentAddress}</td>
          <td className="td">{formatEther(item!.amount)} WXDAI</td>
          <td className="td">{item!.feeRate.toNumber() / 10000}%</td>
        </tr>
      );
    });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="th">Payment Id</th>
                  <th scope="col" className="th">Seller</th>
                  <th scope="col" className="th">Payment Address</th>
                  <th scope="col" className="th">Available Balance</th>
                  <th scope="col" className="th">Fee Rate</th>
                </tr>
              </thead>
              <tbody>{sellersList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
