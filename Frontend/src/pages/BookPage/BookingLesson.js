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

const HeaderL2 = styled.div`
   font-weight: 700;
   color: #607375;
   font-size: 20px;
   margin-bottom: 10px;
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


const TextInput = styled.textarea`
  width: 90%;
  height:100px;
  border: 1px solid rgba(198, 226, 247, 1);
  padding-left: 12px;
  border-radius: 8px;
  color: #00A6FF;
  resize: none;
  &::-webkit-input-placeholder {
    color: darkgray;
    font-size: smaller;
  }
`;

const OptionSelector = styled.select`
  border: 1px solid rgba(198, 226, 247, 1);
  color: #3B88FE;
`;

const ListBorder = styled.hr`
  margin: 0 0 7px 0;
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

            specificIns: "No",
            insInfo: "",
            request: "",

            startDate: "2018-10-21",
            endDate: "2018-10-24",

            members: {
                "1": {firstName: "Lily", age: 4},
                "2": {firstName: "Susan", age: 5},
                "3": {firstName: "Sam", age: 8},
                "4": {firstName: "Jack", age: 12},
                "5": {firstName: "Wayne", age: 23},
                "6": {firstName: "Barbara", age: 30},
            },

            groupLesson: {
                "adult": {
                    "2018-10-23 PM Ski": ["5", "6"],
                    "2018-10-21 AM Snowboard": ["5"],
                },
                "child": {
                    "2018-10-22 PM Ski": ["3", "4"],
                    "2018-10-21 PM Ski": ["3"],
                },
                "mini": {
                    "2018-10-24 PM Telemark": ["1", "2"],
                    "2018-10-22 AM Telemark": ["1"],
                },
            },

            privateLesson: {},
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
                    token: token,
                    provider: provider
                };

                await axios.post(BaseURL + "checkTokenAuth", postData).then(response => {
                    if (response.data.status === "ExpiredJWT") {
                        alert('Token Expire');
                        history.push({
                            pathname: "/login",
                            state: {
                                from: history.location.pathname,
                                masterID: masterID,
                                resortID: resortID,
                                tripID: tripID,
                            }
                        });
                    } else if (response.data.status === "fail") {
                        alert('Server Error, Please Try again')
                    } else if (response.data.status === "success") {
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

    handleInsChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleInsInfoChange = (e) => {
        this.setState({insInfo: e.target.value});
    };

    handleRequestChange = (e) => {
        this.setState({request: e.target.value});
    };

    handleGroupAPChange = (e) => {
        const {groupLesson} = this.state;

        const keyname = e.target.name; // e.g. adult 2018-10-23 PM Ski
        const ageType = keyname.split(" ")[0];
        const original_json = groupLesson[ageType];

        const remain = keyname.split(" ").slice(1, 4).join(" ");


    };

    sortByDate = (listname) => {
        listname.sort((a, b) => {
            let a_date = new Date(a.split(' ')[0]);
            let b_date = new Date(b.split(' ')[0]);
            if (a_date < b_date) return -1;
            if (a_date > b_date) return 1;
            if (a_date === b_date) return 0;
        });
    };

    componentDidMount() {

    }

    render() {
        const {group_show, private_show, specificIns, insInfo, request, startDate, endDate, members, groupLesson, privateLesson} = this.state;
        const placeHolderText = "Any Specific requirements you want your instructor to know? " +
            "What do you want to get out of the lesson? Max. 150 characters.";

        // Group lesson info
        const group_adult = groupLesson['adult']; // json
        const group_child = groupLesson['child'];
        const group_mini = groupLesson['mini'];
        const group_adult_keys = Object.keys(group_adult);
        const group_child_keys = Object.keys(group_child);
        const group_mini_keys = Object.keys(group_mini);
        this.sortByDate(group_adult_keys);
        this.sortByDate(group_child_keys);
        this.sortByDate(group_mini_keys);

        // Group Adult
        const group_adult_rows = group_adult_keys.map(keyname => {

            const date = keyname.split(" ")[0];
            const ap = keyname.split(" ")[1];
            const act = keyname.split(" ")[2];

            return (
                <div key={keyname}>
                    <ListBorder/>
                    <div className='row'>
                        <div className='col-2'>
                            <div>{date} &nbsp;
                                <div className='fa fas fa-edit'
                                     style={{color: 'rgb(73,131,178)'}}/>
                            </div>
                        </div>
                        <div className='col-2'>
                            <label>
                                <OptionSelector value={ap}
                                                name={"adult " + keyname}
                                                onChange={this.handleGroupAPChange}>
                                    <option value="PM" selected="selected">PM
                                    </option>
                                    <option value="AM">AM</option>
                                </OptionSelector>
                            </label>
                        </div>
                    </div>
                </div>


            )
        });

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


                {/*group lessons*/}
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
                    <div className='alert alert-primary'
                         style={{marginBottom: "20px"}}>
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

                    {/* adult group lesson */}
                    {group_adult_keys.length === 0 ? null :
                        <div style={{marginBottom: '16px'}}>
                            <HeaderL2>Teen & Adult &nbsp; (Age 15+)</HeaderL2>

                            <div className='row'
                                 style={{
                                     fontSize: "18px",
                                     marginBottom: '10px'
                                 }}>
                                <div className='col-2'>
                                    Date
                                </div>
                                <div className='col-2'>
                                    AM/PM
                                </div>
                                <div className='col-2'>
                                    Activity
                                </div>
                                <div className='col-4'>
                                    Participants
                                </div>
                                <div className='col-2'
                                     style={{
                                         color: 'rgb(73,131,178)',
                                         fontSize: '16px',
                                         transform: 'translate(0,4px)'
                                     }}>
                                    Add Lesson
                                </div>
                            </div>

                            {group_adult_rows}
                        </div>
                    }


                    {/* children group lesson */}
                    <HeaderL2>Child &nbsp; (Age 6-14)</HeaderL2>

                    {/* Mini group lesson */}
                    <HeaderL2>Mini &nbsp; (Age 3-5)</HeaderL2>


                </div>

                <div style={{height: '30px'}}/>

                {/*private lessons*/}
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
                        must be at the same ability level. <br/>
                        Children under age 5 (inclusive) cannot attend a private
                        lesson with children above age 6 (inclusive) or
                        adults. Instead, they should book a separate private
                        lesson.<br/>
                        <span style={{fontSize: 'small'}}>* Activities & time are subject to availability.
                            Confirm
                            with resort when they make contact.</span>
                    </div>

                    <div className='row'>
                        <div className='col-3'>
                            Specific instructor in mind?
                        </div>
                        <div className='col-9'>
                            <label>
                                <OptionSelector value={specificIns}
                                                name={'specificIns'}
                                                onChange={this.handleInsChange}>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </OptionSelector>
                            </label>
                        </div>
                    </div>

                    <div style={{height: '10px'}}/>

                    {specificIns === 'Yes' ?
                        <div className='row'>
                            <div className='col-3'>
                                Name or description of the instructor
                            </div>
                            <div className='col-9'>
                                <TextInput value={insInfo}
                                           onChange={this.handleInsInfoChange}/>
                            </div>
                        </div>
                        : null}

                    <div style={{height: '10px'}}/>

                    <div className='row'>
                        <div className='col-3'>
                            Any special requests?
                        </div>
                        <div className='col-9'>
                            <TextInput value={request}
                                       onChange={this.handleRequestChange}
                                       placeholder={placeHolderText}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withCookies(BookingLesson);