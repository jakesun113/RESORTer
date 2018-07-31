import React, { Component } from "react";

const DivStyle = {
  color: "grey",
  borderStyle: "solid",
  borderWidth: "3px",
  background: "white",
  position: "fixed",
  bottom: "0px",
  left: "0px"
};

const IconStyle = {
  color: "aqua",
  fontSize: "2em",
  width: "40px",
  height: "40px",
  margin: "10px",
  textAlign: "center"
};
const TextStyle = {
  color: "aqua",
  size: "2em",
  marginLeft: "15px",
  marginRight: "15px"
};

class BackTopBtn extends Component {
  state = { intervalId: 0 };

  render() {
    return (
      <React.Fragment>
        <button
          href="#top"
          onClick={() => {
            this.scrollToTop();
          }}
        >
          <div style={DivStyle}>
            <div>
              <i style={IconStyle} class="far fa-arrow-alt-circle-up" />
            </div>
            <div>
              <p style={TextStyle}>Top</p>
            </div>
          </div>
        </button>
      </React.Fragment>
    );
  }
  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId: intervalId });
  }
}

export default BackTopBtn;
