import React, { Component } from "react";
import styled from "styled-components";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";

const StyledDiv = styled.div`
  border: 1px solid grey;
  width: 90%;
  border-radius: 10px 10px 10px 10px;
  vertical-align: baseline;
  font-size: 15px;
  text-align: justify;
  word-wrap: break-word;
`;

class EquipmentPageTip extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <StyledDiv>
          <p style={{ height: "auto", width: "80%", margin: "auto auto" }}>
            Don't want a ski pass, rental or a lesson every day? You'll have the
            chance to vary this at the end.
          </p>
          <p style={{ textAlign: "center" }} onClick={this.props.onHandleClose}>
            <SmallEllipseBtn
              text="Got it!"
              style={{
                backgroundColor: "white",
                color: "#3D9BE9",
                border: "1px solid #3D9BE9"
              }}
            />
          </p>
        </StyledDiv>
      </React.Fragment>
    );
  }
}

export default EquipmentPageTip;
