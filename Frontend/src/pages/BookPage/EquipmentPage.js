import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import MemberBtn from "../../components/BookTripPage/MemberBtn";

class Equipmentpage extends Component {
  state = {
    members: [
      { name: "sb Jiacheng1" },
      { name: "sb Jiacheng2" },
      { name: "sb Jiacheng3" }
    ]
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
              <SmallEllipseBtn
                text="Skip Rental"
                btnColor="rgba(104, 99, 105, 1)"
                fontSize="20px"
              />
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
          <div className="row">
            <div className="col-lg-1" />
            {this.state.members.map(eachMember => (
              <div className="col-12 col-lg-4">
                Rental for <span>{eachMember.name}</span>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Equipmentpage;
