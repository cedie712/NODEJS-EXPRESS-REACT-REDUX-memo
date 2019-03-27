import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// css
import '../static/css/sign_up.css'
import M from 'materialize-css'

// static js
import validate_password from '../static/js/password_validator';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirm: ''
    }

    this.fetch_field_value = this.fetch_field_value.bind(this);
    this.process_signup = this.process_signup.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    axios.get('/api/user/signup')
    .then((response) => {
      localStorage.setItem('csrfToken', response.data.csrfToken);
    }).catch((error) => {
      console.log(error);
    })
  }

  fetch_field_value(event) {
    this.setState({[event.target.name]: event.target.value});
  }



  process_signup(event) {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let confirm = this.state.confirm;
    let fields = [email, password, confirm];

    for (let i in fields) {
      if (fields[i] === '') {
        console.log('complete the fields');
        return  M.toast({html: 'complete the fields', classes: 'rounded red darken-2'});
      }
    }

    if (password !== confirm) {
      console.log('passwords did\'t match');
      return  M.toast({html: 'passwords did\'t match', classes: 'rounded red darken-2'});
    }

    let check_password = validate_password(password, 8);

    if (check_password !== true) {
      return  M.toast({html: check_password.error, classes: 'rounded red darken-2'});
    }

    axios.post('/api/user/signup', {
      email,
      password,
      confirm,
      _csrf: localStorage.csrfToken
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

  }

  render() {
    return (
      <div className="SignUp">
        <div className="row">
          <div id="signup-block" className="col s12 grey darken-4 center">
            <form className="animated bounceInDown">
            <h3 className="orange-text">Sign up</h3>
              <div className="input-field">
                <input id="email" name="email" onChange={this.fetch_field_value} value={this.state.email} type="text" className="light-blue-text text-lighten-3" />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input id="password-signup" name="password" onChange={this.fetch_field_value} value={this.state.password} type="password" className="light-blue-text text-lighten-3" />
                <label htmlFor="password-signup">Password</label>
              </div>

              <div className="input-field">
                <input id="confirm-signup" name="confirm" onChange={this.fetch_field_value} value={this.state.confirm} type="password" className="light-blue-text text-lighten-3" />
                <label htmlFor="confirm-signup">Confirm Password</label>
              </div>
            <div className="">     
            <button type="submit" onClick={this.process_signup} className="waves-effect waves-light light-green darken-2 btn-large">Submit<i className="material-icons large right">add_circle_outline</i></button>
            <br /><br />
            <span><Link to="/" className="white-text">already have an account ?</Link></span>
            </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
