import React, { useReducer, useEffect, useState } from "react";

import { parseEther, formatEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

import {
  useAccount,
  useContract,
  useProvider,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { ConnectKitButton } from "connectkit";

import { addresses } from "../util";
import {type Unipeer } from "../contracts/types";
import UNIPEER_ABI from "../contracts/Unipeer.json";
import IARBITRATOR_ABI from "../contracts/IArbitrator.json";
import useDebounce from "../hooks/useDebounce";

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
  const [arbitrator, setArbitrator] = useState("");
  const [extraData, setExtraData] = useState("");

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const debouncedFormData = useDebounce(formData, 500);

  const Dai = addresses.DAI[chain?.id || 10200];
  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chain?.id || 10200 ],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  })

  useEffect(() => {
    const fetch = async() => {
        setArbitrator(await Unipeer.arbitrator());
        setExtraData(await Unipeer.arbitratorExtraData())
    }
    fetch();
  }, [isConnected]);


  const { data: arbCost, error: readError } = useContractRead({
    addressOrName: arbitrator,
    contractInterface: IARBITRATOR_ABI.abi,
    functionName: 'arbitrationCost',
    args: [
      extraData
    ]
  })

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: Unipeer.address,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "buyOrder",
    args: [
      debouncedFormData.paymentId || "0",
      debouncedFormData.seller,
      debouncedFormData.token || Dai,
      parseEther(debouncedFormData.amount || "0"),
    ],
    enabled: Boolean(debouncedFormData.seller),
    overrides: {
      value: arbCost!
    },
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <form
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Payment Method ID (Optional)
        </label>
        <input
          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="paymentid"
          disabled={isLoading}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="0"
          onChange={handleChange}
          value={formData.paymentid}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">Buy</label>
        <input
          className="w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="amount"
          disabled={isLoading}
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
          disabled={isLoading}
          type="text"
          minLength={1}
          maxLength={79}
          placeholder="0x00"
          onChange={handleChange}
          value={formData.seller}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Deposit required: { arbCost ? formatEther(BigNumber.from(arbCost)) : "0"} XDAI
        </label>
      </div>

      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}

      <div className="w-full flex pt-4">
        {isConnected ? (
          <button
            type="submit"
            disabled={!write || isLoading || isError}
            className="btn-blue m-auto"
          >
            {isLoading ? "Sending Tx..." : "Pay"}
          </button>
        ) : (
          <div className="m-auto">
            <ConnectKitButton />
          </div>
        )}
      </div>
      {isSuccess && (
        <div>
          Successfully created Buy Order!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
