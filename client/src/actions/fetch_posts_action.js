import { FETCH_POSTS } from './types';
import axios from 'axios';

export const fetch_posts = (offset) => dispatch => {
    axios.post('/api/all_memos', {
      offset: offset
    })
    .then((response) => {
      dispatch({
        type: FETCH_POSTS,
        payload: {
          posts: response.data.items,
          count: response.data.count
        }
    })
    })
    .catch(error => console.log(error));
};