import React, { Component } from 'react'
import axios from 'axios';
import M from 'materialize-css';
import { Redirect } from 'react-router-dom';

class ConfirmSignUp extends Component {
  constructor() {
    super();
    this.state = {
      verification_code: '',
    }

    this.fetch_code_value = this.fetch_code_value.bind(this);
    this.confirm_email = this.confirm_email.bind(this);
  }

  componentDidMount() {
    M.AutoInit()
  }


  fetch_code_value(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  confirm_email(event) {
    event.preventDefault();
    if (this.state.verification_code === '') {
      return  M.toast({html: 'Enter the Code', classes: 'rounded red darken-2'})
    }
    axios.post('/api/user/verify_signup', {
      verification_code: this.state.verification_code,
      _csrf: localStorage.csrfToken,
    })
    .then((response) => {
      if (response.status === 200) {
        return this.props.update_user_auth(true);
      }
    }).catch((error) => {

    console.log(error);
      console.log(error.response.data.error);
      return M.toast({html: error.response.data.error, classes: 'rounded red darken-2'})
    })
  }

  render() {
    if (this.props.user_authenticated) {
      return <Redirect to="/main" />
    }
    
    return (
      <div className="ConfirmSignUp">
        <div id="confirm-signup-container" className="light-blue lighten-1 animated bounceInRight">

          <div className="row">
              <div className="col s12 center align center">
                  <form onSubmit={this.confirm_email}>

                  <i className="material-icons prefix orange-text text-darken-4 medium">info</i>
                    <p className="orange-text text-darken-4"><b>
                      A verification code was sent to your email to verify that it is yours. Enter the code to complete the sign up process.</b>
                    </p>

                    <div id="v-code-container">
                      <div className="input-field">
                        <input type="text" onChange={this.fetch_code_value} value={this.state.verification_code} name="verification_code" id="verfication_code" className="white-text" />
                        <label htmlFor="verfication_code">Verification Code</label>
                      </div>
                    </div>

                    <button type="submit" className="waves-effect waves-light light-green darken-2 btn-large">
                      Verify Email<i className="material-icons large right">check</i>
                    </button>
                  </form>
              </div>    
          </div>

        </div>
      </div>
    )
  }
}

export default ConfirmSignUp;
