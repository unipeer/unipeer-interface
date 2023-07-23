import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import BasicDialog from "./BasicDialog";
import PaymentMode from "./modals/payment/paymentmode";
import PaymentMethodModal from "./radiogroups/paymentmethodmodal";
import PaymentModeModal from "./modals/payment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const [activeModalComponent, setActiveModalComponent] = useState("");
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="flex flex-row items-center justify-between w-full mx-auto h-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between py-4 w-full">
              <div className="flex flex-row md:gap-8">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div
                  className="flex flex-shrink-0 items-center cursor-pointer"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <img
                    src="/nav_logo.svg"
                    width="150"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Unipeer logo"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-7 lg:space-x-12">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <div className="flex flex-row items-center justify-center gap-[0.125rem]">
                    <div className="flex flex-row items-center justify-center">
                      <img
                        src="/gnosis-logo.svg"
                        // width="150"
                        // height="30"
                        alt="Gnosis logo"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center border-indigo-500 px-1 text-16 font-normal text-dark-black-500">
                      Gnosis
                    </div>
                    <div className="flex flex-row items-center justify-center w-2 h-2 rounded-full bg-alert"></div>
                  </div>
                  <div
                    className="flex flex-row items-center justify-center cursor-pointer"
                    onClick={() => {
                      setActiveModalComponent("mode");
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      {
                        <PaymentModeModal
                          activeModalComponent={activeModalComponent}
                          setActiveModalComponent={setActiveModalComponent}
                        />
                      }
                      <img
                        src="/ic_paypal.svg"
                        // width="28"
                        // height="28"
                        alt="Paypal logo"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center border-indigo-500 px-1 text-16 font-normal text-dark-black-500">
                      Paypal
                    </div>
                    <div className="flex flex-row items-center justify-center">
                      <img
                        src="/chevron-down.svg"
                        // width="28"
                        // height="28"
                        alt="Down Arrow icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {false ? (
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative hidden md:inline-flex items-center rounded-md border border-transparent bg-accent-1 px-4 py-[12px] text-sm font-semibold font-paragraphs text-white"
                    >
                      <span>Connect wallet</span>
                    </button>
                  </div>
                ) : (
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center gap-2 lg:gap-10">
                    {/* Profile dropdown */}
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="relative hidden md:inline-flex items-center rounded-md border-accent-1 border-[2px] hover:bg-accent-1 px-4 py-[12px] text-sm font-semibold font-paragraphs text-accent-1 hover:text-white"
                        onClick={() => {
                          router.push("/my-orders");
                        }}
                      >
                        <span>My Orders</span>
                      </button>
                    </div>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex bg-white text-sm flex-row items-center gap-2">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <span className="font-paragraphs text-16 text-dark-black-500">
                            0xcb8...b56
                          </span>
                          <div className="flex flex-row items-center justify-center">
                            <img
                              src="/chevron-down.svg"
                              // width="28"
                              // height="28"
                              alt="Down Arrow icon"
                            />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          style={{
                            boxShadow: "0 6px 15px 2px rgba(0, 0, 0, 0.06)",
                          }}
                          className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex flex-row items-center justify-start mt-2 mx-2 px-4 py-2 cursor-pointer gap-2",
                                )}
                              >
                                <div className="w-6 h-6">
                                  <img
                                    src="docs.svg"
                                    alt="docs icon"
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="text-dark-black-500 font-normal font-paragraphs text-16">
                                  View docs
                                </div>
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex flex-row items-center justify-start mb-2 mx-2 px-4 py-2 cursor-pointer gap-2",
                                )}
                              >
                                <div className="w-6 h-6">
                                  <img
                                    src="logout.svg"
                                    alt="docs icon"
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="text-dark-black-500 font-normal font-paragraphs text-16">
                                  Logout
                                </div>
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Panel
                as="a"
                href="#"
                className="block py-2 pl-6 pr-4 sm:pl-5 sm:pr-6 no-underline"
              >
                <div className="flex flex-row items-center justify-start gap-[0.125rem]">
                  <div className="flex flex-row items-center justify-center">
                    <img
                      src="/gnosis-logo.svg"
                      // width="150"
                      // height="30"
                      alt="Gnosis logo"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center border-indigo-500 px-1 text-16 font-normal text-dark-black-500">
                    Gnosis
                  </div>
                  <div className="flex flex-row items-center justify-center w-2 h-2 rounded-full bg-alert"></div>
                </div>
              </Disclosure.Panel>
              <Disclosure.Panel
                as="a"
                href="#"
                className="block py-2 pl-6 pr-4 sm:pl-5 sm:pr-6 no-underline"
              >
                <div className="flex flex-row items-center justify-start cursor-pointer">
                  <div className="flex flex-row items-center justify-center">
                    <img
                      src="/ic_paypal.svg"
                      // width="28"
                      // height="28"
                      alt="Paypal logo"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center border-indigo-500 px-1 text-16 font-normal text-dark-black-500">
                    Paypal
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <img
                      src="/chevron-down.svg"
                      // width="28"
                      // height="28"
                      alt="Paypal logo"
                    />
                  </div>
                </div>
              </Disclosure.Panel>
              <Disclosure.Panel
                as="a"
                href="#"
                className="block py-2 pl-6 pr-4 sm:pl-5 sm:pr-6 no-underline"
              >
                {false ? (
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex md:hidden items-center rounded-md border border-transparent bg-accent-1 px-4 py-[12px] text-sm font-semibold font-paragraphs text-white"
                    >
                      <span>Connect wallet</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex md:hidden items-center rounded-md border-accent-1 border-[2px] hover:bg-accent-1 px-4 py-[12px] text-sm font-semibold font-paragraphs text-accent-1 hover:text-white"
                    >
                      <span>My Orders</span>
                    </button>
                  </div>
                )}
              </Disclosure.Panel>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <span className="font-paragraphs text-16 text-dark-black-500">
                    0xcb8...b56
                  </span>
                  {/* <div className="text-sm font-medium text-gray-500">
                    someone@example.com
                  </div> */}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="flex flex-row gap-2 px-4 py-2 no-underline"
                >
                  <div className="w-6 h-6">
                    <img src="docs.svg" alt="docs icon" className="w-6 h-6" />
                  </div>
                  <div className="text-dark-black-500 font-normal font-paragraphs text-16">
                    View docs
                  </div>
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="flex flex-row gap-2 px-4 py-2 no-underline"
                >
                  <div className="w-6 h-6">
                    <img src="logout.svg" alt="docs icon" className="w-6 h-6" />
                  </div>
                  <div className="text-dark-black-500 font-normal font-paragraphs text-16">
                    Logout
                  </div>
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
