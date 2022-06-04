import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { workingDetailsReducer, workingListReducer} from "./reducers/workingReducers";

const initialState = {};

const reducer = combineReducers({
    workingList: workingListReducer,
    workingDetails: workingDetailsReducer,

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;