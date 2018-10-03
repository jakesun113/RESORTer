import React, {Component} from "react";
import GoogleMap from "../../components/template/GoogleMapRender";
// import DatePicker from "../../components/template/SelectTripDate";
import AddTripMember from "../../components/BookTripPage/AddTripMember";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import handleLogOut from "../../components/template/HandleLogOut";

function StartDate(props) {
    function handleChange(date) {
        props.onChange(date, "startDate");
    }

    return (
        <DatePicker
            selected={props.startDate}
            onChange={handleChange}
            minDate={props.validMinDate}
        />
    );
}

function EndDate(props) {
    function handleChange(date) {
        props.onChange(date, "endDate");
    }

    return (
        <DatePicker
            selected={props.endDate}
            onChange={handleChange}
            minDate={props.validMinDate}
        />
    );
}

class SelectTripDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().add(4, "days"), // initially, start date is today + 4 days
            endDate: moment().add(9, "days"),
            width: 0,
            hidePlanButton: false
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.setDate(this.state.startDate, this.state.endDate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    //Responsive
    updateWindowDimensions() {
        this.setState({width: window.innerWidth});
    }

    //Handle PlanYourTrip button click
    handleClick = () => {
        //TODO: If user is not login, alert either want to 'login' or 'guestUser'

        //1) While Login
        try {
            //if login & Personal Profile was completed
            if (sessionStorage.getItem("userSocialData")) {
                axios
                    .get(
                        "http://127.0.0.1:3333/api/checkProfile/" +
                        JSON.parse(sessionStorage.getItem("userToken")).token
                    )
                    .then(response => {
                        if (response.data.status === "success") {
                            //show the addTrip
                            this.props.showAddTripMember();

                            this.setState({
                                hidePlanButton: true
                            });
                        } else if (response.data.status === "fail") {
                            //redirect to Profile Page
                            this.props.history.push({
                                pathname: "/newProfile"
                            });
                        }
                    });
            }
            //no login
            else {
                alert("guest or login");
                //alert window
            }
        } catch (err) {
        }
    };
    // choice is either "startDate" or "endDate"
    handleChange = (date, choice) => {
        const {startDate, endDate} = this.state;

        if (choice === "endDate") {
            this.setState({
                [choice]: date
            });
        } else {
            if (date > endDate) {
                this.setState({
                    [choice]: date,
                    endDate: moment(date).add(5, "days")
                });
            } else {
                this.setState({
                    [choice]: date
                });
            }
        }
        this.props.setDate(startDate, endDate);
    };

    render() {
        let currentStartDate = this.state.startDate;

        let planButton = (
            <div>
                <p style={{opacity: 0}}>
                    <strong>Place Holder</strong>
                </p>
                {/* Responsive */}
                {this.state.width < 990 && this.state.width > 575 ? (
                    <div style={{opacity: 0}}>1</div>
                ) : null}
                <span onClick={this.handleClick}>
          <SmallEllipseBtn
              text="Plan Your Trip"
              btnColor="rgba(255, 97, 97, 1)"
          />
        </span>
            </div>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <p>
                            <strong>Start Date </strong> (4 days + in advance only)
                        </p>
                        <StartDate
                            startDate={this.state.startDate}
                            onChange={this.handleChange}
                            validMinDate={moment(currentStartDate)}
                        />
                    </div>
                    <div className="col-sm">
                        <p>
                            <strong>End Date</strong>
                        </p>
                        {/* Responsive */}
                        {this.state.width < 990 && this.state.width > 575 ? (
                            <div style={{opacity: 0}}>1</div>
                        ) : null}
                        <EndDate
                            endDate={this.state.endDate}
                            onChange={this.handleChange}
                            validMinDate={moment(currentStartDate)}
                        />
                    </div>
                    <div
                        className="col-sm"
                        id="planTripBtn"
                        style={{textAlign: "center"}}
                    >
                        {this.state.hidePlanButton ? null : planButton}
                    </div>
                </div>
            </div>
        );
    }
}

class BookTripPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            addTripMember: null,
            startDate: null,
            endDate: null,
            user: null,
            groupMember: null
        };
        this.submitTripMember = this.submitTripMember.bind(this);
    }

    //Show the addTripMember Interface
    showAddTripMember = () => {
        this.setState({
            addTripMember: true
        });
    };

    setDate = (startDate, endDate) => {
        this.setState({
            startDate: startDate,
            endDate: endDate
        });
    };

    async submitTripMember(user, groupMember) {
        const {cookies} = this.props;

        await this.setState({
            user: user,
            groupMember: groupMember
        });

        let postData = {
            token: JSON.parse(sessionStorage.getItem("userToken")).token,
            StartDate: moment(this.state.startDate).format("YYYY-MM-DD"),
            EndDate: moment(this.state.endDate).format("YYYY-MM-DD"),
            IsMasterMemberGoing: this.state.user != null,
            MasterMember: this.state.user,
            GroupMember: this.state.groupMember,
            ResortName: this.props.place,
            provider: JSON.parse(sessionStorage.getItem("userSocialData")).provider
        };
        console.log(postData);
        //TODO: Make HTTP request
        axios
            .post("http://127.0.0.1:3333/api/enrollTrip/", postData)
            .then(response => {
                if (response.data.status === "ExpiredJWT") {
                    //Redirect to login page
                    alert('Token Expire')
                    this.handleLogout()
                    this.props.history.push({
                        pathname: "/login",
                        state: {
                            from: this.props.history.location.pathname,
                        }
                    });
                } else if (response.data.status === "fail") {
                    alert('Server Error, Please Try again')
                } else if (response.data.status === "success") {
                    console.log(response.data)


                    //save token into session
                    sessionStorage.setItem(
                        "userToken",
                        JSON.stringify({token: response.data.token})
                    );

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
                        cookies.set("user-provider", "email", {
                            expires: date,
                            path: "/"
                        });
                        console.log(
                            "token has been extended. Token is: " +
                            cookies.get("access-token")
                        );
                    }
                    this.props.history.push({
                        pathname: `/booking/${this.props.place}/sleep`,
                        state: {
                            from: this.props.history.location.pathname,
                            masterID: response.data.masterID,
                            resortID: response.data.resortID,
                            tripID: response.data.tripID,
                        }
                    });
                }
            });
    }

    handleLogout = () => {
        const {cookies} = this.props;
        this.setState({
            token: null,
            provider: null,
        });

        //remove session and cookies
        handleLogOut(cookies);
    };

    render() {
        // const {place, masterID, resortID, tripID, history} = this.props;
        const {place, history} = this.props;
        return (
            <React.Fragment>
                <div className="container">
                    <br/>
                    {/* title */}
                    <div
                        className="row"
                        style={{color: "#4682B4", fontSize: "26px", fontWeight: "bold"}}
                    >
                        <div className="col-1"/>
                        <div className="col-4"> 1. WHEN & WHO?</div>
                        <div className="col-7"/>
                    </div>
                    <br/>
                    {/* map */}
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10">
                            <GoogleMap/>
                        </div>
                        <div className="col-1"/>
                    </div>
                    <br/>
                    {/* date picker */}
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10">
                            <SelectTripDate
                                showAddTripMember={this.showAddTripMember}
                                history={history}
                                setDate={this.setDate}
                            />
                        </div>
                        <div className="col-1"/>
                    </div>
                    {/* Whether Add new groupMember in this Trip */}
                    {this.state.addTripMember === true ? (
                        <AddTripMember
                            place={place}
                            submitTripMember={this.submitTripMember}
                        />
                    ) : null}
                    <br/>
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(BookTripPage);
