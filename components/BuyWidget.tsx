import React, { useReducer, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { parseEther } from "@ethersproject/units";
import tailwind from "tailwind-rn";

import { ScrollView, View, Text, TextInput, Button } from "react-native";

import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import { constants } from "../util";

import Comptroller from "../abi/Comptroller.json";

const fetcher = (...args) => fetch(args[0], args[1]).then(res => res.json());
const defaultFormData = {
  paymentid: "",
  amount: "",
  fiat: "",
  escrow: "",
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
  const triedToEagerConnect = useEagerConnect();
  const comptroller = useContract(
    constants.COMPTROLLER_ADDRESS,
    Comptroller,
    true,
  );
  const { library, account } = useWeb3React();
  const isConnected = typeof account === "string" && !!library;
  const { data, error } = useSWR('/api/prices', fetcher, { refreshInterval: 5000 });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setReverted(false);

    await comptroller
      .requestFiatPayment(
        formData.escrow || constants.ESCROW_ADDRESS,
        account,
        parseEther(formData.amount),
        formData.paymentid,
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

  const calFiatAmount = (res) => {
    if (!res) return;
    if (!formData.amount) return "";
    const price = res.ethinr.last;
    return (formData.amount * price).toString();
  }

  return (
    <View
      style={tailwind("bg-white shadow-md rounded-lg p-6 mb-4")}
      onSubmit={handleSubmit}
    >
      <ScrollView style={tailwind("mb-4")}>
        <Text style={tailwind("block text-gray-700 text-xs mb-2")}>Buy</Text>
        <TextInput
          style={tailwind("w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500")}
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
        <View style={tailwind("w-auto inline-block p-2")}>ETH</View>
      </ScrollView>

      <View style={tailwind("mb-4")}>
        <Text style={tailwind("block text-gray-700 text-xs mb-2")}>For (estimated)</Text>
        <TextInput
          style={tailwind("w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500")}
          name="fiat"
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
          value={calFiatAmount(data)}
        />
        <View style={tailwind("w-auto inline-block p-2")}>INR</View>
      </View>

      <View style={tailwind("mb-4")}>
        <Text style={tailwind("block text-gray-700 text-xs mb-2")}>UPI ID</Text>
        <TextInput
          style={tailwind("appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500")}
          name="paymentid"
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="name@upi"
          onChange={handleChange}
          value={formData.paymentid}
        />
      </View>

      <View style={tailwind("mb-4")}>
        <Text style={tailwind("block text-gray-700 text-xs mb-2")}>
         Escrow address (optional)
        </Text>
        <TextInput
          style={tailwind("appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500")}
          name="escrow"
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder={constants.ESCROW_ADDRESS}
          onChange={handleChange}
          value={formData.escrow} />
      </View>

        {reverted && (
          // or link
          <View style={tailwind("w-full flex pt-4")}>
            Not enough funds in escrow...
          </View>
        )}

      <View style={tailwind("w-full flex pt-4")}>
          <Button
            title="Pay"
            type="submit"
            disabled={submitting}
            style={tailwind("btn-blue m-auto")}/>
      </View>
    </View>
  );
}
