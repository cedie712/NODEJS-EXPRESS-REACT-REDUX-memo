import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

// js
import validate_password from '../static/js/password_validator';

//css
import '../static/css/forgot_pass.css';
import M from 'materialize-css';


class ForgotPasswordFin extends Component {
    constructor() {
        super();
        this.state = {
            is_allowed: false,
            new_password_reset: '',
            retype_new_password_reset: ''
        }
        this.fetch_field_value = this.fetch_field_value.bind(this);
        this.reset_password = this.reset_password.bind(this);
    }

    componentDidMount() {
        axios.post('/api/user/forgot_password_final_step', {
            reset_token: this.props.match.params.reset_token
        })
            .then((response) => {
                this.setState({ is_allowed: true });
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    fetch_field_value(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    reset_password() {
        let new_password = this.state.new_password_reset;
        let confirm = this.state.retype_new_password_reset;

        let fields = [new_password, confirm]
        for (let i in fields) {
            if (fields[i] === '') {
                return M.toast({ html: 'complete the fucking required fields', classes: 'rounded red darken-2' });
            }
        }

        let validate = validate_password(new_password, confirm, 8);
        if (validate !== true) {
            return M.toast({ html: validate.error, classes: 'rounded red darken-2' });
        }

        axios.post('/api/user/reset_password', {
            new_password,
            confirm,
            reset_token: this.props.match.params.reset_token
        })
            .then((response) => {
                document.getElementById('reset-pass-form').className = "animated bounceOutUp";
                setTimeout(() => {
                    document.getElementById('reset-pass-form').style.display = "none";
                    document.getElementById('done-change').style.display = "block";
                    clearTimeout();
                }, 800);
            }).catch((error) => {
                return M.toast({ html: error.response.data.error, classes: 'rounded red darken-2' });
            });
    }

    render() {
        let fin_step_form = <div className="red-text">The password reset token expires, has been used or you are trying to perform a dirty request.</div>;
        if (this.state.is_allowed) {
            fin_step_form = (
                <div id="reset-pass-form">
                    <div className="input-field">
                        <input id="new-password-reset" type="password" name="new_password_reset" onChange={this.fetch_field_value} value={this.state.new_password_reset} />
                        <label htmlFor="new-password-reset">New Password</label>
                    </div>
                    <div className="input-field">
                        <input id="retype-new-password-reset" type="password" name="retype_new_password_reset" onChange={this.fetch_field_value} value={this.state.retype_new_password_reset} />
                        <label htmlFor="retype-new-password-reset">Re-type Password</label>
                    </div>
                    <button className="waves-effect waves-light btn" onClick={this.reset_password}>Reset Password</button>
                </div>
            );
        }
        return (
            <div className="ForgotPasswordFin">
                <div id="forgot-pass-fin-container" className="grey darken-4 center-align">
                    {fin_step_form}
                    <div id="done-change" className="animated bounceInRight">
                        <h5 className="grey-text">Your password was changed. You can sign-in now using your new password</h5>
                        <br />
                        <Link to="/" className="light-blue-text text-lighten-3">bring me to home page <i className="fas fa-home"></i></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordFin;
