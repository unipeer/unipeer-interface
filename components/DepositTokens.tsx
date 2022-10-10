import { parseEther } from "@ethersproject/units";
import { toUtf8String } from "@ethersproject/strings";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";

import { addresses, formatEtherscanLink } from "../util";
import UNIPEER_ABI from "../contracts/Unipeer.json";

type Props = {
  paymentId: number;
  token: string;
  children?: React.ReactNode;
};

export default function DepositTokens({ paymentId, token}: Props) {
  const { chain } = useNetwork();

  const bal = parseEther("0.1");
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chain?.id || 10200],
    contractInterface: UNIPEER_ABI.abi,
    functionName: "depositTokens",
    args: [
      paymentId || "0",
      token,
      bal,
    ],
    enabled: Boolean(paymentId != -1),
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return <div className="m-auto flex-col">
      <button
        className="btn-blue p-2 text-sm"
        onClick={() => write?.()}
        disabled={!write || isError}
      >
          {isLoading ? "Sending Tx..." : "Deposit"}
      </button>
      {isSuccess && (
        <div>
          Successfully Deposited Tokens!
          <div>
            <a href={formatEtherscanLink("Transaction", [chain?.id, data?.hash])}>Etherscan</a>
          </div>
        </div>
      )}
  </div>
}
