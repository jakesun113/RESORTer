import React, {Component} from "react";
import {Link} from "react-router-dom";

class ConfirmationEmailPage extends Component {
    constructor() {
        super();
        this.state = {
            isValidToken: 'null'
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3333/api/activateUser', {
            method: 'put',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                token: this.props.match.params.token,
                id: this.props.match.params.id
            })
        })
            .then(result => result.json())
            .then(
                /*Proceed subsequent actions based on value */
                response => {
                    //console.log(response.status);
                    if (response.status === 'success') {
                        this.setState({
                            isValidToken: 'success'
                        })
                    } else if (response.status === 'fail') {
                        this.setState({
                            isValidToken: 'fail'
                        })
                    } else if (response.status === 'activated') {
                        this.setState({
                            isValidToken: 'activated'
                        })
                    }
                })
    }

    //Resend confirmation Email
    handleResendEmail() {
        fetch('http://127.0.0.1:3333/api/resendConfirmEmail', {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({id: this.props.match.params.id})
        }).then(result => {
            result.json()
        })
            .then(response => {
                alert('Email Resend Successfully')
            })
    }


    //TODO: change confirm page UI
    render() {
        let tip = '';
        let click;
        if (this.state.isValidToken === 'success') {
            click = <Link to={`/login`} className="badge badge-pill badge-light"
                          style={{color: 'red', textDecoration: 'underline'}}>Login</Link>
            tip =
                <div className="font-weight-light" style={{fontSize: '18px'}}>Congratulation, Your account is activated
                    successfully, Please login</div>

        } else if (this.state.isValidToken === 'fail') {

            click = <a className="badge badge-pill badge-light" style={{color: 'red', textDecoration: 'underline'}}
                       onClick={() => {
                           this.handleResendEmail()
                       }}>Click for resend confirmation email :)</a>
            tip = <div className="font-weight-light">Sorry, you token has expired, please try to confirm your email
                again</div>;

        } else if (this.state.isValidToken === 'activated') {

            click = <Link to={`/login`} className="badge badge-pill badge-light"
                          style={{color: 'red', textDecoration: 'underline'}}>Login</Link>
            tip =
                <div className="font-weight-light" style={{fontSize: '18px'}}>Woops, Your account is already activated,
                    Please</div>;

        } else {
            click = <a className="badge badge-pill badge-light" style={{color: 'red', textDecoration: 'underline'}}
                       onClick={() => {
                           this.handleResendEmail()
                       }}>Click for resend confirmation email :)</a>
            tip = <div className="font-weight-light">Waiting for confirmation, Please wait</div>

        }
        return (
            <div className="card text-center">
                <div className="card-header">

                </div>
                <div className="card-body">
                    <h5 className="card-title">Email Confirmation</h5>
                    <p className="card-text">{tip}</p>
                    <a href="#">{click}</a>
                </div>
                <div className="card-footer text-muted">
                    Please follow the instruction above to finish confirmation :)
                </div>
            </div>
        );
    }
}

export default ConfirmationEmailPage;
