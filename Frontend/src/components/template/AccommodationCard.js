import React, { Component } from "react";

class AccommodationCard extends Component {
  render() {
    return (
      <React.Fragment>
        <tbody
          style={{
            border: "1px solid rgb(232, 234, 237)",
            height: "auto",
            boxShadow: "2px 3px rgb(232, 234, 237)"
          }}
        >
          <tr>
            <td>{this.props.type}</td>
            <td>{this.props.category}</td>
            <td>{this.props.adultNum}</td>
            <td>{this.props.childNum}</td>
            <td>{this.props.todNum}</td>
            <td>{this.props.bedNum}</td>
            <td>{this.props.bathNum}</td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }
}

export default AccommodationCard;
