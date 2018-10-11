import React, { Component } from "react";
import SmallEllipseBtn from "./SmallEllipseBtn";
import { Link } from "react-router-dom";

//FIXME: when clicking "another time" in other pages, also go back to home page
class ContinueBookTrip extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              whiteSpace: "nowrap",
              fontSize: "15px !important",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center"
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
          </div>
          <div
            className="row"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            <div className="col-md-12 col-lg-8">
              <Link className="nav-link" to="/my-trip">
                <SmallEllipseBtn
                  text="Complete My Snowtrip"
                  style={{
                    backgroundColor: "rgba(255, 97, 97, 1)",
                    fontSize: "15px"
                  }}
                />
              </Link>
            </div>
            <div className="col-md-12 col-lg-4">
              <Link
                className="nav-link"
                to=""
                onClick={this.props.hideReminder}
              >
                <SmallEllipseBtn
                  text="Another Time"
                  style={{
                    backgroundColor: "rgba(104, 99, 105, 1)",
                    fontSize: "15px"
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContinueBookTrip;
