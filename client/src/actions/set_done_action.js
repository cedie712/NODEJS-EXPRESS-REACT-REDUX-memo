import { SET_POST_TO_DONE } from './types';

export const set_done = (memo) => dispatch => {
    dispatch({
        type: SET_POST_TO_DONE,
        payload: memo
    })
};