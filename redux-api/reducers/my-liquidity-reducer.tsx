import { Reducer } from "redux";
import {
  MY_LIQUIDITY_ERROR,
  MY_LIQUIDITY_LOADING,
  MY_LIQUIDITY_SUCCESS,
} from "../../constants/action-types";
import { GenericState } from "./root-reducer";

export interface myLiquidityList {
  loading: Boolean;
  success: Boolean;
  error: Boolean;
  responseData: [];
}

const initialState: myLiquidityList = {
  loading: false,
  success: false,
  error: false,
  responseData: [],
};

const myLiquidityList: Reducer<myLiquidityList> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case MY_LIQUIDITY_LOADING:
      return {
        ...initialState,
        loading: true,
        error: false,
        success: false,
      };
    case MY_LIQUIDITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        responseData: action.value,
      };
    case MY_LIQUIDITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
      };
    default:
      return state;
  }
};

export default myLiquidityList;
