import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

// redux actions
import { fetch_posts } from '../../actions/fetch_posts_action';
import { set_delete } from '../../actions/set_delete_action';
import { set_done } from '../../actions/set_done_action';
import { update_post } from  '../../actions/update_post_action';
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
          nextProps.post['post_due_date_local'] = new Date(nextProps.post.post_due_date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
          this.props.posts.unshift(nextProps.post);
          this.props.empty_state_props();
        }
        
        if (nextProps.post_splice) {
          let post_index = this.props.posts.indexOf(this.props.memo_to_delete);
          
          this.props.posts.splice(post_index, 1);
        }

        if (nextProps.post_done) {
          let post_id = this.props.memo_to_done.id;
          document.getElementById(`check_${post_id}`).classList.remove('hide');
          document.getElementById(`warning_${post_id}`).classList.add('hide');
          document.getElementById(`mark_as_done_${post_id}`).style.display = 'none';
          document.getElementById(`edit_${post_id}`).style.display = 'none';
          if (this.props.memo_to_done.post_due_date) {
            document.getElementById(`due_date_local_${this.props.memo_to_done.id}`).className = 'white-text';
          }
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

    show_done_memo(memo) {
      this.props.set_done(memo);
      let modal_container = document.getElementById("done-memo-container");
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
      if (memo.post_due_date) {
        let date_input = document.getElementById(`edit_memo_due_date_${memo.id}`);
        let year = new Date(memo.post_due_date).toLocaleDateString('en-US', {year: 'numeric'});
        let month = new Date(memo.post_due_date).toLocaleDateString('en-US', {month: '2-digit'});
        let day = new Date(memo.post_due_date).toLocaleDateString('en-US', {day: '2-digit'});
        date_input.value = `${year}-${month}-${day}`;
      }
      textarea.focus();
    }

    save_edit_memo(memo_id) {
      let new_memo_body = document.getElementById(`edit-post-textarea_${memo_id}`).value;
      let new_memo_title = document.getElementById(`edit_memo_title_input_${memo_id}`).value;
      let new_memo_due_date = null;
      if (document.getElementById(`edit_memo_due_date_${memo_id}`).value) {
        new_memo_due_date = document.getElementById(`edit_memo_due_date_${memo_id}`).value;
        if (new Date() > new Date(new_memo_due_date)) {
          return M.toast({html: 'Invalid due date. You cannot choose a past date or a current date', classes: 'rounded red darken-2'});
        }
      }


      if (new_memo_title === '' || new_memo_body === '') {
        return M.toast({html: 'complete the fucking required fields', classes: 'rounded red darken-2'});
      }

      let updated_memo = {
        title: new_memo_title,
        body: new_memo_body,
        due_date: new_memo_due_date,
        memo_id: memo_id,
      }

      this.props.update_post(updated_memo).then((response) => {
        this.close_edit_view(memo_id);
        document.getElementById(`memo-title_${memo_id}`).innerHTML = new_memo_title;
        document.getElementById(`post-body_${memo_id}`).innerHTML = new_memo_body;
      
        if (new_memo_due_date) {
          document.getElementById(`post_due_date_${memo_id}`).innerHTML = 'Due Date: ' + new Date(new_memo_due_date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
          document.getElementById(`post_due_date_${memo_id}`).style.display = 'block';
        }
        else {
          document.getElementById(`post_due_date_${memo_id}`).style.display = 'none';
        }

        }).catch((error) => console.log(error));

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
              let edit_memo = null;
              let done_memo = null;
              let warning = 'hide';
              let sad = 'hide';
              let due_date_color = 'white-text'
              let check = '';

              if (!post.is_done) {
                check = 'hide'
                edit_memo = <span id={`edit_${post.id}`} onClick={this.edit_memo_show.bind(this, post)}><i className="material-icons white-text pointer post-tool-icons">edit</i></span>
                done_memo = <span id={`mark_as_done_${post.id}`} onClick={this.show_done_memo.bind(this, post)}><i className="material-icons white-text pointer post-tool-icons">check</i></span>
              }
              if (post.post_due_date) {
                let date_diff = new Date(post.post_due_date) - new Date();
                let due_check = date_diff < 432000000;
                if (due_check && !post.is_done) {
                  warning = '';
                  due_date_color = 'yellow-text';
                }
                if ((date_diff < 0) && !post.is_done) {
                    sad = '';
                    warning = 'hide';
                    due_date_color = 'red-text';
                }
                
              }

                 
              if (post.post_due_date) {
                post_due_date = <h5 id={`post_due_date_${post.id}`} className="white-text">Due Date: <span className={due_date_color} id={`due_date_local_${post.id}`}>{post.post_due_date_local}</span></h5>;
              }
              else {
                post_due_date = <h5 id={`post_due_date_${post.id}`} className="white-text due-date-catcher">null</h5>;
              }
              
              return (<li key={post.id}>
                      <div className="title-span">
                        <h5 className="grey-text uppercase memo-title" id={`memo-title_${post.id}`}><i className="material-icons white-text">note</i><span className="title-span">&nbsp;{post.post_title}</span>
                        <span className="notifier-span">
                          <i className={`material-icons light-green-text text-darken-2 right done ${check}`} id={`check_${post.id}`}>check</i>
                          <i className={`material-icons yellow-text text-darken-1 right warning ${warning}`} id={`warning_${post.id}`}>warning</i>
                          <i className={`material-icons red-text text-darken-1 right sad ${sad}`}>sentiment_very_dissatisfied</i>
                        </span>
                        </h5>
                      </div>

                          <div className="input-field edit-memo-title" maxLength="25" id={`edit_memo_title_${post.id}`}>
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
                    {edit_memo}
                    {done_memo}
                    <span id={`delete_${post.id}`} onClick={this.show_delete_memo.bind(this, post)}><i className="material-icons red-text text-darken-1 pointer post-tool-icons">delete</i></span>
                  </div>
                 <br /><hr></hr><br />
              </li>)
      }); 
      return posts;
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
            <div className="right-align">
              <button id="prev" className="btn waves-effect waves-light orange" onClick={this.prev.bind(this)}>Prev</button>
              <button id="next" className="btn waves-effect waves-light" onClick={this.next.bind(this)}>Next</button>
            </div>
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
    post_splice: state.posts.post_splice,
    post_done: state.posts.post_done,
    memo_to_done: state.posts.post_to_done
  }
}

  export default withRouter(connect(mapStateToProps, {fetch_posts, set_delete, set_done, update_post, empty_state_props})(Posts));
