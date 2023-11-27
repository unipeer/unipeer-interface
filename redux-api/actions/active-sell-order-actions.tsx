import { OrderStatus } from "components/shared/order_status";
import { OrderBuyEvent } from "contracts/types/Unipeer";
import {
  ACTIVE_SELL_ORDER_ERROR,
  ACTIVE_SELL_ORDER_LOADING,
  ACTIVE_SELL_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "components/shared/types";

function setSellLoading() {
  return {
    type: ACTIVE_SELL_ORDER_LOADING,
  };
}

function setSellSuccess(value) {
  return {
    type: ACTIVE_SELL_ORDER_SUCCESS,
    value: value,
  };
}

function setSellError(error) {
  return {
    type: ACTIVE_SELL_ORDER_ERROR,
    error: error,
  };
}

export function activeSellRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setSellLoading());
    try {
      const sellerFilter = unipeer.filters.OrderBuy(null, null, address);
      unipeer
        .queryFilter(sellerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + JSON.stringify(result));
          parseEvents(result).then((buyOrdersResult: BuyOrder[]) => {
            console.log("success result " + JSON.stringify(buyOrdersResult));
            dispatch(setSellSuccess(buyOrdersResult));
          });
        });
    } catch (err) {
      dispatch(setSellError(err));
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
