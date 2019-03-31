import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// css
import '../static/css/landing_page.css';

import ScrollReveal from 'scrollreveal';

class LandingPage extends Component {

  componentDidMount() {

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

              <form className="">
              <div id="login-card" className="card">

                  <div className="card-content">
                    <div className="card-header">
                      <h4>Sign In</h4>
                    </div>

                    <div className="input-field">
                      <input id="email-signin" type="text" className="validate" />
                      <label htmlFor="email-signin">Email</label>
                    </div>

                    <div className="input-field">
                      <input id="password" type="password" className="validate" />
                      <label htmlFor="password">Password</label>
                    </div>
                    <a href="/" className="red-text">forgot password?</a>

                  </div>

                  <div className="card-action center">
                    <span><Link to="/signup" className="orange-text">don't have an account ?</Link></span>
                    <button id="login_submit" className="waves-effect waves-light light-green darken-2 btn">Submit                   <i className="material-icons right">send</i>
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