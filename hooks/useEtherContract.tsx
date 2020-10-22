import {Contract, ContractFactory} from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

type Constructor<T> = new(...args: any[]) => T;

export default function useContract<T>(Factory: Constructor<T>): T | undefined {
  const { library, account } = useWeb3React();

  return useMemo(
    () =>
      !!account && !!library
        ? new Factory(library.getSigner(account).connectUnchecked())
        : undefined,
    [library, account],
  );
}
