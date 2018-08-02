import React, { Component } from "react";
import "../css/BackTopBtn.css";

export default class BackTopButton extends Component {
  constructor() {
    super();
    this.state = {
        intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <React.Fragment>
        <button className="backTop" onClick={ () => { this.scrollToTop(); }}>
          <div className="icon">
            <i class="fas fa-chevron-circle-up"></i>
          </div>
          <div className="icon"> 
            <p>Top</p>
          </div>
        </button>
      </React.Fragment>
    );
  }
}
