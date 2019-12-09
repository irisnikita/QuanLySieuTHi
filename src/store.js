// Libraries
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// Reducers
import {reducer as layoutReducer} from './modules/Layouts/containers/Login/reducer';
import {reducer as staffReducer} from './modules/Staff/components/liststaff/reducer';
import {reducer as listnccReducer} from './modules/Nhacungcap/reducer';
import {reducer as CustomersReducer} from './modules/Customer/reducer';
import {reducer as HangHoaReducer} from './modules/HangHoa/reducer';
import {reducer as billBuyReducer} from './modules/PhieuMuaHang/reducer';
import {reducer as billsellReducer} from './modules/Hoadonbanhang/reducer';

// Saga
import rootSaga from './middleware';

// Create middleware
const sagaMiddleWare = createSagaMiddleware();

const appReducer = combineReducers({
	Layouts: layoutReducer,
	liststaff: staffReducer,
	listncc: listnccReducer,
	Customers : CustomersReducer,
	listHangHoa: HangHoaReducer,
	RowBillBuy: billBuyReducer,
	Billsell:billsellReducer,
});

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
	window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;

const store = createStore(appReducer,composeEnhancers(applyMiddleware(sagaMiddleWare)));

sagaMiddleWare.run(rootSaga);

export default store;