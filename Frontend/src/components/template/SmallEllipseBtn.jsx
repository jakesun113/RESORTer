import React, { Component } from "react";
import "../../css/template/SmallEllipseBtn.css";
class SmallEllipseBtn extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <span className="small_button">
          <p>{this.props.text}</p>
        </span>
      </React.Fragment>
    );
  }
}

export default SmallEllipseBtn;
