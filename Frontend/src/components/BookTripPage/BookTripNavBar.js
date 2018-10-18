import React, { Component } from "react";
import "../../css/BookTripPage/BookTripNavBar.css";

// pages

class BookTripNavBar extends Component {
  state = {
    currentProcess: this.props.currentPageName,
    finishedProcess: this.props.finishedProcessList,
    unFinishedProcess: this.props.unFinishedProcessList,
    device: "computer"
  };
  // judge active or done
  handleNavBarState = tagName => {
    var className = "";
    if (this.state.unFinishedProcess.includes(tagName)) {
      // untouched area
      if (this.state.currentProcess !== tagName) {
        return className;
      }
      // current active
      if (this.state.currentProcess === tagName) {
        className = " active";
        return className;
      }
    }
    // finished
    if (this.state.finishedProcess.includes(tagName)) {
      // current active
      if (this.state.currentProcess === tagName) {
        className = " active";
        return className;
      }
      // finished and untouched
      else {
        className = " done";
        return className;
      }
    }
  };

  // handleDone = tagName => {
  //   var unFinishedArray = this.state.unFinishedProcess;
  //   var FinishedArray = this.state.finishedProcess;
  //   var index = unFinishedArray.indexOf(tagName);
  //   if (index > -1) {
  //     unFinishedArray.splice(index, 1);
  //     FinishedArray.push(tagName);
  //     this.setState({ unFinishedProcess: unFinishedArray });
  //     this.setState({ finishedProcess: FinishedArray });
  //   }
  // };

  // handleActive = tagName => {
  //   // var unFinishedArray = this.state.unFinishedProcess;
  //   var FinishedArray = this.state.finishedProcess;
  //   // var index = FinishedArray.indexOf(tagName);
  //   // if already finished
  //   // if (index > -1) {
  //   //   FinishedArray.splice(index, 1);
  //   //   unFinishedArray.push(tagName);
  //   //   this.setState({ unFinishedProcess: unFinishedArray });
  //   //   this.setState({ finishedProcess: FinishedArray });
  //   // } else {
  //   this.setState({ currentProcess: tagName });
  //   // }
  // };

  // click first btn
  // only can click navbar go to already finished step

  // end handle onClick

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
      if (window.innerWidth < 414) {
        this.setState({ device: "smallPhone" });
      } else {
        this.setState({ device: "phone" });
      }
    }
  };

  render() {
    // smallPhone
    if (this.state.device === "smallPhone") {
      return (
        <React.Fragment>
          <div className="container">
            {/* title */}
            <p style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "3ex",
                  color: "#686369",
                  marginRight: "30px"
                }}
              >
                Your trip to:
              </span>
              <span style={{ color: "#4682B4", fontSize: "4ex" }}>
                {this.props.placeName}
              </span>
            </p>
            <br />
            {/* 1 */}
            <div className="row">
              <div className="booktrip-navbar">
                {/* <Link to={`/booking/${this.props.placeName}/who`}> */}
                <div
                  id="step_1_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_1_in_book_page")
                  }
                  onClick={this.props.onHandleClickOne}
                >
                  <span className="label">1</span>
                  <span className="title">When & Who?</span>
                </div>
                {/* </Link> */}
                {/* 2 */}
                <span
                  id="step_2_in_book_page"
                  className={
                    "bar" + this.handleNavBarState("step_2_in_book_page")
                  }
                />
                {/* <Link to={`/booking/${this.props.placeName}/sleep`}> */}
                <div
                  id="step_2_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_2_in_book_page")
                  }
                  onClick={this.props.onHandleClickTwo}
                >
                  <span className="label">2</span>
                  <span className="title">Sleep?</span>
                </div>
                {/* </Link> */}
              </div>
            </div>
            {/* 2 */}
            <div className="row">
              <div className="booktrip-navbar">
                {/* <Link to={`/booking/${this.props.placeName}/doing`}> */}
                <div
                  id="step_3_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_3_in_book_page")
                  }
                  onClick={this.props.onHandleClickThree}
                >
                  <span className="label">3</span>
                  <span className="title">Doing?</span>
                </div>
                {/* </Link> */}
                <span
                  id="step_4_in_book_page"
                  className={
                    "bar" + this.handleNavBarState("step_4_in_book_page")
                  }
                />
                {/* <Link to={`/booking/${this.props.placeName}/equipment`}> */}
                <div
                  id="step_4_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_4_in_book_page")
                  }
                  onClick={this.props.onHandleClickFour}
                >
                  <span className="label">4</span>
                  <span className="title">Equipment?</span>
                </div>
                {/* </Link> */}
              </div>
            </div>
            {/* 3 */}
            <div className="row">
              <div className="booktrip-navbar">
                {/* <Link to={`/booking/${this.props.placeName}/learn`}> */}
                <div
                  id="step_5_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_5_in_book_page")
                  }
                  onClick={this.props.onHandleClickFive}
                >
                  <span className="label">5</span>
                  <span className="title">Learn?</span>
                </div>
                {/* </Link> */}
                {/* 6 */}
                <span
                  id="step_6_in_book_page"
                  className={
                    "bar" + this.handleNavBarState("step_6_in_book_page")
                  }
                />
                {/* <Link to={`/booking/${this.props.placeName}/summary`}> */}
                <div
                  id="step_6_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_6_in_book_page")
                  }
                  onClick={this.props.onHandleClickSix}
                >
                  <span className="label">6</span>
                  <span className="title">Plan Summary</span>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    // phone
    if (this.state.device === "phone") {
      return (
        <React.Fragment>
          <div className="container">
            {/* title */}
            <p style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "3ex",
                  color: "#686369",
                  marginRight: "30px"
                }}
              >
                Your trip to:
              </span>
              <span style={{ color: "#4682B4", fontSize: "4ex" }}>
                {this.props.placeName}
              </span>
            </p>
            <br />
            <div className="row">
              <div className="booktrip-navbar">
                {/* 1 */}
                {/* <Link to={`/booking/${this.props.placeName}/who`}> */}
                <div
                  id="step_1_in_book_page"
                  className="circle done"
                  onClick={this.props.onHandleClickOne}
                >
                  <span className="label">1</span>
                  <span className="title">When & Who?</span>
                </div>
                {/* </Link> */}
                {/* 2 */}
                <span id="step_2_in_book_page" className="bar done" />
                {/* <Link to={`/booking/${this.props.placeName}/sleep`}> */}
                <div
                  id="step_2_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_2_in_book_page")
                  }
                  onClick={this.props.onHandleClickTwo}
                >
                  <span className="label">2</span>
                  <span className="title">Sleep?</span>
                </div>
                {/* </Link> */}
                {/* 3 */}
                <span
                  id="step_3_in_book_page"
                  className={
                    "bar" + this.handleNavBarState("step_3_in_book_page")
                  }
                />
                {/* <Link to={`/booking/${this.props.placeName}/doing`}> */}
                <div
                  id="step_3_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_3_in_book_page")
                  }
                  onClick={this.props.onHandleClickThree}
                >
                  <span className="label">3</span>
                  <span className="title">Doing?</span>
                </div>
                {/* </Link> */}
              </div>
            </div>
            <div className="row">
              <div className="booktrip-navbar">
                {/* 4 */}
                {/* <Link to={`/booking/${this.props.placeName}/equipment`}> */}
                <div
                  id="step_4_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_4_in_book_page")
                  }
                  onClick={this.props.onHandleClickFour}
                >
                  <span className="label">4</span>
                  <span className="title">Equipment?</span>
                </div>
                {/* </Link> */}
                {/* 5 */}
                <span
                  id="step_5_in_book_page"
                  className={
                    "bar" + this.handleNavBarState("step_5_in_book_page")
                  }
                />
                {/* <Link to={`/booking/${this.props.placeName}/learn`}> */}
                <div
                  id="step_5_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_5_in_book_page")
                  }
                  onClick={this.props.onHandleClickFive}
                >
                  <span className="label">5</span>
                  <span className="title">Learn?</span>
                </div>
                {/* </Link> */}
                {/* 6 */}
                <span
                  id="step_6_in_book_page"
                  className={
                    "bar" + this.handleNavBarState("step_6_in_book_page")
                  }
                />
                {/* <Link to={`/booking/${this.props.placeName}/summary`}> */}
                <div
                  id="step_6_in_book_page"
                  className={
                    "circle" + this.handleNavBarState("step_6_in_book_page")
                  }
                  onClick={this.props.onHandleClickSix}
                >
                  <span className="label">6</span>
                  <span className="title">Plan Summary</span>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    // computer
    if (this.state.device === "computer") {
      return (
        <React.Fragment>
          <div className="container">
            {/* title */}
            <p style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "3ex",
                  color: "#686369",
                  marginRight: "30px"
                }}
              >
                Your trip to:
              </span>
              <span style={{ color: "#4682B4", fontSize: "4ex" }}>
                {this.props.placeName}
              </span>
            </p>
            <div className="booktrip-navbar">
              {/* 1 */}
              {/* <Link to={`/booking/${this.props.placeName}/who`}> */}
              <div
                id="step_1_in_book_page"
                className={
                  "circle" + this.handleNavBarState("step_1_in_book_page")
                }
                onClick={this.onHandleClickOne}
              >
                <span className="label">1</span>
                <span className="title">When & Who?</span>
              </div>
              {/* </Link> */}
              {/* 2 */}
              <span
                id="step_2_in_book_page"
                className={
                  "bar" + this.handleNavBarState("step_2_in_book_page")
                }
              />
              {/* <Link to={`/booking/${this.props.placeName}/sleep`}> */}
              <div
                id="step_2_in_book_page"
                className={
                  "circle" + this.handleNavBarState("step_2_in_book_page")
                }
                onClick={this.props.onHandleClickTwo}
              >
                <span className="label">2</span>
                <span className="title">Sleep?</span>
              </div>
              {/* </Link> */}
              {/* 3 */}
              <span
                id="step_3_in_book_page"
                className={
                  "bar" + this.handleNavBarState("step_3_in_book_page")
                }
              />
              {/* <Link to={`/booking/${this.props.placeName}/doing`}> */}
              <div
                id="step_3_in_book_page"
                className={
                  "circle" + this.handleNavBarState("step_3_in_book_page")
                }
                onClick={this.props.onHandleClickThree}
              >
                <span className="label">3</span>
                <span className="title">Doing?</span>
              </div>
              {/* </Link> */}
              {/* 4 */}
              <span
                id="step_4_in_book_page"
                className={
                  "bar" + this.handleNavBarState("step_4_in_book_page")
                }
              />
              {/* <Link to={`/booking/${this.props.placeName}/equipment`}> */}
              <div
                id="step_4_in_book_page"
                className={
                  "circle" + this.handleNavBarState("step_4_in_book_page")
                }
                onClick={this.props.onHandleClickFour}
              >
                <span className="label">4</span>
                <span className="title">Equipment?</span>
              </div>
              {/* </Link> */}
              {/* 5 */}
              <span
                id="step_5_in_book_page"
                className={
                  "bar" + this.handleNavBarState("step_5_in_book_page")
                }
              />
              {/* <Link to={`/booking/${this.props.placeName}/learn`}> */}
              <div
                id="step_5_in_book_page"
                className={
                  "circle" + this.handleNavBarState("step_5_in_book_page")
                }
                onClick={this.props.onHandleClickFive}
              >
                <span className="label">5</span>
                <span className="title">Learn?</span>
              </div>
              {/* </Link> */}
              {/* 6 */}
              <span
                id="step_6_in_book_page"
                className={
                  "bar" + this.handleNavBarState("step_6_in_book_page")
                }
              />
              {/* <Link to={`/booking/${this.props.placeName}/summary`}> */}
              <div
                id="step_6_in_book_page"
                className={
                  "circle" + this.handleNavBarState("step_6_in_book_page")
                }
                onClick={this.props.onHandleClickSix}
              >
                <span className="label">6</span>
                <span className="title">Plan Summary</span>
              </div>
              {/* </Link> */}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default BookTripNavBar;
