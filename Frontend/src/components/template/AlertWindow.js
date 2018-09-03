import React, { Component } from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import { Link } from "react-router-dom";

class AlertWindow extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div
          className="row"
          style={{ position: "fixed", left: "50%", zIndex: "999", top: "40%" }}
        >
          <div
            className="container"
            style={{
              position: "relative",
              background: "white",
              color: "rgb(93, 135, 221)",
              top: "-40%",
              left: "-50%",
              width: "auto",
              height: "auto",
              maxWidth: "500px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "1px solid rgb(130, 171, 255)",
              borderRadius: "10px 10px 10px 10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <br />
            {/* close  */}
            <div style={{ textAlign: "right", cursor: "pointer" }}>
              <i
                className="fas fa-times"
                style={{ fontSize: "3ex" }}
                onClick={this.props.onHandleClose}
              />
            </div>
            <br />
            <h4>{this.props.displayText}</h4>
            <br />
            {/* one btn */}
            {this.props.btnNum === "1" ? (
              <div className="row">
                <div className="col-12">
                  {/* link mode */}
                  {this.props.mode === "linkMode" ? (
                    <Link
                      to={this.props.linkTo}
                      onClick={this.props.onHandleClose}
                    >
                      <SmallEllipseBtn
                        text={this.props.btnText}
                        btnColor="rgba(104, 99, 105, 1)"
                      />
                    </Link>
                  ) : (
                    ""
                  )}
                  {/* customer mode */}
                  {this.props.mode === "customMode" ? (
                    <span onClick={this.props.onHandClick}>
                      <SmallEllipseBtn
                        text={this.props.btnText}
                        btnColor="rgba(104, 99, 105, 1)"
                      />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {/* two btn */}
            {this.props.btnNum === "2" ? (
              <div className="row">
                <div className="col">
                  <span>
                    <SmallEllipseBtn
                      text="Yes"
                      btnColor="rgba(255, 97, 97, 1)"
                      paddingLeft="90px"
                      paddingRight="90px"
                    />
                  </span>
                </div>
                <div className="col">
                  <Link
                    to={this.props.linkToSecond}
                    onClick={() => {
                      document.getElementById(
                        "pop-up-login-window"
                      ).style.display = "none";
                      document.getElementById(
                        "pop-up-login-window"
                      ).style.visibility = "hidden";
                    }}
                  >
                    <SmallEllipseBtn
                      text="No, I want to log in now."
                      btnColor="rgba(104, 99, 105, 1)"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AlertWindow;
