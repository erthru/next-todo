import { combineReducers, createStore } from "redux";
import userReducers from "./user/reducers";
import activityReducers from "./activity/reducers";

const combinedReducers = combineReducers({
    user: userReducers,
    activity: activityReducers,
});

export type Store = ReturnType<typeof combinedReducers>;
export default createStore(combinedReducers, {});
