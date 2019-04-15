import { CHECK_AUTH, AUTHENTICATE_USER } from '../actions/types';

const initialState = {
    is_authenticated: false
};


export default function(state=initialState, action) {
    switch(action.type) {
        case AUTHENTICATE_USER: 
            return Object.assign({}, state, {
                is_authenticated: action.payload
            });
        case CHECK_AUTH: 
            return Object.assign({}, state, {
                is_authenticated: action.payload
            });
        default:
            return state;
    }
};