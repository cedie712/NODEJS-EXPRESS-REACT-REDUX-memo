import { UPDATE_POST } from './types';
import axios from 'axios';

export const update_post = (data) => dispatch => {
    return axios.post('/api/edit_memo', {
        content: data.body,
        title: data.title,
        due_date: data.due_date,
        memo_id: data.memo_id
      }).then((response) => {
        dispatch({
            type: UPDATE_POST,
            payload: response.data.post
        })
        return response.data
      }).catch((error) => console.log(error));
};