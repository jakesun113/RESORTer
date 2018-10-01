import React, { Component } from "react";
import { Link } from "react-router-dom";

class PlanSummaryPage extends Component {
  goPrevious = () => {
    const { place, history, masterID, resortID, tripID } = this.props;
    const url = `/booking/${place}/learn`;
    history.push({
      pathname: url,
      state: { masterID: masterID, resortID: resortID, tripID: tripID }
    });
  };

  getQuate = () => {};

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "20px" }}>
          {/* title */}
          <div
            className="row"
            style={{ color: "#4682B4", fontSize: "26px", fontWeight: "bold" }}
          >
            <div className="col-1" />
            <div className="col-4"> 6. Plan Summary</div>
            <div className="col-7" />
          </div>
          <br />

          {/* <LeaveRow>
            <BtmEllipseButton onClick={this.goPrevious}>
              <div
                style={{
                  fontSize: "12px",
                  color: "white"
                }}
              >
                Back
              </div>
            </BtmEllipseButton>
            <Link to={"/successPage"}>
              <BtmEllipseButton onClick={this.getQuote}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "white"
                  }}
                >
                  Get a Quote
                </div>
              </BtmEllipseButton>
            </Link>
          </LeaveRow> */}
        </div>
      </React.Fragment>
    );
  }
}

export default PlanSummaryPage;
