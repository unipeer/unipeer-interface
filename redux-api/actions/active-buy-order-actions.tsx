import {
  ACTIVE_BUY_ORDER_ERROR,
  ACTIVE_BUY_ORDER_LOADING,
  ACTIVE_BUY_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";

function setBuyLoading() {
  return {
    type: ACTIVE_BUY_ORDER_LOADING,
  };
}

function setBuySuccess(value) {
  return {
    type: ACTIVE_BUY_ORDER_SUCCESS,
    value: value,
  };
}

function setBuyError(error) {
  return {
    type: ACTIVE_BUY_ORDER_ERROR,
    error: error,
  };
}

export function activeBuyRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setBuyLoading());
    try {
      const buyerFilter = unipeer.filters.OrderBuy(null, address);
      const buyerResult = unipeer.queryFilter(
        buyerFilter,
        constants.block[chainId],
      );
      const events = parseEvents(buyerResult);
      dispatch(setBuySuccess(events));
    } catch (err) {
      dispatch(setBuyError(err));
    }
  };

  const parseEvents = (result) => {
    return Promise.all(
      result
        .map((log) => {
          return getOrderFromRawData(log, unipeer);
        })
        .filter((order: BuyOrder) => {
          return (
            order.status !== OrderStatus.COMPLETED &&
            order.status !== OrderStatus.CANCELLED
          );
        }),
    );
  };
}
