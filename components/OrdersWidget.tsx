import React, { useReducer, useEffect, useState } from "react";

import { parseEther, formatEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

import {
  useAccount,
  useContract,
  useProvider,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";

import { addresses, constants, formatEtherscanLink } from "../util";
import { type Unipeer } from "../contracts/types";
import UNIPEER_ABI from "../contracts/Unipeer.json";
import IARBITRATOR_ABI from "../contracts/IArbitrator.json";

export default function Orders() {
  const [arbitrator, setArbitrator] = useState("");
  const [extraData, setExtraData] = useState("");

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const chainId = chain?.id || constants.defaultChainId;

  const Dai = addresses.DAI[chainId];
  const Unipeer: Unipeer = useContract({
    addressOrName: addresses.UNIPEER[chainId],
    contractInterface: UNIPEER_ABI.abi,
    signerOrProvider: provider,
  });

  const fetchOrderBuyEvents = async () => {
    const filter = Unipeer.filters.BuyOrder();
    const result = await Unipeer.queryFilter(filter, constants.block[chainId]);

    const events = result.map(async (log) => ({
          sender: log.args[0],
          paymentId: log.args[1],
          paymentAddress: log.args[2],
          feeRate: log.args[3],
        })
      );

    setSellers(events);
  };

  useEffect(() => {
    if (isConnected)
      fetchOrderBuyEvents();
  }, [isConnected])

  const { data: arbCost } = useContractRead({
    addressOrName: arbitrator,
    contractInterface: IARBITRATOR_ABI.abi,
    functionName: "arbitrationCost",
    args: [extraData],
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: Unipeer.address,
    contractInterface: UNIPEER_ABI.abi,
    functionName: "buyOrder",
    args: [
    ],
    enabled: Boolean(false),
    overrides: {
      value: arbCost!,
    },
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
    </div>
  );
}
