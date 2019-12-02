import { types } from './actions';
import { combineReducers } from 'redux';
import produce from 'immer';

const initialState = {
    staffs: [],
    editStaff: {
        id: 0,
        msnv: 0,
        tennv: '',
        date: '',
        phone: 0,
        address: '',
        tenchucvu: '',
    },
    staffs2: [],
};

const staffsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_STAFF:
            return produce(state, draftState => {
                draftState.staffs = action.payload.staffs;
            });
        case types.DELETE_STAFF:
            const targetIndex = state.staffs.findIndex(item => item.id === action.payload.id);

            if (targetIndex >= 0) {
                return produce(state, draftState => {
                    draftState.staffs.splice(targetIndex, 1);
                });
            }
            return state;
        case types.GET_ONE_STAFF:
            const targetIndex2 = state.staffs.findIndex(item => item.id === action.payload.id);
            if (targetIndex2 >= 0) {
                return produce(state, draftState => {
                    draftState.editStaff = state.staffs[targetIndex2];
                });
            }
            return state;
        case types.ADD_STAFF:
            return produce(state, draftState => {
                draftState.staffs.push(action.payload.staff);
            });
        case types.UPDATE_STAFF:
            const targetIndex3 = state.staffs.findIndex(item => item.id === action.payload.staff.id);
            if (targetIndex3 >= 0) {
                console.log(action.payload.staff);
                return produce(state, draftState => {
                    draftState.staffs[targetIndex3] = action.payload.staff;
                });
            }
            return state;
        case types.SEARCH_STAFF:
            var n = -1;
            var staffs2 = [];
            for (let i = 0; i < state.staffs.length; i++) {
                n = state.staffs[i].tennv.toLowerCase().indexOf(action.payload.value.toLowerCase());
                if (n >= 0) {
                    staffs2.push(state.staffs[i]);
                }
            }
            console.log(staffs2);
            return {
                ...state,
                staffs2: staffs2,
            };
        case types.RESET_STAFF:
            return produce(state, draftState => {
                draftState.editStaff = {
                    id: 0,
                    msnv: 0,
                    tennv: '',
                    date: '',
                    phone: 0,
                    address: '',
                    tenchucvu: '',
                };
            });
        default:
            return { ...state };
    }
};

export const reducer = combineReducers({
    staffsReducer,
});
