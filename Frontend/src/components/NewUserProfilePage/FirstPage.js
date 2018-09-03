import React, { Component } from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";

class FirstPage extends Component {
  state = {
    first_name_wrong: false,
    last_name_wrong: false
  };

  validator = () => {
    var inputs, index;
    inputs = document.getElementsByTagName("input");
    var isValid = true;

    for (index = 0; index < inputs.length; ++index) {
      var state = {};
      // deal with inputs[index] element.
      if (inputs[index].required && inputs[index].value === "") {
        inputs[index].style.boxShadow = "0px 2px 0px 0px red";
        var stateName = inputs[index].id + "_wrong";
        state[stateName] = true;
        this.setState(state);
        isValid = false;
      }
    }

    return isValid;
  };

  handleChange = e => {
    var state = {};
    var stateName = e.target.id + "_wrong";
    state[stateName] = false;
    e.target.style.boxShadow = "0px 2px 0px 0px rgba(70,130,180,1)";
    this.setState(state);
  };

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

  storeInfo() {
    const userPic = document.getElementById("user_pic").backgroundImage;
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    this.props.onChangeState("userPic", userPic);
    this.props.onChangeState("firstName", firstName);
    this.props.onChangeState("lastName", lastName);
  }

  handleClickNext = () => {
    const isValid = this.validator();
    if (isValid === true) {
      this.storeInfo();
      this.props.onHandleNextPage("page_2");
      this.props.onHandleProgress("25%");
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* picture */}
        <div className="next-page-animation" id="first_page_signup_profile">
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
          <br />

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
          <br />

          {/* your first name */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                color: "#686369",
                fontSize: "23px",
                textAlign: "center"
              }}
            >
              <label htmlFor="first_name">Your first name?</label>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>

          {/* input for first name*/}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                width: "100%",
                margin: "auto",
                textAlign: "center"
              }}
            >
              <input
                type="text"
                id="first_name"
                style={{
                  boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                  boxSizing: "border-box !important",
                  outline: "none !important",
                  color: "#525252",
                  padding: "3px",
                  textAlign: "center",
                  maxWidth: "80%",
                  minWidth: "80%",
                  minHeight: "100%",
                  textOverflow: "ellipsis",
                  margin: "auto auto",
                  background: "transparent !important",
                  border: "none",
                  fontSize: "20px"
                }}
                required
                onChange={this.handleChange}
                defaultValue={this.props.firstName}
              />
              {/* if wrong */}
              {this.state.first_name_wrong ? (
                <div style={{ color: "red" }}>Please fill the first name</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          <br />
          {/* your last name */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                color: "#686369",
                fontSize: "23px",
                textAlign: "center"
              }}
            >
              <label htmlFor="last_name">Your last name?</label>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          {/* input for last name */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                width: "100%",
                margin: "auto",
                textAlign: "center"
              }}
            >
              <input
                type="text"
                id="last_name"
                style={{
                  boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                  boxSizing: "border-box !important",
                  outline: "none !important",
                  color: "#525252",
                  padding: "3px",
                  textAlign: "center",
                  maxWidth: "80%",
                  minWidth: "80%",
                  minHeight: "100%",
                  textOverflow: "ellipsis",
                  margin: "auto auto",
                  background: "transparent !important",
                  border: "none",
                  fontSize: "20px"
                }}
                required
                onChange={this.handleChange}
                defaultValue={this.props.lastName}
              />
              {/* if wrong */}
              {this.state.last_name_wrong ? (
                <div style={{ color: "red" }}>Please fill the last name</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          <br />

          {/* next btn */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div className="form-group col-6 col-lg-4">
              <div className="form-row">
                <div className="form-group col-12 col-lg-6" />
                <div
                  className="form-group col-12 col-lg-6"
                  style={{ textAlign: "center" }}
                >
                  <span onClick={this.handleClickNext} id="next_btn">
                    <SmallEllipseBtn
                      text="Next"
                      btnColor="rgba(0, 166, 255, 1)"
                      paddingLeft="35px"
                      paddingRight="35px"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>

          {/* end */}
        </div>
      </React.Fragment>
    );
  }
}

export default FirstPage;