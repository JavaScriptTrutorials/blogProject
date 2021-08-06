import { combineReducers } from "redux";
import userReducer from './user/userReducer';
import categoryReducer from './category/categoryReducer';

const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer
});

export default rootReducer;