import React, {Component} from "react";
import "../../css/template/ImageCard.css";
import axios from "axios"
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';

const CardSubTitleStyle = {
    color: "#2ab4ff"
};

class ImageCard extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isValidToken: false
        }
        this.handleAuth = this.handleAuth.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }

    //Hover the button, check whether the token is expired
    async handleAuth() {
        //only handle login with email user
        if (sessionStorage.getItem('userSocialData') && !JSON.parse(sessionStorage.getItem('userSocialData')).provider) {
            let BaseURL = "http://127.0.0.1:3333/api/";
            let postData;
            postData = {
                token: JSON.parse(sessionStorage.getItem('userToken')).token
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

    //TODO: Send HTTP request to backEnd to start a book
    handleBook = () => {
        this.props.history.push({
            pathname: `/booking/${this.props.title}/who`,
            state: {masterID: 100, resortID: 200, tripID: 300},
        })
    };

    handleLogout = () => {
        const {cookies} = this.props;

        sessionStorage.removeItem("userSocialData");
        sessionStorage.removeItem("userToken");
        cookies.remove("user-name");
        cookies.remove("access-token");
        cookies.remove("user-pic");
    };

    render() {


        return (
            <React.Fragment>
                <div className="card h-100" style={{width: "20rem"}}>
                    <img
                        className="card-img-top"
                        src={this.props.imgSrc}
                        alt="Card cap"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p style={CardSubTitleStyle}>{this.props.subTitle}</p>
                        <p className="card-text card-body-size">{this.props.text}</p>
                        <div className="botton_right">
                            {this.state.isValidToken ? (
                                <a
                                    // href={`/booking/${this.props.title}/who`}
                                    className="btn btn-primary"
                                    onMouseEnter={this.handleAuth}
                                    onClick={this.handleBook}
                                >
                                    <span>{this.props.btnText}</span>
                                </a>
                            ) : (
                                <a
                                    href={`/login`}
                                    className="btn btn-primary"
                                    onMouseEnter={this.handleAuth}
                                    onClick={this.handleLogout}
                                >
                                    <span>{this.props.btnText}</span>
                                </a>
                            )}

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(ImageCard);
