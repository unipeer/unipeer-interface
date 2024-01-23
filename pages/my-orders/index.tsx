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
  ArrowDownTrayIcon,
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

import CustomNavBar from "components/CustomNavBar";
import Buy from "components/buy";
import SellerInfo from "components/tables/sellerinfo";
import BuySellTab from "components/tabs/buysell";
import Sell from "components/sell";
import ActiveInactiveTab from "components/tabs/activeinactiveorders";
import ActiveBuyOrders from "components/orders/activebuyorders";
import InActiveBuyOrders from "components/orders/inactivebuyorders";
import ActiveSellOrders from "components/orders/activesellorders";
import InActiveSellOrders from "components/orders/inactivesellorders";
import { WithdrawTokensModal } from "components/my_orders/modals/withdraw_tokens";
import { WithdrawTokenModal } from "components/my_orders/modals/withdraw_token";
import BasicDialog from "components/BasicDialog";
import { WithdrawTokenSuccessModal } from "components/my_orders/modals/withdraw_token_success";

const sortOptions = [
  "last 7 days",
  "last 30 days",
  "last 3 months",
  "last 6 months",
];

export type WithdrawTokenObj = {
  id: number;
  convertFrom: string;
  convertFromLogo: string;
  convertTo: string;
  convertToLogo: string;
  balance: string;
  lockedAmount: string;
  withdrawnAmount: string;
};

const withdrawTokensDummyObj: ReadonlyArray<WithdrawTokenObj> = [
  {
    id: 1,
    convertFrom: "xDAI",
    convertFromLogo: "xdai-logo.png",
    convertTo: "Paypal",
    convertToLogo: "ic_paypal.svg",
    balance: "70",
    lockedAmount: "10",
    withdrawnAmount: "0",
  },
  {
    id: 2,
    convertFrom: "xDAI",
    convertFromLogo: "xdai-logo.png",
    convertTo: "Venmo",
    convertToLogo: "ic_venmo.svg",
    balance: "600",
    lockedAmount: "10",
    withdrawnAmount: "0",
  },
  {
    id: 3,
    convertFrom: "USDC",
    convertFromLogo: "usdc-logo.svg",
    convertTo: "Paypal",
    convertToLogo: "ic_paypal.svg",
    balance: "250",
    lockedAmount: "10",
    withdrawnAmount: "0",
  },
];

const orderDropDownOptions = ["All Orders", "Buy orders", "Sell orders"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Demo = () => {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [allPaymentOptionsEnabled, setAllPaymentOptionsEnabled] =
    useState(false);
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [activeOption, setActiveOption] = useState(orderDropDownOptions[0]);
  const [orders, setOrders] = useState([]);
  const [activeWithdrawModalComponent, setActiveWithdrawModalComponent] =
    useState("");
  const [currentWithdrawTokenObj, setCurrentWithdrawTokenObj] = useState(
    withdrawTokensDummyObj[0],
  );

  return (
    <>
      <Head>
        <title>Unipeer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomNavBar />

      <main
        className="py-5 min-h-[100vh]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255, 244, 242, 0.4) 0%, #fff0ee 100%)",
        }}
      >
        <div className="min-h-full">
          <main className="">
            {/* Page header */}
            {activeWithdrawModalComponent === "tokenList" && (
              <BasicDialog
                dialogTitle="Withdraw tokens"
                isCancellable={true}
                dialogChild={
                  <WithdrawTokensModal
                    activeModalComponent={setActiveWithdrawModalComponent}
                    activeWithdrawToken={setCurrentWithdrawTokenObj}
                    withdrawTokenObjList={withdrawTokensDummyObj}
                  />
                }
                onCloseCallback={() => {
                  setActiveWithdrawModalComponent("");
                }}
              />
            )}
            {activeWithdrawModalComponent === "tokenDetails" && (
              <BasicDialog
                dialogTitle="Withdraw tokens"
                isCancellable={true}
                dialogChild={
                  <WithdrawTokenModal
                    activeModalComponent={setActiveWithdrawModalComponent}
                    activeWithdrawToken={setCurrentWithdrawTokenObj}
                    withdrawTokenObj={currentWithdrawTokenObj}
                  />
                }
                onCloseCallback={() => {
                  setActiveWithdrawModalComponent("");
                }}
              />
            )}

            {activeWithdrawModalComponent === "tokenWithdrawn" && (
              <BasicDialog
                dialogTitle="Withdraw tokens"
                isCancellable={true}
                dialogChild={
                  <WithdrawTokenSuccessModal
                    activeModalComponent={setActiveWithdrawModalComponent}
                    withdrawTokenObj={currentWithdrawTokenObj}
                  />
                }
                onCloseCallback={() => {
                  setActiveWithdrawModalComponent("");
                }}
              />
            )}
            <div className="flex flex-row mx-auto mt-8 max-w-3xl sm:px-6 lg:max-w-7xl gap-8 min-h-full">
              <div className="space-y-8 lg:min-w-[30rem] w-full">
                {/* Description list*/}
                <div className="flex flex-row items-center justify-between w-full">
                  {/* <div>
                    <button
                      className="flex flex-row justify-center items-center gap-2 px-4 py-2 bg-dark-800 rounded-[8px]"
                      onClick={() => {
                        // setActiveWithdrawModalComponent("n");
                        console.log(
                          `loading ${activeWithdrawModalComponent} dialog`,
                        );
                        setActiveWithdrawModalComponent("tokenList");
                      }}
                    >
                      <div className="text-14 font-semibold font-paragraphs text-white">
                        Withdraw from escrow
                      </div>
                      <div className="text-16">
                        <ArrowDownTrayIcon
                          color="white"
                          width={16}
                          height={16}
                          fontSize={16}
                        />
                      </div>
                    </button>
                  </div> */}
                </div>
                <section>
                  <div
                    style={{ backgroundImage: 'url("/patterns.png")' }}
                    className="bg-dark-100 sm:rounded-2xl p-8 flex flex-col justify-between items-center w-full"
                  >
                    <div className="text-dark-800 text-32 mb-8 font-bold font-headings">
                      My Orders
                    </div>
                    <div>
                      <ActiveInactiveTab
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  {orders.length === 1 ? (
                    <div className="flex flex-col justify-center items-start">
                      <div className="text-20 text-dark-500 font-normal font-paragraphs">
                        Oops! It looks like you have not created any new orders
                        recently. Create a{" "}
                        <a
                          href="#"
                          className="underline underline-offset-[3px] text-primary-500 font-semibold"
                        >
                          new order
                        </a>
                        .
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-row justify-start">
                        <div>
                          <Menu as="div" className="relative inline-block">
                            <div className="flex">
                              <Menu.Button className="group min-w-[206.25px] flex flex-row items-center justify-between min-w py-3 px-4 rounded-[8px] gap-12 text-16 text-dark-500 font-semibold font-paragraphs">
                                {activeOption}
                                <ChevronDownIcon
                                  className={`-mr-1 ml-1 h-6 w-6 flex-shrink-0 text-dark-500`}
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-white border-2 border-dark-100">
                                <div className="py-1">
                                  {orderDropDownOptions.map(
                                    (orderDropDownOption) => (
                                      <Menu.Item key={orderDropDownOption}>
                                        {({ active }) => (
                                          <div
                                            className={classNames(
                                              "cursor-pointer w-full group flex flex-row items-center justify-between p-4 bg-white rounded-[8px] gap-12",
                                            )}
                                            onClick={() =>
                                              setActiveOption(
                                                orderDropDownOption,
                                              )
                                            }
                                          >
                                            <div className="w-full text-16 text-dark-500 font-normal font-paragraphs">
                                              {orderDropDownOption}
                                            </div>
                                            {orderDropDownOption ===
                                              activeOption && (
                                              <div className="w-6 h-6">
                                                <img
                                                  src="check.svg"
                                                  alt="check icon"
                                                  className="object-cover w-6 h-6"
                                                />
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </Menu.Item>
                                    ),
                                  )}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                        <div>
                          {/* <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8"> */}
                          <Menu as="div" className="relative inline-block">
                            <div className="flex">
                              <Menu.Button className="group min-w-[206.25px] flex flex-row items-center justify-between min-w py-3 px-4 rounded-[8px] gap-12 text-16 font-semibold font-paragraphs">
                                {sortOption}
                                <ChevronDownIcon
                                  className={`-mr-1 ml-1 h-6 w-6 flex-shrink-0 text-dark-500`}
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-full  origin-top-right rounded-lg bg-white border-2 border-dark-100">
                                <div className="py-1">
                                  {sortOptions.map((option) => (
                                    <Menu.Item key={option}>
                                      {({ active }) => (
                                        <div
                                          className={classNames(
                                            "cursor-pointer w-full group flex flex-row items-center justify-between p-4 bg-white rounded-[8px] gap-12",
                                          )}
                                          onClick={() => setSortOption(option)}
                                        >
                                          <div className="w-full text-16 text-dark-500 font-normal font-paragraphs">
                                            {option}
                                          </div>
                                          {option === sortOption && (
                                            <div className="w-6 h-6">
                                              <img
                                                src="check.svg"
                                                alt="check icon"
                                                className="object-cover w-6 h-6"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>

                      <>
                        {activeOption === "Buy orders" ? (
                          selectedTab === "Active" ? (
                            <ActiveBuyOrders />
                          ) : (
                            <InActiveBuyOrders />
                          )
                        ) : activeOption === "Sell orders" ? (
                          selectedTab === "Active" ? (
                            <ActiveSellOrders />
                          ) : (
                            <InActiveSellOrders />
                          )
                        ) : activeOption === "All Orders" ? (
                          selectedTab === "Active" ? (
                            <div>
                              <ActiveBuyOrders />
                              <ActiveSellOrders />
                            </div>
                          ) : (
                            <div>
                              <InActiveBuyOrders />
                              <InActiveSellOrders />
                            </div>
                          )
                        ) : null}
                      </>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
};

export default Demo;
