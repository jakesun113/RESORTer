import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import MemberBtn from "../../components/BookTripPage/MemberBtn";
import MemberCard from "../../components/BookTripPage/EquipmentMemberCard";
import styled from "styled-components";
import axios from "axios/index";
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
      currentMember: null,
      members: {},
      hasActivity: true,
      currentActivity: [],
      outfit: null,
      helmet: null,
      warning: false,
      token: JSON.parse(sessionStorage.getItem("userToken")).token || null,
      provider: JSON.parse(sessionStorage.getItem("userSocialData"))['provider'] || null,
      getFinished: false
    };
    this.handleSkipRental = this.handleSkipRental.bind(this);
  }

  async handleSkipRental () {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/learn`;
    history.push({
      pathname: url,
      state: { masterID: masterID, resortID: resortID, tripID: tripID }
    });
    let BaseURL = "http://127.0.0.1:3333/api/";
    let postData;
    postData = {
      tripID: tripID,
      masterID: masterID
    };
    
    //send lift pass related information
    await axios.post(BaseURL + "skipEquipmentInfo", postData).then(response => {
      console.log("skip rental info success");
      console.log(response.data);
    }) .catch(error => {
      console.log(error);
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
    const url = "http://127.0.0.1:3333/api/getEquipmentInfo/" + tripID + "/" + masterID;
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
                   this.handleRentalInfo();
                }
              )
            }
        })
        .catch(error => console.log(error))
  }

  handleRentalInfo = () => {
    let {currentMember, members} = this.state;
    const ski = members[currentMember].activity[0];
    const snowboard = members[currentMember].activity[1];
    const telemark = members[currentMember].activity[2];
    let activities = {};
    console.log("ski " + ski)
    console.log("snowboard " + snowboard)
    console.log("telemark " + telemark)
    if (ski) {
      activities[1]= {
        id: 1,
        ActivityName: "Ski",
        EquipmentOne: "Boots",
        EquipmentOneChecked: false,
        EquipmentTwo: "Skis & Poles",
        EquipmentTwoChecked: false,
        Grade: "Standard"
      },
      this.setState ({
        hasActivity: true
      });

      if (members[currentMember].skiInfo !== null) {
        const boots = members[currentMember].skiInfo[0].boots;
        const poles = members[currentMember].skiInfo[0].poles;
        const grade = members[currentMember].skiInfo[0].grade;
        activities[1].EquipmentOneChecked = boots;
        activities[1].EquipmentTwoChecked = poles;
        activities[1].Grade = grade;
      }

    }
    if (snowboard) {
      activities[2] = {
            id: 2,
            ActivityName: "Snowboard",
            EquipmentOne: "Boots",
            EquipmentOneChecked: false,
            EquipmentTwo: "Board",
            EquipmentTwoChecked: false,
            Grade: "Standard"
        },
      this.setState ({
        hasActivity: true
      });
      if (members[currentMember].snowboardInfo !== null) {
        const boots = members[currentMember].snowboardInfo[0].boots;
        const board = members[currentMember].snowboardInfo[0].board;
        const grade = members[currentMember].snowboardInfo[0].grade;
        activities[2].EquipmentOneChecked = boots;
        activities[2].EquipmentTwoChecked = board;
        activities[2].Grade = grade;
      }
    }

    if (telemark) {
      activities[3] = {
            id: 3,
            ActivityName: "Telemark",
            EquipmentOne: "Boots",
            EquipmentOneChecked: false,
            EquipmentTwo: "Skis & Poles",
            EquipmentTwoChecked: false,
            Grade: "Standard"
        },
      this.setState ({
        hasActivity: true
      });
      if (members[currentMember].telemarkInfo !== null) {
        const boots = members[currentMember].telemarkInfo[0].boots;
        const poles = members[currentMember].telemarkInfo[0].poles;
        const grade = members[currentMember].telemarkInfo[0].grade;
        activities[3].EquipmentOneChecked = boots;
        activities[3].EquipmentTwoChecked = poles;
        activities[3].Grade = grade;
      }
    }

    if (members[currentMember].otherInfo !== null) {
      const outfit = members[currentMember].otherInfo[0].outfit;
      const helmet = members[currentMember].otherInfo[0].helmet;
      this.setState ({
        outfit: outfit,
        helmet: helmet
      })
      
    }

    if (!ski && !snowboard && !telemark) {
      this.setState ({
        hasActivity: false
      })
    }
    let activityArray = [];
    Object.keys(activities).forEach(activity_id => {
      activityArray.push(activities[activity_id])
    });

    this.setState ({
      currentActivity: activityArray,
      getFinished: true
    })
  }

  // change current memeber
  handleChangeCurrentMember = memberId => {
    this.setState({
      getFinished: false,
      currentMember: memberId
    }, () => {
      this.handleRentalInfo()
    }
  );
  };

  render() {
    let {currentMember, members, warning, hasActivity, currentActivity, outfit, helmet, getFinished} = this.state;
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
              <UpperEllipseButton onClick={this.handleSkipRental}>
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
            key={members[currentMember].id}
            memberName={members[currentMember].fullName}
            memberAge={members[currentMember].age}
            hasActivity={hasActivity}
            currentActivity={currentActivity}
            memberOutfit={outfit}
            memberHelmet={helmet}
            memberShoeSize={members[currentMember].shoeSize}
            memberHeight={members[currentMember].height}
            memberWeight={members[currentMember].weight}
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
