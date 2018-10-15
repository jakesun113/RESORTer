import React, {Component} from "react";
// compomemts
import GroupMemberCard from "../../components/template/GroupMemberCard";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import axios from "axios/index";
import AccommodationReadOnlyCard
    from "../../components/BookTripPage/AccommodationCard";
import LiftPassCard from "../../components/BookTripPage/LiftPassCard";
import RentalCardInPlan from "../../components/BookTripPage/RentalCardInPlan";
import LessonCard from "../../components/BookTripPage/LessonCard";
import styled from "styled-components";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import moment from "moment";
import handleLogOut from "../../components/template/HandleLogOut";
import {Redirect} from "react-router-dom";
import RentalEquipmentCard from "../../components/BookTripPage/RentalEquipmentCard";

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid rgba(0, 166, 255, 1);
  border-radius: 10px 10px 10px 10px;
  resize: none;

  &:hover {
    background-color: rgba(198, 226, 247, 1);
  }
`;

const BreakLine =
    (<div className="row">
        <div className="col-lg-1"/>
        <div className="col-12 col-lg-10">
            <hr/>
        </div>
        <div className="col-lg-1"/>
    </div>);


class PlanSummaryPage extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            tripID: this.props.tripID,
            token: JSON.parse(sessionStorage.getItem("userToken")).token || null,
            provider: JSON.parse(sessionStorage.getItem("userSocialData"))['provider'] || null,
            tripInfo: {},
            memberInfo: [],
            accommodationInfo: {},
            isShowLiftPass: true,
            liftPassComment: "",
            liftPassList: [],
            rentalInfo: {},
            loadFinished: false,
            saveLiftPassSuccess: false,
            saveRentalInfoSuccess: false,
            completeTripSuccess: false,
            furtherComment: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.submitLiftPassInfo = this.submitLiftPassInfo.bind(this);
        this.submitRentalInfo = this.submitRentalInfo.bind(this);
        this.completeTrip = this.completeTrip.bind(this);
        this.getTripSummary = this.getTripSummary.bind(this);
    }

    //TODO: if lift pass is removed, not show lift pass list, change button text
    async getTripSummary(id) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        console.log(id);
        //get the summary information of specific trip
        await axios.get(BaseURL + "getTripSummary/" + id).then(response => {
            console.log("get trip summary successfully");
            //console.log(response.data);
            this.setState({
                tripInfo: response.data.tripInfo,
                memberInfo: response.data.memberInfo,
                accommodationInfo: response.data.accommodationInfo,
                rentalInfo: response.data.rentalInfo,
                isShowLiftPass: !response.data.liftPassInfo.isRemoved,
                liftPassComment: response.data.liftPassInfo.comment,
                liftPassList: response.data.liftPassInfo.liftPassArray,
                loadFinished: true
            });
        });
    }

    componentDidMount() {

        this.getTripSummary(this.state.tripID);
    }

    //handle action when clicking "Back"
    goPrevious = () => {

        this.submitLiftPassInfo(this.state.tripID);
        this.submitRentalInfo(this.state.tripID);
    };

    //handle action when clicking "Get a Quote"
    getQuote = () => {

        this.completeTrip(this.state.tripID);
        this.submitLiftPassInfo(this.state.tripID);
        this.submitRentalInfo(this.state.tripID);
    };

    async submitLiftPassInfo(tripID) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        let postData;
        postData = {
            tripID: tripID,
            isRemoved: !this.state.isShowLiftPass,
            comment: this.state.liftPassComment,
            liftPassArray: this.state.liftPassList
        };
        //console.log(tripID);
        //send lift pass related information
        await axios.post(BaseURL + "updateLiftPassInfo", postData).then(response => {

            //console.log(response.data.saveLiftPassSuccess);
            if (response.data.saveLiftPassSuccess === false) {
                console.log("failed to submit liftPass information");
                this.setState({
                    saveLiftPassSuccess: false
                });
            }
            else {
                console.log("submit liftPass information successfully");
                this.setState({
                    saveLiftPassSuccess: true
                });
            }

        });
    }

    //TODO: submit rental information
    submitRentalInfo(tripID) {

    }

    async completeTrip(tripID) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        let postData;
        postData = {
            tripID: tripID,
            comment: this.state.furtherComment,
            submitDate: moment().format("YYYY-MM-DD")
        };
        //send lift pass related information
        await axios.post(BaseURL + "completeTrip", postData).then(response => {

            //console.log(response.data.completeTripSuccess);
            if (response.data.completeTripSuccess === false) {
                console.log("failed to submit trip completion information");
                this.setState({
                    completeTripSuccess: false
                });
            }
            else {
                console.log("submit trip completion information successfully");
                this.setState({
                    completeTripSuccess: true
                });
            }

        });

    }

    handleSendQuote = async (resortID, place) => {

        if (sessionStorage.getItem("userToken")) {
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            const postData = {
                token: tokenData.token,
                resortID: resortID,
                place: place
            };
            await axios
                .post(`http://127.0.0.1:3333/api/send-quote`, postData)
                .then(response => {
                    console.log("sent quote successfully");
                    //console.log(response);
                })
                .catch(error => {
                    //console.log(error);
                });
        }

    };

    async handleClick(eventType) {

        const {cookies, history, masterID, resortID, tripID} = this.props;

        if (sessionStorage.getItem('guestUser') === null) {
            // not a guest user
            if (this.state.provider === 'email') {
                const BaseURL = "http://127.0.0.1:3333/api/";
                const postData = {
                    token: this.state.token,
                    provider: this.state.provider
                };
                await axios.post(BaseURL + "checkTokenAuth", postData).then(response => {
                    if (response.data.status === "ExpiredJWT") {
                        alert('Token Expire');
                        //remove session and cookies
                        handleLogOut(cookies);
                        history.push({
                            pathname: "/login",
                            state: {
                                from: history.location.pathname,
                                masterID: masterID,
                                resortID: resortID,
                                tripID: tripID
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
                            case "goBack":
                                this.goPrevious();
                                break;
                            case"getQuote":
                                this.getQuote();
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
                case "goBack":
                    this.goPrevious();
                    break;
                case"getQuote":
                    this.getQuote();
                    break;
                default:
                    break;
            }
        }
    }

    // don't show liftpass component
    handleCloseLiftPass = () => {
        this.setState({isShowLiftPass: false});
    };

    render() {
        const {place, masterID, resortID, tripID} = this.props;
        const {
            tripInfo,
            memberInfo,
            accommodationInfo,
            isShowLiftPass,
            liftPassComment,
            liftPassList
        } = this.state;

        if (
            //this.state.saveRentalInfoSuccess &&
            this.state.saveLiftPassSuccess) {
            if (this.state.completeTripSuccess) {
                this.handleSendQuote(resortID, place);
                return <Redirect to={{
                    pathname: "/successPage/" + place,
                    state: {
                        resortID: resortID
                    }
                }}/>;
            }
            else {
                return <Redirect to={{
                    pathname: "/booking/" + place + "/learn",
                    state: {
                        masterID: masterID,
                        resortID: resortID,
                        tripID: tripID
                    }
                }}/>;
            }
        }

        if (this.state.loadFinished) {
            return (
                <React.Fragment>
                    <div
                        className="container"
                        style={{marginTop: "20px", whiteSpace: "nowrap"}}
                    >
                        {/* title */}
                        <div
                            className="row"
                            style={{
                                color: "#4682B4",
                                fontSize: "26px",
                                fontWeight: "bold"
                            }}
                        >
                            <div className="col-1"/>
                            <div className="col-4">6. PLAN SUMMARY</div>
                            <div className="col-7"/>
                        </div>
                        <br/>
                        {/* trip to */}
                        <div className="row" style={{fontWeight: "bold"}}>
                            <div className="col-lg-1"/>
                            <div
                                className="col-6 col-lg-2"
                                style={{color: "black", fontSize: "23px"}}
                            >
                                Your trip to:
                            </div>
                            <div
                                className="col-6 col-lg-2"
                                style={{color: "#3D9BE9", fontSize: "26px"}}
                            >
                                {place}
                            </div>
                            <div className="col-lg-5"/>
                        </div>
                        <br/>
                        {/* days */}
                        <div
                            className="row"
                            style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                marginLeft: "10px"
                            }}
                        >
                            <div className="col-lg-1"/>
                            <div
                                className="col-md-12 col-lg-1"
                                style={{color: "#3D9BE9", fontSize: "23px"}}
                            >
                                {tripInfo.days}
                            </div>

                            <div
                                className="col-md-12 col-lg-2"
                                style={{color: "black", fontSize: "20px"}}
                            >
                                Days
                            </div>

                            <div className="col-lg-8"/>
                        </div>
                        <br/>
                        {/* calender */}
                        <div
                            className="row"
                            style={{
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                marginLeft: "10px"
                            }}
                        >
                            <div className="col-lg-1"/>
                            <div
                                className="col-md-6 col-lg-1"
                                style={{color: "black", fontSize: "23px"}}
                            >
                                From:
                            </div>

                            <div
                                className="col-md-6 col-lg-3"
                                style={{color: "#3D9BE9", fontSize: "20px"}}
                            >
                                {tripInfo.startDate}
                            </div>
                            <div
                                className="col-md-6 col-lg-1"
                                style={{color: "black", fontSize: "23px"}}
                            >
                                To:
                            </div>
                            <div
                                className="col-md-6 col-lg-3"
                                style={{color: "#3D9BE9", fontSize: "20px"}}
                            >
                                {tripInfo.endDate}
                            </div>
                            <div className="col-lg-3"/>
                        </div>
                        <br/>
                        {/* Group member */}
                        <div className="row" style={{fontWeight: "bold"}}>
                            <div className="col-lg-1"/>
                            <div
                                className="col-6 col-lg-2"
                                style={{color: "black", fontSize: "23px"}}
                            >
                                Group Members
                            </div>
                            <div className="col-lg-7"/>
                        </div>
                        {/* members */}
                        <div className="row">
                            <div className="col-lg-1"/>
                            <div className="col-12 col-lg-10">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr style={{color: "#686369"}}>
                                        <th scope="col">Resorter</th>
                                        <th scope="col">Date of Birth</th>
                                        <th scope="col">Shoesize (AU)</th>
                                        <th scope="col">Height (cm)</th>
                                        <th scope="col">Weight (kg)</th>
                                        <th scope="col">Physical Disabilities
                                        </th>
                                        <th scope="col">Activity</th>
                                    </tr>
                                    </thead>
                                    {memberInfo.map(member => (
                                        <GroupMemberCard
                                            name={member.name}
                                            dob={member.dob}
                                            shoeSize={member.shoeSize}
                                            weight={member.weight}
                                            height={member.height}
                                            disability={member.disability}
                                            activity={
                                                member.activity.length
                                                    ? member.activity.map(activity => (
                                                        <React.Fragment>
                                                            {activity}
                                                            <br/>
                                                        </React.Fragment>
                                                    ))
                                                    : "N/A"
                                            }
                                        />
                                    ))}
                                </table>
                            </div>
                            <div className="col-lg-1"/>
                        </div>
                        {/* Accommodation Needs */}
                        <AccommodationReadOnlyCard
                            accommodation={accommodationInfo}
                            text="12"
                            style={{
                                border: "1px solid rgba(0, 166, 255, 1)",
                                width: "100%",
                                resize: "none",
                                borderRadius: "10px 10px 10px 10px"
                            }}
                            readOnly
                        />
                        {BreakLine}
                        {/* LiftPass Card */}
                        {isShowLiftPass === true ? (
                            <LiftPassCard
                                liftPassList={liftPassList}
                                liftPassComment={liftPassComment}
                                onHandleRemove={this.handleCloseLiftPass}
                            />
                        ) : (
                            ""
                        )}
                        {/* Rental Card */}
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-lg-1"/>
                                <div className="col-12 col-lg-1">
                                    <img
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover"
                                        }}
                                        alt="rentalsImage"
                                        src="https://static.wixstatic.com/media/25b4a3_2dc5dc31a0b8432aa954074e0fd46924~mv2.jpg/v1/fill/w_160,h_160,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_2dc5dc31a0b8432aa954074e0fd46924~mv2.webp"
                                    />
                                </div>
                                <div
                                    className="col-12 col-lg-1"
                                    style={{
                                        color: "#686369",
                                        fontSize: "22px",
                                        marginTop: "50px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Rentals
                                </div>
                                <div
                                    className="col-12 col-lg-3"
                                    style={{
                                        color: "black",
                                        fontSize: "13px",
                                        paddingLeft: "15px",
                                        marginTop: "57px"
                                    }}
                                >
                                    Lessons and rental for snowbiking,
                                    snowshoeing and snowmobiling are
                                    arranged directly with resort
                                </div>
                                <div className="col-lg-6"/>
                            </div>
                            <br/>
                            {/* Rental: ski */}
                            {this.state.rentalInfo.skiInfo === null ? (
                                ""
                            ) : (
                                <div className="row mt-3">
                                    <div className="col-lg-1"/>
                                    <div className="col-lg-10">

                        <span style={{
                            fontSize: "25px", fontWeight: "bold"
                        }}>
                          Ski
                        </span>

                                        <table
                                            className="table table-borderless"
                                            style={{
                                                color: "#686369",
                                                fontWeight: "bold"
                                            }}>
                                            <thead>
                                            <tr style={{color: "#686369"}}>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Boots</th>
                                                <th scope="col">Skis & Poles
                                                </th>
                                                <th scope="col">Grade</th>
                                            </tr>
                                            </thead>
                                            {this.state.rentalInfo.skiInfo.map(skiInfo => (
                                                <RentalCardInPlan
                                                    participant={skiInfo.participant}
                                                    date={skiInfo.date}
                                                    duration={skiInfo.duration}
                                                    boots={skiInfo.boots}
                                                    poles={skiInfo.poles}
                                                    grade={skiInfo.grade}
                                                />
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            )}
                            {/* Rental: Snowboard */}
                            {this.state.rentalInfo.snowboardInfo === null ? (
                                ""
                            ) : (
                                <div className="row mt-3">
                                    <div className="col-lg-1"/>
                                    <div className="col-lg-10">
                        <span style={{fontSize: "25px", fontWeight: "bold"}}>
                          Snowboard
                        </span>

                                        <table
                                            className="table table-borderless"
                                            style={{
                                                color: "#686369",
                                                fontWeight: "bold"
                                            }}>
                                            <thead>
                                            <tr style={{color: "#686369"}}>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Boots</th>
                                                <th scope="col">Board</th>
                                                <th scope="col">Grade</th>
                                            </tr>
                                            </thead>
                                            {this.state.rentalInfo.snowboardInfo.map(
                                                snowboardInfo => (
                                                    <RentalCardInPlan
                                                        participant={snowboardInfo.participant}
                                                        date={snowboardInfo.date}
                                                        duration={snowboardInfo.duration}
                                                        boots={snowboardInfo.boots}
                                                        poles={snowboardInfo.board}
                                                        grade={snowboardInfo.grade}
                                                    />
                                                )
                                            )}
                                        </table>
                                    </div>
                                </div>
                            )}
                            {/* Rental: telemark */}
                            {this.state.rentalInfo.telemarkInfo === null ? (
                                ""
                            ) : (
                                <div className="row mt-3">
                                    <div className="col-lg-1"/>
                                    <div className="col-lg-10">
                        <span style={{fontSize: "25px", fontWeight: "bold"}}>
                          Telemark
                        </span>
                                        <table
                                            className="table table-borderless"
                                            style={{
                                                color: "#686369",
                                                fontWeight: "bold"
                                            }}>
                                            <thead>
                                            <tr style={{color: "#686369"}}>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Boots</th>
                                                <th scope="col">Skis & Poles
                                                </th>
                                                <th scope="col">Grade</th>
                                            </tr>
                                            </thead>
                                            {this.state.rentalInfo.telemarkInfo.map(telemarkInfo => (
                                                <RentalCardInPlan
                                                    participant={telemarkInfo.participant}
                                                    date={telemarkInfo.date}
                                                    duration={telemarkInfo.duration}
                                                    boots={telemarkInfo.boots}
                                                    poles={telemarkInfo.poles}
                                                    grade={telemarkInfo.grade}
                                                />
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            )}
                            {/* Rental: other equipment */}
                            {this.state.rentalInfo.otherInfo === null ? (
                                ""
                            ) : (
                                <div className="row mt-3">
                                    <div className="col-lg-1"/>
                                    <div className="col-lg-10">
                        <span style={{fontSize: "25px", fontWeight: "bold"}}>
                          Other Equipment
                        </span>
                                        <table
                                            className="table table-borderless"
                                            style={{
                                                color: "#686369",
                                                fontWeight: "bold"
                                            }}>
                                            <thead>
                                            <tr style={{color: "#686369"}}>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Outerwear</th>
                                                <th scope="col">Helmet</th>
                                            </tr>
                                            </thead>
                                            {this.state.rentalInfo.otherInfo.map(otherInfo => (
                                                <RentalEquipmentCard
                                                    participant={otherInfo.participant}
                                                    date={otherInfo.date}
                                                    duration={otherInfo.duration}
                                                    boots={otherInfo.outfit}
                                                    poles={otherInfo.helmet}
                                                />
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Lesson Card */}
                        <LessonCard/>

                        {/* further Comments */}
                        <div className="row">
                            <div className="col-lg-1"/>
                            <div
                                className="col-lg-10"
                                style={{
                                    paddingLeft: "15px",
                                    fontSize: "22px",
                                    fontWeight: "bold"
                                }}
                            >
                                Further Comments
                            </div>
                            <div className="col-lg-1"/>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"/>
                            <div className="col-lg-10"
                                 style={{paddingLeft: "15px"}}>
                                <StyledTextArea
                                    placeholder="Further Comments?"
                                >
                                </StyledTextArea>
                            </div>
                            <div className="col-lg-1"/>
                        </div>

                        {/* btn */}
                        <div
                            className="row"
                            style={{
                                color: "#4682B4",
                                fontSize: "26px",
                                fontWeight: "bold"
                            }}
                        >
                            <div className="col-lg-1"
                                 style={{paddingRight: "15px"}}/>
                            <div className="col-12 col-lg-2">
                                <SmallEllipseBtn
                                    text="Back"
                                    onClick={() => this.handleClick('goBack')}
                                    style={{
                                        backgroundColor: "rgba(255, 97, 97, 1)",
                                        width: "100%",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }}
                                />
                            </div>
                            <div className="col-lg-6"/>
                            <div className="col-12 col-lg-2">
                                <SmallEllipseBtn
                                    text="Get a quote"
                                    onClick={() => this.handleClick('getQuote')}
                                    style={{
                                        backgroundColor: "rgba(255, 97, 97, 1)",
                                        width: "100%",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }}
                                />
                            </div>
                            <div className="col-lg-1"/>
                        </div>

                        {/* end */}
                    </div>
                </React.Fragment>
            );
        }
        return <div>Loading...</div>;
    }
}


export default withCookies(PlanSummaryPage);
