import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { fetch_posts } from '../actions/fetch_posts_action';

//components
import NewMemo from  './main_components/new_memo';
import Posts from './main_components/posts';
import DeleteMemo from './main_components/delete_memo';
import DoneMemo from './main_components/done_memo';
import ChangePassword from './main_components/change_password';
import ConfirmLogout from './main_components/confirm_logout'

//static
import '../static/css/main_index.css';
import M from 'materialize-css';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      is_authenticated: false,
      google_authenticated: false,
    }
    this.check_auth();
    this.show_add_memo_modal = this.show_add_memo_modal.bind(this);
    this.show_change_password_modal = this.show_change_password_modal.bind(this);
    this.show_logout_modal =  this.show_logout_modal.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  check_auth() {
      axios.get('/api/main')
        .then((response) => {
            this.setState({is_authenticated: true})
            if (response.data.google_authenticated) {
              this.setState({google_authenticated: true})
            }
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

  show_change_password_modal() {
    let modal_container = document.getElementById("change-password-container");

    modal_container.style.display = 'grid';
  }

  show_logout_modal(event) {
    event.preventDefault();
    let modal_container = document.getElementById("logout-container");

    modal_container.style.display = 'grid';
  }


  render() {
    let has_no_post = null;
    if (this.state.is_authenticated) {
      document.getElementById('main-container').style.display = "block";
      if (this.props.posts.length === 0) {
        has_no_post = <h3 className="white-text">Currently, You have no memo. Start creating a new one!</h3>;
        let class_val = " animated heartBeat infinite";
        document.getElementById('add-memo-toggler').className += class_val;
        document.getElementById('mob-add').className += class_val;
      }
      else {
        let class_val = "medium material-icons light-blue-text text-lighten-1 pointer";
        document.getElementById('add-memo-toggler').className = class_val
        document.getElementById('mob-add').className += class_val;
      }
    }

    if (this.state.google_authenticated) {
      document.getElementById('change-pass-tool').style.display = 'none';
      document.getElementById('mob-key').style.display = 'none';
    }

 
   

    return (
      <div className="Main">
        <div id="main-container" className="grey darken-4">

        <nav className="animated slideInLeft">
          <div id="mob-nav">
          <h4 id="mob-brand" className="brand-logo left">Memo</h4>
            <ul>
              <li><i id="mob-add" className="material-icons mob-nav-icons light-blue-text text-lighten-1" onClick={this.show_add_memo_modal}>add</i></li>
              <li><i id="mob-key" className="material-icons mob-nav-icons light-blue-text text-lighten-1" onClick={this.show_change_password_modal}>vpn_key</i></li>
              <li><i className="material-icons mob-nav-icons light-blue-text text-lighten-1" onClick={this.show_logout_modal}>exit_to_app</i></li>
            </ul>
          </div>  
        </nav>

          <div id="central-container" className="row">
            <div className="container">

              <div id="side_tools" className="col s1 center">
                <div className="animated bounceInLeft">
                  <i id="add-memo-toggler" onClick={this.show_add_memo_modal} className="medium material-icons light-blue-text text-lighten-1 pointer">add</i>
                  <br />
                  <h6 className="white-text">New Memo</h6>
                  <br />
                </div>
                
                <div className="animated bounceInLeft" id="change-pass-tool">
                  <i id="change_password" className="medium material-icons light-blue-text text-lighten-1 pointer" onClick={this.show_change_password_modal}>vpn_key</i>
                  <br />
                  <h6 className="white-text">Change Password</h6>
                  <br />
                </div>

                <div className="animated bounceInLeft">
                  <i id="logout" onClick={this.show_logout_modal} className="medium material-icons light-blue-text text-lighten-1 pointer">exit_to_app</i>
                  <br />
                  <h6 className="white-text">Logout</h6>
                </div>
              </div>

              <div id="central_section" className="col s12">
                <div className="animated fadeIn">
                  {/* POSTS */}
                  <Posts />
                  {has_no_post}
                  {/* POSTS */}
                </div>  
              </div>

            </div>
          </div>
        </div>

      {/* MODALS */}
        <NewMemo />
        <DeleteMemo />
        <DoneMemo />
        <ChangePassword />
        <ConfirmLogout />
      {/* MODALS */}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  post: state.posts.item
});

export default connect(mapStateToProps, {fetch_posts})(Main);
