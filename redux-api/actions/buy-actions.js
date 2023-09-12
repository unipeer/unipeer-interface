import {
  BUY_LOADING,
  BUY_SUCCESS,
  BUY_ERROR,
} from "../../constants/action-types";

import { TEST } from "../../constants/networking";

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

export function buyRequest(payload) {
  return (dispatch) => {
    dispatch(setBuyLoading());

    fetch(TEST, {
      method: "GET",
      mode: "cors",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((parsedResponse) => {
        dispatch(setBuySuccess(parsedResponse));
      })
      .catch((error) => {
        dispatch(setBuyError(error));
      });
  };
}
