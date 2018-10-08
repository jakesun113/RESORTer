import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import AlertWindow from "../../components/template/AlertWindow";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import PromptPage from "../../components/template/PromptPage";
import handleLogOut from "../../components/template/HandleLogOut";

class ChangePwdPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get("access-token") || null,
      provider: cookies.get("user-provider") || null,
      isValidToken: true,
      isShow: false,
      wrongPwd: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.token === null && sessionStorage.getItem("userToken")) {
      let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
      this.setState({
        token: tokenData.token
      });
    }

    if (this.state.token === null && sessionStorage.getItem("userSocialData")) {
      let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
      if (userData.provider) {
        this.setState({
          provider: userData.provider
        });
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const orgPassword = document.getElementById("inputOriginalPassword").value;
    const newPassword = document.getElementById("inputNewPassword").value;

    let postData;
    postData = {
      token: this.state.token,
      originPwd: orgPassword,
      newPwd: newPassword
    };

    let BaseURL = "http://127.0.0.1:3333/api/";

    await axios.post(BaseURL + "change-password", postData).then(response => {
      //console.log(response.data);

      //handle token is not valid
      if (response.data.tokenValid === false) {
        console.log("token expired");
        this.setState({
          token: null,
          isValidToken: false,
          isShow: true
        });
      }
      //handle password is not matched
      else if (response.data.wrongPwd === true) {
        console.log("wrong password");
        this.setState({
          wrongPwd: true
        });
      }
      //change success
      else {
        console.log("change success");
        //save token into session
        let sessionData;
        sessionData = {
          token: response.data.token
        };
        sessionStorage.setItem("userToken", JSON.stringify(sessionData));

        //save token into cookie

        let date = new Date();
        date.setTime(date.getTime() + +2592000);
        const { cookies } = this.props;

        //only when user click "remember me", update the token in cookies
        if (cookies.get("access-token")) {
          cookies.set("access-token", this.state.token, {
            expires: date,
            path: "/"
          });

          console.log(
            "token has been extended. Token is: " + cookies.get("access-token")
          );
        }

        this.setState({
          token: response.data.token,
          isValidToken: true,
          isShow: true
        });
      }
    });
  }

  handleChange = () => {
    this.setState({
      wrongPwd: false
    });

    this.validate();
    //set the border color of email input back to default
    document.getElementById("inputOriginalPassword").style.borderColor = "";
  };

  handleLogout = () => {
    const { cookies } = this.props;
    this.setState({
      token: null,
      provider: null
    });

    //remove session and cookies
    handleLogOut(cookies);
  };

  validate = () => {
    let orgPassword = document.getElementById("inputOriginalPassword");
    let newPassword = document.getElementById("inputNewPassword"),
      confirmPassword = document.getElementById("retypePassword");
    if (orgPassword.value.length < 6) {
      orgPassword.setCustomValidity("The minimum length of password is 6");
    } else {
      orgPassword.setCustomValidity("");
    }
    if (newPassword.value.length < 6) {
      newPassword.setCustomValidity("The minimum length of password is 6");
    } else {
      newPassword.setCustomValidity("");
    }
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match. Try again.");
    } else {
      confirmPassword.setCustomValidity("");
    }
  };

  render() {
    const { cookies } = this.props;
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    //if token has been expired, redirect to login page
    //console.log(this.props.location.state);
    if (this.props.location.state) {
      const { lastValid } = this.props.location.state;
      //console.log(lastValid);

      if (!lastValid) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: this.props.location.pathname }
            }}
          />
        );
      }
    }

    //if directly type this page's url, redirect to login page
    if (!sessionStorage.getItem("userToken") && !cookies.get("access-token")) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location.pathname }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <br />

        {/* main window */}
        {this.state.provider !== "email" ? (
          <PromptPage
            text={
              "Sorry, user who logged in with " +
              this.state.provider +
              " cannot change password"
            }
          />
        ) : (
          <form onSubmit={this.handleSubmit} data-toggle="validator">
            <div>
              {/* title */}
              <div className="form-row">
                <div className="form-group col-3" />
                <div
                  className="form-group col-6"
                  style={{ textAlign: "center" }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Change Password
                  </span>
                </div>
                <div className="form-group col-3" />
              </div>

              {/* original password */}
              <div className="form-row">
                <div className="form-group col-4" />
                <div
                  className="form-group col-4"
                  style={{
                    textAlign: "center",
                    background: "black",
                    color: "white"
                  }}
                >
                  <label
                    htmlFor="inputOriginalPassword"
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "uppercase"
                    }}
                  >
                    Enter your original password below
                  </label>
                </div>
                <div className="form-group col-4" />
              </div>

              {/* input for original pass */}
              <div className="form-row">
                <div className="form-group col-4" />
                <div className="form-group col-4">
                  <input
                    type="password"
                    name="orgPassword"
                    placeholder="Enter your original password"
                    className="form-control"
                    id="inputOriginalPassword"
                    onChange={this.handleChange}
                    required
                  />
                  {this.state.wrongPwd ? (
                    <div style={{ color: "red", fontWeight: "bolder" }}>
                      Password is wrong
                      <span hidden>
                        {
                          (document.getElementById(
                            "inputOriginalPassword"
                          ).style.borderColor = "red")
                        }
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-4" />
              </div>

              {/* new password */}
              <div className="form-row">
                <div className="form-group col-4" />
                <div
                  className="form-group col-4"
                  style={{
                    textAlign: "center",
                    background: "black",
                    color: "white"
                  }}
                >
                  <label
                    htmlFor="inputNewPassword"
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "uppercase"
                    }}
                  >
                    Enter your new password below
                  </label>
                </div>
                <div className="form-group col-4" />
              </div>

              {/* input for new pass */}
              <div className="form-row">
                <div className="form-group col-4" />
                <div className="form-group col-4">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter a new password"
                    className="form-control"
                    id="inputNewPassword"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-4" />
              </div>
              {/* input again new pass */}
              <div className="form-row">
                <div className="form-group col-4" />
                <div className="form-group col-4">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Try again:"
                    className="form-control"
                    id="retypePassword"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-4" />
              </div>

              {/* btn */}
              <div className="form-row">
                <div className="form-group col-4" />
                <div
                  className="form-group col-4"
                  style={{ textAlign: "center" }}
                >
                  <SmallEllipseBtn
                    text="Change Password"
                    style={{
                      backgroundColor: "black"
                    }}
                  />
                  {this.state.authencationFailed ? (
                    <div style={{ color: "red", fontWeight: "bolder" }}>
                      Authentication failed - Internal server error
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-4" />
              </div>
            </div>
          </form>
        )}

        {/* change password success popup */}
        {this.state.isValidToken && this.state.isShow ? (
          <AlertWindow
            displayText="Your password has been changed."
            btnNum="1"
            mode="linkMode"
            btnText="OK"
            linkTo="/"
            onHandleClose={() => {
              this.setState({ isShow: false });
            }}
          />
        ) : (
          ""
        )}

        {this.state.isValidToken === false && this.state.isShow ? (
          <AlertWindow
            displayText="Sorry, your token has expired, please log in again"
            btnNum="1"
            mode="linkMode"
            btnText="OK"
            linkTo={{
              pathname: "/login",
              state: { from: this.props.location.pathname }
            }}
            onHandleClose={() => {
              this.setState({ isShow: false });
              this.handleLogout();
            }}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default withCookies(ChangePwdPage);
