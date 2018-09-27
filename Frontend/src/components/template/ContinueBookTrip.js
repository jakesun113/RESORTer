import React, {Component} from "react";
import SmallEllipseBtn from "./SmallEllipseBtn";
import {Link} from "react-router-dom";

class ContinueBookTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleCompleteTrip = this.handleCompleteTrip.bind(this);
    }

    //TODO: not finished
    handleCompleteTrip() {
    }

    render() {
        return (
            <React.Fragment>
                <div style={{marginTop: "30px"}}>
                    <div
                        style={{
                            whiteSpace: "nowrap",
                            fontSize: "15px !important",
                            textAlign: "center",
                            alignItems: "center",
                            alignContent: "center"
                        }}
                    >
                        <i
                            className="fas fa-exclamation-circle"
                            id="tooltip-icon"
                            style={{color: "red", fontSize: "15px"}}
                        />
                        &nbsp; &nbsp;
                        <span style={{color: "#F08E48"}}>
              You have plans in progress, you can
            </span>
                    </div>
                    <div
                        className="row"
                        style={{whiteSpace: "nowrap", textAlign: "center"}}
                    >
                        <div className="col-md-12 col-lg-8">
                            <Link className="nav-link" to="" onClick={this.handleCompleteTrip}>
                                <SmallEllipseBtn
                                    text="Complete My Snowtrip"
                                    btnColor="rgba(255, 97, 97, 1)"
                                    fontSize="15px"
                                />
                            </Link>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <Link className="nav-link" to="" onClick={this.props.hideReminder}>
                                <SmallEllipseBtn
                                    text="Another Time"
                                    btnColor="rgba(104, 99, 105, 1)"
                                    fontSize="15px"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ContinueBookTrip;
