import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { fetch_posts } from '../actions/fetch_posts_action';

//components
import NewMemo from  './main_components/new_memo';
import Posts from './main_components/posts';
import DeleteMemo from './main_components/delete_memo';
import DoneMemo from './main_components/done_memo';

//static
import '../static/css/main_index.css';
import M from 'materialize-css';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      is_authenticated: false
    }
    this.check_auth();
    this.show_add_memo_modal = this.show_add_memo_modal.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  check_auth() {
      axios.get('/api/main')
        .then((response) => {
            this.setState({is_authenticated: true})
        })
        .catch((error) => {
            console.log(error);

          return window.location ='/';
            // this.setState({is_authenticated: false})
        })
  }


  logout() {
    axios.get('/api/user/signout')
    .then((response) => {
        this.setState({is_authenticated: false});
        return window.location ='/';
    })
    .catch((error) => {
        console.log(error);
        // this.setState({is_authenticated: false})
    })
  }

  show_add_memo_modal(event) {
    event.preventDefault();
    let modal_container = document.getElementById("new-memo-modal");

    modal_container.style.display = 'grid';
  }

  open_nav() {


  }

  render() {
    
    if (this.state.is_authenticated) {
      document.getElementById('main-container').style.display = "block";
    }

    return (
      <div className="Main">
        <div id="main-container" className="grey darken-4">

        <nav className="animated slideInLeft">
          <div id="mob-nav">
          <h4 id="mob-brand" className="brand-logo left">Memo</h4>
            <ul>
              <li><i className="material-icons mob-nav-icons light-blue-text text-lighten-1" onClick={this.show_add_memo_modal}>add</i></li>
              <li><i className="material-icons mob-nav-icons light-blue-text text-lighten-1">vpn_key</i></li>
              <li><i className="material-icons mob-nav-icons light-blue-text text-lighten-1" onClick={this.logout}>exit_to_app</i></li>
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
                </div>
                <br />
                <div className="animated bounceInLeft">
                  <i id="change_password" className="medium material-icons light-blue-text text-lighten-1 pointer">vpn_key</i>
                  <br />
                  <h6 className="white-text">Change Password</h6>
                </div>
                <br />
                <div className="animated bounceInLeft">
                  <i id="logout" onClick={this.logout} className="medium material-icons light-blue-text text-lighten-1 pointer">exit_to_app</i>
                  <br />
                  <h6 className="white-text">Logout</h6>
                </div>
              </div>

              <div id="central_section" className="col s12">
                <div className="animated fadeIn">
                  {/* POSTS */}
                  <Posts />
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
