import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { delete_memo } from '../../actions/delete_post_action';

class DeleteMemo extends Component {  
    constructor() {
        super();
        this.close_delete_memo_modal = this.close_delete_memo_modal.bind(this);
        this.delete_this_fucking_memo = this.delete_this_fucking_memo.bind(this);
    }


    close_delete_memo_modal() {
        document.getElementById('delete-memo-container').style.backgroundColor = 'transparent';
        let delete_memo_modal = document.getElementById('delete-memo-container');
        delete_memo_modal.classList.add('animated');
        delete_memo_modal.classList.add('bounceOutUp');
        setTimeout(() => {
            delete_memo_modal.className = '';
            delete_memo_modal.style.display = 'none';
            delete_memo_modal.style.backgroundColor = 'rgba(0, 0, 0, 0.397)';
        clearTimeout();
        }, 1000);
    }

    delete_this_fucking_memo() {
        this.props.delete_memo(this.props.memo_to_delete)
            .then((response) => {
                this.close_delete_memo_modal()
            }).catch((error) => console.log(error));
    }


  render() {
    return (
      <div className="DeleteMemo">
        <div id="delete-memo-container">
            <div id="delete-memo-confirm-box" className="animated shake">
                <div className="center">
                    <span id="delete-memo-close" onClick={this.close_delete_memo_modal}><i className="material-icons white-text">close</i></span>
                    <h6 className="white-text">Are you sure about deleting this memo?
                    This action is irreversible</h6><br />
                    <span><i className="material-icons grey-text text-darken-4 animated wobble infinite pointer"
                    onClick={this.delete_this_fucking_memo}>delete</i></span>
                </div>    
            </div>
        </div>
      </div>
      
    )


  }
}

const mapStateToProps = (state) => {
    return {
      memo_to_delete: state.posts.post_to_delete,
    }
  }

export default withRouter(connect(mapStateToProps, {delete_memo})(DeleteMemo));
