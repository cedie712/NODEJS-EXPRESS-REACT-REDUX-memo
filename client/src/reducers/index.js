import { combineReducers } from 'redux';
import getTokenReducer from './getTokenReducer';

export default combineReducers({
  csrf_token: getTokenReducer
})