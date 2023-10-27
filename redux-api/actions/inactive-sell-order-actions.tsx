import {
  INACTIVE_SELL_ORDER_ERROR,
  INACTIVE_SELL_ORDER_LOADING,
  INACTIVE_SELL_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";

function setSellLoading() {
  return {
    type: INACTIVE_SELL_ORDER_LOADING,
  };
}

function setSellSuccess(value) {
  return {
    type: INACTIVE_SELL_ORDER_SUCCESS,
    value: value,
  };
}

function setSellError(error) {
  return {
    type: INACTIVE_SELL_ORDER_ERROR,
    error: error,
  };
}

export function inactiveSellRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setSellLoading());
    try {
      const sellerFilter = unipeer.filters.OrderBuy(null, null, address);
      const sellerResult = unipeer.queryFilter(
        sellerFilter,
        constants.block[chainId],
      );
      const events = parseEvents(sellerResult);
      dispatch(setSellSuccess(events));
    } catch (err) {
      dispatch(setSellError(err));
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
