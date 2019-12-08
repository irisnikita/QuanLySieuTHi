import { types } from './actions';
import { combineReducers } from 'redux';
import produce from 'immer';

const initialState = {
	listncc: [],
	editncc: {
		id: 0,
		tenncc: '',
		diachi: '',
		sdt: '',
	},
	listncc2: [],
};

const listnccReducer = (state = initialState, action) => {
	switch (action.type) {
	case types.GET_ALL_NCC:
		return produce(state, draftState => {
			draftState.listncc = action.payload.listncc;
		});
	case types.DELETE_NCC:
		const targetIndex = state.listncc.findIndex(item => item.id === action.payload.id);

		if (targetIndex >= 0) {
			return produce(state, draftState => {
				draftState.listncc.splice(targetIndex, 1);
			});
		}
		return state;
	case types.GET_ONE_NCC:
		const targetIndex2 = state.listncc.findIndex(item => item.id === action.payload.id);
		if (targetIndex2 >= 0) {
			return produce(state, draftState => {
				draftState.editncc = state.listncc[targetIndex2];
			});
		}
		return state;
	case types.ADD_NCC:
		return produce(state, draftState => {
			draftState.listncc.push(action.payload.Ncc);
		});
	case types.UPDATE_NCC:
		const targetIndex3 = state.listncc.findIndex(item => item.id === action.payload.Ncc.id);
		if (targetIndex3 >= 0) {
			return produce(state, draftState => {
				draftState.listncc[targetIndex3] = action.payload.Ncc;
			});
		}
		return state;
	case types.SEARCH_NCC:
		var n = -1;
		var listncc2 = [];
		for (let i = 0; i < state.listncc.length; i++) {
			n = state.listncc[i].tenncc.toLowerCase().indexOf(action.payload.value.toLowerCase());
			if (n >= 0) {
				listncc2.push(state.listncc[i]);
			}
		}
		console.log(listncc2);
		return {
			...state,
			listncc2: listncc2,
		};
	case types.RESET_NCC:
		return produce(state, draftState => {
			draftState.editncc = {
				id: 0,
				tenncc: '',
				diachi: '',
				sdt: '',
			};
		});
	default:
		return { ...state };
	}
};

export const reducer = combineReducers({
	listnccReducer,
});
