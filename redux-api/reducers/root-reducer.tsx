import { combineReducers } from "redux";

import buyReducer from "./buy-reducer";
import activeBuyOrderReducer from "./active-buy-order-reducer";
import inactiveBuyOrderReducer from "./inactive-buy-order-reducer";
import inactiveSellOrderReducer from "./inactive-sell-order-reducer";
import activeSellOrderReducer from "./active-sell-order-reducer";

export interface GenericState {
  loading: Boolean;
  success: Boolean;
  error: Boolean;
  responseData: any;
}

export interface AppState {
  buyReducer: ReturnType<typeof buyReducer>;
  activeBuyOrderReducer: ReturnType<typeof activeBuyOrderReducer>;
  activeSellOrderReducer: ReturnType<typeof activeSellOrderReducer>;
  inactiveBuyOrderReducer: ReturnType<typeof inactiveBuyOrderReducer>;
  inactiveSellOrderReducer: ReturnType<typeof inactiveSellOrderReducer>;
}

export default combineReducers({
  buyReducer: buyReducer,
  activeBuyOrderReducer: activeBuyOrderReducer,
  activeSellOrderReducer: activeSellOrderReducer,
  inactiveBuyOrderReducer: inactiveBuyOrderReducer,
  inactiveSellOrderReducer: inactiveSellOrderReducer,
});
