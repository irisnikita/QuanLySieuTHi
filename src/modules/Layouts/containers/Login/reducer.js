import {types} from './actions';
import {combineReducers} from 'redux';

const initialState = {
    isAuth: false,
    user: {}
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_LOGIN: {
            return {
                ...state,
                isAuth: action.payload.isAuth || false
            };
        }
        default:
            return state;
    }
}

export const reducer = combineReducers({
    loginReducer
})