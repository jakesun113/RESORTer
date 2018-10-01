import React, { Component } from "react";

class ActivityEquipmentCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <tbody
          style={{
            height: "auto",
            color: "#686369"
          }}
        >
          <tr>
            <td>{this.props.ActivityName}</td>
            <td>
              <i class="far fa-check-square" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              {this.props.EquipmentOne}
            </td>
            <td>
              <i class="far fa-check-square" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              {this.props.EquipmentTwo}
            </td>
            <td>
              <select
                value={this.props.Grade}
                disabled
                style={{ border: "solid 1px #686369", width: "80%" }}
              >
                <option value="standard">Standard</option>
              </select>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }
}

export default ActivityEquipmentCard;
