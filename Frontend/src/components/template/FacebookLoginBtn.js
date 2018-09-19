import React, {Component} from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios/index";
import {Redirect} from "react-router-dom";

//TODO: verify facebook token (send request)
class FacebookLoginBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            facebookDuplicated: false,
            duplicatedProvider: null,
            authencationFailed: false,
            loginError: false
        };

        this.facebookResponse = this.facebookResponse.bind(this);
    }

    async facebookResponse(res, type) {
        let BaseURL = "http://127.0.0.1:3333/api/login/";
        let postData;
        if (type === "facebook" && res.name) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                //provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
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
                    //handle duplicated login with other methods
                    else if (response.data.facebookDuplicated === true) {
                        console.log("user has logged in with another account");
                        this.setState({
                            facebookDuplicated: true,
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
        const responseFacebook = response => {
            console.log("facebook console");
            this.facebookResponse(response, "facebook");
        };
        return (
            <React.Fragment>
                <FacebookLogin
                    cssClass="facebookBtn"
                    appId="214931672529577"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
                {this.state.facebookDuplicated ? (
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
                        Login error with Facebook
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}

export default FacebookLoginBtn;
