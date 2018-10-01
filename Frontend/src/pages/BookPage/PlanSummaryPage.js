import React, { Component } from "react";
// compomemts
import DatePickerComponent from "../../components/template/DatePickerComponent";
import GroupMemberCard from "../../components/template/GroupMemberCard";

class PlanSummaryPage extends Component {
  goPrevious = () => {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/learn`;
    history.push({
      pathname: url,
      state: {
        masterID: masterID,
        resortID: resortID,
        tripID: tripID,
        groupMembers: [{}]
      }
    });
  };

  getQuate = () => {};

  render() {
    const { place, days, history } = this.props;
    const { groupMembers} = this.state;
    return (
      <React.Fragment>
        <div
          className="container"
          style={{ marginTop: "20px", whiteSpace: "nowrap" }}
        >
          {/* title */}
          <div
            className="row"
            style={{ color: "#4682B4", fontSize: "26px", fontWeight: "bold" }}
          >
            <div className="col-1" />
            <div className="col-4">6. PLAN SUMMARY</div>
            <div className="col-7" />
          </div>
          <br />
          {/* trip to */}
          <div className="row" style={{ fontWeight: "bold" }}>
            <div className="col-lg-1" />
            <div
              className="col-6 col-lg-2"
              style={{ color: "black", fontSize: "23px" }}
            >
              Your trip to:
            </div>
            <div
              className="col-6 col-lg-2"
              style={{ color: "#3D9BE9", fontSize: "26px" }}
            >
              {place}
            </div>
            <div className="col-lg-5" />
          </div>
          <br />
          {/* days */}
          <div
            className="row"
            style={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              marginLeft: "10px"
            }}
          >
            <div className="col-lg-1" />
            <div
              className="col-md-12 col-lg-1"
              style={{ color: "#3D9BE9", fontSize: "23px" }}
            >
              {days === undefined ? 6 : days}
            </div>

            <div
              className="col-md-12 col-lg-2"
              style={{ color: "black", fontSize: "20px" }}
            >
              Days
            </div>

            <div className="col-lg-8" />
          </div>
          <br />
          {/* calender */}
          <div
            className="row"
            style={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              marginLeft: "10px"
            }}
          >
            <div className="col-lg-1" />
            <div
              className="col-md-6 col-lg-1"
              style={{ color: "black", fontSize: "23px" }}
            >
              From:
            </div>

            <div
              className="col-md-6 col-lg-3"
              style={{ color: "black", fontSize: "20px" }}
            >
              <DatePickerComponent key="1" readOnly={true} />
            </div>
            <div
              className="col-md-6 col-lg-1"
              style={{ color: "black", fontSize: "23px" }}
            >
              To:
            </div>
            <div
              className="col-md-6 col-lg-3"
              style={{ color: "black", fontSize: "20px" }}
            >
              <DatePickerComponent key="2" readOnly={true} />
            </div>
            <div className="col-lg-3" />
          </div>
          <br />
          {/* Group member */}
          <div className="row" style={{ fontWeight: "bold" }}>
            <div className="col-lg-1" />
            <div
              className="col-6 col-lg-2"
              style={{ color: "black", fontSize: "23px" }}
            >
              Group Members
            </div>
            <div className="col-lg-7" />
          </div>
          {/* members */}
          <div className="row">
            <div>
              <table className="table table-borderless">
                <thead>
                  <tr style={{ color: "#686369" }}>
                    <th scope="col">Resorter</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Age</th>
                    <th scope="col">Shoesize (AU)</th>
                    <th scope="col">Height (cm)</th>
                    <th scope="col">Weight (kg)</th>
                    <th scope="col">Disabilities</th>
                    <th scope="col">Food Allergies</th>
                    <th scope="col">Activity</th>
                  </tr>
                </thead>
              </table>
                {groupMembers.map(member => (
                    <GroupMemberCard
                        name={member.name}
                        dob={member.dob}
                        shoeSize={member.shoeSize}
                        weight={member.weight}
                        height={member.height}
                        disability={member.disability}
                        foodAllergy={member.foodAllergy}
                        activity={member.activity}
                    />
                ))}
            </div>
          </div>

          {/* end */}
        </div>
      </React.Fragment>
    );
  }
}

export default PlanSummaryPage;
