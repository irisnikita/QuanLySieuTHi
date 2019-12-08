import {createStore, combineReducers} from 'redux';
import {reducer as layoutReducer} from './modules/Layouts/containers/Login/reducer';
import {reducer as staffReducer} from './modules/Staff/components/liststaff/reducer';
import {reducer as listnccReducer} from './modules/Nhacungcap/reducer';
import {reducer as CustomersReducer} from './modules/Customer/reducer';
import {reducer as HangHoaReducer} from './modules/HangHoa/reducer';
import {reducer as billBuyReducer} from './modules/PhieuMuaHang/reducer';
import {reducer as billsellReducer} from './modules/Hoadonbanhang/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const appReducer = combineReducers({
	Layouts: layoutReducer,
	liststaff: staffReducer,
	listncc: listnccReducer,
	Customers : CustomersReducer,
	listHangHoa: HangHoaReducer,
	RowBillBuy: billBuyReducer,
	Billsell:billsellReducer,
});

export default createStore(appReducer,
	composeWithDevTools());