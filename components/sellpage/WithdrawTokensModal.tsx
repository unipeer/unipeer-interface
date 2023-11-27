import { Dispatch, SetStateAction, useState } from "react";
import BasicDialogV5 from "components/BasicDialogV5";
import WithdrawTokensModalForm from "./WithdrawTokensModalForm";
import WithdrawTokensModalSuccess from "./WithdrawTokensModalSuccess";

type WithdrawTokensModalProps = {
  activeModalComponent: string;
  setActiveModalComponent: Dispatch<SetStateAction<string>>;
};

const WithdrawTokensModal: React.FC<WithdrawTokensModalProps> = ({
  activeModalComponent,
  setActiveModalComponent,
}) => {
  const [withdrawFromSuccess, setWithdrawFromSuccess] = useState(false);

  return activeModalComponent === "WithdrawTokensModal" ? (
    <BasicDialogV5
      dialogTitle="Withdraw tokens"
      isCancellable={true}
      dialogChild={
        withdrawFromSuccess ? (
          <WithdrawTokensModalSuccess />
        ) : (
          <WithdrawTokensModalForm />
        )
      }
      onCloseCallback={() => {
        setActiveModalComponent("");
      }}
    />
  ) : null;
};

export default WithdrawTokensModal;
