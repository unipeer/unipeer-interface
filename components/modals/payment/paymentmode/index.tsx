import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PaymentMethod from "components/radiogroups/paymentmethod";
import PaymentAddress from "../paymentaddress";

type PaymentModeModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const PaymentMode: React.FC<PaymentModeModalProps> = ({
  open,
  setOpen,
  activeModalComponent,
  setActiveModalComponent,
}) => {
  return (
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
                Payment mode
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
              <div className="mt-3 text-center sm:mt-0 w-full">
                <PaymentMethod
                  activeModalComponent={activeModalComponent}
                  setActiveModalComponent={setActiveModalComponent}
                />
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default PaymentMode;
