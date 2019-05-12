import React, { Component } from 'react'

import '../static/css/404.css';

class FourZeroFour extends Component {
  render() {
    return (
      <div className="FourZeroFour">
        <div id="fourofour-container" className="grey darken-4 center-align">
            <div>
                <img id="crazy-trex" src={require("../static/images/crazy_trex.png")} alt="crazy-trex" />
                <h1 id="fourofour-heading" className="red-text">404</h1>
                <h6 className="grey-text">The page you had requested was not found on this server :(</h6>
            </div>
        </div>
      </div>
    )
  }
}

export default FourZeroFour;
