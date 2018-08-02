import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import {GoogleLogin} from 'react-google-login';
import {PostData} from '../components/SignUpPost';

class SignUpPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            redirect: false,

            user: null,
        };
        this.signupResponse = this.signupResponse.bind(this)
    }

    signupResponse(res, type) {

        let postData;
        if (type === 'facebook' && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            };
        }

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };

        }


        const promise = PostData(type, postData)
        if (promise) {
            sessionStorage.setItem("userSocialData", JSON.stringify(postData));
            this.setState({
                redirect: true,
                user: postData.name
            });
        }

    }


    render() {

        if (this.state.redirect || sessionStorage.getItem('userSocialData')) {
            return (<Redirect to={'/'}/>)
        }

        const responseFacebook = (response) => {
            console.log("facebook console");
            this.signupResponse(response, 'facebook');
        }

        const responseGoogle = (response) => {
            console.log("google console");
            this.signupResponse(response, 'google');
        }


        return (
            <div className="row body">
                <div className="medium-12 columns">
                    <div className="medium-12 columns">

                        <FacebookLogin
                            appId="214931672529577"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}/>
                        <br/><br/>

                        <GoogleLogin
                            clientId="664907700908-dk294rp498d65cplhmojae3c2mv5rar0.apps.googleusercontent.com"
                            buttonText="Login with Google+"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}/>

                    </div>
                </div>
            </div>

        );

    }

}

export default SignUpPage;