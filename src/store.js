import {createStore, combineReducers} from 'redux';
import {reducer as layoutReducer} from './modules/Layouts/containers/Login/reducer';
import {reducer as staffReducer} from './modules/Staff/components/liststaff/reducer'
import {reducer as listnccReducer} from './modules/Nhacungcap/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const appReducer = combineReducers({
    Layouts: layoutReducer,
    liststaff: staffReducer,
    listncc: listnccReducer
});

export default createStore(appReducer,
    composeWithDevTools());