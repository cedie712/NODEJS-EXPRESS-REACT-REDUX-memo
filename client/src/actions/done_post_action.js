import { DONE_POST } from './types';
import axios from 'axios';

export const done_memo = (memo) => dispatch => {
    return axios.post('/api/done_memo', {
      memo_id: memo.id
    })
    .then((response) => {
      dispatch({
        type: DONE_POST,
        payload: memo
    })
    return response.data;
    })
    .catch(error => console.log(error));
};