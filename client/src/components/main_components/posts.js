import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetch_posts } from '../../actions/fetch_posts_action';
import { set_delete } from '../../actions/set_delete_action';
import { empty_state_props } from '../../actions/empty_state_prop';

// css
// import 'materialize-css';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
    }
  }

    componentDidMount() {
        this.props.fetch_posts(this.state.offset);
    }

    componentDidUpdate() {

      if (this.state.offset >= (this.props.count - 5)) {
        document.getElementById('next').style.display = 'none';
      }
      else {
        document.getElementById('next').style.display = 'inline';
      }

      if (this.state.offset > 0) {
        document.getElementById('prev').style.display = 'inline';
      }

      if (this.state.offset === 0) {
        document.getElementById('prev').style.display = 'none';
      }
      
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
          nextProps.post['createdAt_local'] = 'Just right fucking now';
          this.props.posts.unshift(nextProps.post);
          this.props.empty_state_props();
        }
        
        if (nextProps.post_splice) {
          let post_index = this.props.posts.indexOf(this.props.memo_to_delete);
          
          this.props.posts.splice(post_index, 1);
        }
    }

    next() {
      this.setState({offset: this.state.offset + 5},
        () => {
          this.props.fetch_posts(this.state.offset);

          window.scrollTo(0, 0);
        });
    }

    prev() {
      this.setState({offset: this.state.offset - 5},
        () => {
          this.props.fetch_posts(this.state.offset);
          window.scrollTo(0, 0);
        });
    }

    show_delete_memo(memo) {
      this.props.set_delete(memo);
      let modal_container = document.getElementById("delete-memo-container");
      modal_container.style.display = 'grid';
    }

    retrieve_posts () {

      let posts = this.props.posts.map((post) => {
              let post_due_date = null;   
              if (post.post_due_date) {
                  post_due_date = <h5 className="white-text">Due Date: {post.post_due_date}</h5>;
                }
              
              return (<li key={post.id}>
                      <h5 className="grey-text uppercase"><i className="material-icons white-text">note</i>&nbsp;{post.post_title}&nbsp;
                      <i className="material-icons light-green-text text-darken-2 right done">check</i>
                      <i className="material-icons yellow-text text-darken-1 right warning">warning</i>
                      <i className="material-icons red-text text-darken-1 right sad">sentiment_very_dissatisfied</i>
                      </h5>
                  <div className="post-body-box">
                    <p className="grey-text" id="post-body">{post.post_body}</p>
                  </div>
                  <h6 className="white-text">Created at: {post.createdAt_local}</h6>
                  {post_due_date}
                  <div className="right-align">
                    <span id={`edit_${post.id}`}><i className="material-icons white-text pointer">edit</i></span>
                    <span id={`mark_as_done_${post.id}`}><i className="material-icons white-text pointer">check</i></span>
                    <span id={`delete_${post.id}`} onClick={this.show_delete_memo.bind(this, post)}><i className="material-icons red-text text-darken-1 pointer">delete</i></span>
                  </div>
                 <br /><hr></hr><br />
              </li>)
      }); 
      return posts
    }
    

    render() {
        // if (this.next_fuck) {
        //   return <Redirect to={'/main/' + this.props.match.params.splice++} />
        // }
        return (
        <div className="Posts">
            <div id="rendered-post">
              {this.retrieve_posts()}
            </div>
            <button id="prev" className="btn waves-effect waves-light orange" onClick={this.prev.bind(this)}>Prev</button>
            <button id="next" className="btn waves-effect waves-light" onClick={this.next.bind(this)}>Next</button>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.items,
    post: state.posts.item,
    count: state.posts.count,
    memo_to_delete: state.posts.post_to_delete,
    post_splice: state.posts.post_splice
  }
}

  export default withRouter(connect(mapStateToProps, {fetch_posts, set_delete, empty_state_props})(Posts));
