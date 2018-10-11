import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import MemberBtn from "../../components/BookTripPage/MemberBtn";
import MemberCard from "../../components/BookTripPage/EquipmentMemberCard";
import styled from "styled-components";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

const UpperEllipseButton = styled.button`
  border: 0 solid black;
  padding: 4px 20px;
  background-color: rgba(104, 99, 105, 1);
  border-radius: 20px;
  transition: background-color 1s;
  transform: translate(0, -5px);

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

class Equipmentpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: "1",
      members: {
        "1": { id: 1, name: "user 1", age: 0 }
      },
      hasActivity: true,
      currentActivity: [],
      warning: false,
      token: JSON.parse(sessionStorage.getItem("userToken")).token || null,
      provider: JSON.parse(sessionStorage.getItem("userSocialData"))['provider'] || null,
      getFinished: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  skipRental = () => {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/learn`;
    history.push({
      pathname: url,
      state: { masterID: masterID, resortID: resortID, tripID: tripID }
    });
  };

  goPrevious = () => {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/doing`;
    history.push({
      pathname: url,
      state: {
        masterID: masterID,
        resortID: resortID,
        tripID: tripID
      }
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    const {tripID, masterID} = this.props;
    const url = `http://127.0.0.1:3333/api/getEquipmentInfo/${tripID}/${masterID}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            if (data === "Error in Getting Equipment Information.") {
                alert(data)
            } else {
                const membersInfo = JSON.parse(data);
                const keys = Object.keys(membersInfo);
                this.setState({
                    currentMember: keys[0],
                    members: membersInfo,
                }, () => {
                   this.handleActivity();
                }
              )
            }
        })
        .catch(err => console.log(err))
  }

  handleActivity = () => {
    let {currentMember, members, currentActivity} = this.state;
    const ski = members[currentMember].activity[0];
    const snowboard = members[currentMember].activity[1];
    const telemark = members[currentMember].activity[2];
    let activityList = [];
    console.log("ski " + ski)
    console.log("snowboard " + snowboard)
    console.log("telemark " + telemark)
    if (ski) {
      activityList.push({
        id: 1,
        ActivityName: "Ski",
        EquipmentOne: "Boots",
        EquipmentTwo: "Skis & Poles",
        Grade: "standard"
      }),
      this.setState ({
        hasActivity: true
      });
    }
    if (snowboard) {
      activityList.push({
            id: 2,
            ActivityName: "Snowboard",
            EquipmentOne: "Boots",
            EquipmentTwo: "Board",
            Grade: "standard"
        }),
      this.setState ({
        hasActivity: true
      });
    }

    if (telemark) {
      activityList.push({
            id: 3,
            ActivityName: "Telemark",
            EquipmentOne: "Boots",
            EquipmentTwo: "Skis & Poles",
            Grade: "standard"
        }),
      this.setState ({
        hasActivity: true
      });
    }

    if (!ski && !snowboard && !telemark) {
      this.setState ({
        hasActivity: false
      })
    }
    this.setState ({
      currentActivity: activityList,
      getFinished: true
    })
  }

  // change current memeber
  handleChangeCurrentMember = memberId => {
    this.setState({
      getFinished: false,
      currentMember: memberId
    }, () => {
      this.handleActivity()
    }
  );
  };

  render() {
    let {currentMember, members, warning, hasActivity, currentActivity, getFinished} = this.state;
    let memberArray = [];
    Object.keys(members).forEach(member_id => {
        memberArray.push(members[member_id])
    });
    
    if (getFinished) {
      return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div
            className="row"
            style={{
              color: "#4682B4",
              fontSize: "26px",
              fontWeight: "bold"
            }}
          >
            <div className="col-lg-1" />
            <div className="col-12 col-lg-2"> 4. EQUIPMENT?</div>
            <div className="col-lg-1" />
            <div className="col-12 col-lg-2">
              <UpperEllipseButton onClick={this.skipRental}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "white"
                  }}
                >
                  Skip Rental
                </div>
              </UpperEllipseButton>
            </div>
            <div className="col-lg-4" />
          </div>
          <br />
          {/* members */}
          <div className="row">
            <div className="col-lg-1" />
            {memberArray.map(eachMember => (
              <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                <MemberBtn
                  key={eachMember.id.toString()}
                  text={eachMember.firstName}
                  onHandleClick={() =>
                    this.handleChangeCurrentMember(eachMember.id.toString())
                  }
                />
              </div>
            ))}
          </div>
          <br />
          {/* equipment info */}
          {console.log(currentActivity)}
          <MemberCard
            isShowTip={members[currentMember].id === 1 ? true : false}
            memberName={members[currentMember].fullName}
            memberAge={members[currentMember].age}
            hasActivity={hasActivity}
            currentActivity={currentActivity}
          />

        {/* btn */}
          <div
            className="row"
            style={{ color: "#4682B4", fontSize: "20px", fontWeight: "bold" }}
          >
            <div className="col-lg-1" style={{ paddingRight: "15px" }} />
            <div className="col-2">
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
            <div className="col-6" />
            <div className="col-2">
                <SmallEllipseBtn
                  text="Save & Continue"
                  //onClick={}
                  style={{
                    backgroundColor: "rgba(255, 97, 97, 1)",
                    width: "100%",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                  }}
                />
            </div>
            <div className="col-lg-1" />
          </div>
        </div>
      </React.Fragment>
    );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Equipmentpage;
