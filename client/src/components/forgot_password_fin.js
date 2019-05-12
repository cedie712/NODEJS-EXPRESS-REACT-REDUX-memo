import React, { Component } from 'react'
import axios from 'axios';


class ForgotPasswordFin extends Component {
    constructor() {
        super();
        this.state = {
            is_allowed: false
        }
    }
    componentDidMount() {
        axios.post('/api/user/forgot_password_final_step', {
            reset_token: this.props.match.params.reset_token
        })
        .then((response) => {
            this.setState({is_allowed: true});
        })
        .catch((error) => {
            console.log(error.response.data);
        })
    }
    render() {
        let fin_step_form = <div>not allowed</div>;
        if (this.state.is_allowed) {
            fin_step_form = <div>allowed</div>
        }
        return (
            <div className="ForgotPasswordFin">
                {fin_step_form}
            </div>
        )
    }
}

export default ForgotPasswordFin;
