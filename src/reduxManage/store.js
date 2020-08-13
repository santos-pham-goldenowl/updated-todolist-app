import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer/index";
import thunk from "redux-thunk";
import * as Sentry from "@sentry/react";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// - Sentry
const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

// - Redux persist
const persistConfig = {
  key: "root",
  storage: storage,
};
const pReducer = persistReducer(persistConfig, rootReducer);

// - The operation of thunk function
// const asyncFn = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(next);
//   } else {
//     next(action);
//   }
// };
// const store = createStore(pReducer, {}, applyMiddleware(thunk));
const store = createStore(
  pReducer,
  compose(applyMiddleware(thunk), sentryReduxEnhancer)
);

export default store;
export const persistor = persistStore(store);
