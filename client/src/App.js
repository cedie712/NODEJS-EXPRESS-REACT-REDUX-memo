import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import 'animate.css';
import './static/css/main.css';

// Components
import LandingPage from './components/landing_page';
import SignUp from './components/sign_up';
import Main from './components/main';
import ForgotPassword from './components/forgot_password';
import ForgotPasswordFin from './components/forgot_password_fin';


const Route = require('react-router-dom').Route;

class App extends Component {

  componentDidMount() {

    //Initialize materialize
    M.AutoInit();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">

            {/* home */}
            <Route path='/' exact render={(props) => <LandingPage {...props} />} />
            {/* home */}

            {/* signup */}
            <Route path='/signup' exact render={(props) => <SignUp {...props} />} />
            {/* signup */}

            {/* main */}
            <Route path={'/main'} render={(props) => <Main {...props} />} />
            {/* main */}

            {/* forgot_password */}
            <Route path={'/forgot_password'} component={ForgotPassword} />
            {/* forgot_password */}

            {/* forgot_password */}
            <Route path={'/forgot_password_final_step/:reset_token'} component={ForgotPasswordFin} />
            {/* forgot_password */}

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
