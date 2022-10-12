import React, { useReducer, useState, useEffect } from "react";

import { formatEther } from "@ethersproject/units";

import {
  useAccount,
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useProvider,
} from "wagmi";
import { ConnectKitButton } from "connectkit";

import { addresses, constants, formatEtherscanLink } from "../util";
import { type Unipeer, ERC20 } from "../contracts/types";
import UNIPEER_ABI from "../contracts/Unipeer.json";
import useDebounce from "../hooks/useDebounce";

import WithdrawTokens from "./WithdrawTokens";
import DepositTokens from "./DepositTokens";

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
    { paymentName: string; tokens: string[] }[]
  >([]);
  const [selected, setSelected] = useState(-1);
  const [token, setToken] = useState(-1);
  const [balance, setBalance] = useState("...");
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const debouncedFormData = useDebounce(formData, 500);
  const chainId = chain?.id || constants.defaultChainId;

  const UnipeerAddr = addresses.UNIPEER[chainId];
  const Dai = addresses.DAI[chainId];

  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: UnipeerAddr,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "updateSellerPaymentMethod",
    args: [
      debouncedFormData.paymentId || "0",
      debouncedFormData.paymentAddress,
      debouncedFormData.feeRate / 100 /* Convert from percentage to basis point of MULTIPLE_DIVISOR(10000) */,
    ],
    enabled: Boolean(debouncedFormData.paymentAddress),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const fetchPaymentMethods = async () => {
    // Read list of payment method IDs, name and list of enabled tokens
    // const events = useEventListener(Unipeer, "Unipeer", "PaymentMethodUpdate", library, 100);
    // let pm = await Unipeer.paymentMethods(0);
    const filter = Unipeer.filters.PaymentMethodUpdate();
    const result = await Unipeer.queryFilter(filter, constants.block[chainId]);

    const event = new Map();
    result.forEach((log) => {
      // TODO: remove hard coded token value and fetch from event
      event.set(log.args[0], { tokens: [Dai], paymentName: log.args[1] });
    });
    // We assume that the PaymentMethodUpdate will
    // have contiguous Payment IDs
    setPayMethods(Array.from(event.values()));
    setSelected(0);
    setToken(0);
  };

  const { data: bal } = useContractRead({
    addressOrName: UnipeerAddr,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "tokenBalance",
    args: [address!, payMethods[selected]?.tokens[token]],
  });

  const getBalance = async () => {
    if (!isConnected) return;
    if (selected == -1) return;
    setBalance(formatEther(bal!));
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

  const handleToken = async (event) => {
    console.log(event.target);
    setToken(event.target.index);
  };

  useEffect(() => {
    fetchPaymentMethods();
  });

  useEffect(() => {
    getBalance();
  });

  const methodsList =
    payMethods.length > 0 &&
    payMethods.map((item, i) => {
      return (
        <option key={i} value={i}>
          {i}: {item!.paymentName}
        </option>
      );
    });

  const tokenList =
    selected != -1 &&
    payMethods[selected].tokens.map((item, i) => {
      return (
        <option key={i} value={i}>
          {item!}
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
        </div>

        <div className="my-4">
          <label className="block text-gray-700 text-xs mb-2">Tokens:</label>
          <div className="flex">
            <div className="relative w-full">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleToken}
                value={token}
              >
                {tokenList}
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

            <a
              href={formatEtherscanLink("Account", [
                chainId,
                payMethods[selected]?.tokens[token],
              ])}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-1"
            >
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
        </div>

        <div className="text-sm my-2">Balance: {balance} WXDAI</div>
        <div className="flex pt-1">
          <WithdrawTokens token={payMethods[selected]?.tokens[token]} />

          <DepositTokens
            paymentId={selected}
            token={payMethods[selected]?.tokens[token]}
          />
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
          placeholder="0"
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
            step={0.01}
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
            <button
              type="submit"
              disabled={!write || isLoading || isError}
              className="btn-blue m-auto"
            >
              {isLoading ? "Sending Tx..." : "Accept Payment Method"}
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
              <a href={formatEtherscanLink("Transaction", data?.hash)}>
                Etherscan
              </a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
