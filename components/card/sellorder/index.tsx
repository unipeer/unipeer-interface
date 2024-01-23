import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import { Popover, Transition } from "@headlessui/react";
import { ArrowDownTrayIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import BasicDialog from "components/BasicDialog";
import { CancelOrderModal } from "components/my_orders/modals/cancel_order";
import { CompleteOrderModal } from "components/my_orders/modals/complete_order";
import { DisputeRaisedModal } from "components/my_orders/modals/dispute_raised";
import { RaiseDisputeModal } from "components/my_orders/modals/raise_dispute";
import CryptoIcon from "components/shared/crypto_icons";
import {
  OrderStatus,
  getOrderStatusText,
} from "components/shared/order_status";
import {
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import { BuyOrder } from "components/shared/types";
import React, { Fragment, useEffect, useState } from "react";
import { addresses, constants, formatEtherscanLink } from "../../../util";
import moment from "moment";
import { type Unipeer } from "../../../contracts/types";
import UNIPEER_ABI from "../../../contracts/Unipeer.json";
import IARBITRATOR_ABI from "../../../contracts/IArbitrator.json";

type SellOrderCardType = {
  id: number;
  timeLeft: number;
  order: BuyOrder;
};

export type CancelOrderObj = {
  id: number;
  tokenName: string;
  tokenLogo: string;
  tokenAmount: string;
};

const SellOrderCard = ({ id, timeLeft, order }: SellOrderCardType) => {
  const { chain } = useNetwork();
  const chainId = chain?.id || constants.defaultChainId;
  const provider = useProvider();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCompletePaymentDialog, setShowCompletePaymentDialog] =
    useState(false);
  const [showDisputeOrderDialog, setShowDisputeOrderDialog] = useState(false);
  const [disputeActiveModalComponent, setDisputeActiveModalComponent] =
    useState("");
  const nextState = moment.unix(order.lastInteraction.toNumber() + timeLeft);
  const isTimedOut =
    order.status == OrderStatus.PAID && moment().isAfter(nextState);
  const [arbitrator, setArbitrator] = useState("");
  const [extraData, setExtraData] = useState("");
  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });
  useEffect(() => {
    const fetch = async () => {
      setArbitrator(await Unipeer.arbitrator());
      setExtraData(await Unipeer.arbitratorExtraData());
    };
    fetch();
  });
  const { data: arbCost } = useContractRead({
    addressOrName: arbitrator,
    contractInterface: IARBITRATOR_ABI.abi,
    functionName: "arbitrationCost",
    args: [extraData],
  });
  const { config: timeoutConfig } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    functionName: isTimedOut ? "timeoutByBuyer" : "timeoutBySeller",
    args: [order.orderID],
    enabled: isTimedOut,
  });
  return (
    <div className="grid grid-cols-3 p-6 rounded-16 bg-white">
      <div className="flex flex-col justify-center gap-4">
        <div className="w-fit relative">
          <Popover className="">
            {({ open }) => (
              <>
                <Popover.Button className={"ring-0 outline-none"}>
                  <div className="flex flex-row items-center justify-normal cursor-pointer w-fit gap-1">
                    <div className="text-16 text-primary-500 font-paragraphs font-semibold gap-1">
                      Details
                    </div>
                    <div className="w-4 h-4">
                      <img
                        src="details-icon.svg"
                        alt="Details icon"
                        className="object-cover"
                      />
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
                  <Popover.Panel className="absolute -top-[160px] left-0 z-9 min-w-64">
                    <div className="absolute h-3 w-3 bottom-0 left-2 origin-bottom-left rotate-45 transform border-[1px] border-l-0 border-t-0 border-b-dark-200 border-r-dark-200 bg-dark-100"></div>
                    <div className="px-4 py-6 bg-dark-100 border-[1px] border-dark-200 rounded-8 flex flex-col gap-4">
                      <div className="flex flex-col justify-center gap-1">
                        <div className="font-paragraphs font-semibold text-12 text-dark-600">
                          Order created on
                        </div>
                        <div className="font-paragraphs font-normal text-14 text-dark-500">
                          {new Date(
                            order.lastInteraction.toNumber() * 1000,
                          ).toLocaleString()}
                        </div>
                      </div>
                      {order.status !== OrderStatus.CREATED ? (
                        <div className="flex flex-col justify-center gap-1">
                          <div className="font-paragraphs font-semibold text-12 text-dark-600">
                            Seller's address
                          </div>
                          <a className="font-paragraphs font-normal text-14 text-dark-500 underline underline-offset-2">
                            {order.paymentAddress}
                          </a>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          {/* <div
            data-tooltip-id="arbitration-fee-tooltip"
            data-tooltip-content={`<div>`}
            className="flex flex-row items-center justify-normal cursor-pointer w-fit gap-1"
          >
            <div className="text-16 text-primary-500 font-paragraphs font-semibold gap-1">
              Details
            </div>
            <div className="w-4 h-4">
              <img
                src="details-icon.svg"
                alt="Details icon"
                className="object-cover"
              />
            </div>
          </div>
          <ReactTooltip
            id="arbitration-fee-tooltip"
            className="px-4 py-10 max-w-[416px] bg-dark-800 font-paragraphs font-normal text-14 text-white"
            style={{
              padding: "1.5rem",
              backgroundColor: "#04072a",
              borderRadius: "8px",
            }}
          /> */}
        </div>
        <div className="flex flex-row items-center gap-6">
          <div className="flex flex-col justify-center gap-1">
            <div className="font-paragraphs font-semibold text-14 text-dark-400">
              You sell
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-paragraphs font-semibold text-16 text-dark-500">
                {String(formatEther(BigNumber.from(order.amount)) + "XDAI")}
                {/* {order.token} */}
              </div>
              <div className="w-6 h-6">
                <CryptoIcon symbol={order.token} />
              </div>
            </div>
          </div>
          <div className="text-24">
            <ArrowRightIcon width={24} height={24} />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <div className="font-paragraphs font-semibold text-14 text-dark-400">
              You get
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-paragraphs font-semibold text-16 text-dark-500">
                {String(
                  formatEther(
                    BigNumber.from(order.amount.sub(order.feeAmount)),
                  ) + "USD",
                )}{" "}
                {/* {order.token} */}
              </div>
              <div className="w-6 h-6">
                <CryptoIcon symbol={order.token} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="font-paragraphs font-semibold text-dark-600 text-14">
          Status - {getOrderStatusText(order.status, false)}
        </div>
        <div
          className={`flex flex-col items-center justify-center px-2 py-1 border-[1px] rounded-full w-fit ${
            order.status === OrderStatus.COMPLETED
              ? "bg-success-bg border-success"
              : order.status === OrderStatus.CANCELLED
              ? "bg-warning-bg border-warning"
              : "bg-warning-bg border-warning"
          }`}
        >
          Time left - {nextState.fromNow()}
        </div>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        {/* Payment Confirmation */}
        {order.status === OrderStatus.PAID && (
          <div className="flex flex-row items-center justify-normal gap-2">
            <>
              {!isTimedOut && (
                <div className="flex flex-col justify-center items-center">
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center w-full max-h-[37px] rounded-lg bg-accent-1 py-2 px-4 gap-1"
                    onClick={() => {
                      setDisputeActiveModalComponent("raise");
                    }}
                  >
                    <div className="text-14 font-semibold font-paragraphs text-white">
                      Dispute order
                    </div>
                    {disputeActiveModalComponent === "raise" && (
                      <div>
                        <BasicDialog
                          dialogTitle="Raise a dispute"
                          isCancellable={true}
                          dialogChild={
                            <RaiseDisputeModal
                              paymentAmount={String(
                                formatEther(
                                  BigNumber.from(
                                    order.amount.sub(order.feeAmount),
                                  ),
                                ),
                              )}
                              paymentCurrency={"USD"}
                              sellerAddress={order.seller}
                              reasonForDispute={
                                "Payment not received by seller"
                              }
                              raiseDisputeCallback={() => {
                                // dispute logic
                                {
                                  const { config: disputeConfig } =
                                    usePrepareContractWrite({
                                      addressOrName: addresses.UNIPEER[chainId],
                                      contractInterface: UNIPEER_ABI.abi,
                                      functionName: "disputeOrder",
                                      args: [order.orderID],
                                      enabled: true,
                                      overrides: {
                                        value: arbCost!,
                                      },
                                    });
                                  const {
                                    data: dataDispute,
                                    isError: isErrorDispute,
                                    write: writeDispute,
                                  } = useContractWrite(disputeConfig);

                                  const { isLoading: isLoadingDispute } =
                                    useWaitForTransaction({
                                      hash: dataDispute?.hash,
                                    });
                                  if (!isLoadingDispute) {
                                    setDisputeActiveModalComponent("success");
                                  }
                                }
                              }}
                            />
                          }
                        />
                      </div>
                    )}
                    {disputeActiveModalComponent === "success" && (
                      <div>
                        <BasicDialog
                          dialogTitle="Raise a dispute"
                          isCancellable={true}
                          dialogChild={
                            <DisputeRaisedModal
                              activeModalComponent={
                                setDisputeActiveModalComponent
                              }
                              caseId={"5684745"}
                            />
                          }
                        />
                      </div>
                    )}
                    <div className="h-4 w-4">
                      <img
                        src="exclamation-circle-white.svg"
                        alt="exclamation circle white"
                        className="object-cover"
                      />
                    </div>
                  </button>
                </div>
              )}
              <div className="flex flex-col justify-center items-center">
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center w-full max-h-[37px] rounded-lg bg-accent-1 py-2 px-4 gap-1"
                >
                  <div
                    className="text-14 font-semibold font-paragraphs text-white"
                    onClick={() => {
                      setShowCompletePaymentDialog(true);
                    }}
                  >
                    Complete order
                  </div>
                  {showCompletePaymentDialog && (
                    <div>
                      <BasicDialog
                        dialogTitle="Complete order"
                        isCancellable={true}
                        dialogChild={
                          <CompleteOrderModal
                            getAmount={order.amount}
                            getAmountCurrency={order.token}
                            sellAmount={order.amount}
                            sellAmountCurrency={order.token}
                            sellerAddress={order.seller}
                            confirmPaymentCallback={() => {
                              // complete order logic
                              const {
                                config,
                                error: prepareError,
                                isError: isPrepareError,
                              } = usePrepareContractWrite({
                                addressOrName: addresses.UNIPEER[chainId],
                                contractInterface: UNIPEER_ABI.abi,
                                functionName: "completeOrder",
                                args: [order.orderID],
                                enabled: true,
                              });
                              const { data, isError, write } =
                                useContractWrite(config);

                              const { isLoading, isSuccess } =
                                useWaitForTransaction({
                                  hash: data?.hash,
                                });
                              if (!isLoading) {
                                setShowCompletePaymentDialog(false);
                              }
                            }}
                          />
                        }
                      />
                    </div>
                  )}
                  <div className="h-4 w-4">
                    <img
                      src="check-white.svg"
                      alt="Check White icon"
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
            </>
          </div>
        )}
        {/* Buy order is pending, either you can cancel or confirm */}
        {order.status !== OrderStatus.PAID &&
          order.status !== OrderStatus.CANCELLED &&
          order.status !== OrderStatus.DISPUTED && (
            <>
              <div className="flex flex-col justify-center items-center">
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center w-full max-h-[37px] rounded-lg bg-accent-1 py-2 px-4 gap-1"
                >
                  <div
                    className="text-14 font-semibold font-paragraphs text-white"
                    onClick={() => {
                      setShowCancelDialog(true);
                    }}
                  >
                    Cancel order
                  </div>
                  {showCancelDialog && (
                    <div>
                      <BasicDialog
                        dialogTitle="Cancel order"
                        isCancellable={true}
                        dialogChild={
                          <CancelOrderModal
                            tokenName={order.token}
                            tokenAmount={order.amount}
                            cancelOrderCallback={() => {
                              // cancel order logic
                              const {
                                config,
                                error: prepareError,
                                isError: isPrepareError,
                              } = usePrepareContractWrite({
                                addressOrName: addresses.UNIPEER[chainId],
                                contractInterface: UNIPEER_ABI.abi,
                                functionName: "timeoutByBuyer",
                                args: [order.orderID],
                                enabled: true,
                              });
                              const { data, isError, write } =
                                useContractWrite(config);

                              const { isLoading, isSuccess } =
                                useWaitForTransaction({
                                  hash: data?.hash,
                                });
                              if (!isLoading) {
                                setShowCancelDialog(false);
                              }
                            }}
                          />
                        }
                      />
                    </div>
                  )}
                  <div className="h-4 w-4">
                    <img
                      src="cross-outline-icon.svg"
                      alt="Cross outline icon"
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
            </>
          )}
        {/* Buy order is finished, you can get tokens */}
        {order.status === OrderStatus.DISPUTED && (
          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              className="flex flex-row items-center justify-center w-full max-h-[37px] rounded-lg bg-accent-1 py-2 px-4 gap-1"
            >
              <div className="text-14 font-semibold font-paragraphs text-white">
                View on Kleros
              </div>
              <div className="h-4 w-4">
                <img
                  src="external-link-white.svg"
                  alt="external link white"
                  className="object-cover"
                />
              </div>
            </button>
          </div>
        )}
        {/* Buy order is finished, you can get tokens */}
        {order.status === OrderStatus.COMPLETED && (
          <div className="flex flex-row items-center justify-normal gap-1">
            <div className="h-5 w-5">
              <img
                src="confetti-icon.svg"
                alt="Check icon"
                className="object-cover"
              />
            </div>
            <div className="font-paragraphs font-normal text-dark-600 text-16">
              Order completed successfully
            </div>
          </div>
        )}
        {order.status === OrderStatus.CANCELLED && (
          <div className="flex flex-row items-center justify-normal gap-1">
            <div className="h-6 w-6">
              <img
                src="cross-red-outline.svg"
                alt="Check icon"
                className="object-cover"
              />
            </div>
            <div className="font-paragraphs font-normal text-dark-600 text-16">
              Order cancelled by you
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellOrderCard;
