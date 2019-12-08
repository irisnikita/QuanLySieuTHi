import { types } from './actions';
import { combineReducers } from 'redux';
import produce from 'immer';

const initialState = {
    Customers: [],
    editCustomer: {
        id: 0,
        tenkh: '',
        diachi: '',
        sdt: '',
    },
    Customers2: [],
};

const CustomersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CUSTOMER:
            return produce(state, draftState => {
                draftState.Customers = action.payload.Customers;
            });
        case types.DELETE_CUSTOMER:
            const targetIndex = state.Customers.findIndex(item => item.id === action.payload.id);

            if (targetIndex >= 0) {
                return produce(state, draftState => {
                    draftState.Customers.splice(targetIndex, 1);
                });
            }
            return state;
        case types.GET_ONE_CUSTOMER:
            const targetIndex2 = state.Customers.findIndex(item => item.id === action.payload.id);
            if (targetIndex2 >= 0) {
                return produce(state, draftState => {
                    draftState.editCustomer = state.Customers[targetIndex2];
                });
            }
            return state;
        case types.ADD_CUSTOMER:
            return produce(state, draftState => {
                draftState.Customers.push(action.payload.Customer);
            });
        case types.UPDATE_CUSTOMER:
            const targetIndex3 = state.Customers.findIndex(item => item.id === action.payload.Customer.id);
            if (targetIndex3 >= 0) {
                return produce(state, draftState => {
                    draftState.Customers[targetIndex3] = action.payload.Customer;
                });
            }
            return state;
        case types.SEARCH_CUSTOMER:
            var n = -1;
            var Customers2 = [];
            for (let i = 0; i < state.Customers.length; i++) {
                n = state.Customers[i].tenncc.toLowerCase().indexOf(action.payload.value.toLowerCase());
                if (n >= 0) {
                    Customers2.push(state.Customers[i]);
                }
            }
            console.log(Customers2);
            return {
                ...state,
                Customers2: Customers2,
            };
        case types.RESET_CUSTOMER:
            return produce(state, draftState => {
                draftState.editCustomer = {
                    id: 0,
                    tenkh: '',
                    diachi: '',
                    sdt: '',
                };
            });
        default:
            return { ...state };
    }
};

export const reducer = combineReducers({
    CustomersReducer,
});
