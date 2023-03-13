import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import commonReducer from './reducers/commonReducer';
import manufactuerReducer from './reducers/manufactuerReducer';

const rootReducer = combineReducers({
    commonReducer: commonReducer,
    categoryReducer: categoryReducer,
    manufactuerReducer: manufactuerReducer,
});

export default rootReducer;
