import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// components
import ConfirmSignUp from './confirm_signup';

// css
import '../static/css/sign_up.css'
import M from 'materialize-css'

// js
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
    this.password_meter_event();
  }


  password_meter_event() {
    let password = document.getElementById('password-signup').value;
    let confirm = document.getElementById('confirm-signup').value;
    let min_length = 8;
    let check_password = validate_password(password, confirm, min_length);
    if (password === '' && confirm === '') {
      document.getElementById('password-meter-container').style.display = 'none';
      document.getElementById('lvl1-meter').className = 'password-meter grey lighten-1';
    }
    else {
      document.getElementById('password-meter-container').style.display = 'block';
      if(check_password !== true) {
        document.getElementById('lvl1-meter').className = 'password-meter red';
        document.getElementById('lvl2-meter').className = 'password-meter grey lighten-1';
        document.getElementById('lvl3-meter').className = 'password-meter grey lighten-1';
        document.getElementById('lvl4-meter').className = 'password-meter grey lighten-1';
      }
      else {
        if (password !== confirm) {
          document.getElementById('lvl1-meter').className = 'password-meter red';
          document.getElementById('lvl2-meter').className = 'password-meter grey lighten-1';
          document.getElementById('lvl3-meter').className = 'password-meter grey lighten-1';
          document.getElementById('lvl4-meter').className = 'password-meter grey lighten-1';
        }
        else if (password.length < min_length) {
          document.getElementById('lvl1-meter').className = 'password-meter red';
        }
        else if (password.length >= min_length && password.length < (min_length + 4) && password === confirm) {
          document.getElementById('lvl1-meter').className = 'password-meter yellow darken-1';
          document.getElementById('lvl2-meter').className = 'password-meter yellow darken-1';
        }
        else if (password.length >= (min_length + 4) && password.length < (min_length + 10) && password === confirm) {
          document.getElementById('lvl1-meter').className = 'password-meter light-blue';
          document.getElementById('lvl2-meter').className = 'password-meter light-blue';
          document.getElementById('lvl3-meter').className = 'password-meter light-blue';
        }
        else if (password.length >= (min_length + 10) && password === confirm) {
          document.getElementById('lvl1-meter').className = 'password-meter light-green darken-2';
          document.getElementById('lvl2-meter').className = 'password-meter light-green darken-2';
          document.getElementById('lvl3-meter').className = 'password-meter light-green darken-2';
          document.getElementById('lvl4-meter').className = 'password-meter light-green darken-2';
        }
      }
    }
  }


  process_signup(event) {
    document.getElementById('loading-container-signup').style.display = 'block';
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let confirm = this.state.confirm;
    let fields = [email, password, confirm];

    for (let i in fields) {
      if (fields[i] === '') {
      document.getElementById('loading-container-signup').style.display = 'none';
        console.log('complete the fields');
        return  M.toast({html: 'complete the fields', classes: 'rounded red darken-2'});
      }
    }

    if (password !== confirm) {
      document.getElementById('loading-container-signup').style.display = 'none';
      return  M.toast({html: 'passwords did\'t match', classes: 'rounded red darken-2'});
    }


    axios.post('/api/user/signup', {
      email,
      password,
      confirm,
      _csrf: localStorage.csrfToken
    })
    .then((response) => {
      document.getElementById('loading-container-signup').style.display = 'none';
      document.getElementById('confirm-signup-container').style.display = 'block';
    })
    .catch((error) => {
      document.getElementById('loading-container-signup').style.display = 'none';
      M.toast({html: error.response.data.error, classes: 'rounded red darken-2'})
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

              {/* password_meter */}
              <div id="password-meter-container" className="row">
                  <div className="col s3">
                    <div id="lvl1-meter" className="password-meter grey lighten-1">

                    </div>
                  </div>
                  <div className="col s3">
                    <div id="lvl2-meter" className="password-meter grey lighten-1">

                    </div>
                  </div>
                  <div className="col s3">
                    <div id="lvl3-meter" className="password-meter grey lighten-1">

                    </div>
                  </div>
                  <div className="col s3">
                    <div id="lvl4-meter" className="password-meter grey lighten-1">

                    </div>
                  </div>                
              </div>
              {/* password_meter */}

            <div className="">     
            <button type="submit" onClick={this.process_signup} className="waves-effect waves-light light-green darken-2 btn-large">Submit<i className="material-icons large right">add_circle_outline</i></button>
            <br /><br />
            <span><Link to="/" className="white-text">already have an account ?</Link></span>



            </div>
            <br />
            <div id="loading-container-signup" className="col s6 offset-s3 offset-s3">
              <div className="progress">
                  <div className="indeterminate"></div>
              </div>

              <p className="teal-text">processing request . . .</p>
            </div>

            </form>
          </div>
        </div>

        <ConfirmSignUp />

      </div>
    );
  }
}

export default SignUp;
