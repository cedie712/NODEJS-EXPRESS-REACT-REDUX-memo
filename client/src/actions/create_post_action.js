import { CREATE_POST } from './types';
import axios from 'axios';

export const create_post = (data) => dispatch => {
    return axios.post('/api/save_new_memo', {
        new_memo_content: data.new_memo_content,
        new_memo_title: data.new_memo_title,
        new_memo_due_date: data.due_date
      }).then((response) => {
        dispatch({
            type: CREATE_POST,
            payload: response.data
        })
        return response.data
      }).catch((error) => console.log(error));
};