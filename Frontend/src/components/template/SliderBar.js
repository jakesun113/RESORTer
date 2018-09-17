import React, { Component } from "react";
import "../../css/template/SliderBar.css";

class SliderBar extends Component {
  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.id, e.target.value);
  };

  render() {
    const { min, max, id, value, label } = this.props;

    return (
      <React.Fragment>
        <div className="row" style={{ transform: "translate(0,10px)" }}>
          <div className="col-1" />
          {label === undefined ? null : (
            <div className="col-3" style={{ paddingLeft: "0" }}>
              <label
                style={{ fontWeight: "600", fontSize: "15px", color: "black" }}
                htmlFor={id}
              >
                {label}
              </label>
            </div>
          )}
          <div className="col-7">
            <input
              type="range"
              className="color-slider-bar"
              min={min}
              max={max}
              step="1"
              id={id}
              onChange={this.handleChange}
              value={value}
            />
          </div>

          <div className="col-1">
            <span style={{ fontWeight: "bold" }}>{value}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SliderBar;
