import React, { Component } from 'react'
import axios from 'axios';
// js
import validate_password from '../../static/js/password_validator';
// css
import M from 'materialize-css';

class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            old_password: '',
            new_password: '',
            retype_new_password: ''
        }

        this.fetch_field_value = this.fetch_field_value.bind(this);
        this.change_pass = this.change_this_fucking_password.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    fetch_field_value(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    close_change_password_modal() {
        let change_password_container = document.getElementById('change-password-container');
        change_password_container.style.backgroundColor = 'transparent';
        change_password_container.classList.add('animated');
        change_password_container.classList.add('bounceOutUp');
        setTimeout(() => {
            change_password_container.className = '';
            change_password_container.style.display = 'none';
            change_password_container.style.backgroundColor = 'rgba(0, 0, 0, 0.397)';
        clearTimeout();
        }, 1000);
    }

    change_this_fucking_password() {
        let old_password = this.state.old_password;
        let new_password = this.state.new_password;
        let confirm = this.state.retype_new_password;
        let fields = [old_password, new_password, confirm]
        for (let i in fields) {
            if (fields[i] === '') {
                return M.toast({html: 'complete the fucking required fields', classes: 'rounded red darken-2'});
            }
        }
        let validate = validate_password(new_password, confirm, 8);
        if (validate !== true) {
            return M.toast({html: validate.error, classes: 'rounded red darken-2'});
        }
    }

  render() {
    return (
      <div className="ChangePassword">
        <div id="change-password-container">
            <div id="change-password-box" className="animated bounceInDown center">
            <span id="change-password-close"><i className="material-icons" onClick={this.close_change_password_modal.bind(this)}>close</i></span>
                <div className="input-field">
                    <input id="old-password" type="password" name="old_password" onChange={this.fetch_field_value} value={this.state.old_password} />
                    <label htmlFor="old-password">Password</label>
                </div>
                <div className="input-field">
                    <input id="new-password" type="password" name="new_password" onChange={this.fetch_field_value} value={this.state.new_password} />
                    <label htmlFor="new-password">New Password</label>
                </div>
                <div className="input-field">
                    <input id="retype-new-password" type="password" name="retype_new_password" onChange={this.fetch_field_value} value={this.state.retype_new_password} />
                    <label htmlFor="retype-new-password">Re-type Password</label>
                </div>
                <button className="waves-effect waves-light btn" onClick={this.change_pass}>Change Password</button>
            </div>
        </div>
      </div>
    )
  }
}

export default ChangePassword;