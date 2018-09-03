import React, { Component } from "react";
import "../../css/BookTripPage/BookTripNavBar.css";

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
    ]
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

  componentDidMount() {
    document.getElementById("step_1_in_book_page").className =
      "circle_navbar_in_bookpage active_navbar_in_bookpage";
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
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
          {/* navbar */}
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-2" />

            <div className="col-10">
              {/* process 1 */}
              <div
                id="step_1_in_book_page"
                class="circle_navbar_in_bookpage initial_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              >
                1
              </div>

              <div
                className="line_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              />
              {/* process 2 */}
              <div
                class="circle_navbar_in_bookpage initial_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              >
                2
              </div>
              <div
                className="line_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              />
              {/* process 3 */}
              <div
                class="circle_navbar_in_bookpage initial_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              >
                3
              </div>
              <div
                className="line_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              />
              {/* process 4 */}
              <div
                class="circle_navbar_in_bookpage initial_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              >
                4
              </div>
              <div
                className="line_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              />
              {/* process 5 */}
              <div
                class="circle_navbar_in_bookpage initial_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              >
                5
              </div>
              <div
                className="line_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              />
              {/* process 6 */}
              <div
                class="circle_navbar_in_bookpage initial_navbar_in_bookpage"
                style={{ display: "inline-block" }}
              >
                6
              </div>
            </div>
          </div>
          <br />
          {/* second row */}
          <div className="row">
            <div className="col-2" />

            <div className="col-10">
              {/* process 1 */}
              <div style={{ display: "inline-block", alignContent: "center" }}>
                When & Who?
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "50px",
                  height: "0 !important",
                  minHeight: "0 !important"
                }}
              />
              {/* process 2 */}
              <div style={{ display: "inline-block", alignContent: "center" }}>
                Sleep?
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "100px",
                  height: "0 !important",
                  minHeight: "0 !important"
                }}
              />
              {/* process 3 */}
              <div style={{ display: "inline-block", alignContent: "center" }}>
                Doing?
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "80px",
                  height: "0 !important",
                  minHeight: "0 !important"
                }}
              />
              {/* process 4 */}
              <div style={{ display: "inline-block", alignContent: "center" }}>
                Equipment?
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "76px",
                  height: "0 !important",
                  minHeight: "0 !important"
                }}
              />
              {/* process 5 */}
              <div style={{ display: "inline-block", alignContent: "center" }}>
                Learn?
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "70px",
                  height: "0 !important",
                  minHeight: "0 !important"
                }}
              />
              {/* process 6 */}
              <div style={{ display: "inline-block", alignContent: "center" }}>
                Plan Summary
              </div>
            </div>

            {/* end navbar */}
          </div>
          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default BookTripNavBar;
