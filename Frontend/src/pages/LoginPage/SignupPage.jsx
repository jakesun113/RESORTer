import React, { Component } from "react";
import "../../css/Homepage/LoginWindow.css";
import FacebookLogin from "../../components/template/FacebookLoginBtn";
import GoogleLogin from "../../components/template/GoogleLoginBtn";
import AlertWindow from "../../components/template/AlertWindow";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertWindow: false,
      isSignUp: false,
      provider: "email",
      emailExisted: false
    };
  }

  // email signup
  handleChange = () => {
    this.setState({
      emailExisted: false
    });

    //confirmation of repeat password
    this.validate();
    //set the border color of email input back to default
    document.getElementById("registerEmail").style.borderColor = "";
  };

  validate = async () => {
    let isError = false;
    let registerPassword = document.getElementById("registerPassword");
    let confirmPassword = document.getElementById("repeatPassword");

    if (registerPassword.value.length < 6) {
      registerPassword.setCustomValidity("The minimum length of password is 6");
      isError = true;
    } else {
      registerPassword.setCustomValidity("");
    }

    if (registerPassword.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Repeat Password does not match");
      isError = true;
    } else {
      confirmPassword.setCustomValidity("");
    }

    return isError;
  };

  handleSubmit = event => {
    event.preventDefault();

    //Proceed Validation
    const err = this.validate();
    err.then(result => {
      if (!result) {
        fetch("http://127.0.0.1:3333/api/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            registerEmail: document.getElementById("registerEmail").value,
            registerPassword: document.getElementById("registerPassword").value,
            provider: "email"
          })
        })
          .then(result => result.json())
          .then(
            /*Proceed subsequent actions based on value */
            response => {
              //Register Successes
              if (response.status === "success") {
                this.setState({
                  showAlertWindow: true
                });

                document.getElementById("registerEmail").setCustomValidity("");
              }
              //Register Fails
              else if (response.status === "fail") {
                this.setState({
                  emailExisted: true
                });
              }
            }
          );
      } else {
        alert("Validation Error, Please Input your information again");
      }
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleResendEmail() {
    axios
      .post("http://127.0.0.1:3333/api/resendConfirmEmail", {
        email: document.getElementById("registerEmail").value
      })
      .then(response => {
        //If email is successfully sent
        if (response.data.status === "success") {
          alert("Email Resend Successfully, Please Confirm again");
        } else if (response.data.status === "fail") {
          alert("Error: Please Refresh and Resend again");
        }
      });
  }

  render() {
    if (this.state.isSignUp) {
      return <Redirect to={"/"} />;
    }

    let alertWindow;
    if (this.state.showAlertWindow) {
      let link = (
        <a
          className="badge badge-pill badge-light"
          style={{ color: "red", textDecoration: "underline" }}
          onClick={() => {
            this.handleResendEmail();
          }}
        >
          Did not receive? Click to Resend
        </a>
      );

      alertWindow = (
        <AlertWindow
          displayText={
            <div>
              Congratulation! Last step is to confirm your account by your email
              :) {link}
            </div>
          }
          btnNum="1"
          btnText="OK"
          mode="customMode"
          onHandClick={() => {
            this.setState({ isSignUp: true, showAlertWindow: false });
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <br />
        {alertWindow}
        <div className="container">
          {/* title */}
          <div className="row">
            <div className="col" />
            <div className="col">
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "50px",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>Sign Up</span>
                <br />
                Already a member?
                <span>
                  &ensp;
                  <a href="/login">Log In</a>
                </span>
              </div>
            </div>
            <div className="col" />
          </div>
          {/* facebook login */}
          <div className="row">
            <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
              <FacebookLogin />
            </div>
            <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
          </div>
          <br />
          {/* google login */}
          <div className="row">
            <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
              <GoogleLogin />
            </div>
            <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
          </div>
          <br />
          {/* or line */}
          <div className="row">
            <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
              <p className="or-style">
                <span>or</span>
              </p>
            </div>
            <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
          </div>
          <br />
          {/* login with email*/}
          <form
            className="form-signin"
            onSubmit={this.handleSubmit}
            data-toggle="validator"
          >
            {/* email */}
            <div className="row">
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
              <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <input
                  id="registerEmail"
                  className="form-control"
                  style={{ width: "100%" }}
                  type="email"
                  placeholder="Email Address"
                  name="registerEmail"
                  onChange={this.handleChange}
                  required
                  autoFocus
                />
                {this.state.emailExisted ? (
                  <div style={{ color: "red", fontWeight: "bolder" }}>
                    Email Existed
                    <span hidden>
                      {
                        (document.getElementById(
                          "registerEmail"
                        ).style.borderColor = "red")
                      }
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            </div>
            <br />
            {/* password */}
            <div className="row">
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
              <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <input
                  className="form-control"
                  style={{ width: "100%" }}
                  type="password"
                  placeholder="Password"
                  id="registerPassword"
                  name="registerPassword"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            </div>
            <br />
            {/* repeat password */}
            <div className="row">
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
              <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <input
                  className="form-control"
                  style={{ width: "100%" }}
                  id="repeatPassword"
                  name="repeatPassword"
                  onChange={this.handleChange}
                  placeholder="Repeat Password"
                  type="password"
                  required
                />
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            </div>
            <br />
            {/* login btn */}
            <div>
              <div className="row">
                <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                  <button
                    className="login_btn_in_loginwindow"
                    style={{ width: "100%" }}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
              </div>
            </div>
            <br />
          </form>
          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default SignUpPage;
