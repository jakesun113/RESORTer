import React, { Component } from "react";
import "../../css/template/SmallEllipseBtn.css";

//TODO: modify this component to make it "linkable"
class SmallEllipseBtn extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <button
          className="small_button"
          type={this.props.btnType}
          style={this.props.style}
          onClick={this.props.onClick}
        >
          {this.props.text}
        </button>
      </React.Fragment>
    );
  }
}

export default SmallEllipseBtn;
