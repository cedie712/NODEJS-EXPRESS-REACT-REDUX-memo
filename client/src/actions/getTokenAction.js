import { NEW_POST, FETCH_SIGN_UP_TOKEN } from './types';
import axios from 'axios';

export const fetch_sign_up_token = () => dispatch => {
  // axios.get('/api/user/signup')
  // .then((response) => {
  //   localStorage.setItem('csrfToken', response.data.csrfToken);
  // }).catch((error) => {
  //   console.log(error);
  // })
  console.log('action')
  axios.get('/api/user/signup')
  .then(response => dispatch({
    type: FETCH_SIGN_UP_TOKEN,
    payload: response.data
  })).catch((error) => {
    console.log(error);
  })

}

// export function fetch_sign_up_token(request) {
//   console.log(request)
//   return {
//     type: FETCH_SIGN_UP_TOKEN,
//     payload: request
//   }
// }


//   axios.get('/api/user/signup')
//   .then((response) => {
//     // localStorage.setItem('csrfToken', response.data.csrfToken);
//     // console.log(response);
//     fetch_sign_up_token(response);
//   }).catch((error) => {
//     console.log(error);
//   })

