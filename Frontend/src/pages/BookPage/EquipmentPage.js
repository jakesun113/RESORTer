import React, { Component } from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import MemberBtn from "../../components/BookTripPage/MemberBtn";
import EquipmentPageTip from "../../components/BookTripPage/EquipmentPageTip";
class Equipmentpage extends Component {
  state = {
    members: [
      { name: "sb Jiacheng1", age: 0 },
      { name: "sb Jiacheng2", age: 0 },
      { name: "sb Jiacheng3", age: 0 }
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

          {this.state.members.map(eachMember => (
            <div>
              {/* 1 */}
              <div
                className="row"
                style={{ marginBottom: "40px", marginTop: "20px" }}
              >
                <div className="col-lg-1" />
                <div
                  className="col-12 col-lg-4"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Rental for &nbsp;
                  <span style={{ color: "#FF4040" }}>{eachMember.name}</span>
                </div>
                <div
                  className="col-12 col-lg-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Age &nbsp;
                  <span style={{ color: "#3D9BE9" }}>{eachMember.age}</span>
                </div>
                <div className="col-12 col-lg-4">
                  <EquipmentPageTip />
                </div>
                <div className="col-12 col-lg-1" />
              </div>
              {/* 2 */}
              <div
                className="row"
                style={{
                  fontWeight: "bold",
                  marginBottom: "40px",
                  marginTop: "20px"
                }}
              >
                <div className="col-lg-1" />
                <div
                  className="col-12 col-lg-4"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Activity
                </div>
                <div
                  className="col-12 col-lg-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Equipment
                </div>
                <div className="col-12 col-lg-4">Grade</div>
                <div className="col-12 col-lg-1" />
              </div>
              {/* 3 */}
              <div
                className="row"
                style={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  marginBottom: "40px",
                  marginTop: "20px"
                }}
              >
                <div className="col-lg-1" />
                <div className="col-3">Outfit (jacket, pants):*</div>
                <div className="col-2">
                  <select style={{ width: "70%" }} />
                </div>
                <div className="col-3">Helmet:</div>
                <div className="col-3">
                  <select style={{ width: "50%" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Equipmentpage;
