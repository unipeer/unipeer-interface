import React, { useReducer, useState } from "react";
import Link from "next/link";
import tailwind from "tailwind-rn";
import useSWR from 'swr';
import { parseEther } from "@ethersproject/units";
import {
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
} from '@celo/dappkit';
import { Linking } from 'expo';

import { ScrollView, View, Text, TextInput, Button } from "react-native";

import { constants } from "../util";
import useContract from "../hooks/useContract";
import { web3, kit } from '../root'

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
  const [account, setAccount] = useState("");
  const comptroller = new web3.eth.Contract(
    Comptroller,
    constants.COMPTROLLER_ADDRESS,
  );
  const { data, error } = useSWR('https://demo.unipeer.exchange/api/prices', fetcher, { refreshInterval: 5000 });
  const dappName = 'Unipeer';
  const callback = Linking.makeUrl('/my/path');

  const login = async () => {
    const requestId = "login";

    // Ask the Celo Alfajores Wallet for user info
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })

    const dappkitResponse = await waitForAccountAuth(requestId)
    setAccount(dappkitResponse.address);
  }

  const handleSubmit = async () => {
    //setSubmitting(true);
    setReverted(false);
    const requestId = "buy";

    const txObject = await comptroller.methods.requestFiatPayment(
        formData.escrow || constants.ESCROW_ADDRESS,
        account,
        parseEther(formData.amount),
        formData.paymentid,
      );

    requestTxSig(
      kit,
      [
        {
          from: account,
          to: comptroller.options.address,
          tx: txObject,
        }
      ],
      { requestId, dappName, callback }
    );

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]

    await kit.web3.eth.sendTransaction(tx)
      .then((result) => {
        console.log(`Hello World contract update transaction receipt: `, result)
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

  const handleChange = (name, text) => {
    setFormData({
      name: name,
      value: text
    });
  };

  const calFiatAmount = (res) => {
    if (!res) return "";
    if (!formData.amount) return "";
    const amount = Number(formData.amount);
    const price = res.ethinr.last;
    return (amount * price).toString();
  }

  return (
    <ScrollView style={tailwind("bg-white rounded-lg py-4 mb-4")}>
      <View style={tailwind("mb-4")}>
        <Text style={tailwind("text-gray-700 text-xs mb-2")}>Buy</Text>
        <TextInput
          style={tailwind("border-2 border-gray-200 rounded py-2 px-4 text-gray-700")}
          disabled={submitting}
          keyboardType="numeric"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          autoComplete="off"
          minLength={1}
          maxLength={79}
          spellCheck={false}
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
          disabled={submitting}
          keyboardType="numeric"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          autoComplete="off"
          autoCorrect={false}
          minLength={1}
          maxLength={79}
          spellCheck={false}
          placeholder="0.0"
          onChangeText={text => handleChange("fiat", text)}
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
            title="Login"
            disabled={submitting}
            onPress={login}
        />
          <Button
            title="Pay"
            disabled={submitting}
            style={tailwind("")}
            onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}
