import React, { Component } from "react";

class SelectComponent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <select className={this.props.className} id={this.props.id} />
      </React.Fragment>
    );
  }
}

export default SelectComponent;
