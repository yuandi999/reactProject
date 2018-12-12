import { combineReducers } from "redux";

import commonReducer from './commonReducer';

let rootReducer = combineReducers({
    commonReducer
});

export default rootReducer;