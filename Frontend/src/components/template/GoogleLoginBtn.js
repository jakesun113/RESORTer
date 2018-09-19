import React, {Component} from "react";
import {GoogleLogin} from "react-google-login";
import axios from "axios/index";
import {Redirect} from "react-router-dom";

//TODO: verify google token (send request)
class GoogleLoginBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            googleDuplicated: false,
            duplicatedProvider: null,
            authencationFailed: false,
            loginError: false
        };

        this.googleResponse = this.googleResponse.bind(this);
    }

    async googleResponse(res, type) {
        let BaseURL = "http://127.0.0.1:3333/api/login/";
        let postData;

        if (type === "google" && res.w3.ig) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                //provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };


            await axios.post(BaseURL + type, postData).then(
                /*Proceed subsequent actions based on value */
                response => {
                    //handle authentication failed
                    if (response.data.authencationFailed === true) {
                        console.log("authentication failed");
                        this.setState({
                            authencationFailed: true,
                            redirect: false
                        });
                    }
                    //handle login user is not existed
                    else if (response.data.googleDuplicated === true) {
                        console.log("user has logged in with another account");
                        this.setState({
                            googleDuplicated: true,
                            duplicatedProvider: response.data.duplicatedProvider,
                            redirect: false
                        });
                    }
                    //login success
                    else {
                        console.log("login success");
                        let userSocialData;
                        userSocialData = {
                            name: postData.name,
                            provider: postData.provider,
                            provider_pic: postData.provider_pic
                        };
                        sessionStorage.setItem("userSocialData", JSON.stringify(userSocialData));
                        let userToken;
                        userToken = {
                            token: postData.token
                        };
                        sessionStorage.setItem("userToken", JSON.stringify(userToken));

                        let userFinishProfile;
                        userFinishProfile = {
                            isFinished: response.data.isProfileComplete
                        };
                        sessionStorage.setItem("userFinishProfile", JSON.stringify(userFinishProfile));

                        this.setState({
                            redirect: true,
                        });
                    }
                }
            );
        }
        else {
            this.setState({
                loginError: true
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/"}/>;
        }
        const responseGoogle = response => {
            console.log("google console");
            this.googleResponse(response, "google");
        };
        return (
            <React.Fragment>
                <GoogleLogin
                    className="googleBtn"
                    clientId="664907700908-dk294rp498d65cplhmojae3c2mv5rar0.apps.googleusercontent.com"
                    buttonText="Login with Google+"
                    onSuccess={responseGoogle}
                />
                {this.state.googleDuplicated ? (
                    <div style={{color: "red", fontWeight: "bolder"}}>
                        user has logged in with {this.state.duplicatedProvider}
                    </div>
                ) : null}
                {this.state.authencationFailed ? (
                    <div style={{color: "red", fontWeight: "bolder"}}>
                        Authentication failed - Internal server error
                    </div>
                ) : null}
                {this.state.loginError ? (
                    <div style={{color: "red", fontWeight: "bolder"}}>
                        Login error with Google
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}

export default GoogleLoginBtn;
