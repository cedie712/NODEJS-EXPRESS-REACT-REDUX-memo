import { DELETE_POST } from './types';
import axios from 'axios';

export const delete_memo = (memo) => dispatch => {
    return axios.post('/api/delete_memo', {
      memo_id: memo.id
    })
    .then((response) => {
      dispatch({
        type: DELETE_POST,
        payload: memo
    })
    return response.data;
    })
    .catch(error => console.log(error));
};