import React, {Component} from "react";
import axios from "axios/index";
import GroupMemberCard from "../template/GroupMemberCard";
import AccommodationCard from "../template/AccommodationCard";

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
            accommodationInfo: {}
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
                accommodationInfo: response.data.accommodationInfo
            });
        });
    }

    componentDidMount() {
        const {match} = this.props;

        this.getTripSummary(match.params.id);

    }

    render() {

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
                                    shoeSize={member.shoeSize}
                                    weight={member.weight}
                                    height={member.height}
                                    disability={member.disability}
                                    activity={member.activity}
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
                </div>
            </React.Fragment>
        );
    }
}

export default MyTripPage;
