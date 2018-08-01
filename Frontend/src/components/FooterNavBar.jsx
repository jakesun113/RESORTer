import React, { Component } from "react";
import BackTopBtn from "./BackTopBtn";
// style
const shortLineStyle = {
  marginTop: "50px",
  width: "90%"
};

const upperTextStyle = {
  textDecoration: "underline",
  color: "black"
};

const marginLeftStyle = {
  paddingRight: "100px",
  paddingLeft: "250px"
};

const marginRightStyle = {
  paddingRight: "15px",
  paddingLeft: "350px"
};

class FooterNavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div style={marginRightStyle}>
              <a style={upperTextStyle} href="">
                Term of Use
              </a>
            </div>
            <div style={marginLeftStyle}>
              <a style={upperTextStyle} href="">
                Privacy Statement
              </a>
            </div>
          </div>
          <hr style={shortLineStyle} />
          <div className="row">
            <div className="col">
              <span>Melbourne, Australia</span>
            </div>
            <div className="col">
              <a href="">info@resorter.app</a>
            </div>
            <div className="col">
              <span>Copyright 2017 - RESORTer - All Rights Reserved</span>
            </div>
          </div>
        </div>

        {this.props.isHidden !== 1 ? (
          <BackTopBtn scrollStepInPx="50" delayInMs="16.66" />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default FooterNavBar;
