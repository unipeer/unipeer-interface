import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PaymentMethod from "components/radiogroups/paymentmethod";
import PaymentAddress from "../paymentaddress";
import BasicDialog from "components/BasicDialog";

type PaymentModeModalProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const PaymentMode: React.FC<PaymentModeModalProps> = ({
  activeModalComponent,
  setActiveModalComponent,
}) => {
  return (
    <BasicDialog
      dialogTitle="Payment mode"
      isCancellable={true}
      dialogChild={
        <PaymentMethod
          activeModalComponent={activeModalComponent}
          setActiveModalComponent={setActiveModalComponent}
        />
      }
    />
  );
};

export default PaymentMode;
