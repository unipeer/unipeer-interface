import { OrderStatus } from "components/shared/order_status";
import { OrderBuyEvent } from "contracts/types/Unipeer";
import {
  INACTIVE_BUY_ORDER_ERROR,
  INACTIVE_BUY_ORDER_LOADING,
  INACTIVE_BUY_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";

function setBuyLoading() {
  return {
    type: INACTIVE_BUY_ORDER_LOADING,
  };
}

function setBuySuccess(value) {
  return {
    type: INACTIVE_BUY_ORDER_SUCCESS,
    value: value,
  };
}

function setBuyError(error) {
  return {
    type: INACTIVE_BUY_ORDER_ERROR,
    error: error,
  };
}

export function inactiveBuyRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setBuyLoading());
    try {
      const buyerFilter = unipeer.filters.OrderBuy(null, address);
      unipeer
        .queryFilter(buyerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + result);
          const buyOrdersResult = parseEvents(result);
          console.log("got inactive buy order result " + buyOrdersResult);
          dispatch(setBuySuccess(buyOrdersResult));
        });
    } catch (err) {
      dispatch(setBuyError(err));
    }
  };

  function parseEvents(result: OrderBuyEvent[]): BuyOrder[] {
    let eventsResult: BuyOrder[] = [];
    result.forEach((curr) => {
      getOrderFromRawData(curr, unipeer).then((order: BuyOrder) => {
        if (
          order.status === OrderStatus.COMPLETED ||
          order.status === OrderStatus.CANCELLED
        ) {
          eventsResult.push(order);
        }
      });
    });
    return eventsResult;
    // return Promise.all(
    //   result
    //     .map(async (log) => {
    //       return await getOrderFromRawData(log, unipeer);
    //     })
    //     .filter((order: BuyOrder) => {
    //       return (
    //         order.status === OrderStatus.COMPLETED ||
    // order.status === OrderStatus.CANCELLED
    //       );
    //     }),
    // );
  }
}
