import { types } from './actions';
import { combineReducers } from 'redux';
import produce from 'immer';

const initialState = {
	listRowBill: [],
	RowBill: {
		id: 0,
		tenmh: '',
		dvt: '',
		dongia: 0,
		soluong: 0,
		thanhtien: 0,
	},
	tongcong: 0,
	Bill: [],
	sohoadon:0
};

const billBuyReducer = (state = initialState, action) => {
	switch (action.type) {
	case types.ADD_ROW_BILL:
		return produce(state, draftState => {
			draftState.listRowBill.push(action.payload);
		});
	case types.DELETE_ROW_BILL:
		return state;

	case types.SAVE_ROW_BILL:
		return state;
	case types.UPDATE_ROW_BILL:
		const targetIndex = state.listRowBill.findIndex(item => item.id === action.payload.rowBill.id);
		return produce(state, draftState => {
			if (targetIndex > -1) draftState.listRowBill[targetIndex] = action.payload.rowBill;
		});

	case types.RESET_ROW_BILL:
		return produce(state, draftState => {
			draftState.RowBill = {
				id: 0,
				tenmh: '',
				dvt: '',
				dongia: 0,
				soluong: 0,
				thanhtien: 0,
			};
			draftState.listRowBill = [];
			draftState.tongcong = 0;
		});
	case types.TONG_CONG:
		return produce(state, draftState => {
			draftState.tongcong = action.payload.tongcong;
		});
	case types.ADD_ALL_BILL:
		return produce(state, draftState => {
			draftState.Bill.push(action.payload.bill);
			draftState.sohoadon+=1;
		});
	case types.GET_ALL_BILL:
		return produce(state, draftState => {
			draftState.Bill = action.payload.Bill;
		});
	case types.GET_SOHOADON:
		return produce(state, draftState => {
			draftState.sohoadon = action.payload.sohoadon;
		});
	default:
		return state;
	}
};

export const reducer = combineReducers({
	billBuyReducer,
});
