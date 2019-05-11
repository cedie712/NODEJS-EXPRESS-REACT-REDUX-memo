import React, { Component } from 'react'
import axios from 'axios';

import '../static/css/forgot_pass.css';
import M from 'materialize-css';

class ForgotPassword extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    send_request() {
        axios.post('/api/user/forgot_password', {
            email: document.getElementById('email_forgot').value,
            _csrf: localStorage.csrfToken
        }).then((response) => {
            console.log(response);
        }).catch(error => {
            return M.toast({html: error.response.data.error, classes: 'rounded red darken-2'})
        });
    }
    render() {
        return (
            <div className="ForgotPassword">
                <div id="forgot-password-container" className="grey darken-4">
                    <div className="row">
                        <div className="">
                            <div id="input-forgot" className="input-field">
                                <i className="material-icons prefix grey-text text-darken-1">account_circle</i>
                                <input id="email_forgot" name="email_forgot"
                                    type="email" />
                                <label htmlFor="email_forgot">Enter your email</label>
                            </div>
                            <h6 onClick={this.send_request.bind(this)} id="forgot-pass-link" href="/forgot_password" className="light-blue-text text-lighten-1 pointer">Reset my password <span><i className="fas fa-redo"></i></span></h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;