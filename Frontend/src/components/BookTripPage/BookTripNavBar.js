import React, { Component } from "react";
import "../../css/BookTripPage/BookTripNavBar.css";
import { Link } from "react-router-dom";
// pages

class BookTripNavBar extends Component {
  state = {
    currentProcess: "step_1_in_book_page",
    finishedProcess: [],
    unFinishedProcess: [
      "step_1_in_book_page",
      "step_2_in_book_page",
      "step_3_in_book_page",
      "step_4_in_book_page",
      "step_5_in_book_page",
      "step_6_in_book_page"
    ],
    device: "computer"
  };

  handleCurrentProcess = e => {
    e.target.className = "active";
  };

  handleInitialClass = e => {
    if (e.target.id === "1") {
      alert("no");
    }

    // this.state.unFinishedProcess.includes(e.target.id.toString())
    //   ? (e.target.className = "initial")
    //   : "";
  };
  handleDone = () => {
    var currentPage = this.this.state.currentProcess;
    var className = document.getElementById(currentPage).className + " done";
    document.getElementById(currentPage).className = className;
  };

  handleActive = () => {
    var currentPage = this.this.state.currentProcess;
    var className = document.getElementById(currentPage).className + " active";
    document.getElementById(currentPage).className = className;
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  //Responsive
  updateWindowDimensions = () => {
    if (window.innerWidth > 990) {
      this.setState({ device: "computer" });
    } else {
      this.setState({ device: "phone" });
    }
  };

  render() {
    if (this.state.device === "phone") {
      return (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div class="booktrip-navbar">
                {/* 1 */}
                <div id="step_1_in_book_page" class="circle done">
                  <span class="label">1</span>
                  <span class="title">When & Who?</span>
                </div>
                {/* 2 */}
                <span id="step_2_in_book_page" class="bar done" />
                <div id="step_2_in_book_page" class="circle done">
                  <span class="label">2</span>
                  <span class="title">Sleep?</span>
                </div>
                {/* 3 */}
                <span id="step_3_in_book_page" class="bar active" />
                <div id="step_3_in_book_page" class="circle active">
                  <span class="label">3</span>
                  <span class="title">Doing?</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="booktrip-navbar">
                {/* 4 */}
                <div id="step_4_in_book_page" class="circle">
                  <span class="label">4</span>
                  <span class="title">Equipment?</span>
                </div>
                {/* 5 */}
                <span id="step_5_in_book_page" class="bar" />
                <div id="step_5_in_book_page" class="circle">
                  <span class="label">5</span>
                  <span class="title">Learn?</span>
                </div>
                {/* 6 */}
                <span id="step_6_in_book_page" class="bar" />
                <div id="step_6_in_book_page" class="circle">
                  <span class="label">6</span>
                  <span class="title">Plan Summary</span>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    if (this.state.device === "computer") {
      return (
        <React.Fragment>
          <div className="container">
            <div class="booktrip-navbar">
              {/* 1 */}
              <div id="step_1_in_book_page" class="circle done">
                <span class="label">1</span>
                <span class="title">When & Who?</span>
              </div>
              {/* 2 */}
              <span id="step_2_in_book_page" class="bar done" />
              <div id="step_2_in_book_page" class="circle done">
                <span class="label">2</span>
                <span class="title">Sleep?</span>
              </div>
              {/* 3 */}
              <span id="step_3_in_book_page" class="bar active" />
              <div class="circle active">
                <span class="label">3</span>
                <span class="title">Doing?</span>
              </div>
              {/* 4 */}
              <span id="step_4_in_book_page" class="bar" />
              <div id="step_4_in_book_page" class="circle">
                <span class="label">4</span>
                <span class="title">Equipment?</span>
              </div>
              {/* 5 */}
              <span id="step_5_in_book_page" class="bar" />
              <div id="step_5_in_book_page" class="circle">
                <span class="label">5</span>
                <span class="title">Learn?</span>
              </div>
              {/* 6 */}
              <span id="step_6_in_book_page" class="bar" />
              <div id="step_6_in_book_page" class="circle">
                <span class="label">6</span>
                <span class="title">Plan Summary</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default BookTripNavBar;
