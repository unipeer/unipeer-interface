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

import CustomNavBar from "components/CustomNavBar";
import Buy from "components/buy";
import SellerInfo from "components/tables/SellerInfo/SellerInfo";
import BuySellTab from "components/tabs/buysell";
import Sell from "components/sell";

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

const Demo = () => {
  const [selectedTab, setSelectedTab] = useState("Buy");
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
                  <BuySellTab
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                  <>{selectedTab === "Buy" ? <Buy /> : <Sell />}</>
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
                </div>
                <SellerInfo />
              </section>
            </div>
          </main>
        </div>
      </main>
    </>
  );
};

export default Demo;
