import { Dispatch, SetStateAction, useState } from "react";
import BasicDialogV4 from "components/BasicDialogV4";

type PayNetworkFeeProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const PayNetworkFee: React.FC<PayNetworkFeeProps> = ({
  activeModalComponent,
  setActiveModalComponent,
}) => {
  return activeModalComponent === "PayNetworkFee" ? (
    <BasicDialogV4
      dialogTitle="Pay Network Fee"
      isCancellable={false}
      dialogChild={
        <div className="flex flex-col gap-10">
          <div className="text-20 text-dark-800 font-paragraphs leading-8">
            Pay network fee{" "}
            <span className="text-20 text-dark-800 font-paragraphs leading-8 font-semibold">
              xDAI
            </span>{" "}
            from your wallet in order to proceed forward with your transaction.
          </div>
          <div className="flex bg-dark-100 rounded-8 justify-between items-center p-4">
            <div className="flex flex-row justify-start items-center gap-2">
              <img
                src="spinner.svg"
                alt=""
                height={20}
                width={20}
                className="animate-spin"
              />
              <div className="text-16 font-paragraphs font-semibold font-dark-800">
                Waiting for fee payment confirmation...
              </div>
            </div>
          </div>
        </div>
      }
      onCloseCallback={() => {
        setActiveModalComponent("");
      }}
    />
  ) : null;
};

export default PayNetworkFee;
