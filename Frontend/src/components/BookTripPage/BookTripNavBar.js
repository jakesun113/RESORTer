import React, { Component } from "react";
import "../../css/BookTripPage/BookTripNavBar.css";
import styled from "styled-components";
const Circle = styled.li`

    /* width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 20px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.4s ease 0s;
  background-color: rgba(
    ${props => (props.active ? "90, 215, 76, 1" : "204, 204, 204, 1")}
  );
  border-color: rgba(204, 204, 204, 1);
  &:hover {
    background-color: rgb(255, 0, 0);
    cursor: pointer;
  } */
`;
const Line = styled.div`
  border-top: 5px solid rgba(232, 89, 12, 1);
  position: absolute;
  width: 100%;
  top: 50%;
`;
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

  // componentDidMount() {
  //   document.getElementById("step_1_in_book_page").className =
  //     "circle_navbar_in_bookpage active_navbar_in_bookpage";
  // }

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
          <ul className="row">
            <li className="col-2">
              1<br />
              <span style={{ color: "black", whiteSpace: "nowrap" }}>
                When & Who?
              </span>
            </li>
            <li className="col-2">
              2<br />
              <span style={{ color: "black" }}>Sleep?</span>
            </li>
            <li className="col-2">
              3<br />
              <span style={{ color: "black", whiteSpace: "nowrap" }}>
                Doing?
              </span>
            </li>
            <li className="col-2">
              4<br />
              <span style={{ color: "black", whiteSpace: "nowrap" }}>
                Equipment?
              </span>
            </li>
            <li className="col-2">
              5<br />
              <span style={{ color: "black", whiteSpace: "nowrap" }}>
                Learn?
              </span>
            </li>
            <li className="col-2">
              6<br />
              <span style={{ color: "black", whiteSpace: "nowrap" }}>
                Plan Summary
              </span>
            </li>
          </ul>

          <br />
          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default BookTripNavBar;
