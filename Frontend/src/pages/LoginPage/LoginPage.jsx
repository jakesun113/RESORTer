import React, { Component } from "react";
import "../../css/Homepage/LoginWindow.css";
import { Redirect } from "react-router-dom";
import FacebookLogin from "../../components/template/FacebookLoginBtn";
import GoogleLogin from "../../components/template/GoogleLoginBtn";
import axios from "axios/index";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import AlertWindow from "../../components/template/AlertWindow";
//TODO: add alert (slide down for 3 seconds) when redirect to login page due to token expired
class LoginPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectToReferrer: false,
      rememberMe: false,
      emailExisted: true,
      wrongPwd: false,
      isActive: true,
      emailDuplicated: false,
      duplicatedProvider: null,
      authenticationFailed: false,
      user_pic:
        "https://static.wixstatic.com/media/25b4a3_993d36d976a24a77ba7bb9267d05bd54~mv2.png/v1/fill/w_96,h_96,al_c,usm_0.66_1.00_0.01/25b4a3_993d36d976a24a77ba7bb9267d05bd54~mv2.png"
    };

    this.toggleRememberMe = this.toggleRememberMe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state);
    window.scrollTo(0, 0);
  }

  toggleRememberMe() {
    this.setState({
      rememberMe: !this.state.rememberMe
    });
  }

  handleChange() {
    this.setState({
      emailExisted: true,
      isActive: true,
      wrongPwd: false,
      emailDuplicated: false
    });

    document.getElementById("loginEmail").style.borderColor = "";
    document.getElementById("loginpwd").style.borderColor = "";
  }

  //Resend confirmation Email
  handleResendEmail() {
    fetch("http://127.0.0.1:3333/api/resendConfirmEmail", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementById("loginEmail").value
      })
    })
      .then(result => {
        result.json();
      })
      .then(response => {
        alert("Email Resend Successfully");
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginpwd").value;
    let BaseURL = "http://127.0.0.1:3333/api/login/";
    let postData;
    postData = {
      email: email,
      password: password,
      provider: "email"
    };

    await axios.post(BaseURL + "email", postData).then(
      /*Proceed subsequent actions based on value */
      response => {
        //handle authentication failed
        if (response.data.authenticationFailed === true) {
          console.log("authentication failed");
          this.setState({
            authenticationFailed: true,
            redirect: false
          });
        }
        //handle login user is not existed
        else if (response.data.emailExisted === false) {
          console.log("user not exist");
          this.setState({
            emailExisted: false,
            redirect: false
          });
        }
        //handle duplicated login with other ways
        else if (response.data.emailDuplicated === true) {
          console.log("user has logged in with another account");
          this.setState({
            emailDuplicated: true,
            duplicatedProvider: response.data.duplicatedProvider,
            redirect: false
          });
        }
        //handle email is not activated
        else if (response.data.isActive === false) {
          console.log("user email is not activated");
          this.setState({
            isActive: false,
            redirect: false
          });
        }
        //handle password is not matched
        else if (response.data.wrongPwd === true) {
          console.log("wrong password");
          this.setState({
            wrongPwd: true,
            redirect: false
          });
        }
        //login success
        else {
          console.log("login success");
          let userSocialData;
          userSocialData = {
            name: response.data.name,
            //TODO: to be changed
            provider_pic: this.state.user_pic
          };
          sessionStorage.setItem(
            "userSocialData",
            JSON.stringify(userSocialData)
          );
          let userToken;
          userToken = {
            token: response.data.token
          };
          sessionStorage.setItem("userToken", JSON.stringify(userToken));

          //save token into cookie
          if (this.state.rememberMe) {
            let date = new Date();
            date.setTime(date.getTime() + +2592000);
            const { cookies } = this.props;

            console.log(cookies);
            cookies.set("access-token", response.data.token, {
              expires: date,
              path: "/"
            });
            cookies.set("user-name", response.data.name, {
              expires: date,
              path: "/"
            });
            //TODO: to be changed
            cookies.set("user-pic", this.state.user_pic, {
              expires: date,
              path: "/"
            });
          }

          //if come to login because token has been expired,
          //redirect to where it comes from
          if (this.props.location.state) {
            const { from } = this.props.location.state;
            console.log(from);

            this.setState({
              redirect: false,
              redirectToReferrer: true
            });
          } else {
            this.setState({
              redirect: true
            });
          }
        }
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    //if come to login because token has been expired,
    //redirect to where it comes from
    if (this.props.location.state) {
      const { from } = this.props.location.state;
      if (this.state.redirectToReferrer) {
        console.log(from);
        return <Redirect to={from} />;
      }
    }

    return (
      <React.Fragment>
        <br />
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
                <span style={{ fontSize: "2.5rem" }}>Log In</span>
                <br />
                New to this site?
                <span>
                  &ensp;
                  <a href="/sign-up">Sign Up</a>
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
            <div
              className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
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
                  id="loginEmail"
                  className="form-control"
                  style={{ width: "100%" }}
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={this.handleChange}
                  required
                  autoFocus
                />

                {this.state.emailExisted ? null : (
                  <div
                    id="emailError"
                    style={{ color: "red", fontWeight: "bolder" }}
                  >
                    Email does not exist
                    <span hidden>
                      {
                        (document.getElementById(
                          "loginEmail"
                        ).style.borderColor = "red")
                      }
                    </span>
                  </div>
                )}
                {this.state.emailDuplicated ? (
                  <div style={{ color: "red", fontWeight: "bolder" }}>
                    user has logged in as {this.state.duplicatedProvider}
                    <span hidden>
                      {
                        (document.getElementById(
                          "loginEmail"
                        ).style.borderColor = "red")
                      }
                    </span>
                  </div>
                ) : null}
                {this.state.isActive === false ? (
                  <AlertWindow
                    displayText="Sorry, your email has not been activated, do you want to send a confirmation email now?"
                    btnNum="1"
                    mode="linkMode"
                    btnText="OK"
                    linkTo="/"
                    onHandleClose={() => {
                      this.handleResendEmail();
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            </div>
            <br />
            {/* password */}
            <div className="row">
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
              <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <input
                  id="loginpwd"
                  className="form-control"
                  style={{ width: "100%" }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  required
                />
                <span
                  id="icon_showpassword"
                  style={{
                    float: "right",
                    marginRight: "1ex",
                    marginTop: "-3ex",
                    position: "relative",
                    zIndex: "2"
                  }}
                  className="fa fa-fw fa-eye"
                  onClick={() => {
                    if (
                      document.getElementById("icon_showpassword").className ===
                      "fa fa-fw fa-eye"
                    ) {
                      document.getElementById("icon_showpassword").className =
                        "fa fa-fw fa-eye fa-eye fa-eye-slash";
                      document.getElementById("loginpwd").type = "text";
                    } else {
                      document.getElementById("icon_showpassword").className =
                        "fa fa-fw fa-eye";
                      document.getElementById("loginpwd").type = "password";
                    }
                  }}
                />
                {this.state.wrongPwd ? (
                  <div style={{ color: "red", fontWeight: "bolder" }}>
                    Password is wrong
                    <span hidden>
                      {
                        (document.getElementById("loginpwd").style.borderColor =
                          "red")
                      }
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            </div>
            <br />

            {/* forget pass */}
            <div className="row">
              <div className="col-sm-2 col-md-3 col-lg-4" />
              <div className="col-5 col-sm-3 col-md-2 col-lg-2">
                <div className="custom-control custom-checkbox">
                  <input
                    className="form-control custom-control-input"
                    type="checkbox"
                    id="rememberMe"
                    onChange={this.toggleRememberMe}
                    value={this.state.rememberMe}
                  />
                  <label
                    style={{ whiteSpace: "nowrap" }}
                    className="custom-control-label"
                    htmlFor="rememberMe"
                  >
                    Remember Me
                  </label>
                </div>
              </div>
              {/* space */}
              <div className="col-2 col-sm-2 col-md-2 col-lg-1" />
              {/* forget pass */}
              <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                <a style={{ whiteSpace: "nowrap" }} href="/forgot-password">
                  Forgot password?
                </a>
              </div>
              <div className="col-1 col-sm-2 col-md-3 col-lg-4" />
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
                    Log In
                  </button>
                  {this.state.authenticationFailed ? (
                    <div style={{ color: "red", fontWeight: "bolder" }}>
                      Authentication failed - Internal server error
                    </div>
                  ) : null}
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

export default withCookies(LoginPage);
