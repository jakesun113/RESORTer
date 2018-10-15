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
            redirectToReferrer: false,
            facebookDuplicated: false,
            duplicatedProvider: null,
            authenticationFailed: false,
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
                    if (response.data.authenticationFailed === true) {
                        console.log("authentication failed");
                        this.setState({
                            authenticationFailed: true,
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
                            provider: postData.provider
                        };
                        sessionStorage.setItem("userSocialData", JSON.stringify(userSocialData));
                        //save picture into session
                        let userImage;
                        userImage = {
                            provider_pic: postData.provider_pic
                        };
                        sessionStorage.setItem("userImage", JSON.stringify(userImage));
                        let userToken;
                        userToken = {
                            token: postData.token
                        };
                        sessionStorage.setItem("userToken", JSON.stringify(userToken));

                        //console.log(response.data.isProfileComplete);
                        let userFinishProfile;
                        userFinishProfile = {
                            isFinished: response.data.isProfileComplete
                        };
                        sessionStorage.setItem("userFinishProfile", JSON.stringify(userFinishProfile));

                        let userFinishTrip;
                        userFinishTrip = {
                            hasUnfinishedTrip: response.data.unfinishedTrip
                        };
                        sessionStorage.setItem("userFinishTrip", JSON.stringify(userFinishTrip));

                        //if come to login because token has been expired,
                        //redirect to where it comes from
                        if (this.props.location.state) {
                            const {from} = this.props.location.state;
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

        //if come to login because token has been expired,
        //redirect to where it comes from
        if (this.props.location.state) {
            const {from} = this.props.location.state;
            if (this.state.redirectToReferrer) {

                //if come from booking pages (step 2 to step 6)
                let re = new RegExp(/\/booking\/[^\n]*\/(sleep|doing|equipment|learn|summary)/, 'g');
                // if (from.indexOf('/booking/') === -1) {
                if (re.test(from)) {
                    const {masterID, resortID, tripID} = this.props.location.state;
                    return <Redirect to={{
                        pathname: from,
                        state: {
                            masterID: masterID,
                            resortID: resortID,
                            tripID: tripID
                        }
                    }}/>;
                } else {
                    return <Redirect to={from}/>;
                }
            }
        }

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
                {this.state.authenticationFailed ? (
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
