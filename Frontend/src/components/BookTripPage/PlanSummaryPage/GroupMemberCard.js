import React, { Component } from "react";

class GroupMemberCard extends Component {
  state = {};
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
            <td>{this.props.resorter}</td>
            <td>{this.props.dob}</td>
            <td>{this.props.age}</td>
            <td>{this.props.shoeSize}</td>
            <td>{this.props.height}</td>
            <td>{this.props.weight}</td>
            <td>{this.props.disabilities}</td>
            <td>{this.props.foodAllergies}</td>
            <td>{this.props.activity}</td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }
}

export default GroupMemberCard;
