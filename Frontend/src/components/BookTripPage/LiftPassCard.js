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

class LiftPassCard extends Component {
  state = { noNeedLiftPass: false };

  HandleNeedLiftPass = () => {
    this.setState({ noNeedLiftPass: !this.state.noNeedLiftPass });
  };
  render() {
    const { noNeedLiftPass } = this.state;
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
            <span onClick={this.props.onHandleRemove}>
              <SmallEllipseBtn
                text="Remove"
                btnColor="rgba(104, 99, 105, 1)"
                fontSize="15px"
                paddingLeft="40px"
                paddingRight="40px"
              />
            </span>
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
                class="far fa-check-square"
                style={CheckStyle}
                onClick={this.HandleNeedLiftPass}
              />
            ) : (
              <i
                class="far fa-square"
                style={CheckStyle}
                onClick={this.HandleNeedLiftPass}
              />
            )}
            &nbsp;&nbsp;Some group members do not require liftpasses
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
      </React.Fragment>
    );
  }
}

export default LiftPassCard;
