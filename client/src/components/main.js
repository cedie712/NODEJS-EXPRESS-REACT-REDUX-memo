import React, { Component } from 'react'
import axios from 'axios';

//static
import '../static/css/main_index.css';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      is_authenticated: false
    }
    this.check_auth();
  }

  check_auth() {
      axios.get('/api/main')
        .then((response) => {
            console.log(response.data);
            this.setState({is_authenticated: true})
        })
        .catch((error) => {
            console.log(error);

          return window.location ='/';
            // this.setState({is_authenticated: false})
        })
  }

  render() {
    if (this.state.is_authenticated) {
      document.getElementById('main-container').style.display = "block";
    }
    return (
      <div className="Main">
        <div id="main-container">
          wOot WOOOT
        </div>
      </div>
    )
  }
}

export default Main;
