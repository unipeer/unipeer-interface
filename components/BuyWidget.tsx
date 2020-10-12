import React, { useReducer, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import Button from "./Button";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    console.log(formData);
    setFormData({
      reset: true,
    });
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="w-full max-w-sm m-auto">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2">UPI ID</label>
          <input
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
            name="paymentid"
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
          <button type="submit" className="btn-blue m-auto">
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}
