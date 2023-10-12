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
import CurrencyAndTokenModal from "./modals/CurrencyAndTokenModal/CurrencyAndTokenModal";

import CurrencyList from "./modals/CurrencyAndTokenModal/CurrencyList.json";
import Flag from "react-world-flags";

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

const Buy = () => {
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
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false);
  const [currencyCode, setCurrencyCode] = useState(CurrencyList[0]);

  return (
    <>
      <CurrencyAndTokenModal
        openModal={openCurrencyModal}
        setOpenModal={setOpenCurrencyModal}
        setCurrencyCode={setCurrencyCode}
      />
      <div>
        <div className="mt-10">
          <div className="relative rounded-lg px-4 py-3 bg-dark-100">
            <label
              htmlFor="name"
              className="flex text-14 font-paragraphs font-semibold text-dark-blue-400"
            >
              You pay
            </label>
            <input
              type="number"
              name="name"
              value={0}
              id="name"
              className="border-b border-transparent focus:ring-0 sm:text-32 mt-1 block w-full border-0 p-0 bg-dark-100 outline-none font-headings font-bold text-dark-500"
              placeholder="0"
            />
            <div>
                <>
                  <div className="absolute right-4 bottom-4 mt-2">
                    <div
                      onClick={() => {
                        setOpenCurrencyModal(true);
                      }}
                      className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 border-[1px] border-dark-200"
                    >
                      <span className="flex items-center">
                        <Flag code={currencyCode.numericCode} className="h-4 w-5" />
                        <span className="ml-2 block truncate">
                          {currencyCode.currencies[0].code}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </>
            </div>
          </div>
          <div className="relative rounded-lg px-4 py-3 bg-primary-100 mt-4">
            <label
              htmlFor="name"
              className="flex text-14 font-paragraphs font-semibold text-primary-500"
            >
              You receive
            </label>
            <input
              type="number"
              name="name"
              value={0}
              id="name"
              className="border-b border-transparent focus:ring-0 sm:text-32 mt-1 block w-full border-0 p-0 bg-primary-100 outline-none font-headings font-bold text-dark-500"
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
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
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
          <div className="relative flex flex-row items-center justify-start gap-[0.25rem] cursor-pointer mt-10">
            {!sellerAddress ? (
              <div className="mt-10">
                {/* <div className="flex flex-row items-center justify-start gap-[0.25rem] cursor-pointer">
                            <div className="flex font-paragraphs text-16 text-accent-1 font-semibold">
                              Add preferred seller (optional)
                            </div>
                            <div className="flex flex-col items-center justify-center text-primary-500">
                              <PlusIcon width={20} height={20} />
                            </div>
                          </div> */}
                <Popover className="">
                  {({ open }) => (
                    <>
                      <Popover.Button className={"ring-0 outline-none"}>
                        <div className="flex flex-row items-center justify-start gap-[0.25rem] cursor-pointer">
                          <div className="flex font-paragraphs text-16 text-accent-1 font-semibold">
                            Add preferred seller (optional)
                          </div>
                          <div className="flex flex-col items-center justify-center text-primary-500">
                            <PlusIcon width={20} height={20} />
                          </div>
                        </div>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -top-[144px] left-0 z-9  w-full">
                          <div className="absolute  h-3 w-3 bottom-0 left-2 origin-bottom-left rotate-45 transform border-[1px] border-l-0 border-t-0 border-b-primary-200 border-r-primary-200 bg-primary-100"></div>
                          <div className="px-6 py-4 bg-primary-100 border-[1px] border-primary-200 rounded-8">
                            <form className="flex flex-col gap-6">
                              <div>
                                <div className="flex items-center justify-between">
                                  <label
                                    htmlFor="rate-percent"
                                    className="flex text-12 font-semibold text-dark-600 font-paragraphs"
                                  >
                                    Preferred seller address
                                  </label>
                                </div>
                                <div className="mt-[0.125rem] flex flex-row items-center max-h-12 w-full rounded-lg bg-white py-3 text-left sm:text-sm">
                                  <input
                                    type="text"
                                    // name={feeRatePercentage}
                                    // value={feeRatePercentage}
                                    id="rate-percent"
                                    className="items-center max-h-12 w-full rounded-lg bg-white py-3 text-left text-dark-black-500 font-paragraphs text-16 border-[1px] border-dark-200"
                                    placeholder="e.g. 0xd8dA6....8bd3d"
                                  />
                                </div>
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  className="flex flex-row items-center justify-center max-h-[56px] rounded-lg bg-accent-1 py-2 px-4 gap-0 max-w-24"
                                >
                                  <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                                    Add seller
                                  </div>
                                </button>
                              </div>
                            </form>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            ) : (
              <div className="flex flex-row items-center cursor-normal justify-between bg-white px-3 py-2 rounded-8 border-dark-100 border-[0.125rem] w-full">
                <div className="flex font-paragraphs text-14 text-dark-500 font-semibold">
                  <span className="font-normal">
                    {"Preferred seller: "}&nbsp;
                  </span>
                  <span className="underline">{"0xd45bda...345bY239"}</span>
                </div>
                <div className="w-6 h-6">
                  <img
                    src="cross-icon.svg"
                    alt="Cross icon"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
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
              <div className="flex flex-row items-center justify-between w-full p-4 rounded-2 border-dark-100 border-[0.125rem]">
                <div className="flow-root w-full">
                  <ul role="list" className="-mb-12">
                    <li>
                      <div className="relative pb-12 w-full">
                        <span
                          className="absolute top-2 left-2 -ml-px h-full w-0.5 border-[1px] border-dashed border-dark-500"
                          aria-hidden="true"
                        />
                        <div className="relative flex space-x-3 w-full">
                          <div>
                            <span
                              className={classNames(
                                "h-4 w-4 rounded-full flex items-center justify-center ring-8 ring-white bg-success",
                              )}
                            ></span>
                          </div>
                          <div className="flex min-w-0 space-x-1 w-full">
                            <div className="flex flex-row items-center justify-between w-full">
                              <div className="flex flex-row items-center gap-1">
                                <p className="font-paragraphs text-14 text-dark-500">
                                  Pay
                                  <span className="font-semibold">
                                    0.001 xDAI
                                  </span>{" "}
                                  as arbitration fee
                                </p>
                                <div className="flex flex-col items-center justify-center text-dark-500">
                                  <a
                                    data-tooltip-id="arbitration-fee-tooltip"
                                    data-tooltip-content="To place a buy order successfully, you need to provide a deposit needed to cover the arbitration costs in case of a dispute. It will be refunded to you unless your order is disputed by the seller and you lose the case."
                                  >
                                    <InformationCircleIcon
                                      width={15}
                                      height={15}
                                    />
                                  </a>
                                  <ReactTooltip
                                    id="arbitration-fee-tooltip"
                                    className="px-4 py-10 max-w-[416px] bg-dark-800 font-paragraphs font-normal text-14 text-white"
                                    style={{
                                      padding: "1.5rem",
                                      backgroundColor: "#04072a",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-1 cursor-pointer">
                                <div className="text-16 text-primary-500 font-paragraphs font-semibold">
                                  Faucet
                                </div>
                                <div>
                                  <img src="external-link.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-12">
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                "h-4 w-4 rounded-full flex items-center justify-center ring-8 ring-white bg-dark-100",
                              )}
                            ></span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4">
                            <div>
                              <p className="font-paragraphs text-14 text-dark-500">
                                Pay{" "}
                                <span className="font-semibold">1,000 USD</span>{" "}
                                including fee via PayPal
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {!sellers.length ? (
              <div className="flex flex-col items-center justify-center pt-16">
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 gap-0"
                >
                  <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                    Proceed to place buy order
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-16">
                <button className="flex flex-col items-center justify-center cursor-not-allowed w-full max-h-[56px] rounded-lg bg-dark-300 py-4 text-16 font-semibold font-paragraphs leading-6 text-white opacity-50">
                  <div className="text-16 font-semibold font-paragraphs leading-6 text-white">
                    No sellers available at the moment
                  </div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Buy;
