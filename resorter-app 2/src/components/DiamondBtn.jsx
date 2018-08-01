import React, { Component } from "react";

const DiamondShapeStyle = {
  background: "orangered",
  height: "60px",
  textAlign: "center",
  transform: "rotate(45deg)",
  width: "60px",
  margin: "auto",
  marginTop: "30px"
};

const TextStyle = {
  color: "white",
  display: "table-cell",
  height: "60px",
  transform: "rotate(-45deg)",
  verticalAlign: "middle",
  width: "60px"
};

class DiamondBtn extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={DiamondShapeStyle}>
          <div style={TextStyle}>{this.props.text}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default DiamondBtn;
