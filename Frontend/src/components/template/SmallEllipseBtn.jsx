import React, { Component } from "react";
import "../../css/template/SmallEllipseBtn.css";
class SmallEllipseBtn extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <button
          className="small_button"
          type={this.props.btnType}
          style={{
            background: this.props.btnColor,
            paddingLeft: this.props.paddingLeft,
            paddingRight: this.props.paddingRight,
            paddingTop: this.props.paddingTop,
            paddingBottom: this.props.paddingBottom
          }}
        >
          {this.props.text}
        </button>
      </React.Fragment>
    );
  }
}

export default SmallEllipseBtn;
