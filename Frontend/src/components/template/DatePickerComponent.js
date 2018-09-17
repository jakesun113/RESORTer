import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
class DatePickerComponent extends Component {
  componentDidMount() {
    document
      .getElementsByClassName("react-datepicker__input-container")[0]
      .getElementsByTagName("input")[0].disabled = "disabled";
  }
  handleChange = date => {
    this.props.onHandleChange(date, this.props.tagForDate);
  };

  render() {
    return (
      <DatePicker
        selected={moment(this.props.selected)}
        onChange={this.handleChange}
        dateFormat="DD-MM-YYYY"
        maxDate={moment().subtract(1, "days")}
        placeholderText="DD-MM-YYYY"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
    );
  }
}

export default DatePickerComponent;
