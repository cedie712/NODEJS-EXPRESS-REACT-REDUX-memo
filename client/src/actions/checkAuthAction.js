import { CHECK_AUTH } from './types';
import axios from 'axios';

let auth_status = false;

axios.post('/api/user/check_device_auth')
    .then((response) => {
        if (response.data.user_authenticated) {
            auth_status = true;
        }
    })
    .catch((error) => {
        console.log(error)
});

export const checkAuthAction = () => dispatch => {
    console.log('checking auth status');
    dispatch({
        type: CHECK_AUTH,
        payload: auth_status
    })
};