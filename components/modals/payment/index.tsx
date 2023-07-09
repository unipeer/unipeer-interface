import { Dispatch, Fragment, MouseEventHandler, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PaymentMode from "./paymentmode";
import PaymentAddress from "./paymentaddress";

type PaymentModeModalProps = {
  activeModalComponent: string;
  setActiveModalComponent: MouseEventHandler<any>;
};

export default function PaymentModeModal({
  activeModalComponent,
  setActiveModalComponent,
}) {
  const [activePaymentIndex, setActivePaymentIndex] = useState(0);

  return (
    <>
      {activeModalComponent === "mode" && (
        <PaymentMode
          activeModalComponent={activeModalComponent}
          setActiveModalComponent={setActiveModalComponent}
        />
      )}
      {activeModalComponent === "address" && (
        <PaymentAddress
          activeModalComponent={activeModalComponent}
          setActiveModalComponent={setActiveModalComponent}
        />
      )}
    </>
  );
}
