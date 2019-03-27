import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import 'animate.css';

import './static/css/main.css';

// Components
import LandingPage from './components/landing_page';
import SignUp from './components/sign_up';


const Route = require('react-router-dom').Route;

class App extends Component {

  componentDidMount() {
    //Initialize materialize
    M.AutoInit();
  }

  render() {
    return (
        <Router>
        <div className="App">

          {/* home */}
            <Route path='/' exact component={LandingPage} />
          {/* home */}

          {/* signup */}
            <Route path='/signup' exact component={SignUp} />
          {/* signup */}

        </div>
        </Router>
    );
  }
}

export default App;
