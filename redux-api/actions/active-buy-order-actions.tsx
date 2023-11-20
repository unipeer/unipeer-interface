import { OrderStatus } from "components/shared/order_status";
import {
  ACTIVE_BUY_ORDER_ERROR,
  ACTIVE_BUY_ORDER_LOADING,
  ACTIVE_BUY_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder } from "components/shared/types";
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
          // const resultRaw = await parseEvents(result);
          // dispatch(setBuySuccess(resultRaw));
          parseEvents(result).then((buyOrdersResult) => {
            console.log("success result " + buyOrdersResult);
            dispatch(setBuySuccess(buyOrdersResult));
          });
        });
    } catch (err) {
      dispatch(setBuyError(err));
    }
  };

  function parseEvents(result: OrderBuyEvent[]): Promise<BuyOrder[]> {
    let eventsResult: BuyOrder[] = [];
    result.forEach((curr) => {
      const parsedResult = getOrderFromRawData(curr, unipeer);
      console.log(
        "filtering order with status " + JSON.stringify(parsedResult),
      );
    });
    return new Promise<BuyOrder[]>(() => {
      return eventsResult;
    });
    // return Promise.all(
    //   result
    //     .map(async (log) => {
    //       return await getOrderFromRawData(log, unipeer);
    //     })
    //     .filter((order: BuyOrder) => {
    //       return (
    //         order.status !== OrderStatus.COMPLETED &&
    //         order.status !== OrderStatus.CANCELLED
    //       );
    //     }),
    // );
  }
}

export function getOrderFromRawData(orderRaw: any, unipeer: Unipeer): any {
  unipeer.orders(orderRaw.args[0]).then(({ status, lastInteraction }) => {
    console.log(
      `parsing order ${orderRaw} status ${status} and interaction ${lastInteraction}`,
    );
    const orderStatusResult = getOrderStatus(status);
    console.log(`parsed order status ${orderStatusResult}`);
    console.log(`parsing 1 ${orderRaw.args[0].toNumber()}`);
    console.log(`parsing 2 ${orderRaw.args[1]}`);
    console.log(`parsing 3 ${orderRaw.args[2]}`);
    console.log(`parsing 4 ${orderRaw.args[3]}`);
    console.log(`parsing 5 ${orderRaw.args[4]}`);
    console.log(`parsing 6 ${orderRaw.args[5]}`);
    console.log(`parsing 7 ${orderRaw.args[6]}`);
    console.log(`parsing 8 ${orderRaw.args[7]}`);
    return {
      orderID: orderRaw?.args[0].toNumber(),
      buyer: orderRaw?.args[1],
      seller: orderRaw?.args[2],
      paymentID: orderRaw?.args[3],
      paymentAddress: orderRaw?.args[4],
      token: orderRaw?.args[5],
      amount: orderRaw?.args[6],
      feeAmount: orderRaw?.args[7],
      sellerFeeAmount: orderRaw?.args[7],
      status: orderStatusResult,
      lastInteraction: lastInteraction,
    };
  });
}

export function getOrderStatus(status: number): OrderStatus {
  switch (status) {
    case 0:
      return OrderStatus.CREATED;
    case 1:
      return OrderStatus.PAID;
    case 2:
      return OrderStatus.COMPLETED;
    case 3:
      return OrderStatus.CANCELLED;
    case 4:
      return OrderStatus.DISPUTED;
    case 5:
      return OrderStatus.RESOLVED;
  }
  return OrderStatus.UNDEFINED;
}
