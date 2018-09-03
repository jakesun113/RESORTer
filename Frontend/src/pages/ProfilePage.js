import React, { Component } from "react";
import "../css/ProfilePage/ProfilePage.css";
import SliderBar from "../components/template/SliderBar";
import DisabilityForm from "../components/template/DisabilityForm";
import AbilityLevelTip from "../components/template/AbilityLevelTip";
import DisabilityTip from "../components/template/DisabilityTip";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
// img
import ablilityImg from "../materials/AbilityChart/4639A981-B794-47FD-84E6-F972F9500506.png";

class ProfilePage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      // activeTabName: "home",
      user: cookies.get("user-name") || null,
      token: cookies.get("access-token") || null,
      user_pic: cookies.get("user-pic") || null,
      hasDisability: false
    };
  }

  componentDidMount() {
    if (this.state.token === null && sessionStorage.getItem("userSocialData")) {
      let data = JSON.parse(sessionStorage.getItem("userSocialData"));
      this.setState({
        user: data.name,
        user_pic: data.provider_pic
      });
    }
  }

  //   upload btn animation
  handleHover = e => {
    if (e.target.id === "upload_btn") {
      e.target.style.backgroundColor = "rgba(78, 183, 245, 1)";
    }
  };

  handleMouseLeave = e => {
    if (e.target.id === "upload_btn") {
      e.target.style.backgroundColor = "rgba(56, 153, 236, 1)";
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div className="form-row">
            <div className="form-group col-lg-2" />
            <div className="form-group col-4 col-lg-4">
              <span style={{ fontSize: "2rem", whiteSpace: "nowrap" }}>
                My Profile
              </span>
            </div>
            <div className="form-group col-8 col-lg-6" />
          </div>

          <br />
          <form data-toggle="validator">
            {/* photo */}
            <div className="form-row">
              <div className="form-group col-3" />
              <div
                className="form-group col-6"
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  alignContent: "center"
                }}
              >
                <div
                  id="user_pic"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    fontSize: "20px",
                    color: "#fff",
                    lineHeight: "60px",
                    textAlign: "center",
                    boxShadow: "2px 2px 2px 2px grey",
                    border: "5px solid white",
                    backgroundSize: "contain",
                    margin: "auto auto",
                    backgroundImage:
                      "url(https://static.wixstatic.com/media/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.png/v1/fill/w_150,h_150,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.webp)"
                  }}
                />
              </div>
              <div className="form-group col-3" />
            </div>
            {/* upload btn */}
            <div className="form-row">
              <div className="form-group col-3 col-lg-5" />
              <div
                id="upload_btn"
                className="form-group col-6 col-lg-2"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px 20px 20px 20px",
                  backgroundColor: "rgba(56, 153, 236, 1)",
                  boxShadow: "1px 1px 1px gray",
                  textAlign: "center",
                  margin: "auto auto",
                  padding: "5px 20px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleMouseLeave}
              >
                Upload photo +
              </div>
              <div className="form-group col-3 col-lg-5" />
            </div>
            {/* max size text */}
            <div className="form-row">
              <div className="form-group col-3" />
              <div
                className="form-group col-6"
                style={{
                  width: "auto",
                  height: "auto",
                  margin: "auto auto",
                  textAlign: "center",
                  color: "#737373",
                  opacity: "0.7",
                  direction: "ltr"
                }}
              >
                Max File Size 15MB
              </div>
              <div className="form-group col-3" />
            </div>

            {/* user info */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              {/* email */}
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="inputEmail">Email</label>
                <input
                  id="inputEmail"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  readOnly
                />
              </div>
              &ensp; &ensp;
              {/* gender */}
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="gender">Gender</label>

                <select id="gender" className="form-control">
                  <option selected value="male">
                    Male
                  </option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group col-lg-2" />
            </div>

            {/* first name */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                />
              </div>
              &ensp; &ensp;
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="inputPassword">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group col-lg-2" />
            </div>

            {/* phone */}
            <div className="form-row">
              <div className="form-group col-2" />
              {/* phone */}
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="phoneNumber">Phone</label>
                <div className="form-row">
                  <div className="form-group col-4 col-lg-4">
                    <select className="custom-select">
                      <option selected>Open this select menu</option>
                      <option value="1">+61</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="form-group col-8 col-lg-8">
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>
              &ensp; &ensp;
              {/* DOB */}
              <div className="form-group col-12 col-lg-4">
                <div className="form-row">
                  <div className="form-group col-10 col-lg-10">
                    <label htmlFor="inputPassword">Date of Birth</label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      placeholder=""
                    />
                  </div>
                  <div className="form-group col-2 col-lg-2">
                    <label htmlFor="inputPassword">Age</label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-2" />
            </div>

            {/* country */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="inputEmail">Country</label>
                <input type="" className="form-control" id="" placeholder="" />
              </div>
              &ensp; &ensp;
              <div className="form-group col-12 col-lg-4">
                <label htmlFor="inputPassword">Postcode</label>
                <input type="" className="form-control" id="" placeholder="" />
              </div>
              <div className="form-group col-lg-2" />
            </div>

            {/* line */}
            <div style={{ position: "absolute", left: "50%" }}>
              <span
                style={{ position: "relative", left: "-50%", fontSize: "20px" }}
              >
                - Ability Level -
              </span>
            </div>
            <br />
            <br />

            {/* my ability */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-10">
                My Ability&ensp;
                {/* tooltip */}
                <AbilityLevelTip />
                {/* end tooltip */}
                &ensp; Not sure about your ability level?
              </div>
            </div>

            {/* first line */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-4">
                <SliderBar
                  lable="Ski"
                  min="1"
                  max="7"
                  id="ski_ability"
                  value=""
                />
              </div>
              &ensp; &ensp;
              <div className="form-group col-12 col-lg-4">
                <SliderBar
                  lable="Snowboard"
                  min="1"
                  max="7"
                  id="snowboard_ability"
                  value=""
                />
              </div>
              <div className="form-group col-lg-2" />
            </div>

            {/* second line */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-4">
                <SliderBar
                  lable="Telemark"
                  min="1"
                  max="7"
                  id="telemark_ability"
                  value=""
                />
              </div>
              &ensp; &ensp;
              <div className="form-group col-12 col-lg-4">
                <SliderBar
                  lable="Snowbike"
                  min="1"
                  max="7"
                  id="snowbike_ability"
                  value=""
                />
              </div>
              <div className="form-group  col-lg-2" />
            </div>

            {/* third line */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-4">
                <SliderBar
                  lable="Snowmobile"
                  min="1"
                  max="7"
                  id="snowmobile_ability"
                  value=""
                />
              </div>
              &ensp; &ensp;
              <div className="form-group col-12 col-lg-4">
                <SliderBar
                  lable="Snowshoe"
                  min="1"
                  max="7"
                  id="snowshoe_ability"
                  value=""
                />
              </div>
              <div className="form-group col-lg-2" />
            </div>

            {/* disable */}
            <div className="form-row">
              <div className="form-group col-lg-2" />
              <div className="form-group col-12 col-lg-10">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={e => {
                    this.setState({ hasDisability: e.target.checked });
                  }}
                  id="is_disability"
                />
                <label className="form-check-label" htmlFor="is_disability">
                  Any physical or learning disabilities?
                </label>
                &ensp;
                {/* tooltip */}
                <DisabilityTip />
              </div>
            </div>

            {/* disable form */}
            {this.state.hasDisability === true ? <DisabilityForm /> : ""}

            {/* save btn */}
            <div className="form-row">
              <div className="form-group col-4 col-lg-2" />
              <div className="form-group col-4 col-lg-4">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
              <div className="form-group col-4 col-lg-6" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(ProfilePage);
