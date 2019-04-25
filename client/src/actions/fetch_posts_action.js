import { FETCH_POSTS } from './types';
import axios from 'axios';

export const fetch_posts = () => dispatch => {
    axios.get('api/all_memos')
    .then((response) => {
      dispatch({
        type: FETCH_POSTS,
        payload: response.data
    })
    })
    .catch(error => console.log(error));
};