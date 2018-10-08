import React, { Component } from "react";
import moment from "moment";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import DatePickerComponent from "../template/DatePickerComponent";
// second page

class SecondPage extends Component {
  state = {
    dob: moment().subtract(1, "days"),
    gender: "male",
    birth_format_wrong: false
  };

  componentDidMount() {
    // dob
    if (this.props.dob !== "") {
      this.setState({ startDate: this.props.dob });
    }
    // gender
    if (this.props.gender !== "") {
      this.setState({ gender: this.props.gender });
    } else {
      this.setState({ gender: "male" });
    }
  }

  handleChange = (date, choice) => {
    this.setState({
      [choice]: date,
      dob: date
    });
  };

  storeInfo() {
    const gender = document.getElementById("gender").value;
    const dob = moment(this.state.dob);
    this.props.onChangeState("gender", gender);
    this.props.onChangeState("dob", dob);
  }

  handleClickNext = () => {
    this.storeInfo();
    this.props.onHandleNextPage("page_3");
    this.props.onHandleProgress("50%");
  };

  handleClickPre = () => {
    this.storeInfo();
    this.props.onHandleNextPage("page_1");
    this.props.onHandleProgress("0%");
  };

  render() {
    return (
      <React.Fragment>
        <div className="next-page-animation">
          <div className="form-row">
            <div className="form-group col-4" />
            <div
              className="form-group col-4"
              style={{
                alignItems: "center",
                textAlign: "center",
                alignContent: "center"
              }}
            >
              {/* your gender*/}
              <div
                style={{
                  color: "#686369",
                  fontSize: "23px",
                  textAlign: "center"
                }}
              >
                <label htmlFor="gender">Your gender?</label>
              </div>
            </div>
            <div className="form-group col-4" />
          </div>

          {/* input */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                width: "100%",
                margin: "auto"
              }}
            >
              <select
                value={this.state.gender}
                id="gender"
                className="form-control"
                style={{
                  boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                  boxSizing: "border-box !important",
                  outline: "none !important",
                  color: "#525252",
                  padding: "3px",
                  textAlign: "center",
                  textAlignLast: "center",
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
                onChange={e => {
                  this.setState({ gender: e.target.value });
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nopecified">No Specified</option>
              </select>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          <br />
          {/* your DOB */}
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
              <label htmlFor="birthday">Your date of birth?</label>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>

          {/* input for DOB*/}
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
              <DatePickerComponent
                checkValidate={() => {
                  this.setState({ birth_format_wrong: false });
                  alert("deed");
                }}
                selected={this.state.dob}
                onHandleChange={this.handleChange}
                noOutline={true}
              />
              {/* if wrong */}
              {this.state.birth_format_wrong ? (
                <div style={{ color: "red" }}>Please fill a valid birthday</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          <br />
          {/* next btn */}
          <div className="form-row">
            <div className="form-group col-4" />
            <div className="form-group col-4">
              <div className="form-row">
                <div
                  className="form-group col-12 col-lg-6"
                  style={{ textAlign: "center" }}
                >
                  <span onClick={this.handleClickPre}>
                    <SmallEllipseBtn
                      text="Previous"
                      style={{
                        backgroundColor: "rgba(0, 166, 255, 1)",
                        paddingLeft: "20px",
                        paddingRight: "20px"
                      }}
                    />
                  </span>
                </div>
                <div
                  className="form-group col-12 col-lg-6"
                  style={{ textAlign: "center" }}
                >
                  <span onClick={this.handleClickNext}>
                    <SmallEllipseBtn
                      text="Next"
                      style={{
                        backgroundColor: "rgba(0, 166, 255, 1)",
                        paddingLeft: "35px",
                        paddingRight: "35px"
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group col-4" />
          </div>

          {/* end */}
        </div>
      </React.Fragment>
    );
  }
}

export default SecondPage;
