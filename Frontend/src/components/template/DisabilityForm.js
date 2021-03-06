import React, { Component } from "react";

class DisabilityForm extends Component {
  state = { selected: "DWA" };

  componentDidMount() {
    if (this.props.selected === "") {
      this.setState({ selected: "DWA" });
    } else {
      this.setState({ selected: this.props.selected });
    }
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <div
          style={{
            zIndex: "100"
          }}
        >
          {/* up */}
          <div className="form-row">
            <div className="form-group col-lg-2" />
            <div className="form-group col-12 col-lg-3">
              <select
                className="custom-select"
                id="disability_membership"
                value={this.state.selected}
                onChange={e => {
                  this.setState({ selected: e.target.value });
                }}
              >
                <option value="DWA">DWA</option>
                <option value="DSUSA">DSUSA</option>
              </select>
            </div>
            <div className="form-group col-12 col-lg-5">
              <input
                required
                className="form-control"
                placeholder="Membership ID"
                id="disability_memberid"
                defaultValue={this.props.disabilityMemberid}
                onChange={this.props.onHandleChange}
              />
            </div>
            <div className="form-group col-lg-2" />
          </div>
          <div>
            {/* if wrong */}
            {this.props.memberIdWrong ? (
              <div className="form-row">
                <div className="form-group col-3 col-lg-4" />
                <div
                  className="form-group col-6 col-lg-4"
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: " 1rem "
                  }}
                >
                  Please fill the correct member ID
                </div>
                <div className="form-group col-3 col-lg-4" />
              </div>
            ) : (
              ""
            )}
          </div>
          {/* bottom */}
          <div className="form-row">
            <div className="form-group col-lg-2" />
            <div className="form-group col-12 col-lg-8">
              <textarea
                required
                placeholder="Detail Message"
                style={{
                  width: "100%",
                  height: "25ex",
                  border: "1px solid grey"
                }}
                id="disability_detail"
                defaultValue={this.props.disabilityDetail}
                onChange={this.props.onHandleChange}
              />
            </div>
            <div className="form-group col-lg-2" />
          </div>
          {/* if wrong */}
          {this.props.detailWrong ? (
            <div className="form-row">
              <div className="form-group col-3 col-lg-4" />
              <div
                className="form-group col-6 col-lg-4"
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: " 1rem "
                }}
              >
                Please fill the correct detail message
              </div>
              <div className="form-group col-3 col-lg-4" />
            </div>
          ) : (
            ""
          )}
          {/* end */}
        </div>
      </React.Fragment>
    );
  }
}

export default DisabilityForm;
