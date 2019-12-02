import {types} from './actions';
import {combineReducers} from 'redux';

const initialState = {
    isAuth: false,
    user: {}
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ON_LOGIN_USER: {
            return {
                ...state,
                isAuth: action.payload.isAuth || false,
                user : action.payload.user
            };
        }
        case types.ON_LOGOUT_USER:{
            return {
                ...state,
                isAuth: action.payload.isAuth ,
                user : action.payload.user
            }
        }
        default:
            return state;
    }
}

export const reducer = combineReducers({
    loginReducer
})