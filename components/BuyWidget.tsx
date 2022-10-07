import React, { useReducer, useState } from "react";
import Link from "next/link";
import useSWR from "swr";

import { parseEther } from "@ethersproject/units";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

import { addresses, constants } from "../util";
import { Unipeer__factory, Unipeer } from "../contracts/types";

const defaultFormData = {
  paymentid: "",
  seller: "",
  token: "",
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
  const [reverted, setReverted] = useState(false);
  const { address, connector, isConnected } = useAccount();

  const Unipeer = new Unipeer__factory().attach(
    addresses.UNIPEER_ADDRESS[10200],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setReverted(false);

    await Unipeer.buyOrder(
      formData.paymentid || "1",
      formData.seller,
      formData.token,
      parseEther(formData.amount || "0"),
    )
      .then((res) => {
        setFormData({
          reset: true,
        });
      })
      .catch((e) => {
        if (e.code == -32016) setReverted(true);
        console.error(e);
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
        <label className="block text-gray-700 text-xs mb-2">
          Payment Method ID (Optional)
        </label>
        <input
          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="paymentid"
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="1"
          onChange={handleChange}
          value={formData.paymentid}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">Buy</label>
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
        <div className="w-auto inline-block p-2">DAI</div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Seller address
        </label>
        <input
          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="seller"
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="0x00"
          onChange={handleChange}
          value={formData.seller}
        />
      </div>

      {reverted && (
        // or link
        <div className="w-full flex pt-4">Not enough funds ...</div>
      )}

      <div className="w-full flex pt-4">
        {isConnected ? (
          <button
            type="submit"
            disabled={submitting}
            className="btn-blue m-auto"
          >
            Pay
          </button>
        ) : (
          <div className="m-auto">
            <ConnectKitButton />
          </div>
        )}
      </div>
    </form>
  );
}
