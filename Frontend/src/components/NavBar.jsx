import React, {Component} from "react";
import "../css/NavBar.css";
import SmallEllipseBtn from "./template/SmallEllipseBtn";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import ProfileCard from "../components/ProfilePage/ProfileCard";
import YouTube from "react-youtube";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import axios from "axios/index";
import AlertWindow from "../components/template/AlertWindow";

class Youtube extends Component {
    state = {};

    render() {
        // youtube video
        const video = {
            height: "390",
            width: "640",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return (
            <React.Fragment>
                {/* youtube video */}
                <div
                    className="container"
                    style={{
                        zIndex: "100",
                        position: "fixed",
                        color: "rgb(93, 135, 221)",
                        top: "30%",
                        left: "30%",
                        width: "auto",
                        height: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        border: "1px solid rgb(130, 171, 255)",
                        borderRadius: "10px 10px 10px 10px",
                        paddingTop: "15px",
                        paddingBottom: "10px",
                        paddingLeft: "20px",
                        paddingRight: "25px"
                    }}
                >
          <span
              style={{
                  fontSize: "35px",
                  position: "absolute",
                  top: "0px",
                  right: " 0px",
                  color: "black"
              }}
              onClick={this.props.onHandleClose}
          >
            <i className="fas fa-times"/>
          </span>
                    <YouTube
                        videoId="s51aYCGDYD8"
                        opts={video}
                        // onReady={this._onReady}
                    />
                </div>
            </React.Fragment>
        );
    }
}

class Navbar extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            // activeTabName: "home",
            user: cookies.get("user-name") || null,
            token: cookies.get("access-token") || null,
            user_pic: cookies.get("user-pic") || null,
            provider: null,
            isValidToken: true,
            isShowLoginWindow: false,
            isShowVideo: false
        };

        this.handleAuth = this.handleAuth.bind(this);
    }

    handleLogout = () => {
        const {cookies} = this.props;
        this.setState({
            user: null,
            token: null,
            user_pic: null
        });

        sessionStorage.removeItem("userSocialData");
        sessionStorage.removeItem("userToken");
        cookies.remove("user-name");
        cookies.remove("access-token");
        cookies.remove("user-pic");
    };

    //check authentication when the profile list is shown
    async handleAuth() {
        //only handle login with email user
        console.log(this.state.provider)
        if (!this.state.provider) {
            let BaseURL = "http://127.0.0.1:3333/api/";
            let postData;
            postData = {
                token: this.state.token
            };
            await axios.post(BaseURL + "check-token", postData).then(response => {
                //console.log(response.data);

                //handle token is not valid
                if (response.data.tokenValid === false) {
                    console.log("token expired");

                    this.setState({
                        isValidToken: false
                    });
                }

                //token is valid
                else {
                    console.log("token valid");
                    //save token into session
                    let sessionData;
                    sessionData = {
                        token: response.data.token
                    };
                    sessionStorage.setItem("userToken", JSON.stringify(sessionData));

                    //save token into cookie

                    let date = new Date();
                    date.setTime(date.getTime() + +2592000);
                    const {cookies} = this.props;

                    //only when user click "remember me", update the token in cookies
                    if (cookies.get("access-token")) {
                        cookies.set("access-token", response.data.token, {
                            expires: date,
                            path: "/"
                        });

                        console.log(
                            "token has been extended. Token is: " +
                            cookies.get("access-token")
                        );
                    }

                    this.setState({
                        isValidToken: true
                    });
                }
            });
        }
    }

    componentDidMount() {
        //console.log("in mount");
        //if not click "remember me" before
        if (
            this.state.token === null &&
            sessionStorage.getItem("userSocialData") &&
            sessionStorage.getItem("userToken")
        ) {
            //console.log("inner mount");
            let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            this.setState({
                user: userData.name,
                token: tokenData.token,
                user_pic: userData.provider_pic
            });
        }

        //if click "remember me" before, also save data into session
        if (this.state.token !== null && !sessionStorage.getItem("userToken")) {
            let userSocialData;
            userSocialData = {
                name: this.state.user,
                provider_pic: this.state.user_pic
            };
            sessionStorage.setItem("userSocialData", JSON.stringify(userSocialData));
            let userToken;
            userToken = {
                token: this.state.token
            };
            sessionStorage.setItem("userToken", JSON.stringify(userToken));
        }
    }

    componentDidUpdate() {
        //   change profile btn position according to the screen size
        try {
            let marginValue = window.screen.width > 750 ? "-15px" : "auto";
            document.getElementById("user-profile-btn-in-navbar").style.cssText +=
                "margin-top:" + marginValue;
        } catch (e) {
        }
        //console.log("in nav update");
        //console.log(this.state.token);
        //if token is updated
        if (sessionStorage.getItem("userToken")) {
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            if (this.state.token !== tokenData.token) {
                //console.log("in token update");
                this.setState({
                    token: tokenData.token
                });
            }
        }
        //if token has been removed from session (token expired)
        else if (this.state.token !== null) {
            //console.log("in token to null");
            this.setState({
                token: null
            });
        }

        //if user data is updated
        if (sessionStorage.getItem("userSocialData")) {
            let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
            if (this.state.user !== userData.name) {
                //console.log("in user update");
                this.setState({
                    user: userData.name,
                    user_pic: userData.provider_pic
                });
            }
        }
        //if user data has been removed from session (token expired)
        else if (this.state.user !== null) {
            //console.log("in user to null");
            this.setState({
                user: null,
                user_pic: null
            });
        }

        //if login with google or facebook
        if (this.state.token === null && sessionStorage.getItem("userSocialData")) {
            let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
            if (userData.provider) {
                console.log("inner update");
                this.setState({
                    provider: userData.provider
                });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* new design */}
                <div className="container-fluid">
                    <nav>
                        {/* up */}
                        <div className="row">
                            <div className="col-xs-0 col-sm-0 col-lg-2"/>
                            <div className="col-xs-12 col-sm-4 col-lg-3 logo_coming_soon">
                <span>
                  <img
                      src="https://static.wixstatic.com/media/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png/v1/fill/w_200,h_200,al_c,usm_0.66_1.00_0.01/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png"
                      alt=""
                  />
                </span>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-lg-3 logo_front">
                <span>
                  <img
                      src="https://static.wixstatic.com/media/25b4a3_476f364fc74b4d3fb6c657519d3c90d2~mv2.png/v1/fill/w_366,h_156,al_c,usm_0.66_1.00_0.01/25b4a3_476f364fc74b4d3fb6c657519d3c90d2~mv2.png"
                      alt=""
                  />
                </span>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-sm-4 col-lg-3 button_admin">
                                <a className="navbar-brand" href="/">
                                    <img
                                        src="https://static.wixstatic.com/media/25b4a3_fae0b5a09c5c4a4cbd36b211a9075836~mv2.png/v1/fill/w_66,h_66,al_c,lg_1/25b4a3_fae0b5a09c5c4a4cbd36b211a9075836~mv2.png"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>

                        {/* down */}

                        <div className="row" style={{borderBottom: "2px solid grey"}}>
                            {/* left */}
                            <div className="col-xs-12 col-lg-8 col-md-12">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-1"/>

                                    <div className="col-xl-2 col-lg-2 col-sm-12 col-12 left_border">
                                        <NavLink
                                            exact
                                            activeClassName="initial_active"
                                            className="nav-link button_style"
                                            to="/"
                                        >
                                            HOME
                                        </NavLink>
                                    </div>
                                    <div className="col-xl-2 col-lg-3 col-sm-12 col-12 left_border">
                                        <NavLink
                                            activeClassName="initial_active"
                                            className="nav-link button_style"
                                            to="/how-it-works"
                                        >
                                            How it Works
                                        </NavLink>
                                    </div>
                                    <div className="col-xl-2 col-lg-3 col-sm-12 col-12 left_border">
                                        <NavLink
                                            activeClassName="initial_active"
                                            className="nav-link button_style"
                                            to={{
                                                pathname: "/about-us",
                                                state: {
                                                    text:
                                                        "Thank you for active your account, "
                                                }
                                            }}
                                        >
                                            About Us
                                        </NavLink>
                                    </div>
                                    <div className="col-xl-2 col-lg-3 col-sm-12 col-12 left_border">
                                        <NavLink
                                            activeClassName="initial_active"
                                            className="nav-link button_style"
                                            to="/contact"
                                        >
                                            Contact Us
                                        </NavLink>
                                    </div>
                                    <div className="col-xl-2"/>
                                </div>
                            </div>

                            {/* right */}
                            <div className="col-xs-12 col-lg-4 col-md-12">
                                {this.state.token ? (
                                    // login state
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1"/>
                                        {/* my trip btn */}
                                        <div className="col-xl-3  col-lg-5 userBtn">
                                            <Link className="nav-link" to="/my-trip">
                                                <SmallEllipseBtn
                                                    text="My trip"
                                                    btnColor="rgba(70, 130, 180, 1)"
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-lg-1"/>
                                        {/* profile btn */}
                                        <div className="col-xl-3  col-lg-4 userBtn dropdown">
                                            <div
                                                className="nav-link "
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                {/* btn */}
                                                <div
                                                    className="user_profile_btn"
                                                    id="user-profile-btn-in-navbar"
                                                    style={{
                                                        backgroundImage: "url(" + this.state.user_pic + ")",
                                                        boxShadow: "2px 0px 14px 0px rgba(0,0,0,0.2)"
                                                    }}
                                                    onMouseEnter={this.handleAuth}
                                                />
                                            </div>
                                            <div
                                                className="dropdown-menu dropdown-menu-right"
                                                style={{width: "250px"}}
                                            >
                                                <ProfileCard
                                                    userName={this.state.user}
                                                    userPic={this.state.user_pic}
                                                    tokenValid={this.state.isValidToken}
                                                    onLogout={this.handleLogout}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-1"/>
                                    </div>
                                ) : (
                                    // not login state
                                    <div className="row">
                                        <div className="col-xl-2 col-lg-2"/>
                                        <div className="col-xl-2 col-lg-2 userBtn">
                      <span
                          onClick={() => {
                              this.setState({isShowLoginWindow: true});
                          }}
                      >
                        <SmallEllipseBtn text="Log in" btnColor="orangered"/>
                      </span>
                                        </div>
                                        <div className="col-xl-8 col-lg-8"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>

                    {/* pop up for video */}
                    {this.state.isShowVideo === true ? (
                        <Youtube
                            onHandleClose={() => {
                                this.setState({isShowVideo: false});
                            }}
                        />
                    ) : (
                        ""
                    )}
                    {this.state.isShowLoginWindow === true ? (
                        <AlertWindow
                            onHandleClose={() => {
                                this.setState({isShowLoginWindow: false});
                            }}
                            btnNum="2"
                            displayText="Want a sneak peek of the booking journey before you log in?"
                            btnOneMode="customMode"
                            onHandClickOne={() => {
                                this.setState({isShowVideo: true, isShowLoginWindow: false});
                            }}
                            btnOneText="Yes"
                            btnTwoMode="linkMode"
                            btnTwoLinkTo="/login"
                            btnTwoText="No, I want to log in now."
                        />
                    ) : (
                        ""
                    )}

                    {/* end container */}
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(Navbar);
