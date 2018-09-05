import React, { Component } from "react";
import moment from "moment";
import "../css/NewUserProfilePage/NewUserProfilePage.css";
// pages
import FirstPage from "../components/NewUserProfilePage/FirstPage";
import SecondPage from "../components/NewUserProfilePage/SecondPage";
import ThirdPage from "../components/NewUserProfilePage/ThirdPage";
import ForthPage from "../components/NewUserProfilePage/ForthPage";
import FifthPage from "../components/NewUserProfilePage/FifthPage";
import AlertWindow from "../components/template/AlertWindow";
// main component
class NewUserProfilePage extends Component {
  state = {
    isFirstVisit: true,
    currentPage: "page_1",
    progress: "0%",
    userEmail: this.props.location.state.signupEmail,
    userPic: null,
    firstName: null,
    lastName: null,
    gender: null,
    dob: null,
    phoneNumberPre: null,
    phoneNumber: null,
    country: null,
    postcode: null,
    skiAbility: null,
    snowboardAbility: null,
    telemarkAbility: null,
    snowbikeAbility: null,
    snowmobileAbility: null,
    snowshoeAbility: null,
    hasDisability: null,
    disabilityMembership: null,
    disabilityMemberid: null,
    disabilityDetail: null
  };

  handleNextPage = page => {
    this.setState({ currentPage: page });
  };
  handleSetState = (stateName, stateVal) => {
    this.setState({ [stateName]: stateVal });
  };

  handleChangeProgress = newProgress => {
    this.setState({ progress: newProgress });
  };
  handleSubmit = e => {
    e.preventDefault();
    let postData;
    postData = {
      email: this.props.location.state.signupEmail,
      userPic: this.state.userPic,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      dob: moment(this.state.dob).format("YYYY-MM-DD"),
      phoneNumberPre: this.state.phoneNumberPre,
      phoneNumber: this.state.phoneNumber,
      country: this.state.country,
      postcode: this.state.postcode,
      skiAbility: this.state.skiAbility,
      snowboardAbility: this.state.snowboardAbility,
      telemarkAbility: this.state.telemarkAbility,
      snowbikeAbility: this.state.snowbikeAbility,
      snowmobileAbility: this.state.snowmobileAbility,
      snowshoeAbility: this.state.snowshoeAbility,
      hasDisability: this.state.hasDisability === "yes",
      disabilityMembership: this.state.disabilityMembership,
      disabilityMemberid: this.state.disabilityMemberid,
      disabilityDetail: this.state.disabilityDetail
    };
    fetch("http://127.0.0.1:3333/api/signupProfile", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(result => result.json())
      .then(
        /*Proceed subsequent actions based on value */
        response => {
          //Register Successes
          if (response.status === "success") {
            this.props.history.push({
              pathname: "/login"
            });
          }
          //Register Fails
          else if (response.status === "fail") {
            alert("fail");
          }
        }
      );
  };
  render() {
    if (this.state.isFirstVisit) {
      var alertWindow = (
        <AlertWindow
          displayText=" Welcome to join us, in order to have a better experience, please fill your information"
          btnNum="1"
          btnText="OK"
          mode="customMode"
          onHandleClose={() => this.setState({ isFirstVisit: false })}
          onHandClick={() => this.setState({ isFirstVisit: false })}
        />
      );
    }
    return (
      <React.Fragment>
        {alertWindow}
        <div className="container">
          <br />
          {/* title */}
          <div className="form-row">
            <div className="form-group col-4">
              <span style={{ fontSize: "2rem", whiteSpace: "nowrap" }}>
                My Profile
              </span>
            </div>
            <div className="form-group col-8" />
          </div>
          {/* prograss */}
          <div className="form-row">
            <div className="form-group col-12">
              <div className="progress form-row">
                <div
                  className="form-group col-12"
                  id="progress_in_new_profile"
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: this.state.progress }}
                  aria-valuenow={this.state.progress.replace(/%/, "")}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
                <div
                  className="form-group col-1"
                  style={{ position: "absolute", left: "50%" }}
                >
                  <span
                    style={{
                      position: "relative",
                      left: "-50%",
                      color: "red"
                    }}
                  >
                    {this.state.progress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* page 1 */}
          {this.state.currentPage === "page_1" ? (
            <FirstPage
              onHandleNextPage={this.handleNextPage}
              onChangeState={this.handleSetState}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              onHandleProgress={this.handleChangeProgress}
            />
          ) : (
            ""
          )}
          {/* page 2 */}
          {this.state.currentPage === "page_2" ? (
            <SecondPage
              onHandleNextPage={this.handleNextPage}
              onChangeState={this.handleSetState}
              gender={this.state.gender}
              dob={this.state.dob}
              onHandleProgress={this.handleChangeProgress}
            />
          ) : (
            ""
          )}
          {/* page 3 */}
          {this.state.currentPage === "page_3" ? (
            <ThirdPage
              onHandleNextPage={this.handleNextPage}
              onChangeState={this.handleSetState}
              phoneNumberPre={this.state.phoneNumberPre}
              phoneNumber={this.state.phoneNumber}
              country={this.state.country}
              postcode={this.state.postcode}
              onHandleProgress={this.handleChangeProgress}
            />
          ) : (
            ""
          )}
          {/* page 4 */}
          {this.state.currentPage === "page_4" ? (
            <ForthPage
              onHandleNextPage={this.handleNextPage}
              onChangeState={this.handleSetState}
              skiAbility={this.state.skiAbility}
              snowboardAbility={this.state.snowboardAbility}
              telemarkAbility={this.state.telemarkAbility}
              snowbikeAbility={this.state.snowbikeAbility}
              snowmobileAbility={this.state.snowmobileAbility}
              snowshoeAbility={this.state.snowshoeAbility}
              onHandleProgress={this.handleChangeProgress}
            />
          ) : (
            ""
          )}
          {/* page 5 */}

          {this.state.currentPage === "page_5" ? (
            <FifthPage
              onHandleNextPage={this.handleNextPage}
              onChangeState={this.handleSetState}
              hasDisability={this.state.hasDisability}
              disabilityMembership={this.state.disabilityMembership}
              disabilityMemberid={this.state.disabilityMemberid}
              disabilityDetail={this.state.disabilityDetail}
              onHandleTriggerSubmit={() => {
                document
                  .getElementById("user_profile_signup_form_submit")
                  .click();
              }}
            />
          ) : (
            ""
          )}
        </div>

        <form style={{ display: "none" }} onSubmit={this.handleSubmit}>
          <input value={this.state.userPic} />
          <input value={this.state.firstName} />
          <input value={this.state.lastName} />
          <input value={this.state.gender} />

          <input value={moment(this.state.dob).format("YYYY-MM-DD")} />
          <input value={this.state.phoneNumberPre} />
          <input value={this.state.phoneNumber} />
          <input value={this.state.country} />

          <input value={this.state.postcode} />
          <input value={this.state.skiAbility} />
          <input value={this.state.snowboardAbility} />
          <input value={this.state.telemarkAbility} />

          <input value={this.state.snowbikeAbility} />
          <input value={this.state.snowmobileAbility} />
          <input value={this.state.snowshoeAbility} />
          <input value={this.state.hasDisability} />

          <input value={this.state.disabilityMembership} />
          <input value={this.state.disabilityMemberid} />
          <input value={this.state.disabilityDetail} />
          <button type="submit" id="user_profile_signup_form_submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default NewUserProfilePage;
