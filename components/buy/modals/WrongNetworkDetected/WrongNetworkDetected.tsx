import React, { Component, Dispatch, MouseEventHandler, SetStateAction } from "react";

type WrongNetworkDetectedProp = {
    switchNetwork: MouseEventHandler<any>;
}

export default function WrongNetworkDetected<WrongNetworkDetectedProp>({ switchNetwork }) {
  return (
    <div className="text-xl text-dark-black-500">
      You will not be able to place buy & sell orders on this network. Please
      switch to the correct network to proceed.
      <button
        type="submit"
        className="flex flex-row mt-8 items-center justify-center w-56 max-h-[16px] rounded-lg bg-accent-1 py-8 gap-0"
        onClick={switchNetwork}
      >
        <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
          Switch to Gnosis network
        </div>
      </button>
    </div>
  );
}
