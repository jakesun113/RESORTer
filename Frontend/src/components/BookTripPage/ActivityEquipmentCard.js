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
              <input 
                class="form-check-input" 
                id="equipmentOne" 
                type="checkbox" 
                checked={this.props.EquipmentOneChecked}
              /> 
              &nbsp;&nbsp; 
              <label class="form-check-label" for="equipmentOne">
                 {this.props.EquipmentOne} 
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input 
                class="form-check-input" 
                id="equipmentTwo" 
                type="checkbox"
                checked={this.props.EquipmentTwoChecked} 
              /> 
              &nbsp;&nbsp; 
              <label class="form-check-label" for="equipmentTwo">
                 {this.props.EquipmentTwo} 
              </label>
            </div>
            </td>
            <td>
              <select
                defaultValue={this.props.Grade}
                style={{ border: "solid 1px #686369", width: "80%" }}
              >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="High Performance">High Performance</option>
              </select>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  }
}

export default ActivityEquipmentCard;
