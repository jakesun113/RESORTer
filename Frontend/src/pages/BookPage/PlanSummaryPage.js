import React, { Component } from "react";
import { Link } from "react-router-dom";
// compomemts
import DatePickerComponent from "../../components/template/DatePickerComponent";
import GroupMemberCard from "../../components/template/GroupMemberCard";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import axios from "axios/index";
import AccommodationCard from "../../components/template/AccommodationCard";
import LiftPassCard from "../../components/BookTripPage/LiftPassCard";
import RentalCard from "../../components/BookTripPage/RentalCard";
import LessonCard from "../../components/BookTripPage/LessonCard";
import styled from "styled-components";

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

class BreakLine extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-12 col-lg-10">
            <hr />
          </div>
          <div className="col-lg-1" />
        </div>
      </React.Fragment>
    );
  }
}

class PlanSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMembers: [
        {
          name: "sb jiacheng",
          dob: "1992 - 10 - 10",
          age: 2,
          shoeSize: 1,
          weight: 2,
          height: 99,
          disability: "ß",
          foodAllergy: "12",
          activity: "3434"
        }
      ],
      accommodation: [
        {
          type: "Apartment",
          category: "Economy",
          adultNum: "1",
          childNum: "2",
          todNum: "3",
          bedNum: "1",
          bathNum: "2"
        }
      ],
      isShowLiftPass: true,
      liftPassList: [
        {
          date: "7 October 2018",
          adultsNum: "2",
          adultsTimeSpan: "Full Day",
          childrenNum: "3",
          childrenTimeSpan: "AM"
        },
        {
          date: "8 October 2018",
          adultsNum: "2",
          adultsTimeSpan: "Full Day",
          childrenNum: "3",
          childrenTimeSpan: "AM"
        }
      ],

      // test
      activityList: ["ski", "snowBoard"],
      rentalList: [
        {
          participant: "s",
          date: "8 October 2018",
          duration: "Full Day",
          boots: "None",
          skis: "Yes",
          grade: "Standard"
        },
        {
          participant: "s",
          date: "9 October 2018",
          duration: "Full Day",
          boots: "None",
          skis: "Yes",
          grade: "Standard"
        }
      ]
    };
    this.handleSendQuote = this.handleSendQuote.bind(this);
  }

  goPrevious = () => {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/learn`;
    history.push({
      pathname: url,
      state: {
        masterID: masterID,
        resortID: resortID,
        tripID: tripID
      }
    });
  };

  async handleSendQuote(e) {
    e.preventDefault();
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/successPage/${place}`;
    history.push({
      pathname: url
    });
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
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  // don't show liftpass component
  handleCloseLiftPass = () => {
    this.setState({ isShowLiftPass: false });
  };

  render() {
    const { place, days, history } = this.props;
    const {
      groupMembers,
      accommodation,
      isShowLiftPass,
      liftPassList,
      rentalList
    } = this.state;
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
            <div className="col-lg-1" />
            <div className="col-12 col-lg-10">
              <table className="table table-borderless">
                <thead>
                  <tr style={{ color: "#686369" }}>
                    <th scope="col">Resorter</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Shoesize (AU)</th>
                    <th scope="col">Height (cm)</th>
                    <th scope="col">Weight (kg)</th>
                    <th scope="col">Physical Disabilities</th>
                    <th scope="col">Activity</th>
                  </tr>
                </thead>
                {groupMembers.map(member => (
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
            <div className="col-lg-1" />
          </div>
          {/* Accommodation Needs */}
          <AccommodationCard
            accommodation={accommodation}
            text="12"
            style={{
              border: "1px solid rgba(0, 166, 255, 1)",
              width: "100%",
              resize: "none",
              borderRadius: "10px 10px 10px 10px"
            }}
          />
          <BreakLine />
          {/* LiftPass Card */}
          {isShowLiftPass === true ? (
            <LiftPassCard
              liftPassList={liftPassList}
              onHandleRemove={this.handleCloseLiftPass}
            />
          ) : (
            ""
          )}
          {/* Rental Card */}
          <RentalCard
            activityList={this.state.activityList}
            rentalList={rentalList}
          />
          {/* Lesson Card */}
          <LessonCard />

          {/* futurn Comments */}
          <div className="row">
            <div className="col-lg-1" />
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
            <div className="col-lg-1" />
          </div>
          <div className="row">
            <div className="col-lg-1" />
            <div className="col-lg-10" style={{ paddingLeft: "15px" }}>
              <StyledTextArea
                readOnly={this.props.readOnly}
                placeholder="Lift names who do not require liftpasses"
              >
                Sb jiacheng do not need liftpass
              </StyledTextArea>
            </div>
            <div className="col-lg-1" />
          </div>

          {/* btn */}
          <div
            className="row"
            style={{ color: "#4682B4", fontSize: "26px", fontWeight: "bold" }}
          >
            <div className="col-lg-1" style={{ paddingRight: "15px" }} />
            <div className="col-12 col-lg-2">
              <SmallEllipseBtn
                text="Back"
                onClick={this.goPrevious}
                style={{
                  backgroundColor: "rgba(255, 97, 97, 1)",
                  width: "100%",
                  paddingLeft: "10px",
                  paddingRight: "10px"
                }}
              />
            </div>
            <div className="col-lg-6" />
            <div className="col-12 col-lg-2">
              <Link to={`/successPage/${this.props.place}`}>
                <SmallEllipseBtn
                  text="Get a quote"
                  onClick={this.handleSendQuote}
                  style={{
                    backgroundColor: "rgba(255, 97, 97, 1)",
                    width: "100%",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                  }}
                />
              </Link>
            </div>
            <div className="col-lg-1" />
          </div>

          {/* end */}
        </div>
      </React.Fragment>
    );
  }
}

export default PlanSummaryPage;
