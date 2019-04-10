import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import 'animate.css';

import './static/css/main.css';

// Components
import LandingPage from './components/landing_page';
import SignUp from './components/sign_up';
import Main from './components/main';


const Route = require('react-router-dom').Route;

class App extends Component {

  constructor() {
    super();
    this.state = {
      user_authenticated: false
    };
    this.update_user_auth = this.update_user_auth.bind(this);
  }

  componentDidMount() {
    //Initialize materialize
    M.AutoInit();
  }

  update_user_auth(auth_state) {
    if(auth_state) {
      this.setState({user_authenticated: true})
    }
  }

  render() {
    return (
        <Router>
        <div className="App">

          {/* home */}
            <Route path='/' exact render={(props) => <LandingPage {...props} update_user_auth={this.update_user_auth}
            user_authenticated={this.state.user_authenticated} />} />
          {/* home */}

          {/* signup */}
            <Route path='/signup' exact render={(props) => <SignUp {...props} update_user_auth={this.update_user_auth}
            user_authenticated={this.state.user_authenticated} />} />
          {/* signup */}

          {/* signup */}
            <Route path='/main' exact component={Main} />
          {/* signup */}

        </div>
        </Router>
    );
  }
}

export default App;
