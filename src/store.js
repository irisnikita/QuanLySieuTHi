import {createStore, combineReducers} from 'redux';
import {reducer as layoutReducer} from './modules/Layouts/reducer';

const appReducer = combineReducers({
    Layouts: layoutReducer
});

export default createStore(appReducer);