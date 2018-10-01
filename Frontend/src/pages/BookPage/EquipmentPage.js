import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import MemberBtn from "../../components/BookTripPage/MemberBtn";
import MemberCard from "../../components/BookTripPage/EquipmentMemberCard";
import styled from "styled-components";

const UpperEllipseButton = styled.button`
  border: 0 solid black;
  padding: 4px 20px;
  background-color: rgba(104, 99, 105, 1);
  border-radius: 20px;
  transition: background-color 1s;
  transform: translate(0, -5px);

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;

class Equipmentpage extends Component {
  state = {
    members: [
      { id: 1, name: "user 1", age: 0 },
      { id: 2, name: "user 2", age: 0 }
    ]
  };

  skipAccommodation = () => {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/learn`;
    history.push({
      pathname: url,
      state: { masterID: masterID, resortID: resortID, tripID: tripID }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div
            className="row"
            style={{ color: "#4682B4", fontSize: "26px", fontWeight: "bold" }}
          >
            <div className="col-lg-1" />
            <div className="col-12 col-lg-2"> 4. EQUIPMENT?</div>
            <div className="col-lg-1" />
            <div className="col-12 col-lg-2">
              <UpperEllipseButton onClick={this.skipAccommodation}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "white"
                  }}
                >
                  Skip Accommodation
                </div>
              </UpperEllipseButton>
            </div>
            <div className="col-lg-4" />
          </div>
          <br />
          {/* members */}
          <div className="row">
            <div className="col-lg-1" />
            {this.state.members.map(eachMember => (
              <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                <MemberBtn text={eachMember.name} />
              </div>
            ))}
          </div>
          <br />
          {/* equipment info */}

          {this.state.members.map(eachMember => (
            <MemberCard
              isShowTip={eachMember.id === 1 ? true : false}
              memberName={eachMember.name}
              memberAge={eachMember.age}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Equipmentpage;
