import { Reducer } from "redux";
import {
  INACTIVE_BUY_ORDER_ERROR,
  INACTIVE_BUY_ORDER_LOADING,
  INACTIVE_BUY_ORDER_SUCCESS,
} from "../../constants/action-types";
import { GenericState } from "./root-reducer";
import { BuyOrder } from "components/shared/types";


export interface OrderListState {
  loading: Boolean;
  success: Boolean;
  error: Boolean;
  responseData: Array<BuyOrder>;
}

const initialState: GenericState = {
  loading: false,
  success: false,
  error: false,
  responseData: [],
};

const inactiveBuyOrderReducer: Reducer<OrderListState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case INACTIVE_BUY_ORDER_LOADING:
      return {
        ...initialState,
        loading: true,
        error: false,
        success: false,
      };
    case INACTIVE_BUY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        responseData: action.value,
      };
    case INACTIVE_BUY_ORDER_ERROR:
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

export default inactiveBuyOrderReducer;
