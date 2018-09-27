import React, { Component } from "react";
import styled from "styled-components";

const MemberCard = styled.div`
  position: relative;
  width: 170px;
  height: 40px;
  background-color: white;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.06);
`;

const MemberButton = styled.button`
  position: absolute;
  top: 4px;
  left: 10px;
  width: 150px;
  height: 32px;
  border: 0 solid black;
  background-color: rgba(255, 97, 97, 1);
  border-radius: 20px;
  transition: background-color 0.4s ease-in;

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;
class MemberBtn extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MemberCard>
          <MemberButton>
            <div
              style={{
                fontSize: "12px",
                color: "white"
              }}
            >
              {this.props.text}
            </div>
          </MemberButton>
        </MemberCard>
      </React.Fragment>
    );
  }
}

export default MemberBtn;
