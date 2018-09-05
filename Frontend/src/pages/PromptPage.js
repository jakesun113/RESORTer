import React, { Component } from "react";
import sbImage from "../materials/1.jpeg";
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
            <div>
              <img src={sbImage} style={{ width: "300px", height: "500px" }} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PromptPage;
