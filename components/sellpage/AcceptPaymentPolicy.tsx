import { Dispatch, Fragment, SetStateAction, useState } from "react";
import BasicDialog from "components/BasicDialog";
import BasicDialogV3 from "components/BasicDialogV3";

type AcceptPaymentPolicyProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
  setNewModalDialogue: Dispatch<SetStateAction<string>>;
};

const AcceptPaymentPolicy: React.FC<AcceptPaymentPolicyProps> = ({
  activeModalComponent,
  setActiveModalComponent,
  setNewModalDialogue,
}) => {
  return activeModalComponent === "AcceptPaymentPolicy" ? (
    <BasicDialogV3
      dialogTitle="Accept Payment Policy"
      isCancellable={true}
      dialogChild={
        <div className="flex flex-col gap-8">
          <div className="text-20 text-dark-800 font-paragraphs leading-8">
            The rules for accepting this payment method are specified in the
            PayPal Payment Policy. Make sure to understand the policy before
            accepting this payment in case of a dispute.{" "}
          </div>
          <div className="flex bg-dark-100 rounded-8 px-4 py-3 justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2">
              <img src="document-text.svg" alt="" height={20} width={20} />
              <div className="text-16 font-paragraphs font-semibold font-dark-800">
                PayPal Payment Policy
              </div>
            </div>
            <img
              src="external-link.svg"
              alt=""
              height={20}
              width={20}
              className="hover:cursor-pointer text-primary-500"
            />
          </div>
          <div className="h-[1px] bg-dark-100 self-stretch"></div>
          <div className="flex flex-row items-center justify-start w-full gap-2">
            <input
              id="confirmedCheckbox"
              type="checkbox"
              className="form-checkbox h-6 w-6 rounded appearance-none border-primary-color-500 text-primary-color-500 focus:ring-0 focus:outline-none"
            />
            <label
              htmlFor="confirmedCheckbox"
              className="font-paragraphs text-16 text-dark-500 leading-6"
            >
              I’ve read & understood the payment policy for PayPal
            </label>
          </div>
          <button
            type="submit"
            className="flex flex-row items-center justify-center w-full max-h-[56px] rounded-lg bg-accent-1 px-6 py-4 gap-[10px]"
          >
            <div
              className="text-16 font-semibold font-paragraphs leading-6 text-white"
              onClick={() => {
                setActiveModalComponent("");
                setNewModalDialogue("PayNetworkFee");
              }}
            >
              Proceed to deposit your tokens
            </div>
          </button>
        </div>
      }
      onCloseCallback={() => {
        setActiveModalComponent("");
      }}
    />
  ) : null;
};

export default AcceptPaymentPolicy;
