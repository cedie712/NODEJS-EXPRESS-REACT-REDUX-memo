import React, { Component } from 'react'

class NewMemo extends Component {
  render() {
    return (
      <div className="NewMemo">
        <div id="new-memo-modal" className="">
            <div id="new-modal-form-holder" className="animated bounceInDown light-green darken-2">
              <div className="">

                <h3 className="white-text">New Memo</h3>
                <div class="input-field">
                  <i class="material-icons prefix">title</i>
                  <input id="new_memo_title" type="text" />
                  <label htmlFor="new_memo_title">Title</label>
                </div>

                <div class="input-field">
                  <i class="material-icons prefix">create</i>
                  <textarea id="new_memo_content" type="text" className=""></textarea>
                </div>

              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default NewMemo;