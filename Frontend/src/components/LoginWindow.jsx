import React, { Component } from "react";
import axios from "axios";
import "../css/LoginWindow.css";
import LoginBtn from "../components/SmallEllipseBtn";
import { Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { PostData } from "../components/SignUpPost";

class LoginWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      user: null
    };
    this.signupResponse = this.signupResponse.bind(this);
  }

  signupResponse(res, type) {
    let postData;
    if (type === "facebook" && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (type === "google" && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    const promise = PostData(type, postData);
    if (promise) {
      sessionStorage.setItem("userSocialData", JSON.stringify(postData));
      this.setState({
        redirect: true,
        user: postData.name
      });
    }
  }

  render() {
    if (this.state.redirect || sessionStorage.getItem("userSocialData")) {
      return <Redirect to={"/"} />;
    }

    const responseFacebook = response => {
      console.log("facebook console");
      this.signupResponse(response, "facebook");
    };

    const responseGoogle = response => {
      console.log("google console");
      this.signupResponse(response, "google");
    };
    return (
      <React.Fragment>
        {/* title */}
        <a data-toggle="modal" data-target="#loginModal">
          <span>
            <LoginBtn text="Log in" />
          </span>
        </a>
        {/* body */}
        <div
          className="modal fade"
          id="loginModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="contact_window">
              <div className="modal-header modal_header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Log In
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/* popup body */}
              {/* left */}
              <div className="modal-body">
                <div className="row">
                  <div className="col left_part">
                    {/* user part */}
                    <div className="row">
                      <div className="col-md-1" />
                      <div className="col-md-10">
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-md-1" />
                    </div>

                    <br />
                    <div className="row">
                      <div className="col-md-1" />
                      <div className="col-md-10">
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          placeholder="Password"
                        />
                      </div>
                      <div className="col-md-1" />
                    </div>
                    <br />
                    {/* forget pass */}
                    <div className="row">
                      <div className="col-md-1" />

                      <div className="col-md-4">
                        <span class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            style={{ whiteSpace: "nowrap" }}
                            class="custom-control-label"
                            for="customCheck1"
                          >
                            Remember Me
                          </label>
                        </span>
                      </div>

                      <div className="col-md-1" />

                      <div className="col-md-4">
                        <a style={{ whiteSpace: "nowrap" }} href="">
                          Forgot password?
                        </a>
                      </div>
                      <div className="col-md-1" />
                    </div>
                    <br />
                    {/* login btn */}
                    <div>
                      <div className="row">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                          <button
                            className="login_btn"
                            style={{ width: "100%" }}
                          >
                            Log In
                          </button>
                        </div>
                        <div className="col-md-1" />
                      </div>
                    </div>
                    <br />
                    {/* don have count */}
                    <div>
                      <div className="row">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                          Don't have an account? <a href="">Sign Up</a>
                        </div>
                        <div className="col-md-1" />
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="col">
                    <div data-dismiss="modal">
                      <FacebookLogin
                        cssClass="facebookBtn"
                        data-dismiss="modal"
                        appId="214931672529577"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                      />
                    </div>
                    <br />
                    <div data-dismiss="modal">
                      <GoogleLogin
                        className="googleBtn"
                        clientId="664907700908-dk294rp498d65cplhmojae3c2mv5rar0.apps.googleusercontent.com"
                        buttonText="Login with Google+"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginWindow;
