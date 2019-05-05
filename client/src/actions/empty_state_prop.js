import { EMPTY_STATE_PROPS } from './types';

export const empty_state_props = () => dispatch => {
    dispatch({
        type: EMPTY_STATE_PROPS,
        payload: null
    })
};