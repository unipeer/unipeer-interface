import {
  SELLER_PAYMENT_METHODS_ERROR,
  SELLER_PAYMENT_METHODS_LOADING,
  SELLER_PAYMENT_METHODS_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";

function setSellerPaymentLoading() {
  return {
    type: SELLER_PAYMENT_METHODS_LOADING,
  };
}

function setSellerPaymentSuccess(value) {
  return {
    type: SELLER_PAYMENT_METHODS_SUCCESS,
    value: value,
  };
}

function setSellerPaymentError(error) {
  return {
    type: SELLER_PAYMENT_METHODS_ERROR,
    error: error,
  };
}

export function buyRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setSellerPaymentLoading());
    try {
      const Dai = addresses.DAI[chainId];
      const filter = unipeer.filters.SellerPaymentMethod();
      const result = unipeer.queryFilter(filter, constants.block[chainId]);
      let finalResult: any[] = [];
      result.then((currentResult) => {
        console.log("seller payment current result", currentResult);
        currentResult
          .map((log) => {
            const bal = unipeer.tokenBalance(log.args[0], Dai);
            return {
              sender: log.args[0],
              paymentId: log.args[1],
              paymentAddress: log.args[2],
              feeRate: log.args[3],
              amount: bal,
            };
          })
          .forEach((currentResult) => {
            console.log("seller payment final result", currentResult);
            finalResult.push(currentResult);
          });
      });
      dispatch(setSellerPaymentSuccess(finalResult));
    } catch (err) {
      dispatch(setSellerPaymentError(err));
    }
  };
}
