import { NEW_POST, FETCH_SIGN_UP_TOKEN } from '../actions/types';

const initialState = {
  csrfToken: {}
};

export default function(state = initialState, action) {
  console.log(action.payload, 'reducer')
  switch(action.type) {
    case FETCH_SIGN_UP_TOKEN:
      console.log('reducer');
      return {
        ...state,
        csrfToken: action.payload
      }
    default:
      return state;
  }
}