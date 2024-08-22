import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

import rootReducer from "../reducers/root-reducer";

const loggerMiddleware = createLogger();

export default function configureStore() {
  const composeEnhancers = compose;
  // if (process.env.REACT_APP_DEPLOY_ENV === "dev") {
    return createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)),
    );
  // }
  // return createStore(rootReducer, applyMiddleware(thunkMiddleware));
}
