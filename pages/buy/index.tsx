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
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  ClipboardIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

import CustomNavBar from "components/CustomNavBar";

const sellers = [
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

const tabs = [
  { name: "Buy", href: "#", current: false },
  { name: "Sell", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Buy = () => {
  const [selectedPayOption, setSelectedPayOption] = useState(paymentOptions[0]);
  const [selectedReceiveOption, setSelectedReceiveOption] = useState(
    receiveOptions[0],
  );
  const [allPaymentOptionsEnabled, setAllPaymentOptionsEnabled] =
    useState(false);

  return (
    <>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomNavBar />

      <main
        className="py-5"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255, 244, 242, 0.4) 0%, #fff0ee 100%)",
        }}
      >
        <div className="min-h-full">
          <main className="">
            {/* Page header */}

            <div className="flex flex-row mx-auto mt-8 max-w-3xl sm:px-6 lg:max-w-7xl gap-8">
              <div className="space-y-8 lg:min-w-[30rem]">
                {/* Description list*/}
                <section
                  className="bg-white sm:rounded-2xl p-8"
                  style={{
                    boxShadow: "0 6px 15px 2px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div>
                    <div>
                      <div className="hidden sm:flex">
                        <div
                          className="flex flex-row items-center border-dark-800 border-2 rounded-3xl"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <div
                              key={tab.name}
                              className={classNames(
                                !tab.current
                                  ? "bg-dark-800 text-white"
                                  : "bg-white text-dark-800",
                                "cursor-pointer m-2 px-4 py-2 font-semibold font-paragraphs text-20 rounded-[20px]",
                              )}
                              aria-current={tab.current ? "page" : undefined}
                            >
                              {tab.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <Listbox
                        value={selectedPayOption}
                        onChange={setSelectedPayOption}
                      >
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
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
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
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
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
                    <div className="flex flex-row items-center justify-start gap-[0.25rem] cursor-pointer mt-10">
                      <div className="flex font-paragraphs text-16 text-accent-1 font-semibold">
                        Add preferred seller (optional)
                      </div>
                      <div className="flex flex-col items-center justify-center text-primary-500">
                        <PlusIcon width={20} height={20} />
                      </div>
                    </div>
                  </div>
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
                </section>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="bg-white sm:rounded-2xl p-8 w-full"
                style={{
                  boxShadow: "0 6px 15px 2px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div className="">
                  <div className="pt-2 pb-8 flex flex-row w-full justify-between items-center">
                    <div className="font-paragraphs font-semibold text-20 text-dark-800">
                      Seller information
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <div className="font-paragraphs font-normal text-dark-800 text-14">
                        All payment modes
                      </div>
                      <Switch
                        checked={allPaymentOptionsEnabled}
                        onChange={setAllPaymentOptionsEnabled}
                        className={classNames(
                          allPaymentOptionsEnabled
                            ? "bg-dark-200"
                            : "bg-dark-100",
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            allPaymentOptionsEnabled
                              ? "ml-[1px] mt-[2px] bg-white translate-x-5"
                              : "mt-[2px] translate-x-0",
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-dark-200 ring-0 transition duration-200 ease-in-out",
                          )}
                        />
                      </Switch>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle ">
                          <div className="overflow-hidden border-t-2 border-black border-opacity-5">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead className="">
                                <tr>
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-4 font-paragraphs text-12 font-semibold text-dark-500 sm:pl-8"
                                  >
                                    SELLER ADDRESS
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                                  >
                                    LIQUIDITY
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                                  >
                                    FEE%
                                  </th>
                                  <th
                                    scope="col"
                                    className="pl-3 pr-0 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                                  >
                                    PAYMENT MODES
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 font-paragraphs text-12 font-semibold text-dark-500"
                                  >
                                    REPUTATION
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {sellers.map((seller) => (
                                  <tr key={seller.address}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-8 flex flex-row items-center gap-1">
                                      <div className="font-paragraphs text-14 font-normal text-dark-500">
                                        {seller.address}
                                      </div>
                                      <div className="cursor-pointer">
                                        <img src="duplicate.svg" alt="" />
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 font-paragraphs text-14 font-normal text-dark-500">
                                      {seller.liquidity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 font-paragraphs text-14 font-normal text-dark-500">
                                      {seller.fee}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 flex flex-row gap-1">
                                      {seller.paymentModes.map(
                                        (paymentMode) => (
                                          <div key={paymentMode.id}>
                                            <img
                                              src={paymentMode.icon}
                                              alt={paymentMode.name}
                                            />
                                          </div>
                                        ),
                                      )}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                      <div className="w-full bg-dark-100 rounded-full h-2.5">
                                        <div
                                          className={`h-2.5 rounded-full bg-${
                                            seller.reputation > 70
                                              ? "success"
                                              : seller.reputation >= 40
                                              ? "warning"
                                              : "alert"
                                          }`}
                                          style={{
                                            width: `${seller.reputation}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </main>
    </>
  );
};

export default Buy;
