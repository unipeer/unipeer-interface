import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import Button from "./Button";

export default function MainWidget() {

  const onSubmit = event => {
    event.preventDefault()
    console.log(event);
  }

  return (
    <div className="w-full max-w-xs m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2" htmlFor="amount">
            Amount 
          </label>
            <input className="inline w-auto appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="amount" type="text" placeholder="0.0"/>
            <div className="inline">
             ETH
            </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xs mb-2" htmlFor="payment-id">
            UPI ID 
          </label>
          <input className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="payment-id" type="text" placeholder="name@upi"/>
        </div>
        <button type="submit" className="btn-blue">
          Buy 
        </button>
      </form>
    </div>
  )
}
