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
    this.show_add_memo_modal = this.show_add_memo_modal.bind(this);
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

  show_add_memo_modal(event) {
    event.preventDefault();
    let modal_container = document.getElementById("new-memo-modal");

    modal_container.style.display = 'grid';
  }

  render() {
    if (this.state.is_authenticated) {
      document.getElementById('main-container').style.display = "block";
    }
    return (
      <div className="Main">
        <div id="main-container" className="grey darken-4">
          <div id="central-container" className="row">
            <div className="container">

              <div className="col s3">
                <div>
                <i id="add-memo-toggler" onClick={this.show_add_memo_modal} className="large material-icons light-green-text text-darken-2 animated bounceInLeft">add</i>
                </div>
              </div>

            </div>
          </div>
        </div>

      {/* MODALS */}
      <div id="new-memo-modal" className="">
        <div id="new-modal-form-holder" className="animated bounceInDown">
        </div>
      </div>
      {/* MODALS */}

      </div>
    )
  }
}

export default Main;
