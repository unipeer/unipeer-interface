import { OrderStatus } from "components/shared/order_status";
import {
  ACTIVE_BUY_ORDER_ERROR,
  ACTIVE_BUY_ORDER_LOADING,
  ACTIVE_BUY_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";
import { OrderBuyEvent } from "contracts/types/Unipeer";

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
      unipeer
        .queryFilter(buyerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + JSON.stringify(result));
          parseEvents(result).then((buyOrdersResult: BuyOrder[]) => {
            console.log("success result " + JSON.stringify(buyOrdersResult));
            dispatch(setBuySuccess(buyOrdersResult));
          });
        });
    } catch (err) {
      dispatch(setBuyError(err));
    }
  };

  function parseEvents(result: OrderBuyEvent[]): Promise<BuyOrder[]> {
    return new Promise<BuyOrder[]>((resolve, reject) => {
      let eventsResult: BuyOrder[] = [];
      let counter = 0;
      result.forEach(async (curr) => {
        const parsedResult = await getOrderFromRawData(curr, unipeer);
        console.log(
          "filtering order with status " + JSON.stringify(parsedResult),
        );
        if (
          parsedResult.status !== OrderStatus.COMPLETED &&
          parsedResult.status !== OrderStatus.CANCELLED
        ) {
          eventsResult.push(parsedResult);
        }
        counter++;
        if (counter === result.length) {
          resolve(eventsResult);
        }
      });
    });
  }
}
