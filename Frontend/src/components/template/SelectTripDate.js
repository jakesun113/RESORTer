import React, { Component } from "react";
import SmallEllipseBtn from "./SmallEllipseBtn";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function StartDate(props) {
  function handleChange(date) {
    console.log("Start Date", date);
    props.onChange(date, "startDate");
  }

  return (
    <DatePicker
      selected={props.startDate}
      onChange={handleChange}
      minDate={props.validMinDate}
    />
  );
}

function EndDate(props) {
  function handleChange(date) {
    console.log("End Date", date);
    props.onChange(date, "endDate");
  }

  return (
    <DatePicker
      selected={props.endDate}
      onChange={handleChange}
      minDate={props.validMinDate}
    />
  );
}

class SelectTripDate extends Component {
  state = {
    startDate: moment().add(4, "days"), // initially, start date is today + 4 days
    endDate: moment().add(9, "days")
  };

  // choice is either "startDate" or "endDate"
  handleChange = (date, choice) => {
    const { startDate, endDate } = this.state;

    if (choice === "endDate") {
      this.setState({
        [choice]: date
      });
    } else {
      if (date > endDate) {
        this.setState({
          [choice]: date,
          endDate: moment(date).add(5, "days")
        });
      } else {
        this.setState({
          [choice]: date
        });
      }
    }
  };

  render() {
    let currentStartDate = this.state.startDate;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4" id="startDate">
            <p>
              <strong>Start Date </strong> (4 days + in advance only)
            </p>
          </div>
          <div className={"col-1"} />
          <div className="col-4" id="endDate">
            <p>
              <strong>End Date</strong>
            </p>
          </div>
          <div className="col-2" id="planTripBtn">
            <SmallEllipseBtn
              text="Plan Your Trip"
              btnColor="rgba(252,98,101,1)"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <StartDate
              startDate={this.state.startDate}
              onChange={this.handleChange}
              validMinDate={moment(currentStartDate)}
            />
          </div>
          <div className={"col-1"} />
          <div className="col-4">
            <EndDate
              endDate={this.state.endDate}
              onChange={this.handleChange}
              validMinDate={moment(currentStartDate)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTripDate;
