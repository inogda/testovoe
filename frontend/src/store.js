import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {workingDetailsRedicer, workingListRedicer} from "./reducers/workingReducers";

const initialState = {};

const reducer = combineReducers({
    workingList: workingListRedicer,
    workingDetails: workingDetailsRedicer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;