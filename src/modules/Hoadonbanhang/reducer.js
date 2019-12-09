import { types } from './actions';
import produce from 'immer';
import {combineReducers} from 'redux';

var initialState = {
	list_row_bill: [],
	row_bill: {
		id: 0,
		tenmh: 'Chọn tên',
		loaimh: '',
		dvt: '',
		soluong: 0,
		dongia: 0,
		thanhtien: 0,
	},
	sohoadon:0,
	listhoadon: []
};

const billsellReducer = (state=initialState,action)=>{
	switch (action.type) {
	case types.ADD_ROW_BILL_HOADON:
		return produce(state,(draftState)=>{
			draftState.list_row_bill.push(action.payload.billsell);
		});
	case types.ADD_SOHOADON:
		return produce(state,(draftState)=>{
			draftState.sohoadon=action.payload.sohoadon;
		});
	case types.ADD_HOADON: 
		return produce(state,(draftState)=>{
			draftState.sohoadon+=1;
			draftState.listhoadon.push(action.payload.hoadon);
		});
	case types.RESET_HOADON:
		return produce(state,(draftState)=>{
			draftState.list_row_bill=[];
		});
	case types.GET_ALL_HOADON:
		return produce(state,draftState=>{
			draftState.listhoadon=action.payload.listhoadon;
		});
	default:
		return {...state};
	}
};

export const reducer = combineReducers({
	billsellReducer,
});
