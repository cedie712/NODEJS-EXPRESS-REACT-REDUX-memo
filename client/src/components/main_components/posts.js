import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_posts } from '../../actions/fetch_posts_action';

// css
// import 'materialize-css';

class Posts extends Component {
    componentWillMount() {
        this.props.fetch_posts();
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
          this.props.posts.unshift(nextProps.post.post);
        }
      }


    render() {
        let posts = this.props.posts.map((post) => {
                let post_due_date = null;
                if (post.post_due_date) {
                    post_due_date =  <h5 className="grey-text">Due Date: {post.post_due_date}</h5>
                  }
                
                return (<li key={post.id}>
                    <h4 className="grey-text uppercase">{post.post_title}</h4>
                    <p className="white-text">{post.post_body}</p>
                    {post_due_date}
                    <hr></hr><br />
                </li>)
        });

        return (
        <div className="Posts">
            {posts}
        </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    post: state.posts.item
  });
  
  export default connect(mapStateToProps, {fetch_posts})(Posts);