import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  HandThumbUpIcon,
  HomeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  ClipboardIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const dummySellers = [
  {
    address: "0xd4...345b",
    liquidity: "1,000 xDAI",
    fee: "0.01%",
    paymentModes: [
      {
        id: 1,
        name: "Paypal",
        icon: "ic_paypal.svg",
      },
      {
        id: 2,
        name: "Venmo",
        icon: "ic_venmo.svg",
      },
    ],
    reputation: 70,
  },
  {
    address: "0xb5...34fb",
    liquidity: "5,000 USDC",
    fee: "1%",
    paymentModes: [
      {
        id: 1,
        name: "Paypal",
        icon: "ic_paypal.svg",
      },
    ],
    reputation: 93,
  },
  {
    address: "0xe5...34fb",
    liquidity: "10,000 xDAI",
    fee: "5%",
    paymentModes: [
      {
        id: 2,
        name: "Venmo",
        icon: "ic_venmo.svg",
      },
    ],
    reputation: 20,
  },
];

const paymentOptions = [
  {
    id: 1,
    name: "USD",
    logo: "ic_paypal.svg",
  },
  {
    id: 2,
    name: "ETH",
    logo: "ic_venmo.svg",
  },
];

const receiveOptions = [
  {
    id: 1,
    name: "xDAI",
    logo: "xdai-logo.png",
  },
  {
    id: 2,
    name: "ETH",
    logo: "ic_venmo.svg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sell = () => {
  const [selectedTab, setSelectedTab] = useState("Buy");
  const [selectedPayOption, setSelectedPayOption] = useState(paymentOptions[0]);
  const [selectedReceiveOption, setSelectedReceiveOption] = useState(
    receiveOptions[0],
  );
  const [allPaymentOptionsEnabled, setAllPaymentOptionsEnabled] =
    useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellers, setSellers] = useState(dummySellers);
  const [paymentAddress, setPaymentAddress] = useState("");

  return (
    <div>
      <div className="mt-10">
        <div className="relative rounded-lg px-4 py-3 bg-dark-100">
          <label
            htmlFor="name"
            className="flex text-14 font-paragraphs font-semibold text-dark-blue-400"
          >
            You sell
          </label>
          <input
            type="number"
            name="name"
            value={0}
            id="name"
            className="border-b border-transparent focus:ring-0 sm:text-32 mt-1 block w-full border-0 p-0 bg-dark-100 outline-none font-headings font-bold text-dark-500"
            placeholder="0"
          />
          <Listbox
            value={selectedReceiveOption}
            onChange={setSelectedReceiveOption}
          >
            {({ open }) => (
              <>
                <div className="absolute right-4 bottom-4 mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 border-[1px] border-dark-200">
                    <span className="flex items-center">
                      <img
                        src={selectedReceiveOption.logo}
                        alt=""
                        className="h-5 w-5 flex-shrink-0"
                      />
                      <span className="ml-2 block truncate">
                        {selectedReceiveOption.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {receiveOptions.map((paymentOption) => (
                        <Listbox.Option
                          key={paymentOption.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                            )
                          }
                          value={paymentOption}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <img
                                  src={paymentOption.logo}
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0"
                                />
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-2 block truncate",
                                  )}
                                >
                                  {paymentOption.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="relative rounded-lg px-4 py-3 bg-primary-100 mt-4">
          <label htmlFor="name" className="flex flex-row items-center gap-1">
            <div className="text-14 font-paragraphs font-semibold text-primary-500">
              You receive (approximate)
            </div>
            <div>
              <img src="information-circle-lined.svg" alt="" />
            </div>
          </label>
          <input
            type="number"
            name="name"
            value={0}
            id="name"
            className="border-b border-transparent focus:ring-0 sm:text-32 mt-1 block w-full border-0 p-0 bg-primary-100 outline-none font-headings font-bold text-dark-500"
            placeholder="0"
          />
          <Listbox value={selectedPayOption} onChange={setSelectedPayOption}>
            {({ open }) => (
              <>
                <div className="absolute right-4 bottom-4 mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 border-[1px] border-dark-200">
                    <span className="flex items-center">
                      <img
                        src={selectedPayOption.logo}
                        alt=""
                        className="h-5 w-5 flex-shrink-0"
                      />
                      <span className="ml-2 block truncate">
                        {selectedPayOption.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {paymentOptions.map((paymentOption) => (
                        <Listbox.Option
                          key={paymentOption.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                            )
                          }
                          value={paymentOption}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <img
                                  src={paymentOption.logo}
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0"
                                />
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-2 block truncate",
                                  )}
                                >
                                  {paymentOption.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
      {walletConnected ? (
        <div className="flex flex-col items-center justify-center pt-[205px]">
          <button
            type="submit"
            className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 gap-0"
          >
            <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
              Connect Wallet
            </div>
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center pt-10">
            <div className="flex flex-col items-start justify-center w-full p-4 rounded-2 border-dark-100 border-[0.125rem] gap-2">
              <div className="text-dark-500 text-12 font-semibold font-paragraphs">
                PAYMENT ADDRESS
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row justify-between items-center gap-1">
                  <div className="w-6 h-6">
                    <img src="ic_paypal.svg" alt="" className="object-cover" />
                  </div>
                  <div className="text-dark-500 text-14 font-semibold font-paragraphs underline">
                    paypal.me/unipeer
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-1">
                  <div className="text-primary-500 text-16 font-semibold font-paragraphs">
                    Edit
                  </div>
                  <div className="w-5 h-5 text-primary-500">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m15.232 5.732 3.536 3.536m-2.036-5.036a2.5 2.5 0 0 1 3.536 3.536L6.5 21.536H3v-3.572L16.732 4.232z"
                        stroke="#fe5e44"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!paymentAddress ? (
            <div className="flex flex-col items-center justify-center pt-[95px] gap-4">
              <div className="text-12 font-normal font-paragraphs text-dark-500 text-center">
                To create a sell order, your tokens need to be deposited in an
                escrow contract. You can withdraw your tokens from the escrow at
                any time.
              </div>
              <button
                type="submit"
                className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 gap-0"
              >
                <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                  Proceed to deposit your tokens
                </div>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-[147px]">
              <button className="flex flex-col items-center justify-center cursor-not-allowed w-full max-h-[56px] rounded-lg bg-dark-300 py-4 text-16 font-semibold font-paragraphs leading-6 text-white opacity-50">
                <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                  Payment address not added
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sell;
