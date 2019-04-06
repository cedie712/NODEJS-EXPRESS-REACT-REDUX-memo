import React, { Component } from 'react'
import axios from 'axios';

class ConfirmSignUp extends Component {
  constructor() {
    super();
    this.state = {
      verification_code: ''
    }

    this.fetch_code_value = this.fetch_code_value.bind(this);
    this.confirm_email = this.confirm_email.bind(this);
  }


  fetch_code_value(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  confirm_email(event) {
    event.preventDefault();
    console.log(this.state);
    axios.post('/api/user/verify_signup', {
      verification_code: this.state.verification_code,
      _csrf: localStorage.csrfToken,
      // email: this.props.email,
      // password: this.props.password
    })
    .then((response) => {
      console.log(response.status);
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="ConfirmSignUp">
        <div id="confirm-signup-container" className="light-blue lighten-1 animated bounceInRight">
            <form onSubmit={this.confirm_email}>
              <input type="text" onChange={this.fetch_code_value} value={this.state.verification_code} name="verification_code" id="verfication_code" />
              <button type="submit">Send</button>
            </form>
        </div>
      </div>
    )
  }
}

export default ConfirmSignUp;
