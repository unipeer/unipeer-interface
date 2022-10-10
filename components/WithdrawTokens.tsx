import { parseEther } from "@ethersproject/units";

import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useNetwork,
} from "wagmi";

import { addresses, formatEtherscanLink } from "../util";
import UNIPEER_ABI from "../contracts/Unipeer.json";

type Props = {
  token: string;
  children?: React.ReactNode;
};

export default function WithdrawTokens({ token}: Props) {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const UnipeerAddr = addresses.UNIPEER[chain?.id || 10200];

  const { data: bal, } = useContractRead({
    addressOrName: UnipeerAddr,
    contractInterface: UNIPEER_ABI.abi,
    functionName: 'tokenBalance',
    args: [
      address!,
      token,
    ]
  })

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: addresses.UNIPEER[chain?.id || 10200],
    contractInterface: UNIPEER_ABI.abi,
    functionName: "withdrawTokens",
    args: [
      token,
      bal,
    ],
    enabled: Boolean(token),
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
          {isLoading ? "Sending Tx..." : "Withdraw"}
      </button>
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
      {isSuccess && (
        <div>
          Successfully Withdrew Tokens!
          <div>
            <a href={formatEtherscanLink("Transaction", [chain?.id, data?.hash])}>Etherscan</a>
          </div>
        </div>
      )}
  </div>
}
