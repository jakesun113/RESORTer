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
      groupMember: null,
      user: null,
      numberOfFamilyMember: 0, //control whether show the addSavedMember button
      savedGroupMember: null,
      showAddSavedGroupMemberCard: false,
      showAlertWindow: false,
      showAddNewGroupMemberCard: false
    };
    this.addSavedGroupMember = this.addSavedGroupMember.bind(this);
  }

  //Http Request Acquires GroupMembers
  async componentDidMount() {
    //if the user is not a guest User TODO: If guestUser
    if (!sessionStorage.getItem("guestUser")) {
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
      });
  }

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
    newGroupMember.push(data);
    this.setState({
      groupMember: newGroupMember
    });
  };

  showAddNewGroupMember = () => {
    this.setState({
      showAddNewGroupMemberCard: !this.state.showAddNewGroupMemberCard
    });
  };

  //This function just used to overwrite the existed function inside of AddGroupMemberCard.js component
  handleAddGroupNumber(params) {
    console.log('');
  }

  handleAfterAddNewGroupMemberClose = () => {
    this.setState({
      showAddNewGroupMemberCard: false
    });
  };

  handleSaveAndContinue = () => {
    this.props.submitTripMember(this.state.user, this.state.groupMember)
  }

  render() {
    let user = null;
    let groupMember = [];

    if (this.state.user != null) {
      user = this.state.user;
    }

    if (this.state.groupMember != null) {
      groupMember = this.state.groupMember;
    }

    return (
      <React.Fragment>
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
                btnColor="rgba(255, 97, 97, 1)"
                paddingLeft="11ex"
                paddingRight="11ex"
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
                  btnColor="rgba(255, 97, 97, 1)"
                  paddingLeft="3ex"
                  paddingRight="3ex"
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
                btnColor="rgba(255, 97, 97, 1)"
                paddingLeft="3.9ex"
                paddingRight="3.9ex"
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
        <div className="row">
          {this.state.user === null ? null : (
            <div className="col-12 col-lg-6">
              <br />
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
          {groupMember === null
            ? null
            : groupMember.map((info, index) => {
                return (
                  <div className="col-12 col-lg-6">
                    <br />
                    <GroupMemberInfoCard
                      key={index}
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
                btnColor="rgba(255, 97, 97, 1)"
              />
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddTripMember;
