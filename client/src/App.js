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

              {/* signup */}
                <Route path='/main' exact component={Main} />
              {/* signup */}

            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
