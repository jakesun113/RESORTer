import React, {Component} from "react";
import styled from "styled-components";
import 'react-router-dom';
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import axios from "axios/index";

export const HeaderLine = styled.div`
  margin: 20px 0 10px 0;
`;

export const Title = styled.span`
  color: rgb(73,131,178);
  font-size: 25px;
  padding-right: 20px;
`;

const Warning = styled.p`
  margin-bottom: 10px; 
  color:rgba(255, 97, 97, 1);
  font-style: italic;
  font-weight: 100;
  //font-size:smaller;
`;

const UpperEllipseButton = styled.button`
  border: 0 solid black;
  padding: 4px 20px;
  background-color: rgba(104,99,105,1);
  border-radius: 20px;
  transition: background-color 1s ;
  transform: translate(0,-5px);
  
  &:hover  {
    background-color: black;
    cursor: pointer;
  }
`;

const Header = styled.p`
  font-size:25px;

`;

class BookingLesson extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            group_show: true,
            private_show: true,
            token: cookies.get("access-token") || null,
            provider: cookies.get("user-provider") || null,

        }
    }

    handleAuth = async (eventType) => {

        const {provider, token} = this.state;
        const {cookies, history, masterID, resortID, tripID} = this.props;

        if (sessionStorage.getItem('guestUser') === null) {
            // not a guest user
            if (provider === 'email') {
                const BaseURL = "http://127.0.0.1:3333/api/";
                const postData = {
                    token: token
                };

                await axios.post(BaseURL + "check-token", postData).then(response => {
                    //handle token is not valid
                    if (response.data.tokenValid === false) {
                        console.log("token expired");
                        history.push({
                            pathname: "/login",
                            state: {
                                from: history.location.pathname,
                                masterID: masterID,
                                resortID: resortID,
                                tripID: tripID,
                                history: history
                            }
                        });
                    }

                    //token is valid
                    else {
                        console.log("token valid");
                        //save token into session
                        const sessionData = {
                            token: response.data.token
                        };
                        sessionStorage.setItem("userToken", JSON.stringify(sessionData));

                        //save token into cookie
                        const date = new Date();
                        date.setTime(date.getTime() + +2592000);

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

                        switch (eventType) {
                            case "skipLesson":
                                this.skipLesson();
                                break;
                            case "goPrevious":
                                this.goPrevious();
                                break;
                            case"goNext":
                                this.goNext();
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        } else {
            // is a guest user, then no need to handle auth
            switch (eventType) {
                case "skipLesson":
                    this.skipLesson();
                    break;
                case "goPrevious":
                    this.goPrevious();
                    break;
                case"goNext":
                    this.goNext();
                    break;
                default:
                    break;
            }

        }
    };

    skipLesson = () => {

    };

    goPrevious = () => {

    };

    goNext = () => {

    };

    toggle = (item) => {
        if (item === 'group_show') {
            const {group_show} = this.state;
            this.setState({
                group_show: !group_show
            })
        } else {
            const {private_show} = this.state;
            this.setState({
                private_show: !private_show
            })
        }
    };

    componentDidMount() {

    }

    render() {
        const {group_show, private_show} = this.state;
        return (
            <div className='container' style={{marginTop: '20px'}}>
                <HeaderLine>
                    <Title>
                        <strong>5. LESSONS?</strong>
                    </Title>
                    <UpperEllipseButton
                        onClick={() => this.handleAuth('skipAccommodation')}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Skip Lessons
                        </div>
                    </UpperEllipseButton>
                </HeaderLine>

                <Warning>A first time package is sold if you have never done a
                    snowsport (skiing, snowboarding, or telemarking) and
                    includes a lift pass, gear rental and a lesson.</Warning>

                <div style={{margin: '25px 0 5px 0'}}>
                    <Header
                        style={{
                            display: 'inline-block',
                            marginRight: '30px',
                            fontWeight: '900'
                        }}>Group
                        Lessons</Header>
                    <a data-toggle="collapse" href="#group"
                       aria-expanded="true" aria-controls="group"
                       onClick={() => this.toggle('group_show')}>
                        {group_show ? 'Hide' : 'Show'}
                    </a>
                </div>

                <div className="collapse show" id="group">
                    <div className='alert alert-primary'>
                        Lesson durations vary from resort to resort but
                        typically adult lesson duration is around <strong>2 -3
                        hours</strong>.<br/>
                        <strong>AM</strong> lessons start
                        around <strong>10am</strong>;<br/>
                        <strong>PM</strong> lessons start
                        around <strong>1.30pm</strong>;<br/>
                        Children lesson duration can be full day or half day.
                        Start and end times are aimed to allow parents time to
                        drop off and pick up children.<br/>
                    </div>
                </div>


                <div style={{margin: '25px 0 5px 0'}}>
                    <Header
                        style={{
                            display: 'inline-block',
                            marginRight: '30px',
                            fontWeight: '900'
                        }}>Private
                        Lessons</Header>
                    <a data-toggle="collapse" href="#private"
                       aria-expanded="true" aria-controls="private"
                       onClick={() => this.toggle('private_show')}>
                        {private_show ? 'Hide' : 'Show'}
                    </a>
                </div>

                <div className="collapse show" id="private">
                    <div className='alert alert-warning'>
                        A maximum of up to 4 people can join a lesson. Everyone
                        must be the same ability level.<br/>
                        <span style={{fontSize: 'small'}}>* Activities & time are subject to availability.
                            Confirm
                            with resort when they make contact.</span>
                    </div>
                </div>


            </div>
        )
    }
}

export default withCookies(BookingLesson);