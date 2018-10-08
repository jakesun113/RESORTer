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
                    <div>
                      <Link
                        to={this.props.linkTo}
                        onClick={this.props.onHandleClose}
                      >
                        <SmallEllipseBtn
                          text={this.props.btnText}
                          style={{
                            backgroundColor: "rgba(104, 99, 105, 1)",
                            width: "100%"
                          }}
                        />
                      </Link>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* customer mode */}
                  {this.props.mode === "customMode" ? (
                    <div>
                      <span onClick={this.props.onHandClick}>
                        <SmallEllipseBtn
                          text={this.props.btnText}
                          style={{
                            backgroundColor: "rgba(104, 99, 105, 1)",
                            width: "100%"
                          }}
                        />
                      </span>
                      <br />
                    </div>
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
                {/* left btn */}
                <div
                  className="col-12 col-lg-6"
                  style={{ paddingBottom: "20px" }}
                >
                  {this.props.btnOneMode === "linkMode" ? (
                    <div>
                      <Link
                        to={this.props.btnOneLinkTo}
                        onClick={this.props.onHandleClose}
                      >
                        <SmallEllipseBtn
                          text={this.props.btnOneText}
                          style={{
                            backgroundColor: "rgba(104, 99, 105, 1)",
                            width: "100%"
                          }}
                        />
                      </Link>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* customer mode */}
                  {this.props.btnOneMode === "customMode" ? (
                    <div>
                      <span onClick={this.props.onHandClickOne}>
                        <SmallEllipseBtn
                          text={this.props.btnOneText}
                          style={{
                            backgroundColor: "rgba(255, 97, 97, 1)",
                            width: "100%"
                          }}
                        />
                      </span>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* right btn */}
                <div className="col-12 col-lg-6">
                  {this.props.btnTwoMode === "linkMode" ? (
                    <div>
                      <Link
                        to={this.props.btnTwoLinkTo}
                        onClick={this.props.onHandleClose}
                      >
                        <SmallEllipseBtn
                          text={this.props.btnTwoText}
                          style={{
                            backgroundColor: "rgba(104, 99, 105, 1)",
                            width: "100%"
                          }}
                        />
                      </Link>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* customer mode */}
                  {this.props.btnTwoMode === "customMode" ? (
                    <div>
                      <span onClick={this.props.onHandClickTwo}>
                        <SmallEllipseBtn
                          text={this.props.btnTwoText}
                          style={{
                            backgroundColor: "rgba(255, 97, 97, 1)",
                            width: "100%"
                          }}
                        />
                      </span>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
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
