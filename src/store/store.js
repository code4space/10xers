import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";

import collectionReducer from "./reducer/collectionReducer";

const rootReducer = combineReducers({
  collectionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
