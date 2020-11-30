import React, { useReducer, useState } from "react";
import Link from "next/link";
import tailwind from "tailwind-rn";
import useSWR from 'swr';

import { ScrollView, View, Text, TextInput, Button } from "react-native";

import { constants } from "../util";
import Comptroller from "../abi/Comptroller.json";

const fetcher = (...args) => fetch(args[0], args[1]).then(res => res.json());
const defaultFormData = {
  paymentid: "",
  amount: "",
  fiat: "",
  escrow: "",
};

export default function Buy() {
  const [formData, setFormData] = useState(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [reverted, setReverted] = useState(false);
  const { data, error } = useSWR('https://demo.unipeer.exchange/api/prices', fetcher, { refreshInterval: 5000 });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setReverted(false);

  };

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text
    });
  };

  const calFiatAmount = (res) => {
    if (!res) return;
    if (!formData.amount) return "";
    const amount = Number(formData.amount);
    const price = res.ethinr.last;
    return (amount * price).toString();
  }

  return (
    <ScrollView
      style={tailwind("bg-white rounded-lg p-6 mb-4")}
      onSubmit={handleSubmit}
    >
      <View style={tailwind("mb-4")}>
        <Text style={tailwind("text-gray-700 text-xs mb-2")}>Buy</Text>
        <TextInput
          style={tailwind("border-2 border-gray-200 rounded py-2 px-4 text-gray-700")}
          disabled={submitting}
          inputMode="decimal"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          autoComplete="off"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          placeholder="0.0"
          onChangeText={text => handleChange("amount", text)}
          value={formData.amount}
        />
        <Text style={tailwind("p-2")}>ETH</Text>
      </View>

      <View style={tailwind("mb-4")}>
        <Text style={tailwind("text-gray-700 text-xs mb-2")}>For (estimated)</Text>
        <TextInput
          style={tailwind("border-2 border-gray-200 rounded py-2 px-4 text-gray-700")}
          name="fiat"
          disabled={submitting}
          inputMode="decimal"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          autoComplete="off"
          autoCorrect={false}
          minLength={1}
          maxLength={79}
          spellCheck="false"
          placeholder="0.0"
          onChange={handleChange}
          value={calFiatAmount(data)}
        />
        <Text style={tailwind("p-2")}>INR</Text>
      </View>

      <View style={tailwind("mb-4")}>
        <Text style={tailwind("text-gray-700 text-xs mb-2")}>UPI ID</Text>
        <TextInput
          style={tailwind("border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700")}
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="name@upi"
          onChangeText={text => handleChange("paymentid", text)}
          value={formData.paymentid}
        />
      </View>

      <View style={tailwind("mb-4")}>
        <Text style={tailwind("text-gray-700 text-xs mb-2")}>
         Escrow address (optional)
        </Text>
        <TextInput
          style={tailwind("border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700")}
          disabled={submitting}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder={constants.ESCROW_ADDRESS}
          onChangeText={text => handleChange("escrow", text)}
          value={formData.escrow} />
      </View>

        {reverted && (
          // or link
          <Text style={tailwind("w-full flex pt-4")}>
            Not enough funds in escrow...
          </Text>
        )}

      <View style={tailwind("w-full flex pt-4")}>
          <Button
            title="Pay"
            type="submit"
            disabled={submitting}
            style={tailwind("")}/>
      </View>
    </ScrollView>
  );
}
