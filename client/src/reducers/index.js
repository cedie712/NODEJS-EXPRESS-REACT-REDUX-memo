import { combineReducers } from 'redux';
import post_reducer from './posts_reducer';

export default combineReducers({
    posts: post_reducer
});