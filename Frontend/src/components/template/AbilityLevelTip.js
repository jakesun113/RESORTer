import React, { Component } from "react";
import ablilityImg from "../../materials/AbilityChart/4639A981-B794-47FD-84E6-F972F9500506.png";

class AbilityImg extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* img */}
        <div style={{ position: "absolute", left: "50%" }}>
          <img
            style={{
              position: "relative",
              width: "700px",
              height: "400px",
              zIndex: "10",
              left: "-50%"
            }}
            alt=""
            src={ablilityImg}
          />
        </div>
      </React.Fragment>
    );
  }
}

class AbilityLevelTip extends Component {
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

        {this.state.isShow ? <AbilityImg /> : ""}
      </React.Fragment>
    );
  }
}

export default AbilityLevelTip;
