import { OrderStatus } from "../../components/shared/order_status";
import {
  ACTIVE_BUY_ORDER_ERROR,
  ACTIVE_BUY_ORDER_LOADING,
  ACTIVE_BUY_ORDER_SUCCESS,
  ACTIVE_SELL_ORDER_ERROR,
  ACTIVE_SELL_ORDER_LOADING,
  ACTIVE_SELL_ORDER_SUCCESS,
  INACTIVE_BUY_ORDER_ERROR,
  INACTIVE_BUY_ORDER_LOADING,
  INACTIVE_BUY_ORDER_SUCCESS,
  INACTIVE_SELL_ORDER_ERROR,
  INACTIVE_SELL_ORDER_LOADING,
  INACTIVE_SELL_ORDER_SUCCESS,
} from "../../constants/action-types";
import { type Unipeer } from "../../contracts/types";
import { addresses, constants, formatEtherscanLink } from "../../util";
import { BuyOrder, getOrderFromRawData } from "../../components/shared/types";
import { OrderBuyEvent } from "../../contracts/types/Unipeer";

function setActiveBuyLoading() {
  return {
    type: ACTIVE_BUY_ORDER_LOADING,
  };
}

function setActiveBuySuccess(value) {
  return {
    type: ACTIVE_BUY_ORDER_SUCCESS,
    value: value,
  };
}

function setActiveBuyError(error) {
  return {
    type: ACTIVE_BUY_ORDER_ERROR,
    error: error,
  };
}

function setActiveSellLoading() {
  return {
    type: ACTIVE_SELL_ORDER_LOADING,
  };
}

function setActiveSellSuccess(value) {
  return {
    type: ACTIVE_SELL_ORDER_SUCCESS,
    value: value,
  };
}

function setActiveSellError(error) {
  return {
    type: ACTIVE_SELL_ORDER_ERROR,
    error: error,
  };
}

function setInactiveBuyLoading() {
  return {
    type: INACTIVE_BUY_ORDER_LOADING,
  };
}

function setInactiveBuySuccess(value) {
  return {
    type: INACTIVE_BUY_ORDER_SUCCESS,
    value: value,
  };
}

function setInactiveBuyError(error) {
  return {
    type: INACTIVE_BUY_ORDER_ERROR,
    error: error,
  };
}

function setInactiveSellLoading() {
  return {
    type: INACTIVE_SELL_ORDER_LOADING,
  };
}

function setInactiveSellSuccess(value) {
  return {
    type: INACTIVE_SELL_ORDER_SUCCESS,
    value: value,
  };
}

function setInactiveSellError(error) {
  return {
    type: INACTIVE_SELL_ORDER_ERROR,
    error: error,
  };
}

export function activeBuyRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setActiveBuyLoading());
    try {
      const buyerFilter = unipeer.filters.OrderBuy(null, address);
      unipeer
        .queryFilter(buyerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + JSON.stringify(result));
          parseActiveBuyOrders(result).then((buyOrdersResult: BuyOrder[]) => {
            console.log("success result " + JSON.stringify(buyOrdersResult));
            dispatch(setActiveBuySuccess(buyOrdersResult));
          });
        });
    } catch (err) {
      dispatch(setActiveBuyError(err));
    }
  };

  function parseActiveBuyOrders(result: OrderBuyEvent[]): Promise<BuyOrder[]> {
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

export function activeSellRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setActiveSellLoading());
    try {
      const sellerFilter = unipeer.filters.OrderBuy(null, null, address);
      unipeer
        .queryFilter(sellerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + JSON.stringify(result));
          parseActiveSellOrdersEvents(result).then(
            (buyOrdersResult: BuyOrder[]) => {
              console.log("success result " + JSON.stringify(buyOrdersResult));
              dispatch(setActiveSellSuccess(buyOrdersResult));
            },
          );
        });
    } catch (err) {
      dispatch(setActiveSellError(err));
    }
  };

  function parseActiveSellOrdersEvents(
    result: OrderBuyEvent[],
  ): Promise<BuyOrder[]> {
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

export function inactiveBuyRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setInactiveBuyLoading());
    try {
      const buyerFilter = unipeer.filters.OrderBuy(null, address);
      unipeer
        .queryFilter(buyerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + JSON.stringify(result));
          parseInactiveBuyOrdersEvents(result).then(
            (buyOrdersResult: BuyOrder[]) => {
              console.log("success result " + JSON.stringify(buyOrdersResult));
              dispatch(setInactiveBuySuccess(buyOrdersResult));
            },
          );
        });
    } catch (err) {
      dispatch(setInactiveBuyError(err));
    }
  };

  function parseInactiveBuyOrdersEvents(
    result: OrderBuyEvent[],
  ): Promise<BuyOrder[]> {
    return new Promise<BuyOrder[]>((resolve, reject) => {
      let eventsResult: BuyOrder[] = [];
      let counter = 0;
      result.forEach(async (curr) => {
        const parsedResult = await getOrderFromRawData(curr, unipeer);
        console.log(
          "filtering order with status " + JSON.stringify(parsedResult),
        );
        if (
          parsedResult.status === OrderStatus.COMPLETED ||
          parsedResult.status === OrderStatus.CANCELLED
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

export function inactiveSellRequest(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return (dispatch) => {
    dispatch(setInactiveSellLoading());
    try {
      const sellerFilter = unipeer.filters.OrderBuy(null, null, address);
      unipeer
        .queryFilter(sellerFilter, constants.block[chainId])
        .then((result) => {
          console.log("got raw result " + JSON.stringify(result));
          parseInactiveSellEvents(result).then(
            (buyOrdersResult: BuyOrder[]) => {
              console.log("success result " + JSON.stringify(buyOrdersResult));
              dispatch(setInactiveSellSuccess(buyOrdersResult));
            },
          );
        });
    } catch (err) {
      dispatch(setInactiveSellError(err));
    }
  };

  function parseInactiveSellEvents(
    result: OrderBuyEvent[],
  ): Promise<BuyOrder[]> {
    return new Promise<BuyOrder[]>((resolve, reject) => {
      let eventsResult: BuyOrder[] = [];
      let counter = 0;
      result.forEach(async (curr) => {
        const parsedResult = await getOrderFromRawData(curr, unipeer);
        console.log(
          "filtering order with status " + JSON.stringify(parsedResult),
        );
        if (
          parsedResult.status === OrderStatus.COMPLETED ||
          parsedResult.status === OrderStatus.CANCELLED
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
