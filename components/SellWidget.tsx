import React, { useReducer, useState, useEffect } from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { parseEther } from "@ethersproject/units";
import { formatEther } from "@ethersproject/units";

import Account from "./Account";
import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import { constants } from "../util";

import { Escrow } from "../abi/Escrow";
import { EscrowFactory } from "../abi/EscrowFactory";
import EscrowContractFactory from "../abi/EscrowContractFactory.json";

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
  const [escrows, setEscrows] = useState([]);
  const [selected, setSelected] = useState("");
  const [balance, setBalance] = useState("...");

  const { library, account, active, error } = useWeb3React();
  const isConnected = typeof account === "string" && !!library;

  const triedToEagerConnect = useEagerConnect();
  const EscrowInstance = new EscrowFactory(library.getSigner(account))
  const escrowFactory = useContract(
    constants.ESCROW_FACTORY_ADDRESS,
    EscrowContractFactory,
    true,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setReverted(false);

    await escrowFactory
      .newEscrow(formData.paymentid, { value: parseEther(formData.amount) })
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

  const fetchEscrows = async () => {
    let data = await escrowFactory.getEscrows(account);
    setEscrows(data);
    setSelected(data[0]);
  };

  const getBalance = async () => {
    if (!selected) return;
    let escrow: Escrow = await EscrowInstance.attach(selected);
    let bal = await escrow.getUnlockedBalance();
    setBalance(formatEther(bal));
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSelect = async (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    if (active || error) {
      fetchEscrows();
    }
  }, [active, error]);

  useEffect(() => {
    getBalance();
  }, [selected]);

  const escrowsList =
    escrows.length > 0 &&
    escrows.map((item, i) => {
      return (
        <option key={i} value={item}>
          {item}
        </option>
      );
    }, this);

  return (
    <form
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Deployed Escrows
        </label>
        <div className="inline-block relative w-full">
          <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={handleSelect} value={selected}>
            {escrowsList}
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
        <div className="text-sm my-2">Balance: {balance} ETH</div>
      </div>

      <hr />
      <br />

      <div className="mb-4">
        <label className="block text-gray-700 text-xs mb-2">
          Receive Payments at ID
        </label>
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
        <label className="block text-gray-700 text-xs mb-2">
          Amount to Sell
        </label>
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
        <div className="w-full flex pt-4">Not enough funds in escrow...</div>
      )}

      <div className="w-full flex pt-4">
        {isConnected ? (
          <button
            type="submit"
            disabled={submitting}
            className="btn-blue m-auto"
          >
            Create Escrow
          </button>
        ) : (
          <div className="m-auto">
            <Account triedToEagerConnect={triedToEagerConnect} />
          </div>
        )}
      </div>
    </form>
  );
}
