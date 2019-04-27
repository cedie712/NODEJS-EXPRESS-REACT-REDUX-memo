import { FETCH_POSTS } from './types';
import axios from 'axios';

export const fetch_posts = (pager) => dispatch => {
    axios.get('http://localhost:8000/api/all_memos')
    .then((response) => {
      dispatch({
        type: FETCH_POSTS,
        payload: response.data.reverse().splice(pager, pager + 5)
    })
    })
    .catch(error => console.log(error));
};