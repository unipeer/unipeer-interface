import React, { useReducer, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { parseEther } from "@ethersproject/units";

import Account from "./Account";
import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import { constants } from "../util";

import Comptroller from "../abi/Comptroller.json";

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

export default function Buy() {
  const [formData, setFormData] = useReducer(formReducer, defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const triedToEagerConnect = useEagerConnect();
  const comptroller = useContract(
    constants.COMPTROLLER_ADDRESS,
    Comptroller,
    true,
  );
  const { library, account } = useWeb3React();
  const isConnected = typeof account === "string" && !!library;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    await comptroller
      .requestFiatPayment(
        constants.ESCROW_ADDRESS,
        account,
        parseEther(formData.amount),
        formData.paymentid,
      )
      .then((res) => {
        console.log(res);
        setFormData({
          reset: true,
        });
      })
      .catch((e) => console.error(e))
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
        <label className="block text-gray-700 text-xs mb-2">UPI ID</label>
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
        <label className="block text-gray-700 text-xs mb-2">Amount</label>
        <input
          className="w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="amount"
          disabled={submitting}
          inputMode="decimal"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          placeholder="0.0"
          onChange={handleChange}
          value={formData.amount}
        />
        <div className="w-auto inline-block p-2">ETH</div>
      </div>
      <div className="w-full flex pt-4">
        {isConnected ? (
          <button
            type="submit"
            disabled={submitting}
            className="btn-blue m-auto">
            Pay
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
