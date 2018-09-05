import React, { Component } from "react";
class PromptPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div
            style={{
              textAlign: "center",
              marginTop: "100px",
              marginBottom: "100px",
              fontSize: "2rem",
              height: "auto"
            }}
          >
            {this.props.location.state.text}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PromptPage;
