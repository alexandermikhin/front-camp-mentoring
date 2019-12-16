import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { initialStore } from './initial-store';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialStore,
  applyMiddleware(thunk)
//   composeEnhancers(applyMiddleware(thunk))
);
