import { combineReducers } from "redux";

import buyReducer from "./buy-reducer";
import ordersReducer from "./orders-reducer";
import orderReducer from "./orders-reducer";

export interface GenericState {
  loading: Boolean;
  success: Boolean;
  error: Boolean;
  responseData: any;
}

export interface AppState {
  buyReducer: ReturnType<typeof buyReducer>;
  ordersReducer: ReturnType<typeof ordersReducer>;
}

export default combineReducers({
  buyReducer: buyReducer,
  ordersReducer: ordersReducer,
});
