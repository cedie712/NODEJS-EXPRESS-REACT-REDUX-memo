import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetch_posts } from '../../actions/fetch_posts_action';

// css
// import 'materialize-css';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0
    }
  }

    componentDidMount() {
        this.props.fetch_posts(this.state.offset);
    }

    componentDidUpdate() {
      if (this.state.offset >= (this.props.count - 5)) {
        document.getElementById('next').style.display = 'none';
      }
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
          this.props.posts.unshift(nextProps.post);
        }
        // this.props.fetch_posts(this.props.match.params.splice);
    }

    next() {
      this.setState({offset: this.state.offset + 5},
        () => {
          this.props.fetch_posts(this.state.offset);
        });
    }

    retrieve_posts () {

      let posts = this.props.posts.map((post) => {
              let post_due_date = null;   
              if (post.post_due_date) {
                  post_due_date = <h5 className="grey-text">Due Date: {post.post_due_date}</h5>;
                }
              
              return (<li key={post.id}>
                  <h4 className="grey-text uppercase"><i className="material-icons">note</i>&nbsp;{post.post_title}</h4>
                  <p className="white-text" id="post-body">{post.post_body}</p>
                  {post_due_date}
                  <div className="right-align">
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
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
            <button id="next" className="btn waves-effect waves-light" onClick={this.next.bind(this)}>Next</button>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.items,
    post: state.posts.item,
    count: state.posts.count
  }
}
  
  export default withRouter(connect(mapStateToProps, {fetch_posts})(Posts));
