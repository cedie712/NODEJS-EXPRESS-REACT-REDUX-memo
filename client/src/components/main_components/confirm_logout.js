import React, { Component } from 'react'
import axios from 'axios';

class ConfirmLogout extends Component {

    close_logout_modal() {
        let logout_modal = document.getElementById('logout-container');
        logout_modal.style.backgroundColor = 'transparent';
        logout_modal.classList.add('animated');
        logout_modal.classList.add('bounceOutUp');
        setTimeout(() => {
            logout_modal.className = '';
            logout_modal.style.display = 'none';
            logout_modal.style.backgroundColor = 'rgba(0, 0, 0, 0.397)';
            clearTimeout();
        }, 1000);
    }

    logout() {
        axios.get('/api/user/signout')
            .then((response) => {
                this.close_logout_modal();
                setTimeout(() => {
                    window.location = '/';
                    clearTimeout();
                }, 800);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="ConfirmLogout">
                <div id="logout-container">
                    <div id="logout-confirm-box" className="animated shake">
                        <div className="center">
                            <span id="logout-close"><i className="material-icons" onClick={this.close_logout_modal.bind(this)}>close</i></span>
                            <h6 className="black-text">You didn't misclicked the logout button right?</h6><br />
                            <span><i className="material-icons grey-text text-darken-4 animated wobble infinite pointer"
                            onClick={this.logout.bind(this)}>exit_to_app</i></span><i className="material-icons red-text">warning</i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmLogout;