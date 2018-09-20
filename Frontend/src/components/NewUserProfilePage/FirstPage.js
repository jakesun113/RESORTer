import React, { Component } from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import styled from "styled-components";
const UploadBtn = styled.label`
  width: 100%;
  height: auto;
  border-radius: 20px 20px 20px 20px;
  background-color: rgba(56, 153, 236, 1);
  box-shadow: 1px 1px 1px gray;
  text-align: center;
  margin: auto auto;
  color: white;
  cursor: pointer;
  font-size: 20px;
  white-space: nowrap;

  &:hover {
    background-color: rgba(78, 183, 245, 1);
    font-weight: bold;
  }
`;

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name_wrong: false,
      last_name_wrong: false,
      file: this.props.file,
      userPic: this.props.userPic
    };
  }

  handleUploadFile = e => {
    if (window.FileReader) {
      const reader = new FileReader();
      const file = e.target.files[0];

      console.log(e.target.result);

      //console.log(file)
      reader.addEventListener(
        "load",
        () => {
          console.log(reader.result);
          this.setState({
            userPic: reader.result,
            file: file
          });
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      alert("Not supported by your browser!");
    }
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

  //TODO: send image file to the backend
  storeInfo() {
    const userPic = this.state.userPic;
    const file = this.state.file;
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    this.props.onChangeState("user_pic", userPic);
    this.props.onChangeState("file", file);
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

      //console.log(this.props.firstName);
      let readOnly;
      let disabled;
      if (this.props.firstName !== null) {
          readOnly = true;
          disabled = true;
      } else {
          readOnly = false;
          disabled = false;
      }

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
              <img
                id="user_pic"
                alt="userPortrait"
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
                  margin: "auto auto"
                }}
                src={this.state.userPic}
              />
            </div>
            <div className="form-group col-3" />
          </div>
          <br />

          {/* upload btn */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-5" />
            <UploadBtn className="form-group col-6 col-lg-2">
              Upload photo +
              <input
                type="file"
                accept="image/*"
                hidden
                disabled={disabled}
                onChange={this.handleUploadFile}
              />
            </UploadBtn>
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
                readOnly={readOnly}
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
                readOnly={readOnly}
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
