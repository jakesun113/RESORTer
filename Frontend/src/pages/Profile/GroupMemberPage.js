import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import AddGroupMemberCard from "../../components/GroupMemberPage/AddGroupMemberCard";
import GroupMemberInfoCard from "../../components/GroupMemberPage/GroupMemberInfoCard";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { Redirect } from "react-router-dom";
import axios from "axios";

//TODO: Using the database data to create groupMember card
class GroupMemberPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get("access-token") || null,
      isAddMember: false, //Whether show the interface of Adding groupMember
      numberOfGroupMember: 0, //Count the number of groupMember & Global state for Card Component and addGroupMember Component
      lastNumberOfGroupMember: 0, //Use to limit the infinite cycle of componentDidUpdate()
      groupMember: [], //groupMember Info
      redirect: false
    };
  }

  // Update new number of groupMember, when 'numberOfGroupMember' is changed
  componentDidUpdate() {
    if (this.state.numberOfGroupMember !== this.state.lastNumberOfGroupMember) {
      //Acquire the groupMember information while groupMember was edited
      axios
        .get(
          "http://127.0.0.1:3333/api/acquireGroupMember/" +
            JSON.parse(sessionStorage.getItem("userToken")).token
        )
        .then(response => {
          this.setState({
            //Update number and detail of groupMember
            numberOfGroupMember: response.data.length,
            lastNumberOfGroupMember: response.data.length,
            groupMember: response.data
          });
        });
    }
  }

  componentDidMount() {
    try {
      let tokenData;
      //If cookies does not have token, then try to find token from sessionStorage
      if (this.state.token === null && sessionStorage.getItem("userToken")) {
        tokenData = JSON.parse(sessionStorage.getItem("userToken")).token;
        this.setState({
          token: tokenData
        });
      }

      //Acquire the groupMember information when loading
      axios
        .get(
          "http://127.0.0.1:3333/api/acquireGroupMember/" +
            JSON.parse(sessionStorage.getItem("userToken")).token
        )
        .then(response => {
          //Update number and detail of groupMember
          this.setState({
            numberOfGroupMember: response.data.length,
            lastNumberOfGroupMember: response.data.length,
            groupMember: response.data
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  handleClose = () => {
    this.setState({ isAddMember: false });
  };

  // update param once added a new groupMember => Invoke by AddGroupMemberCard
  addGroupNumber = newToken => {
    this.setState({
      numberOfGroupMember: this.state.numberOfGroupMember + 1,
      token: newToken
    });
  };

  // update param once delete a existed groupMember => Invoke by GroupMemberInfoCard
  deleteGroupNumber = newToken => {
    this.setState({
      numberOfGroupMember: this.state.numberOfGroupMember - 1,
      token: newToken
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    const { cookies } = this.props;
    //if token has been expired, redirect to login page
    //console.log(this.props.location.state);
    if (this.props.location.state) {
      const { lastValid } = this.props.location.state;

      if (!lastValid) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: this.props.location.pathname }
            }}
          />
        );
      }
    }

    //if directly type this page's url, redirect to login page
    if (!sessionStorage.getItem("userToken") && !cookies.get("access-token")) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location.pathname }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div className="form-row">
            {/* <div className="form-group col-2" /> */}
            <div className="form-group col-4">
              <span style={{ fontSize: "2rem" }}>Group Members</span>
            </div>
            <div className="form-group col-6" />
          </div>
          {/* two btn */}
          <span
            onClick={() => {
              this.setState({ isAddMember: true });
            }}
          >
            <SmallEllipseBtn
              text="+ ADD GROUP MEMBER"
              style={{
                backgroundColor: "rgba(255, 97, 97, 1)"
              }}
              btnColor=""
            />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span onClick={() => this.setState({ redirect: true })}>
            <SmallEllipseBtn
              text="None? Search your Resort"
              style={{
                backgroundColor: "rgba(104, 99, 105, 1)"
              }}
            />
          </span>
          <br />
          {/* add member window */}
          {this.state.isAddMember === true ? (
            <AddGroupMemberCard
              addGroupNumber={this.addGroupNumber}
              onHandleClose={this.handleClose}
              token={this.state.token}
            />
          ) : (
            ""
          )}
          {/* text bottom */}
          {/* if have member shoud not appear */}
          {this.state.groupMember.length === 0 ? (
            <span>
              You have not added any group members yet, click&nbsp;
              <span style={{ color: "blue", textDecoration: "underline" }}>
                +Add Group Member
              </span>
              &nbsp; button above to add your group members so you can simply
              add them to any trips in the future to boost your booking
              experience!
            </span>
          ) : (
            // group member card
            <div className="row">
              {this.state.groupMember.map(info => {
                return (
                  <div className="col-12 col-lg-6">
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
                      deleteGroupNumber={this.deleteGroupNumber}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(GroupMemberPage);
