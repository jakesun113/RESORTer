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
        this.state = {};
        this.handleBook = this.handleBook.bind(this);
    }

    async handleBook() {

        //only handle login with email user
        if (sessionStorage.getItem('userSocialData') &&
            JSON.parse(sessionStorage.getItem('userSocialData')).provider === 'email') {
            let BaseURL = "http://127.0.0.1:3333/api/";
            let postData;
            postData = {
                token: JSON.parse(sessionStorage.getItem('userToken')).token
            };
            await axios.post(BaseURL + "check-token", postData).then(response => {

                //handle token is not valid, return to login
                if (response.data.tokenValid === false) {
                    console.log("token expired");

                    this.props.history.push({
                        pathname: '/login'
                    })
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

                    //Jump into book page
                    let postData = {};
                    postData.resortName = this.props.title;
                    postData.token = JSON.parse(sessionStorage.getItem('userToken')).token;

                    axios.post("http://127.0.0.1:3333/api/enrollTrip", postData)
                        .then(response => {
                            if (response.data.status === 'success') {

                                this.props.history.push({
                                    pathname: `/booking/${this.props.title}/who`,
                                    state: {
                                        masterID: response.data.masterID,
                                        resortID: response.data.resortID,
                                        tripID: response.data.tripID
                                    }
                                })

                            } else {
                                alert('SERVER ERROR: Please try again :)')
                            }
                        })
                }
            });
        }
        //facebook&google login
        else if (sessionStorage.getItem('userSocialData') &&
            JSON.parse(sessionStorage.getItem('userSocialData')).provider !== 'email') {
            //Jump into book page
            let postData = {};
            postData.resortName = this.props.title;
            postData.token = JSON.parse(sessionStorage.getItem('userToken')).token;

            await axios.post("http://127.0.0.1:3333/api/enrollTrip", postData)
                .then(response => {
                    if (response.data.status === 'success') {

                        this.props.history.push({
                            pathname: `/booking/${this.props.title}/who`,
                            state: {
                                masterID: response.data.masterID,
                                resortID: response.data.resortID,
                                tripID: response.data.tripID
                            }

                        })

                    } else {
                        alert('SERVER ERROR: Please try again :)')
                    }
                })
            //logout status
        } else if (!sessionStorage.getItem('userSocialData')) {
            this.props.history.push({
                pathname: '/login'
            })
        }
    };

    //FIXME: this method is never used
    handleLogout = () => {
        const {cookies} = this.props;

        sessionStorage.removeItem("userSocialData");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userImage");
        sessionStorage.removeItem("userFinishProfile");
        cookies.remove("user-name");
        cookies.remove("access-token");
        cookies.remove("user-pic");
        cookies.remove("user-provider");
        cookies.remove("user-profileFinished");
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
                            <a
                                // href={`/booking/${this.props.title}/who`}
                                className="btn btn-primary"
                                onMouseEnter={this.handleAuth}
                                onClick={this.handleBook}
                            >
                                <span>{this.props.btnText}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(ImageCard);