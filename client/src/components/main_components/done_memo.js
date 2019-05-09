import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { done_memo } from '../../actions/done_post_action';

class DoneMemo extends Component {
  constructor() {
    super();
    this.close_done_memo_modal = this.close_done_memo_modal.bind(this);
    this.set_memo_done = this.set_memo_done.bind(this);
  }


  close_done_memo_modal() {
      document.getElementById('done-memo-container').style.backgroundColor = 'transparent';
      let delete_memo_modal = document.getElementById('done-memo-container');
      delete_memo_modal.classList.add('animated');
      delete_memo_modal.classList.add('bounceOutUp');
      setTimeout(() => {
          delete_memo_modal.className = '';
          delete_memo_modal.style.display = 'none';
          delete_memo_modal.style.backgroundColor = 'rgba(0, 0, 0, 0.397)';
      clearTimeout();
      }, 1000);

  }


    set_memo_done() {
        this.props.done_memo(this.props.memo_to_done)
            .then((response) => {
                this.close_done_memo_modal()
            }).catch((error) => console.log(error));
    }

  render() {
    return (
      <div className="DoneMemo">
          <div id="done-memo-container">
            <div id="done-memo-confirm-box" className="animated shake light-green darken-3">
                <div className="center">
                    <span id="done-memo-close"><i className="material-icons white-text" onClick={this.close_done_memo_modal}>close</i></span>
                    <h6 className="white-text">Wanna mark this memo as done?
                    This action is irreversible</h6><br />
                    <span><i className="material-icons grey-text text-darken-4 animated wobble infinite pointer" onClick={this.set_memo_done}>check
                    </i></span><i className="material-icons yellow-text">warning</i>
                </div>    
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    memo_to_done: state.posts.post_to_done,
  }
}

export default withRouter(connect(mapStateToProps, {done_memo})(DoneMemo));