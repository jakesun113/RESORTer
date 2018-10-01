import React, { Component } from "react";

class InputComponent extends Component {
  state = { value: this.props.value };
  render() {
    if (this.props.type === "text") {
      return (
        <React.Fragment>
          <input
            id={this.props.id}
            type={this.props.type}
            className={this.props.className}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            value={this.state.value}
            onChange={e => {
              this.setState({ value: e.target.value });
            }}
          />
        </React.Fragment>
      );
    }
  }
}

export default InputComponent;
