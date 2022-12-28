import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";// промежуточный уровень, который внедряем в store
import watchReducer from "./watch-reducer";

let reducers = combineReducers({
    watchPage: watchReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;