import React, { Component } from "react";
import "../../css/template/SliderBar.css";
class SliderBar extends Component {
  state = { value: 1 };

  componentDidMount() {
    if (this.props.value === "" || this.props.value === undefined) {
      this.setState({ value: 1 });
    } else {
      this.setState({ value: this.props.value });
    }
  }

  showValue = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <label style={{ fontWeight: "bold" }} htmlFor={this.props.id}>
          {this.props.lable}
        </label>
        <div className="row">
          <div className="col-10">
            <input
              type="range"
              className="color-slider-bar"
              min={this.props.min}
              max={this.props.max}
              step="1"
              defaultValue={this.state.value}
              id={this.props.id}
              onChange={this.showValue}
              value={this.state.value}
            />
          </div>

          <span
            style={{
              fontWeight: "bold"
            }}
          >
            {this.state.value}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default SliderBar;
