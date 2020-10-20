import React, { useReducer, useState } from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { parseEther } from "@ethersproject/units";

import Account from "./Account";
import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import { constants } from "../util";

import EscrowFactory from "../abi/EscrowContractFactory.json";

const defaultFormData = {
  paymentid: "",
  amount: "",
};

const formReducer = (state, event) => {
  if (event.reset) {
    return defaultFormData;
  }

  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function Sell() {
  const [formData, setFormData] = useReducer(formReducer, defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [reverted, setReverted] = useState(false);
  const triedToEagerConnect = useEagerConnect();
  const escrowFactory = useContract(
    constants.ESCROW_FACTORY_ADDRESS,
    EscrowFactory,
    true,
  );
  const { library, account } = useWeb3React();
  const isConnected = typeof account === "string" && !!library;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setReverted(false);

    await escrowFactory
      .newEscrow(
        formData.paymentid,
        { value: parseEther(formData.amount) }
      )
      .then((res) => {
        setFormData({
          reset: true,
        });
      })
      .catch((e) => {
        if (e.code == -32016)
          setReverted(true);
        console.error(e)
      })
      .finally(() => setSubmitting(false));
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <form
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">Receive Payments at ID:</label>
        <input
          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="paymentid"
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="name@upi"
          onChange={handleChange}
          value={formData.paymentid}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">Amount to Sell</label>
        <input
          className="w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="amount"
          disabled={submitting}
          inputMode="decimal"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          autoComplete="off"
          autoCorrect="off"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          placeholder="0.0"
          onChange={handleChange}
          value={formData.amount}
        />
        <div className="w-auto inline-block p-2">ETH</div>
      </div>
        {reverted && (
          <div className="w-full flex pt-4">
            Not enough funds in escrow...
          </div>
        )}

      <div className="w-full flex pt-4">
        {isConnected ? (
          <button
            type="submit"
            disabled={submitting}
            className="btn-blue m-auto">
            Create Escrow
          </button>
        ) : (
          <div className="m-auto">
            <Account triedToEagerConnect={triedToEagerConnect}/>
          </div>
        )}
      </div>
    </form>
  );
}
