import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
class DatePickerComponent extends Component {
  componentDidMount() {
    if (this.props.noOutline === true) {
      document
        .getElementsByClassName("react-datepicker__input-container")[0]
        .getElementsByTagName("input")[0].style.cssText =
        "width: 100%;box-shadow: 0px 2px 0px 0px rgba(70, 130, 180, 1);box-sizing: border-box !important;outline: none !important;color: #525252;padding: 3px;text-align: center;max-width: 80%;min-width: 80%;min-height: 100%;text-overflow: ellipsis;margin: auto auto;background: transparent !important;border: none;outline: none;font-size: 20px;";
    }
    document
      .getElementsByClassName("react-datepicker__input-container")[0]
      .getElementsByTagName("input")[0].disabled = "disabled";
  }
  handleChange = date => {
    this.props.checkValidate;

    document
      .getElementsByClassName("react-datepicker__input-container")[0]
      .getElementsByTagName("input")[0].style.boxShadow =
      "0px 2px 0px 0px rgba(70,130,180,1)";
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
