import React, { Component } from 'react'
import axios from 'axios';
import M from 'materialize-css';

class NewMemo extends Component {

  constructor() {
    super();
    this.state = {
      new_memo_title: '',
      new_memo_content: ''
    }
    this.close_new_memo_modal = this.close_new_memo_modal.bind(this);
    this.fetch_field_data = this.fetch_field_data.bind(this);
    this.save_new_memo = this.save_new_memo.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  fetch_field_data(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  save_new_memo() {
    let due_date = document.getElementById('new_memo_due_date').value;
    console.log(due_date);
    if (this.state.new_memo_title === '' || this.state.new_memo_content === '') {
      return M.toast({html: 'complete the fucking required fields', classes: 'rounded red darken-2'})
    }
    axios.post('/api/save_new_memo', {
      new_memo_content: this.state.new_memo_content,
      new_memo_title: this.state.new_memo_title,
      new_memo_due_date: due_date
    }).then((response) => {
      console.log(response);
      this.close_new_memo_modal();
    }).catch((error) => console.log(error));
  }

  close_new_memo_modal() {
    let new_memo_modal = document.getElementById('new-memo-modal');
    new_memo_modal.classList.add('animated');
    new_memo_modal.classList.add('bounceOutUp');
    setTimeout(() => {
      new_memo_modal.className = '';
      new_memo_modal.style.display = 'none';
    
      clearTimeout();
    }, 1000);
    this.setState(
      {
        new_memo_title: '',
        new_memo_content: ''
      }
    );
    document.getElementById('new_memo_title').value = '';
    document.getElementById('new_memo_content').value = '';
    document.getElementById('new_memo_due_date').value = '';
  }

  render() {
    return (
      <div className="NewMemo">
        <div id="new-memo-modal" className=" ">
            <div id="new-modal-form-holder" className="animated bounceInDown light-green darken-2">
              <div className="">
                <form>
                  <h3 className="white-text">New Memo</h3>

                  <span id="save-new-memo-mobile"><i onClick={this.save_new_memo} className="material-icons grey-text text-darken-4 medium">save</i></span>

                  <span id="new-memo-close" onClick={this.close_new_memo_modal}><i className="material-icons white-text medium">close</i></span>
                  <div className="input-field">
                    <i className="material-icons prefix white-text">title</i>
                    <input id="new_memo_title" name="new_memo_title" onChange={this.fetch_field_data} value={this.state.new_memo_title} type="text" />
                    <label htmlFor="new_memo_title">Title</label>
                  </div>

                  <div className="input-field">
                    <i className="material-icons prefix white-text">create</i>
                    <textarea id="new_memo_content" name="new_memo_content" onChange={this.fetch_field_data} value={this.state.new_memo_content} type="text" className=""></textarea>
                  </div>

                  <div className="input-field">
                    <i className="material-icons prefix white-text">date_range</i>
                    <input type="text" id="new_memo_due_date" className="datepicker"></input>
                    <label htmlFor="new_memo_due_date">Due Date(optional)</label>
                  </div>

                  <span id="save-new-memo"><i onClick={this.save_new_memo} className="material-icons grey-text text-darken-4 medium">save</i></span>
                </form>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default NewMemo;