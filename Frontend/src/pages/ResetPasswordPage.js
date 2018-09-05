import React, {Component} from "react";
import AlertWindow from "../components/template/AlertWindow"
//todo: change reset password page UI (consistent with change password)

export default class ResetPasswordPage extends Component {
    constructor() {
        super();
        this.state = {
            token: "",
            id: "",
            isValidToken: true,
            isShow: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }


    componentDidMount() {
        const token = this.props.match.params.token;
        const id = this.props.match.params.id;
        this.setState({
            token: token,
            id: id,
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {token, id} = this.state;
        const password = document.getElementById("inputNewPassword").value;


        fetch('http://127.0.0.1:3333/api/reset-password', {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({token, id, password})
        })
            .then(result => result.json())
            .then(
                /*Proceed subsequent actions based on value */
                response => {
                    if (response.status === 'success') {
                        this.setState({
                            isShow: true
                        })
                        //window.alert("Your password has been changed.");
                    } else {
                        this.setState({
                            isValidToken: false,
                            isShow: true
                        })
                        //window.alert("Sorry, you token has expired, please enter email address to reset password again");
                    }
                })
    }


    validatePassword() {
        var password = document.getElementById("inputNewPassword"),
            confirmPassword = document.getElementById("retypePassword");
        if (password.value.length < 6) {
            password.setCustomValidity("The minimum length of password is 6");
        } else {
            password.setCustomValidity('');
        }
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match. Try again.");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }


    render() {
        return (
            <React.Fragment>
                <form
                    onSubmit={this.handleSubmit}
                    data-toggle="validator"
                >
                    <div>
                        <h1>Reset Password</h1>
                        <p>Enter your new password below</p>
                        <div className="col-md-8">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter a new password"
                                className="form-control"
                                id="inputNewPassword"
                                onChange={this.validatePassword}
                                required/>
                        </div>
                        <div className="col-md-8">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Try again:"
                                className="form-control"
                                id="retypePassword"
                                onChange={this.validatePassword}
                                onKeyUp={this.validatePassword}
                                required/>
                        </div>
                        <div className="col-md-8">
                            <button type="submit" className="send_password_btn">
                                Reset Password
                            </button>
                        </div>
                    </div>

                </form>
                {/* change password success popup */}
                {this.state.isValidToken && this.state.isShow ? (
                    <AlertWindow
                        displayText="Your password has been changed."
                        btnNum="1"
                        mode="linkMode"
                        btnText="OK"
                        linkTo="/login"
                        onHandleClose={() => {
                            this.setState({isShow: false})
                        }}
                    />
                ) : (
                    ""
                )}

                {this.state.isValidToken === false && this.state.isShow ? (
                    <AlertWindow
                        displayText="Sorry, you token has expired, please enter email address to reset password again"
                        btnNum="1"
                        mode="linkMode"
                        btnText="OK"
                        linkTo="/forgot-password"
                        onHandleClose={() => {
                            this.setState({isShow: false})
                        }}
                    />
                ) : (
                    ""
                )}
            </React.Fragment>


        );
    }

}




