import {Contract, ContractFactory} from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

// TOOD: get contract class
export default function useContract(Factory: any): Contract | undefined {
  const { library, account } = useWeb3React();

  return useMemo(
    () =>
      !!account && !!library
        ? new Factory(library.getSigner(account).connectUnchecked())
        : undefined,
    [library, account],
  );
}
