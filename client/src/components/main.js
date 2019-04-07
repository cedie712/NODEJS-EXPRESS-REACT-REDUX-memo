import React, { Component } from 'react'
import axios from 'axios';

class Main extends Component {
  componentDidMount() {
      axios.get('/api/main')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
  }

  render() {
    return (
      <div className="Main">
        wOot WOOOT
      </div>
    )
  }
}

export default Main;
