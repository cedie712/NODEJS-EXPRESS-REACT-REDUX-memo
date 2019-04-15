import { combineReducers } from 'redux';
import is_authenticated_reducer from './is_authenticated_reducer';

export default combineReducers({
    is_authenticated: is_authenticated_reducer
});