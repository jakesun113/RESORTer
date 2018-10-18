import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import GroupMemberInfoCard from "./TripMemberInfoCard";
import { Link } from "react-router-dom";
import axios from "axios";
import AddSavedMemberCard from "./AddSavedMemberCard";
import AlertWindow from "../template/AlertWindow";
import AddGroupMemberCard from "../GroupMemberPage/AddGroupMemberCard";

class AddTripMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMember: [],
      user: null,
      numberOfFamilyMember: 0, //control whether show the addSavedMember button
      savedGroupMember: [],
      showAddSavedGroupMemberCard: false,
      showAlertWindow: false,
      showAddNewGroupMemberCard: false,
      isTripHasPerson: null,
      canSaveAndContinue: true, // control whether the user have trip members in a trip
      isBackFromSleepPage: this.props.isBackFromSleepPage
    };
    this.addSavedGroupMember = this.addSavedGroupMember.bind(this);
  }

  //Http Request Acquires GroupMembers
  async componentDidMount() {
    //if the user is not a guest User TODO: If guestUser
    if (
      !sessionStorage.getItem("guestUser") &&
      this.props.isBackFromSleepPage === false
    ) {
      //Acquire the groupMember information when loading
      await axios
        .get(
          "http://127.0.0.1:3333/api/acquireSelfInfoAndFamilyInfo/" +
            JSON.parse(sessionStorage.getItem("userToken")).token
        )
        .then(response => {
          this.setState({
            user: response.data.user,
            groupMember: response.data.familyMember,
            numberOfFamilyMember: response.data.familyMember.length
          });
        });
    }
    //TODO: If comes from sleepPage
    else {
      //Acquire trip member
      await axios
        .get("http://localhost:3333/api/acquireTripMember/" + this.props.tripID)
        .then(response => {
          if (response.data.familyMember != null) {
            this.setState({
              groupMember: response.data.familyMember
            });
          }
          if (response.data.masterMember != null) {
            this.setState({
              user: response.data.masterMember
            });
          }
        });
      //Show the AddSavedGroupMember
      await axios
        .get(
          "http://127.0.0.1:3333/api/acquireSelfInfoAndFamilyInfo/" +
            JSON.parse(sessionStorage.getItem("userToken")).token
        )
        .then(response => {
          this.setState({
            savedGroupMember: response.data.familyMember,
            numberOfFamilyMember: response.data.familyMember.length,
          });
        });
    }
  }

  addMe = () => {
    axios
      .get(
        "http://127.0.0.1:3333/api/acquireSelfInfoAndFamilyInfo/" +
          JSON.parse(sessionStorage.getItem("userToken")).token
      )
      .then(response => {
        // console.log("new " +response.data)
        this.setState({
          user: response.data.user
        });
      });
  };

  deleteMe = () => {
    this.setState({
      user: null
    });
  };

  deleteGroupMember = index => {
    let newGroupMember = this.state.groupMember;
    newGroupMember.splice(index, 1);
    this.setState({
      groupMember: newGroupMember
    });
  };

  async addSavedGroupMember() {
    await axios
      .get(
        "http://127.0.0.1:3333/api/acquireSelfInfoAndFamilyInfo/" +
          JSON.parse(sessionStorage.getItem("userToken")).token
      )
      .then(response => {
        this.setState({
          savedGroupMember: response.data.familyMember,
          showAddSavedGroupMemberCard: !this.state.showAddSavedGroupMemberCard
        });
        //Close AddNewGroupMemberCard
        if (this.state.showAddNewGroupMemberCard === true) {
          this.handleAfterAddNewGroupMemberClose();
        }
      });
  }

  //Close AddSavedGroupMemberCard
  handleAddSavedGroupMemberCardClose = () => {
    this.setState({
      showAddSavedGroupMemberCard: false
    });
  };

  //Handle adding savedMember
  handleSavedMember = user => {
    let isExist = false;
    this.state.groupMember.map(info => {
      if (user.id === info.id) {
        this.setState({
          showAlertWindow: true
        });
        isExist = true;
      }
    });
    if (isExist) {
      return;
    }
    //After loop, there is no replicated user, add it
    let newGroupMember = this.state.groupMember;
    newGroupMember.push(user);
    this.setState({
      groupMember: newGroupMember
    });
  };

  handleAlertWindowClick = () => {
    this.setState({
      showAlertWindow: false
    });
  };

  handleAddNewGroupMember = data => {
    let newGroupMember = this.state.groupMember;
    let newSavedGroupMember = this.state.savedGroupMember;
    newGroupMember.push(data);
    newSavedGroupMember.push(data);
    this.setState({
      groupMember: newGroupMember,
      savedGroupMember: newSavedGroupMember
    });
  };

  showAddNewGroupMember = () => {
    this.setState({
      showAddNewGroupMemberCard: !this.state.showAddNewGroupMemberCard
    });
    if (this.state.showAddSavedGroupMemberCard === true) {
      this.handleAddSavedGroupMemberCardClose();
    }
  };

  //This function just used to overwrite the existed function inside of AddGroupMemberCard.js component
  handleAddGroupNumber(params) {
    //console.log('');
  }

  handleAfterAddNewGroupMemberClose = () => {
    this.setState({
      showAddNewGroupMemberCard: false
    });
  };

  handleSaveAndContinue = () => {
    if (this.state.user != null || this.state.groupMember.length > 0) {
      this.props.submitTripMember(this.state.user, this.state.groupMember);
    } else {
      this.setState({
        canSaveAndContinue: false
      });
    }
  };

  handleCanSaveAdnContinueClick = () => {
    this.setState({
      canSaveAndContinue: !this.state.canSaveAndContinue
    });
  };

  render() {
    let user = null;
    let groupMember = null;

    if (this.state.user != null) {
      user = this.state.user;
    }

    if (this.state.groupMember != null) {
      groupMember = this.state.groupMember;
    }

    //console.log(this.state.isTripHasPerson)
    return (
      <React.Fragment>
        {/* Whether there is at least one person in a trip */}
        {this.state.canSaveAndContinue === false ? (
          <AlertWindow
            displayText={<div>Seems like no one in this trip !</div>}
            btnNum="1"
            btnText="Add People Now ;)"
            mode="customMode"
            onHandClick={this.handleCanSaveAdnContinueClick}
            onHandleClose={this.handleCanSaveAdnContinueClick}
          />
        ) : null}
        {/* Whether a user is existed */}
        {this.state.showAlertWindow === true ? (
          <AlertWindow
            displayText={<div>This user is already existed !</div>}
            btnNum="1"
            btnText="OK"
            mode="customMode"
            onHandClick={this.handleAlertWindowClick}
          />
        ) : null}
        {/* Add member */}
        <div
          className="row"
          style={{ color: "#4682B4", fontSize: "26px", fontWeight: "bold" }}
        >
          <div className="col-1" />
          <div className="col-4">Trip Members:</div>
          <div className="col-7" />
        </div>
        <br />
        {/* add member btn */}
        <div className="row">
          <div className="col-lg-1" />

          <div
            className="col-12 col-lg-3"
            style={{ marginBottom: "10px", textAlign: "center" }}
          >
            <span onClick={this.addMe}>
              <SmallEllipseBtn
                text="+ Add Me"
                style={{
                  backgroundColor: "rgba(255, 97, 97, 1)",
                  paddingLeft: "11ex",
                  paddingRight: "11ex"
                }}
              />
            </span>
          </div>
          {this.state.numberOfFamilyMember === 0 ? null : (
            <div
              className="col-12 col-lg-3"
              style={{ marginBottom: "10px", textAlign: "center" }}
            >
              <span onClick={this.addSavedGroupMember}>
                <SmallEllipseBtn
                  text="+ Add Saved group Member"
                  style={{
                    backgroundColor: "rgba(255, 97, 97, 1)",
                    paddingLeft: "3ex",
                    paddingRight: "3ex"
                  }}
                />
              </span>
            </div>
          )}
          <div
            className="col-12 col-lg-3"
            style={{ marginBottom: "10px", textAlign: "center" }}
          >
            <span onClick={this.showAddNewGroupMember}>
              <SmallEllipseBtn
                text="+ Add new Group Member"
                style={{
                  backgroundColor: "rgba(255, 97, 97, 1)",
                  paddingLeft: "3.9ex",
                  paddingRight: "3.9ex"
                }}
              />
            </span>
          </div>

          {this.state.showAddSavedGroupMemberCard === true ? (
            <AddSavedMemberCard
              savedGroupMember={this.state.savedGroupMember}
              handleSavedMember={this.handleSavedMember}
            />
          ) : null}

          {this.state.showAddNewGroupMemberCard === true ? (
            <div className="container">
              <AddGroupMemberCard
                addNewGroupMember={this.handleAddNewGroupMember}
                addGroupNumber={this.handleAddGroupNumber}
                onHandleClose={this.handleAfterAddNewGroupMemberClose}
              />
            </div>
          ) : null}

          <div className="col-lg-2" />
        </div>
        <br />
        {/* already added group member */}
        <div style={{ border: "1px solid grey", padding: "30px" }}>
          <p
            style={{
              color: "black",
              fontSize: "25px",
              textAlign: "center"
            }}
          >
            Current Selected Members
          </p>
          <div
            className="row"
            style={{ paddingLeft: "5%", paddingRight: "5%" }}
          >
            {/* <div className="col-lg-1" /> */}

            {this.state.user === null ? null : (
              <div className="col-12 col-md-6 col-lg-6">
                <br />
                {/* me */}
                <GroupMemberInfoCard
                  id={user.id}
                  name={user.Lastname + " " + user.Firstname}
                  dob={user.DOB}
                  skierLevel={user.SkiAbility}
                  snowBikerLevel={user.SnowbikeAbility}
                  snowBorderLevel={user.SnowboardAbility}
                  snowMobilerLevel={user.SnowmobileAbility}
                  snowShoerLevel={user.SnowshoeAbility}
                  teleMarkerLevel={user.TelemarkAbility}
                  handleClick={this.deleteMe}
                  buttonName="Delete"
                />
              </div>
            )}
            {/* members */}
            {groupMember === null
              ? null
              : groupMember.map((info, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-6" key={index}>
                      <br />
                      <GroupMemberInfoCard
                        id={info.id}
                        name={info.LastName + " " + info.FirstName}
                        dob={info.DOB}
                        skierLevel={info.SkiAbility}
                        snowBikerLevel={info.SnowbikeAbility}
                        snowBorderLevel={info.SnowboardAbility}
                        snowMobilerLevel={info.SnowmobileAbility}
                        snowShoerLevel={info.SnowshoeAbility}
                        teleMarkerLevel={info.TelemarkAbility}
                        handleClick={() => this.deleteGroupMember(index)}
                        buttonName="Delete"
                      />
                    </div>
                  );
                })}

            {/* <div className="col-lg-1" /> */}
          </div>
        </div>
        {/* <div className="col-1" /> */}
        <br />
        <div className="row">
          {/* continue btn */}
          {/* <div className="col-8" /> */}
          <div className="col-4" />
          <div className="col-4" />
          <div className="col-4">
            {/*<a href={}>*/}
            {/* <Link
              to={{
                pathname: `/booking/${this.props.place}/sleep`
                // state: {masterID: masterID, resortID: resortID, tripID: tripID},
              }}
            >
            </Link> */}
            <span onClick={this.handleSaveAndContinue}>
              <SmallEllipseBtn
                text="Save and Continue"
                style={{
                  backgroundColor: "rgba(255, 97, 97, 1)"
                }}
              />
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddTripMember;
