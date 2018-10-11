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
            <div class="form-check form-check-inline">
              <input class="form-check-input" id="equipmentOne" type="checkbox" /> 
              &nbsp;&nbsp; 
              <label class="form-check-label" for="equipmentOne">
                 {this.props.EquipmentOne} 
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" id="equipmentTwo" type="checkbox" /> 
              &nbsp;&nbsp; 
              <label class="form-check-label" for="equipmentTwo">
                 {this.props.EquipmentTwo} 
              </label>
            </div>
            </td>
            <td>
              <select
                value={this.props.Grade}
                style={{ border: "solid 1px #686369", width: "80%" }}
              >
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="high performance">High Performance</option>
              </select>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }
}

export default ActivityEquipmentCard;
