import React, {Component} from "react";
import axios from "axios/index";
import GroupMemberCard from "../template/GroupMemberCard";
import AccommodationReadOnlyCard from "../template/AccommodationReadOnlyCard";
import LiftPassReadOnlyCard from "../template/LiftPassReadOnlyCard";
import RentalCard from "../template/RentalCard";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import {Link} from "react-router-dom";
import RentalEquipmentReadOnlyCard
    from "../template/RentalEquipmentReadOnlyCard";

const ShortLineStyle = {
    marginTop: "20px",
    width: "90%"
};

class MyTripPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripInfo: {},
            memberInfo: [],
            accommodationInfo: {},
            liftPassInfo: {},
            rentalInfo: {},
            loadFinished: false
        };
        this.getTripSummary = this.getTripSummary.bind(this);
    }

    async getTripSummary(id) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        //console.log(id);
        //get the summary information of specific trip
        await axios.get(BaseURL + "getTripSummary/" + id).then(response => {
            console.log("get trip summary successfully");
            this.setState({
                tripInfo: response.data.tripInfo,
                memberInfo: response.data.memberInfo,
                accommodationInfo: response.data.accommodationInfo,
                liftPassInfo: response.data.liftPassInfo,
                rentalInfo: response.data.rentalInfo,
                loadFinished: true
            });
        });
    }

    componentDidMount() {
        const {match} = this.props;

        this.getTripSummary(match.params.id);
    }

    render() {
        if (this.state.loadFinished) {
            return (
                <React.Fragment>
                    <div className="container">
                        {/* trip basic info (where and time) */}
                        <div className="row">
                            <div className="mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", color: "#686369"}}>
                    My trip to:
                  </span>
                                </h6>
                            </div>
                            <div className="ml-3 mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", color: "#4682B4"}}>
                    {this.state.tripInfo.place}
                  </span>
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", whiteSpace: "nowrap"}}>
                    From:
                  </span>
                                </h6>
                            </div>
                            <div className="ml-3 mt-3">
                                <h6>
                  <span
                      style={{
                          fontSize: "2rem",
                          whiteSpace: "nowrap",
                          color: "#4682B4"
                      }}
                  >
                    {this.state.tripInfo.startDate}
                  </span>
                                </h6>
                            </div>
                            <div className="ml-3 mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", whiteSpace: "nowrap"}}>
                    To:
                  </span>
                                </h6>
                            </div>
                            <div className="ml-3 mt-3">
                                <h6>
                  <span
                      style={{
                          fontSize: "2rem",
                          whiteSpace: "nowrap",
                          color: "#4682B4"
                      }}
                  >
                    {this.state.tripInfo.endDate}
                  </span>
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", whiteSpace: "nowrap"}}>
                    Order Submitted at:
                  </span>
                                </h6>
                            </div>
                            <div className="ml-3 mt-3">
                                <h6>
                  <span
                      style={{
                          fontSize: "2rem",
                          whiteSpace: "nowrap",
                          color: "#4682B4"
                      }}
                  >
                    {this.state.tripInfo.submitDate}
                  </span>
                                </h6>
                            </div>
                        </div>
                        <hr style={ShortLineStyle}/>
                        {/* Group Members (who is going to this trip) */}
                        <div className="row">
                            <div className="mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", color: "#686369"}}>
                    Group Members
                  </span>
                                </h6>
                            </div>
                            <table className="table table-borderless">
                                <thead>
                                <tr style={{color: "#686369"}}>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date of Birth</th>
                                    <th scope="col">Shoesize(AU)</th>
                                    <th scope="col">Weight(kg)</th>
                                    <th scope="col">Height(cm)</th>
                                    <th scope="col">Physical Disabilities</th>
                                    <th scope="col">Activity</th>
                                </tr>
                                </thead>
                                {this.state.memberInfo.map(member => (
                                    <GroupMemberCard
                                        name={member.name}
                                        dob={member.dob}
                                        shoeSize={
                                            member.shoeSize === null ? "N/A" : member.shoeSize
                                        }
                                        weight={member.weight === null ? "N/A" : member.weight}
                                        height={member.height === null ? "N/A" : member.height}
                                        disability={member.disability === 0 ? "No" : "Yes"}
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
                        <hr style={ShortLineStyle}/>
                        {/* Accommodation information*/}
                        <AccommodationReadOnlyCard
                            accommodation={this.state.accommodationInfo}
                            style={{width: "100%", border: "1px solid black"}}
                            readOnly
                        />
                        <hr style={ShortLineStyle}/>
                        {/* Lift Pass */}
                        {this.state.liftPassInfo.isRemoved ? (
                            <div>
                                <div className="mt-3">
                                    <h6>
                    <span style={{fontSize: "2rem", color: "#686369"}}>
                      Liftpass
                    </span>
                                    </h6>
                                </div>
                                <hr style={ShortLineStyle}/>
                            </div>
                        ) : (
                            <div>
                                <div className="mt-3">
                                    <h6>
                    <span style={{fontSize: "2rem", color: "#686369"}}>
                      Liftpass
                    </span>
                                    </h6>
                                </div>
                                {this.state.liftPassInfo.comment === null ? (
                                    ""
                                ) : (
                                    <div className="mt-3 ml-3">
                                        <h6>
                      <span style={{color: "#4682B4"}}>
                        Some group members do not require liftpasses
                      </span>
                                        </h6>
                                        <textarea
                                            className="mt-3"
                                            style={{width: "100%", border: "1px solid black"}}
                                            readOnly
                                            value={this.state.liftPassInfo.comment}
                                        />
                                    </div>
                                )}
                                <table className="table table-borderless mt-3">
                                    {this.state.liftPassInfo.liftPassArray === null
                                        ? ""
                                        : this.state.liftPassInfo.liftPassArray.map(
                                            liftPassInfo => (
                                                <LiftPassReadOnlyCard
                                                    date={liftPassInfo.date}
                                                    adultNum={liftPassInfo.adultNumber}
                                                    adultDuration={liftPassInfo.adultDuration}
                                                    childNum={liftPassInfo.childNumber}
                                                    childDuration={liftPassInfo.childDuration}
                                                />
                                            )
                                        )}
                                </table>
                                <hr style={ShortLineStyle}/>
                            </div>
                        )}
                        {/* Rental */}
                        {this.state.rentalInfo === null ? (
                            ""
                        ) : (
                            <div>
                                <div className="mt-3">
                                    <h6>
                    <span style={{fontSize: "2rem", color: "#686369"}}>
                      Rental
                    </span>
                                    </h6>
                                </div>
                                {/* Rental: ski */}
                                {this.state.rentalInfo.skiInfo === null ? (
                                    ""
                                ) : (
                                    <div>
                                        <div className="mt-3">
                                            <h6>
                        <span style={{fontSize: "25px", color: "#686369"}}>
                          Ski
                        </span>
                                            </h6>
                                        </div>
                                        <table className="table table-borderless">
                                            <thead>
                                            <tr style={{color: "#686369"}}>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Boots</th>
                                                <th scope="col">Skis & Poles</th>
                                                <th scope="col">Grade</th>
                                            </tr>
                                            </thead>
                                            {this.state.rentalInfo.skiInfo.map(skiInfo => (
                                                <RentalCard
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
                                )}
                                {/* Rental: Snowboard */}
                                {this.state.rentalInfo.snowboardInfo === null ? (
                                    ""
                                ) : (
                                    <div>
                                        <div className="mt-3">
                                            <h6>
                        <span style={{fontSize: "25px", color: "#686369"}}>
                          Snowboard
                        </span>
                                            </h6>
                                        </div>
                                        <table className="table table-borderless">
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
                                                    <RentalCard
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
                                )}
                                {/* Rental: telemark */}
                                {this.state.rentalInfo.telemarkInfo === null ? (
                                    ""
                                ) : (
                                    <div>
                                        <div className="mt-3">
                                            <h6>
                        <span style={{fontSize: "25px", color: "#686369"}}>
                          Telemark
                        </span>
                                            </h6>
                                        </div>
                                        <table className="table table-borderless">
                                            <thead>
                                            <tr style={{color: "#686369"}}>
                                                <th scope="col">Participant</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Boots</th>
                                                <th scope="col">Skis & Poles</th>
                                                <th scope="col">Grade</th>
                                            </tr>
                                            </thead>
                                            {this.state.rentalInfo.telemarkInfo.map(telemarkInfo => (
                                                <RentalCard
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
                                )}
                                {/* Rental: other equipment */}
                                {this.state.rentalInfo.otherInfo === null ? (
                                    ""
                                ) : (
                                    <div>
                                        <div className="mt-3">
                                            <h6>
                        <span style={{fontSize: "25px", color: "#686369"}}>
                          Other Equipment
                        </span>
                                            </h6>
                                        </div>
                                        <table className="table table-borderless">
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
                                                <RentalEquipmentReadOnlyCard
                                                    participant={otherInfo.participant}
                                                    date={otherInfo.date}
                                                    duration={otherInfo.duration}
                                                    boots={otherInfo.outfit}
                                                    poles={otherInfo.helmet}
                                                />
                                            ))}
                                        </table>
                                    </div>
                                )}
                                <hr style={ShortLineStyle}/>
                            </div>
                        )}

                        {/* Lesson */}
                        <div>
                            <div className="mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", color: "#686369"}}>
                    Lessons
                  </span>
                                </h6>
                            </div>
                            {/*TODO: add lesson part*/}
                        </div>
                        <hr style={ShortLineStyle}/>
                        {/* Further comments */}
                        <div>
                            <div className="mt-3">
                                <h6>
                  <span style={{fontSize: "2rem", color: "#686369"}}>
                    Further Comments
                  </span>
                                </h6>
                            </div>
                            <textarea
                                className="mt-3"
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    border: "1px solid black"
                                }}
                                readOnly
                                value={
                                    this.state.tripInfo.comment === null
                                        ? "N/A"
                                        : this.state.tripInfo.comment
                                }
                            />
                        </div>
                        {/*Back button*/}
                        <div className="mt-3">
                            <Link to="/my-trip">
                                <SmallEllipseBtn
                                    text="Back"
                                    style={{backgroundColor: "rgba(104, 99, 105, 1)"}}
                                />
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return <div>Loading...</div>;
    }
}

export default MyTripPage;
