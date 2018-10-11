import React, { Component } from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import styled from "styled-components";

// style
const CheckStyle = {
  color: "rgba(0, 166, 255, 1)",
  cursor: "pointer"
};

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid rgba(0, 166, 255, 1);
  border-radius: 10px 10px 10px 10px;
  resize: none;

  &:hover {
    background-color: rgba(198, 226, 247, 1);
  }
`;

class NumberSelector extends Component {
  state = { value: this.props.value, timeSpan: this.props.timeSpan };

  handleChangeNum = type => {
    if (type === "up") {
      this.setState({ value: this.state.value + 1 });
    }
    if (type === "down") {
      this.setState({
        value: this.state.value === 0 ? 0 : this.state.value - 1
      });
    }
  };

  handleChangeTimeSpan = () => {
    const spanList = ["Full Day", "AM", "PM"];
    const indexOfCurrent = spanList.indexOf(this.state.timeSpan);
    let resultIndex = 0;
    if (indexOfCurrent === 2) {
      resultIndex = 0;
      this.setState({ timeSpan: spanList[resultIndex] });
    } else {
      resultIndex = indexOfCurrent + 1;
      this.setState({ timeSpan: spanList[resultIndex] });
    }
  };

  render() {
    const { title } = this.props;
    const { value, timeSpan } = this.state;

    return (
      <React.Fragment>
        <td>{title}</td>
        <td style={{ color: "#4682B4" }}>{value}</td>
        <td style={{ paddingBottom: "30px !important", color: "#3D9BE9" }}>
          <i
            style={{
              position: "absolute",

              fontSize: "35px",
              cursor: "pointer",
              marginTop: "-15px"
            }}
            className="fas fa-caret-up"
            onClick={() => {
              this.handleChangeNum("up");
            }}
          />
          <i
            className="fas fa-caret-down"
            style={{
              position: "absolute",
              fontSize: "35px",
              cursor: "pointer",
              marginTop: "3px"
            }}
            onClick={() => {
              this.handleChangeNum("down");
            }}
          />
        </td>
        <td style={{ color: "#4682B4" }}>{timeSpan}</td>
        <td style={{ color: "#4682B4" }}>
          <span
            style={{
              color: "#F5980C",
              textDecoration: "underline",
              cursor: "pointer"
            }}
            onClick={this.handleChangeTimeSpan}
          >
            (Change)
          </span>
        </td>
      </React.Fragment>
    );
  }
}

class LiftPassCard extends Component {
  state = { noNeedLiftPass: false };

  HandleNeedLiftPass = () => {
    this.setState({ noNeedLiftPass: !this.state.noNeedLiftPass });
  };

  render() {
    const { noNeedLiftPass } = this.state;
    const { liftPassList } = this.props;
    return (
      <React.Fragment>
        {/* title */}
        <div className="row" style={{ fontWeight: "bold" }}>
          <div className="col-lg-1" />
          <div className="col-12 col-lg-1">
            <img
              style={{
                width: "96px",
                height: "94px",
                objectFit: "cover"
              }}
              alt="liftPassImage"
              src="https://static.wixstatic.com/media/25b4a3_9c1d0eae3937426ca9402c23e89ca53e~mv2.png/v1/fill/w_192,h_188,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_9c1d0eae3937426ca9402c23e89ca53e~mv2.webp"
            />
          </div>
          <div
            className="col-12 col-lg-1"
            style={{
              color: "#686369",
              fontSize: "22px",
              marginTop: "50px"
            }}
          >
            Liftpasses
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div
            className="col-12 col-lg-2"
            style={{
              color: "#686369",
              fontSize: "22px",
              marginTop: "50px"
            }}
          >
            <SmallEllipseBtn
              text="Remove"
              style={{
                backgroundColor: "rgba(104, 99, 105, 1)",
                fontSize: "15px",
                paddingLeft: "40px",
                paddingRight: "40px"
              }}
              onClick={this.props.onHandleRemove}
            />
          </div>
          <div
            className="col-12 col-lg-3"
            style={{
              color: "#686369",
              fontSize: "20px",
              marginTop: "50px"
            }}
          >
            …if none of you require liftpasses
          </div>
          <div className="col-lg-4" />
        </div>
        <br />
        {/* some do not need liftpass */}
        <div className="row" style={{ fontWeight: "bold" }}>
          <div className="col-lg-1" />
          <div
            className="col-6 col-lg-2"
            style={{ color: "black", fontSize: "23px", paddingLeft: "15px" }}
          >
            {noNeedLiftPass ? (
              <i
                className="far fa-check-square"
                style={CheckStyle}
                onClick={this.HandleNeedLiftPass}
              />
            ) : (
              <i
                className="far fa-square"
                style={CheckStyle}
                onClick={this.HandleNeedLiftPass}
              />
            )}
            &nbsp;&nbsp;
            <span style={{ color: "#4682B4" }}>
              Some group members do not require liftpasses
            </span>
          </div>
          <div className="col-lg-7" />
        </div>
        <br />
        {/* who do not need liftpass */}
        <div className="row" style={{ fontWeight: "bold" }}>
          <div className="col-lg-1" />
          <div
            className="col-12 col-lg-10"
            style={{ color: "black", fontSize: "23px", paddingLeft: "15px" }}
          >
            {noNeedLiftPass ? (
              <StyledTextArea
                readOnly={this.props.readOnly}
                placeholder="Lift names who do not require liftpasses"
              >
                Sb jiacheng do not need liftpass
              </StyledTextArea>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-1" />
        </div>
        {/* tip text */}
        <div className="row">
          <div className="col-lg-1" />
          <div
            className="col-12 col-lg-10"
            style={{ color: "black", fontSize: "13px", paddingLeft: "15px" }}
          >
            No lift pass required for snowshoeing or snowmobiling
          </div>
          <div className="col-lg-1" />
        </div>
        {/* liftpass lists */}
        <div
          className="row"
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            whiteSpace: "nowrap"
          }}
        >
          <div className="col-lg-1" />
          <div className="col-md-12 col-lg-10">
            <table
              className="table table-borderless"
              style={{ tableLayout: "auto" }}
            >
              <tbody>
                {liftPassList.map((eachLiftPass, index) => (
                  <tr
                    style={{
                      border: "1px solid rgb(232, 234, 237)",
                      height: "auto",
                      boxShadow: "2px 3px rgb(232, 234, 237)"
                    }}
                    key={index}
                  >
                    <td style={{ color: "#4682B4" }}>{eachLiftPass.date}</td>
                    <NumberSelector
                      title="Adults:"
                      value={eachLiftPass.adultsNum}
                      timeSpan={eachLiftPass.adultsTimeSpan}
                    />
                    {/* <td /> */}
                    <NumberSelector
                      title="Children:"
                      value={eachLiftPass.childrenNum}
                      timeSpan={eachLiftPass.childrenTimeSpan}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-1" />
        </div>
      </React.Fragment>
    );
  }
}

export default LiftPassCard;
