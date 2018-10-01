import React, { Component } from "react";

class DisabilityContent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* text */}
        <div style={{ position: "absolute", left: "50%" }}>
          <div
            style={{
              position: "relative",
              width: "500px",
              height: "auto",
              padding: "20px 20px",
              left: "-50%",
              border: "1px solid blue",
              zIndex: "10",
              backgroundColor: "white"
            }}
            id="tooltip-text-in-profile"
          >
            Private lessons are recommended for those with a disability to
            optimise the learning experience. The rates are signficantly
            discounted if you are a member of Disabled Wintersports Austrilia
            (tel: 1300 265 730).
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class DisabilityTip extends Component {
  state = { isShow: false };
  render() {
    return (
      <React.Fragment>
        <i
          className="fas fa-exclamation-circle"
          id="tooltip-icon"
          style={{ color: "red", fontSize: "30px" }}
          onMouseEnter={() => {
            this.setState({ isShow: true });
          }}
          onMouseLeave={() => {
            this.setState({ isShow: false });
          }}
        />
        {this.state.isShow ? <DisabilityContent /> : ""}
      </React.Fragment>
    );
  }
}

export default DisabilityTip;
