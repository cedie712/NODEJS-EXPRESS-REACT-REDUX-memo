import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

// css
import '../static/css/landing_page.css';

import ScrollReveal from 'scrollreveal';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      email_signin: '',
      password_signin: ''
    }

    this.fetch_field_data = this.fetch_field_data.bind(this)
    this.process_signin = this.process_signin.bind(this)

  }

  fetch_field_data(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {

    axios.get('/api/user/signin')
      .then((response) => {
        localStorage.setItem('csrfToken', response.data.csrfToken);
      })
      .catch(error => console.log(error));

    let down_btn = document.getElementById('downward-landingpage')

    down_btn.addEventListener('click', () => {
      let scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    })

    ScrollReveal().reveal('#login-card',
    {
        // origin: 'left',
        delay: 300,
        distance : '120px',
        easing: 'ease-in-out',
        // scale: 0.40
    });

    ScrollReveal().reveal('#landing-page-footer',
    {
        // origin: 'left',
        delay: 400,
        distance : '20px',
        easing: 'ease-in-out',
        // scale: 0.40
    });

  }


  process_signin(event) {
    event.preventDefault();
    axios.post('/api/user/signin', {
      email: this.state.email_signin,
      password: this.state.password_signin,
      _csrf: localStorage.csrfToken
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error.response.data.error);
    });
  }


  render() {

    let year_now = new Date().getFullYear();

    return (
      <div className="LandingPage">
        <div className="row">

          <div id="landing_page_container_top" className="col s12 grey darken-4 center">
            <div id="top-branding" className="container">
              <h1 id="brand-title" className="light-blue-text text-lighten-1 animated bounceInDown">Memo</h1>
              <h6 className="white-text animated bounceInRight">A cool place to dump your to-dos, notices,<br />  and what-so-ever list with shit-free guarantee</h6>

              <button id="downward-landingpage" className="animated infinite bounce
              btn-floating btn-large waves-effect waves-light light-green darken-2"><i className="material-icons">arrow_downward</i></button>
            </div>
          </div>

          <div id="block-2-landing-page" className="col s12 light-blue lighten-1">
            <div className="center">

              <form className="" onSubmit={this.process_signin}>
              <div id="login-card" className="card">

                  <div className="card-content">
                    <div className="card-header">
                      <h4>Sign In</h4>
                    </div>

                    <div className="input-field">
                      <i className="material-icons prefix grey-text text-darken-1">account_circle</i>
                      <input id="email_signin" name="email_signin"
                      onChange={this.fetch_field_data} value={this.state.email_signin}
                      type="text" className="validate" />
                      <label htmlFor="email_signin">Email</label>
                    </div>

                    <div className="input-field">
                    <i className="material-icons prefix grey-text text-darken-1">lock</i>
                      <input id="password_signin" name="password_signin"
                      onChange={this.fetch_field_data} value={this.state.password_signin}
                      type="password" className="validate" />
                      <label htmlFor="password_signin">Password</label>
                    </div>
                    <a href="/" className="red-text">forgot password?</a>

                  </div>

                  <div className="card-action center">
                    <span><Link to="/signup" className="orange-text">don't have an account ?</Link></span>
                    <button type="submit" id="login_submit" className="waves-effect waves-light light-green darken-2 btn">Submit                   <i className="material-icons right">send</i>
                    </button>
                  </div>

              </div> 

              </form>
            


            </div> 
            <div id="landing-page-footer" className="center">
              <p className="white-text">copyrights reserved {year_now}</p>
              <p className="grey-text text-darken-3">cedrickdomingo048@gmail.com</p>
            </div>
          </div>
          
        </div> 
        {/* <script src="../static/js/landing_page_static.js"></script> */}
      </div>
    );
  }
}

export default LandingPage;