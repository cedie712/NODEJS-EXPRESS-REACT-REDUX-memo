import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_posts } from '../../actions/fetch_posts_action';

// css
// import 'materialize-css';

class Posts extends Component {
  constructor() {
    super()
    this.pager = 0;
  }
    componentWillMount() {
        this.props.fetch_posts(this.pager);
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
          this.props.posts.unshift(nextProps.post);
        }
      }

    
    next() {
      console.log('im next')
      this.pager = this.pager + 5;
      this.props.fetch_posts(this.pager);
    }

    retrieve_posts () {
      let posts = this.props.posts.map((post) => {
        console.log(post)
              let post_due_date = null;
              if (post.post_due_date) {
                  post_due_date = <h5 className="grey-text">Due Date: {post.post_due_date}</h5>;
                }
              
              return (<li key={post.id}>
                  <h4 className="grey-text uppercase">{post.post_title}</h4>
                  <p className="white-text" id="post-body">{post.post_body}</p>
                  {post_due_date}
                  <hr></hr><br />
              </li>)
      });
      return posts
    }
    

    render() {

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

const mapStateToProps = state => ({
    posts: state.posts.items,
    post: state.posts.item
  });
  
  export default connect(mapStateToProps, {fetch_posts})(Posts);
