import React, { Component } from "react";
import SmallEllipseBtn from "./SmallEllipseBtn";

class CountinueBookTrip extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: "30px" }}>
          <p
            style={{
              whiteSpace: "nowrap",
              fontSize: "15px !important",
              textAlign: "center"
            }}
          >
            <i
              className="fas fa-exclamation-circle"
              id="tooltip-icon"
              style={{ color: "red", fontSize: "15px" }}
            />
            &nbsp; &nbsp;
            <span style={{ color: "#F08E48" }}>
              You have plans in progress, you can
            </span>
          </p>
          <div
            className="row"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            <div className="col">
              <SmallEllipseBtn
                text="Complete My Snowtrip"
                btnColor="rgba(255, 97, 97, 1)"
                fontSize="15px"
              />
            </div>
            <div className="col">
              <SmallEllipseBtn
                text="Another Time"
                btnColor="rgba(104, 99, 105, 1)"
                fontSize="15px"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CountinueBookTrip;
