import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetch_posts } from '../../actions/fetch_posts_action';
import { set_delete } from '../../actions/set_delete_action';
import { empty_state_props } from '../../actions/empty_state_prop';

// css
import M from 'materialize-css';
// import 'materialize-css';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
    }
  }

    componentDidMount() {
        M.AutoInit();
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


    edit_memo_show(memo) {
      document.querySelectorAll('.edit-memo-title').forEach((div) => {
        div.style.display = 'none';
      });
      document.querySelectorAll('.edit-post-area').forEach((div) => {
        div.style.display = 'none';
      });
      document.querySelectorAll('.memo-title').forEach((div) => {
        div.style.display = 'block';
      });
      document.querySelectorAll('.post-body').forEach((div) => {
        div.style.display = 'grid';
      });
      document.getElementById(`edit_memo_title_${memo.id}`).style.display = 'block';
      document.getElementById(`memo-title_${memo.id}`).style.display = 'none';
      document.getElementById(`edit-post-area_${memo.id}`).style.display = 'grid';
      document.getElementById(`post-body_${memo.id}`).style.display = 'none';

      let textarea = document.getElementById(`edit-post-textarea_${memo.id}`);
      textarea.value = memo.post_body;
      let title_input = document.getElementById(`edit_memo_title_input_${memo.id}`);
      title_input.value = memo.post_title;
      textarea.focus();
    }

    save_edit_memo(memo_id) {
      let new_memo_body = document.getElementById(`edit-post-textarea_${memo_id}`).value;
      let new_memo_title = document.getElementById(`edit_memo_title_input_${memo_id}`).value;
      let new_memo_due_date = document.getElementById(`edit_memo_due_date_${memo_id}`).value;


      if (new_memo_title === '' || new_memo_body === '') {
        return M.toast({html: 'complete the fucking required fields', classes: 'rounded red darken-2'});
      }

      let new_memo = {
        title: new_memo_title,
        body: new_memo_body,
        due_date: new_memo_due_date,
      }

    }

    close_edit_view(memo_id) {
      document.getElementById(`edit-post-area_${memo_id}`).style.display = 'none';
      document.getElementById(`post-body_${memo_id}`).style.display = 'grid';
      document.getElementById(`edit_memo_title_${memo_id}`).style.display = 'none';
      document.getElementById(`memo-title_${memo_id}`).style.display = 'block';
    }

    retrieve_posts () {

      let posts = this.props.posts.map((post) => {
              let post_due_date = null;   
              if (post.post_due_date) {
                  post_due_date = <h5 className="white-text">Due Date: {post.post_due_date}</h5>;
                }
              
              return (<li key={post.id}>

                      <h5 className="grey-text uppercase memo-title" id={`memo-title_${post.id}`}><i className="material-icons white-text">note</i>&nbsp;{post.post_title}&nbsp;
                      <i className="material-icons light-green-text text-darken-2 right done">check</i>
                      <i className="material-icons yellow-text text-darken-1 right warning">warning</i>
                      <i className="material-icons red-text text-darken-1 right sad">sentiment_very_dissatisfied</i>
                      </h5>

                          <div className="input-field edit-memo-title" id={`edit_memo_title_${post.id}`}>
                            <i className="material-icons prefix white-text">title</i>
                            <input type="text" className="edit_memo_title_input" id={`edit_memo_title_input_${post.id}`}></input>
                          </div>


                  <div className="post-body-box">
                    <p className="grey-text post-body" id={`post-body_${post.id}`}>{post.post_body}</p>

                    {/* edit-post-text-area */}
                    <div className="edit-post-area" id={`edit-post-area_${post.id}`}>
           
                      <div className="right-align">
                        <span className="edit-memo-close" onClick={this.close_edit_view.bind(this, post.id)}><i className="material-icons white-text pointer">close</i></span>
                      </div>

                      <textarea type='text' id={`edit-post-textarea_${post.id}`} className="edit-post-textarea"></textarea>
                      <br />
                      <div className="">
  
                          <div className="input-field">
                            <i className="material-icons prefix white-text">date_range</i>
                            <input type="date" id={`edit_memo_due_date_${post.id}`} className="datepicker_ date-picker-edit"></input>
                            <label htmlFor={`edit_memo_due_date_${post.id}`}>Due Date(optional)</label>
                          </div>
                          <div className="center-align">
                          <button type="" id={`save_edit_memo_${post.id}`} onClick={this.save_edit_memo.bind(this, post.id)} className="waves-effect waves-light light-green darken-2 btn  edit_save_memo">Save<i className="material-icons right">save</i>
                            </button>
                        </div>
                      
                      </div>

                    </div>

                  </div>

                  <h6 className="white-text">Created at: {post.createdAt_local}</h6>
                  {post_due_date}
                  <div className="right-align">
                    <span id={`edit_${post.id}`} onClick={this.edit_memo_show.bind(this, post)}><i className="material-icons white-text pointer">edit</i></span>
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
