import React, { Component } from "react";
import AlertWindow from "../../components/template/AlertWindow";


// This is the page is to fill and confirm the new password
export default class ResetPasswordPage extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      id: null,
      // if the token has been expired
      isValidToken: true,
      // if the modal window need to show
      isShow: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentDidMount() {
    this.setState({
      token: this.props.match.params.token,
      id: this.props.match.params.id
    });
  }

  /* API:/api/reset-password
     request: {'token': TOKEN, 'id': ID, 'password': NEWPASSWORD}
     response:{'status': 'success/fail'}
  */ 
  async handleSubmit(e) {
    e.preventDefault();
    const { token, id } = this.state;
    const password = document.getElementById("inputNewPassword").value;

    fetch("http://127.0.0.1:3333/api/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, id, password })
    })
      .then(result => result.json())
      .then(
        /*Proceed subsequent actions based on value */
        response => {
          if (response.status === "success") {
            this.setState({
              isShow: true
            });
          } else {
            this.setState({
              isValidToken: false,
              isShow: true
            });
          }
        }
      );
  }

  // Valid the input password
  validatePassword() {
    var password = document.getElementById("inputNewPassword"),
      confirmPassword = document.getElementById("retypePassword");
    // handle if the length of input password is less than 6
    if (password.value.length < 6) {
      password.setCustomValidity("The minimum length of password is 6");
    } else {
      password.setCustomValidity("");
    }
    // handle if the confirm password does not match the new password
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match. Try again.");
    } else {
      confirmPassword.setCustomValidity("");
    }
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <form onSubmit={this.handleSubmit} data-toggle="validator">
          {/* title */}
          <div className="row">
            <div className="col" />
            <div className="col">
              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h1 style={{ fontSize: "2.5rem" }}>Reset Password</h1>
                <br />
                <span>&ensp; Enter your new password below</span>
              </div>
            </div>
            <div className="col" />
          </div>

          {/* password input */}
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <input
                type="password"
                name="password"
                placeholder="Enter a new password"
                className="form-control"
                id="inputNewPassword"
                onChange={this.validatePassword}
                required
                autoFocus
              />
            </div>
            <div className="col-md-4" />
          </div>
          <br />
          {/* password input again */}
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Try again:"
                className="form-control"
                id="retypePassword"
                onChange={this.validatePassword}
                required
              />
            </div>
            <div className="col-md-4" />
          </div>
          <br />
          {/* btn*/}
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <button
                type="submit"
                className="login_btn_in_loginwindow"
                style={{ width: "100%" }}
              >
                Reset Password
              </button>
            </div>
            <div className="col-md-4" />
          </div>
        </form>
        <br />
        {/* change password success popup */}
        {this.state.isValidToken && this.state.isShow ? (
          <AlertWindow
            displayText="Your password has been changed."
            btnNum="1"
            mode="linkMode"
            btnText="OK"
            linkTo="/login"
            onHandleClose={() => {
              this.setState({ isShow: false });
            }}
          />
        ) : null}

        {this.state.isValidToken === false && this.state.isShow ? (
          <AlertWindow
            displayText="Sorry, you token has expired, please enter email address to reset password again"
            btnNum="1"
            mode="linkMode"
            btnText="OK"
            linkTo="/forgot-password"
            onHandleClose={() => {
              this.setState({ isShow: false });
            }}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
