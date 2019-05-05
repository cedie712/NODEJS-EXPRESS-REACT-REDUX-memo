import { SET_POST_TO_DELETE } from './types';

export const set_delete = (memo) => dispatch => {
    dispatch({
        type: SET_POST_TO_DELETE,
        payload: memo
    })
};