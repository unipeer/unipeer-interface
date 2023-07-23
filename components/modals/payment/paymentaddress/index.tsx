import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PaymentMethod from "components/radiogroups/paymentmethodmodal";
import PaymentAddressForm from "components/forms/paymentaddress";
import BasicDialog from "components/BasicDialog";

type PaymentAddressModalProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const PaymentAddress: React.FC<PaymentAddressModalProps> = ({
  activeModalComponent,
  setActiveModalComponent,
}) => {
  const [paymentAddress, setPaymentAddress] = useState("");
  const [feeRatePercentage, setFeeRatePercentage] = useState("");

  return (
    <BasicDialog
      dialogTitle="Payment address"
      isCancellable={true}
      dialogChild={
        <PaymentAddressForm
          paymentAddress={paymentAddress}
          setPaymentAddress={setPaymentAddress}
          feeRatePercentage={feeRatePercentage}
          setFeeRatePercentage={setFeeRatePercentage}
          activeModalComponent={activeModalComponent}
          setActiveModalComponent={setActiveModalComponent}
        />
      }
      onCloseCallback={() => {
        setActiveModalComponent("");
      }}
    />
  );
};

export default PaymentAddress;
