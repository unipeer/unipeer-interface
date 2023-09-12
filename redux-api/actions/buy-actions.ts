import {
  BUY_LOADING,
  BUY_SUCCESS,
  BUY_ERROR,
} from "../../constants/action-types";

import { TEST } from "../../constants/networking";

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

import { addresses, constants, formatEtherscanLink } from "../../util";
import { type Unipeer } from "../../contracts/types";
import UNIPEER_ABI from "../../contracts/Unipeer.json";

function setBuyLoading() {
  return {
    type: BUY_LOADING,
  };
}

function setBuySuccess(value) {
  return {
    type: BUY_SUCCESS,
    value: value,
  };
}

function setBuyError(error) {
  return {
    type: BUY_ERROR,
    error: error
  };
}

export function buyRequest(address, chainId, Unipeer) {
  return (dispatch) => {
    dispatch(setBuyLoading());

    // const { address, isConnected } = useAccount();
  const buyerFilter = Unipeer.filters.OrderBuy(null, address);
  const buyerResult = Unipeer.queryFilter(buyerFilter, constants.block[chainId]);
  buyerResult.then((result) => {
    result.map(async (log) => {
      const { status, lastInteraction } = await Unipeer.orders(log.args[0]);
      return {
        orderID: log.args[0].toNumber(),
        buyer: log.args[1],
        seller: log.args[2],
        paymentID: log.args[3],
        token: log.args[4],
        amount: log.args[5],
        feeAmount: log.args[6],
        sellerFeeAmount: log.args[7],
        status: status,
        lastInteraction: lastInteraction
      }
    }).forEach((result) => {
      dispatch(setBuySuccess(result));
    })
  })
  };
}
