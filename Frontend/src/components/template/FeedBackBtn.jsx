import React, { Component } from "react";
import "../../css/template/FeedBackBtn.css";

const TextStyle = {
  marginLeft: "20px",
  color: "white !important"
};

class FeedBackBtn extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <a href="/" className="feedback-style ">
          <i className="fas fa-envelope-square">
            <span style={TextStyle}>Feedback</span>
          </i>
        </a>
      </React.Fragment>
    );
  }
}

export default FeedBackBtn;
