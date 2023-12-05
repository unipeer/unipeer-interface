import {
  MY_LIQUIDITY_ERROR,
  MY_LIQUIDITY_LOADING,
  MY_LIQUIDITY_SUCCESS,
} from "../../constants/action-types";
// import { type Unipeer } from "../../contracts/types";
import { type Unipeer } from "'./contracts/types'";
import { addresses, constants } from "../../util";
import { BigNumber } from "@ethersproject/bignumber";

function setMyLiquidityLoading() {
  return {
    type: MY_LIQUIDITY_LOADING,
  };
}

function setMyLiquiditySuccess(value) {
  return {
    type: MY_LIQUIDITY_SUCCESS,
    value: value,
  };
}

function setMyLiquidityError(error) {
  return {
    type: MY_LIQUIDITY_ERROR,
    error: error,
  };
}

interface myLiquidityParsedObj {
  sender: any;
  paymentId: any;
  paymentAddress: any;
  feeRate: any;
  token: any;
  balance: any;
}

export function myLiquidityItemslist(
  address: string | undefined,
  chainId: number,
  unipeer: Unipeer,
) {
  return async (dispatch) => {
    dispatch(setMyLiquidityLoading());
    try {
      console.log(address);
      const myPaginationListFilter = unipeer.filters.SellerPaymentMethod(
        null,
        null,
        null,
      );

      let myPaginationListResultsRaw = await unipeer.queryFilter(
        myPaginationListFilter,
        constants.block[chainId],
      );
      let myPaginationListResultsParsed = await parseEvents(
        myPaginationListResultsRaw,
      );
      // console.log(myPaginationListResultsParsed);
      dispatch(setMyLiquiditySuccess(myPaginationListResultsParsed));
    } catch (err) {
      dispatch(setMyLiquidityError(err));
    }
  };

  function parseEvents(result) {
    return new Promise(async (resolve, reject) => {
      let eventsResult: myLiquidityParsedObj[] = [];
      let counter = 0;
      const tokenEnabledFilter = unipeer.filters.PaymentMethodTokenEnabled();
      const tokenDisabledFilter = unipeer.filters.PaymentMethodTokenDisabled();
      const tokenEnabledEvents = await unipeer.queryFilter(
        tokenEnabledFilter,
        constants.block[chainId],
      );
      const tokenDisabledEvents = await unipeer.queryFilter(
        tokenDisabledFilter,
        constants.block[chainId],
      );
      result.forEach(async (curr) => {
        let currTokenObj = await getTokenFromId(
          curr.args[1],
          tokenEnabledEvents,
          tokenDisabledEvents,
        );
        let currToken, balance;
        if (currTokenObj.enabled == true) {
          currToken = currTokenObj.token;
          balance = await unipeer.tokenBalance(curr.args[0], currToken);
        }
        let parsed: myLiquidityParsedObj = {
          sender: curr.args[0],
          paymentId: curr.args[1],
          paymentAddress: curr.args[2],
          feeRate: curr.args[3],
          token: currToken || "",
          balance: balance || 0,
        };
        eventsResult.push(parsed);
        counter++;
        if (counter === result.length) {
          resolve(eventsResult);
        }
      });
    });
  }

  async function getTokenFromId(
    paymentId,
    tokenEnabledEvents,
    tokenDisabledEvents,
  ) {
    let lastTokenDisabledEvent;
    if (tokenDisabledEvents.length > 0) {
      let filteredTokenDisabledEvents = tokenDisabledEvents.filter(
        (ele) => ele.args[0].eq(paymentId) == true,
      );
      lastTokenDisabledEvent =
        filteredTokenDisabledEvents[filteredTokenDisabledEvents.length - 1];
    }

    let lastTokenEnabledEvent;
    if (tokenEnabledEvents.length > 0) {
      let filteredTokenEnabledEvents = tokenEnabledEvents.filter(
        (ele) => ele.args[0].eq(paymentId) == true,
      );
      lastTokenEnabledEvent =
        filteredTokenEnabledEvents[filteredTokenEnabledEvents.length - 1];
    }

    if (lastTokenDisabledEvent && lastTokenEnabledEvent) {
      if (lastTokenDisabledEvent.args[0].gt(lastTokenEnabledEvent)) {
        return { enabled: false };
      } else {
        return { enabled: true, token: lastTokenEnabledEvent.args[1] };
      }
    } else if (!lastTokenDisabledEvent && lastTokenEnabledEvent) {
      return { enabled: true, token: lastTokenEnabledEvent.args[1] };
    } else {
      return { enabled: false };
    }
  }
}
