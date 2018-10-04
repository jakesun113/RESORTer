import React, {Component} from "react";
import axios from "axios/index";
import GroupMemberCard from "../template/GroupMemberCard";
import AccommodationCard from "../template/AccommodationCard";
import LiftPassReadOnlyCard from "../template/LiftPassReadOnlyCard";

const ShortLineStyle = {
    marginTop: "20px",
    width: "90%"
};

//TODO: get member info
class MyTripPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: null,
            startDate: null,
            endDate: null,
            submitDate: null,
            memberInfo: [],
            accommodationInfo: {},
            liftPassInfo: {},
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
                place: response.data.tripInfo.place,
                startDate: response.data.tripInfo.startDate,
                endDate: response.data.tripInfo.endDate,
                submitDate: response.data.tripInfo.submitDate,
                memberInfo: response.data.memberInfo,
                accommodationInfo: response.data.accommodationInfo,
                liftPassInfo: response.data.liftPassInfo,
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
                                {this.state.place}
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
                            <span style={{fontSize: "2rem", whiteSpace: "nowrap", color: "#4682B4"}}>
                                {this.state.startDate}
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
                            <span style={{fontSize: "2rem", whiteSpace: "nowrap", color: "#4682B4"}}>
                                {this.state.endDate}
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
                            <span style={{fontSize: "2rem", whiteSpace: "nowrap", color: "#4682B4"}}>
                                {this.state.submitDate}
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
                                        shoeSize={member.shoeSize === null ? "N/A" : member.shoeSize}
                                        weight={member.weight === null ? "N/A" : member.weight}
                                        height={member.height === null ? "N/A" : member.height}
                                        disability={member.disability === 0 ? "No" : "Yes"}
                                        activity={member.activity.length ? member.activity.map(activity => (
                                            <React.Fragment>{activity}<br/></React.Fragment>
                                        )) : "N/A"}
                                    />
                                ))}
                            </table>
                        </div>
                        <hr style={ShortLineStyle}/>
                        {/* Accommodation information*/}
                        <AccommodationCard
                            accommodation={this.state.accommodationInfo}
                            style={{width: '100%', border: '1px solid black'}}
                            readOnly
                        />
                        <hr style={ShortLineStyle}/>
                        {/* Lift Pass */}
                        {this.state.liftPassInfo === null ? "" : (<div>
                            <div className="mt-3">
                                <h6>
                            <span style={{fontSize: "2rem", color: "#686369"}}>
                                Liftpass
                            </span>
                                </h6>
                            </div>
                            {this.state.liftPassInfo.comment === null ? "" :
                                <div className="mt-3 ml-3">
                                    <h6>
                        <span style={{color: "#4682B4"}}>
              Some group members do not require liftpasses
                        </span></h6>
                                    <textarea className="mt-3"
                                              style={{width: '100%', border: '1px solid black'}}
                                              readOnly
                                              value={this.state.liftPassInfo.comment}
                                    />
                                </div>}
                            <table className="table table-borderless mt-3">
                                {this.state.liftPassInfo.liftPassArray === null ? "" : this.state.liftPassInfo.liftPassArray.map(liftPassInfo => (
                                    <LiftPassReadOnlyCard
                                        date={liftPassInfo.date}
                                        adultNum={liftPassInfo.adultNumber}
                                        adultDuration={liftPassInfo.adultDuration}
                                        childNum={liftPassInfo.childNumber}
                                        childDuration={liftPassInfo.childDuration}
                                    />
                                ))}
                            </table>
                        </div>)}
                    </div>
                </React.Fragment>
            );
        }
        return <div>Loading...</div>;
    }
}

export default MyTripPage;
