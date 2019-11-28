import {combineReducers} from 'redux';

// Reducer
import {reducer as loginReducer} from './containers/Login/reducer';

export const reducer = combineReducers({
    loginReducer
})