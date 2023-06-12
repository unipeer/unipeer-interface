import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PaymentMethod from "components/radiogroups/paymentmethod";
import PaymentAddressForm from "components/forms/paymentaddress";

type PaymentAddressModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const PaymentAddress: React.FC<PaymentAddressModalProps> = ({
  open,
  setOpen,
  activeModalComponent,
  setActiveModalComponent,
}) => {
  const [paymentAddress, setPaymentAddress] = useState("");
  const [feeRatePercentage, setFeeRatePercentage] = useState("");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="payment-modal fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[650px] sm:p-16 sm:rounded-32 gap-8">
                <div className="sm:flex flex-row justify-between items-center">
                  <div className="font-bold text-dark-800 text-32 font-headings ">
                    Payment address
                  </div>
                  <div
                    onClick={() => setOpen(false)}
                    className="text-32 cursor-pointer"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon
                      color="black"
                      className="h-8 w-8"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-2 text-center sm:mt-0 w-full">
                    <PaymentAddressForm
                      paymentAddress={paymentAddress}
                      setPaymentAddress={setPaymentAddress}
                      feeRatePercentage={feeRatePercentage}
                      setFeeRatePercentage={setFeeRatePercentage}
                      activeModalComponent={activeModalComponent}
                      setActiveModalComponent={setActiveModalComponent}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PaymentAddress;
