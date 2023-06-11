import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PaymentMode from "./paymentmode";
import PaymentAddress from "./paymentaddress";

export default function PaymentModeModal() {
  const [open, setOpen] = useState(true);
  const [activeModalComponent, setActiveModalComponent] = useState("mode");

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

        {activeModalComponent === "mode" ? (
          <PaymentMode
            open={open}
            setOpen={setOpen}
            activeModalComponent={activeModalComponent}
            setActiveModalComponent={setActiveModalComponent}
          />
        ) : (
          <PaymentAddress
            open={open}
            setOpen={setOpen}
            activeModalComponent={activeModalComponent}
            setActiveModalComponent={setActiveModalComponent}
          />
        )}
      </Dialog>
    </Transition.Root>
  );
}
