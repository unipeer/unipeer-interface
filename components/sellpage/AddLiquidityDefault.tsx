import { Dispatch, Fragment, useState, useEffect, SetStateAction } from "react";
import { Transition, Listbox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

import { Tooltip as ReactTooltip } from "react-tooltip";

import PaymentAddress from "components/modals/payment/paymentaddress";
import AcceptPaymentPolicy from "./AcceptPaymentPolicy";
import PayNetworkFee from "./PayNetworkFeeModal";

type AddLiquidityDefaultProps = {
  addLiquidityBackButton: any;
  setCurrentCard: Dispatch<SetStateAction<string>>;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

const AddLiquidityDefault: React.FC<AddLiquidityDefaultProps> = ({
  addLiquidityBackButton,
  setCurrentCard,
}) => {
  const [selectedPayOption, setSelectedPayOption] = useState(paymentOptions[0]);
  const [selectedReceiveOption, setSelectedReceiveOption] = useState(
    receiveOptions[0],
  );
  const [walletConnected, setWalletConnected] = useState(true);
  const [paymentAddress, setPaymentAddress] = useState(true);
  const [openPaymentAddressModal, setOpenPaymentAddressModal] = useState("");
  const [openAcceptPaymentPolicy, setOpenAcceptPaymentPolicy] = useState("");
  const [openPayNetworkFeeModal, setOpenPayNetworkFeeModal] = useState("");

  useEffect(() => {
    if (openPayNetworkFeeModal === "PayNetworkFee") {
      setTimeout(() => {
        setOpenPayNetworkFeeModal("");
        setCurrentCard("C");
      }, 3000);
    }
  }, [openPayNetworkFeeModal, setOpenPayNetworkFeeModal, setCurrentCard]);

  return (
    <>
      <PaymentAddress
        activeModalComponent={openPaymentAddressModal}
        setActiveModalComponent={setOpenPaymentAddressModal}
      />
      <AcceptPaymentPolicy
        activeModalComponent={openAcceptPaymentPolicy}
        setActiveModalComponent={setOpenAcceptPaymentPolicy}
        setNewModalDialogue={setOpenPayNetworkFeeModal}
      />
      <PayNetworkFee
        activeModalComponent={openPayNetworkFeeModal}
        setActiveModalComponent={setOpenPayNetworkFeeModal}
      />
      <div className="flex flex-row mx-auto mt-8 lg:max-w-[480px] gap-8">
        <section
          aria-labelledby="timeline-title"
          className="bg-white sm:rounded-2xl w-full p-8 min-h-[683px] flex flex-col justify-between"
          style={{
            boxShadow: "0 6px 15px 2px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center">
                <ArrowLeftIcon
                  className="h-6 w-6 mr-2 text-primary-500 hover:cursor-pointer"
                  onClick={() => addLiquidityBackButton()}
                />
                <div className="text-20 font-paragraphs font-semibold text-dark-800">
                  Add liquidity
                </div>
              </div>
              <div className="bg-warning-color-background rounded-[100px] p-2 flex flex-row items-center gap-1">
                <div className="flex flex-col items-center justify-center text-dark-500">
                  <a
                    data-tooltip-id="payment-policy-tooltip"
                    data-tooltip-content="The rules for accepting this payment method are specified in the PayPal Payment Policy. Make sure to understand the policy before accepting this payment in case of a dispute."
                  >
                    <img
                      src="information-circle.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </a>
                  <ReactTooltip
                    id="payment-policy-tooltip"
                    className="px-4 py-10 max-w-[410px] bg-dark-800 font-paragraphs font-normal text-14 text-white"
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "#04072a",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className="font-paragraphs font-semibold text-dark-800 text-12 ">
                  Payment Policy
                </div>
                <img
                  src="external-link-black.svg"
                  alt=""
                  height={16}
                  width={16}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
            <div className="relative rounded-lg px-4 py-3 bg-dark-100 mt-10">
              <div className="flex flex-row justify-between items-center">
                <label
                  htmlFor="name"
                  className="flex text-14 font-paragraphs font-semibold text-dark-blue-400"
                >
                  You sell
                </label>
                <label
                  htmlFor="name"
                  className="font-paragraphs text-dark-500 text-12"
                >
                  Balance: --
                </label>
              </div>
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
                className="flex flex-row items-center gap-1"
              >
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
          </div>
          {!walletConnected ? (
            <div className="flex flex-col items-center justify-center pt-[205px] self-end w-full">
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
                        <img
                          src="ic_paypal.svg"
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      {paymentAddress ? (
                        <div className="text-dark-500 text-14 font-semibold font-paragraphs underline">
                          paypal.me/unipeer
                        </div>
                      ) : (
                        <div className="text-dark-500 text-14 font-paragraphs">
                          No payment address added
                        </div>
                      )}
                    </div>
                    {paymentAddress ? (
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
                    ) : (
                      <div
                        className="flex flex-row justify-between items-center gap-1 cursor-pointer"
                        onClick={() =>
                          setOpenPaymentAddressModal("PaymentAddress")
                        }
                      >
                        <div className="text-primary-500 text-16 font-semibold font-paragraphs">
                          Add
                        </div>
                        <div className="w-5 h-5 text-primary-500">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 5v5m0 0v5m0-5h5m-5 0H5"
                              stroke="#FE5E44"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {paymentAddress ? (
                <div className="flex flex-col items-center justify-center pt-[95px] gap-4">
                  <div className="text-12 font-normal font-paragraphs text-dark-500 text-center">
                    To create a sell order, your tokens need to be deposited in
                    an escrow contract. You can withdraw your tokens from the
                    escrow at any time.
                  </div>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 py-4 gap-0"
                    onClick={() =>
                      setOpenAcceptPaymentPolicy("AcceptPaymentPolicy")
                    }
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
        </section>
      </div>
    </>
  );
};

export default AddLiquidityDefault;
