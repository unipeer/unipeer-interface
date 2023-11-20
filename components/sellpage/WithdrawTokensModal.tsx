import { Dispatch, SetStateAction, useState } from "react";
import BasicDialog from "components/BasicDialogV4";

type WithdrawTokensProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const WithdrawTokens: React.FC<WithdrawTokensProps> = ({
  activeModalComponent,
  setActiveModalComponent,
}) => {
  return activeModalComponent === "WithdrawToken" ? (
    <BasicDialog
      dialogTitle="Withdraw tokens"
      isCancellable={true}
      dialogChild={
        <div className="flex flex-col">
          <div></div>
        </div>
      }
      onCloseCallback={() => {
        setActiveModalComponent("");
      }}
    />
  ) : null;
};

export default WithdrawTokens;
