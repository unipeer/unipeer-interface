import React, { useReducer, useState, useEffect } from "react";

import { parseEther } from "@ethersproject/units";
import { formatEther } from "@ethersproject/units";

import {
  useAccount,
  useContractEvent,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { ConnectKitButton } from "connectkit";

import { addresses, constants, formatEtherscanLink } from "../util";
import { Unipeer__factory } from "../contracts/types";
import useDebounce from "../hooks/useDebounce";

const defaultFormData = {
  paymentId: "",
  paymentAddress: "",
  feeRate: "",
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
  const [payMethods, setPayMethods] = useState<
    [{ paymentID: string; paymentName: string; tokens: string[] }?]
  >([]);
  const [selected, setSelected] = useState(0);
  const [balance, setBalance] = useState("...");
  const { address, connector, isConnected } = useAccount();
  const debouncedFormData = useDebounce(formData, 500);

  const Unipeer = new Unipeer__factory().attach(
    addresses.UNIPEER_ADDRESS[10200],
  );
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: Unipeer.address,
    contractInterface: Unipeer__factory.abi,
    functionName: "updateSellerPaymentMethod",
    args: [
      debouncedFormData.paymentId || "1",
      debouncedFormData.paymentAddress,
      debouncedFormData.feeRate * 10000 /* MULTIPLE_DIVISOR */,
    ],
    enabled: Boolean(debouncedFormData.paymentAddress),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    write?.();
  };

  useContractEvent({
    addressOrName: Unipeer.address,
    contractInterface: Unipeer__factory.abi,
    eventName: "PaymentMethodUpdate",
    listener: (event) => console.log(event),
  });

  const fetchPaymentMethods = async () => {
    // Read list of payment method IDs, name and list of enabled tokens
    // const events = useEventListener(Unipeer, "Unipeer", "PaymentMethodUpdate", library, 100);
    // let pm = await Unipeer.paymentMethods(0);
    let data = {
      paymentID: "0",
      paymentName: "PayPal",
      tokens: ["0x000"],
    };
    setPayMethods([data]);
    setSelected(0);
  };

  const getBalance = async () => {
    if (!selected) return;
    if (!Unipeer) return;
    let bal = await Unipeer.tokenBalance(address!, "token");
    setBalance(formatEther(bal));
  };

  const withdraw = async () => {
    if (!selected) return;
    if (!Unipeer) return;
    let bal = await Unipeer.tokenBalance(address!, "token");
    await Unipeer.withdrawTokens("token", bal);
  };

  const deposit = async () => {
    if (!selected) return;
    if (!Unipeer) return;
    let bal = parseEther("1000");
    await Unipeer.depositTokens("payid", "token", bal);
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSelect = async (event) => {
    setSelected(event.target.index);
  };

  useEffect(() => {
    if (isConnected) {
      fetchPaymentMethods();
    }
  }, [isConnected]);

  useEffect(() => {
    getBalance();
  }, [selected]);

  const methodsList =
    payMethods.length > 0 &&
    payMethods.map((item, i) => {
      return (
        <option key={i} value={item!.toString()}>
          {item!.paymentID.toString()}: {item!.paymentName}
        </option>
      );
    });

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Accepted Payment Methods
        </label>
        <div className="flex">
          <div className="relative w-full">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleSelect}
              value={selected}
            >
              {methodsList}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <a href="" target="_blank" rel="noreferrer" className="py-2 px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <div className="text-sm my-2">Balance: {balance} ETH</div>
        <div className="flex pt-1">
          <button onClick={withdraw} className="btn-blue m-auto p-2 text-sm">
            Withdraw
          </button>

          <button onClick={deposit} className="btn-blue m-auto p-2 text-sm">
            Deposit
          </button>
        </div>
      </div>

      <hr />
      <br />

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Payment Method ID
        </label>
        <input
          className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
          name="paymentId"
          disabled={isLoading}
          type="number"
          minLength={1}
          maxLength={79}
          placeholder="1"
          onChange={handleChange}
          value={formData.paymentId}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2">
            Receive Payments at Address:
          </label>
          <input
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
            name="paymentAddress"
            disabled={isLoading}
            type="text"
            minLength={1}
            maxLength={79}
            placeholder="name@upi"
            onChange={handleChange}
            value={formData.paymentAddress}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2">Fee Rate</label>
          <input
            className="w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
            name="feeRate"
            disabled={isLoading}
            inputMode="decimal"
            type="number"
            pattern="^[0-9]*[.,]?[0-9]*$"
            autoComplete="off"
            autoCorrect="off"
            minLength={1}
            maxLength={79}
            min="0.01"
            max="100"
            spellCheck="false"
            placeholder="0.0"
            onChange={handleChange}
            value={formData.feeRate}
          />
          <div className="w-auto inline-block p-2">%</div>
        </div>
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}

        <div className="w-full flex pt-4">
          {isConnected ? (
            <button type="submit" disabled={!write} className="btn-blue m-auto">
              {isLoading ? "Sending Tx..." : "Create or update Payment Method"}
            </button>
          ) : (
            <div className="m-auto">
              <ConnectKitButton />
            </div>
          )}
        </div>
        {isSuccess && (
          <div>
            Successfully Updated Payment Method!
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
