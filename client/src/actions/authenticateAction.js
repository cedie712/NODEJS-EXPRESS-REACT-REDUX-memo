import { AUTHENTICATE_USER } from './types';

export const authenticateUser = () => dispatch => {
    dispatch({
        type: AUTHENTICATE_USER,
        payload: true
    })
};