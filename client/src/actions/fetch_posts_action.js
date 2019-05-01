import { FETCH_POSTS } from './types';
import axios from 'axios';

export const fetch_posts = (offset) => dispatch => {
    axios.post('http://localhost:8000/api/all_memos', {
      offset: offset
    })
    .then((response) => {
      dispatch({
        type: FETCH_POSTS,
        payload: {
          posts: response.data.items.reverse(),
          count: response.data.count
        }
    })
    })
    .catch(error => console.log(error));
};