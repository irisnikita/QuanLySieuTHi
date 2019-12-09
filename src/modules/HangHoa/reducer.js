import { types } from './actions';
import { combineReducers } from 'redux';
import produce from 'immer';

const initialState = {
	listhanghoa: [],
	edithanghoa: {
		id: 0,
		tenmh: '',
		loaimh: '',
		dvt: '',
		soluong: 0,
		dongia: 0,
	},
	listhanghoa2: [],
};

const listhanghoaReducer = (state = initialState, action) => {
	switch (action.type) {
	case types.GET_ALL_HANGHOA:
		return produce(state, draftState => {
			draftState.listhanghoa = action.payload.listhanghoa;
		});
	case types.DELETE_HANGHOA:
		const targetIndex = state.listhanghoa.findIndex(item => item.id === action.payload.id);

		if (targetIndex >= 0) {
			return produce(state, draftState => {
				draftState.listhanghoa.splice(targetIndex, 1);
			});
		}
		return state;
	case types.GET_ONE_HANGHOA:
		const targetIndex2 = state.listhanghoa.findIndex(item => item.id === action.payload.id);
		if (targetIndex2 >= 0) {
			return produce(state, draftState => {
				draftState.edithanghoa = state.listhanghoa[targetIndex2];
			});
		}
		return state;
	case types.ADD_HANGHOA:
		return produce(state, draftState => {
			draftState.listhanghoa.push(action.payload.hanghoa);
		});
	case types.UPDATE_HANGHOA:
		const targetIndex3 = state.listhanghoa.findIndex(item => item.id === action.payload.hanghoa.id);
		if (targetIndex3 >= 0) {
			return produce(state, draftState => {
				draftState.listhanghoa[targetIndex3] = action.payload.hanghoa;
			});
		}
		return state;
	case types.SEARCH_HANGHOA:
		var n = -1;
		var listhanghoa2 = [];
		for (let i = 0; i < state.listhanghoa.length; i++) {
			n = state.listhanghoa[i].tenmh.toLowerCase().indexOf(action.payload.value.toLowerCase());
			if (n >= 0) {
				listhanghoa2.push(state.listhanghoa[i]);
			}
		}
		return {
			...state,
			listhanghoa2: listhanghoa2,
		};
	case types.RESET_HANGHOA:
		return produce(state, draftState => {
			draftState.edithanghoa = {
				id: 0,
				tenmh: '',
				loaimh: '',
				dvt: '',
				soluong: 0,
				dongia: 0,
			};
		});
	case types.UPDATE_SOLUONG:
		const targetIndex5=state.listhanghoa.findIndex(item=>item.id===action.payload.hanghoa.id);
		return produce(state,draftState => {
			draftState.listhanghoa[targetIndex5].soluong+=action.payload.hanghoa.soluong;
		}); 
	default:
		return { ...state };
	}
};

export const reducer = combineReducers({
	listhanghoaReducer,
});
