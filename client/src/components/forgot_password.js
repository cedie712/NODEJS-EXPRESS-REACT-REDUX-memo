import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../static/css/forgot_pass.css';
import M from 'materialize-css';

class ForgotPassword extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    send_request() {
        document.getElementById('forgot-pass-link').style.display = 'none';
        let loading_container_forgot = document.getElementById('loading-container-forgot');
        loading_container_forgot.style.display = 'block';
        axios.post('/api/user/forgot_password', {
            email: document.getElementById('email_forgot').value,
            _csrf: localStorage.csrfToken
        }).then((response) => {
            console.log(response);
            document.getElementById('request-done-forgot').style.display = 'grid';
            return loading_container_forgot.style.display = 'none';
        }).catch(error => {
            return M.toast({ html: error.response.data.error, classes: 'rounded red darken-2' })
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
                        <br/><br/>
                        <div id="loading-container-forgot" className="col s10 offset-s1 offset-s1">
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>

                            <p className="teal-text">processing request . . .</p>
                        </div>  
                    </div>
                </div>
                <div id="request-done-forgot" className="center-align">
                    <div className="animated bounceInDown">
                        <h5 className="white-text">A password reset link was sent to your email. Password reset token will exprire in an hour.</h5>
                        <br />
                        <Link to="/" className="light-blue-text text-lighten-3">take me back to home page <i className="fas fa-home"></i></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;