import React, {Component} from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 80%;
  border: solid 1px rgba(198, 226, 247, 1);
`;

class ActivityEquipmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentOneChecked: this.props.EquipmentOneChecked,
            equipmentTwoChecked: this.props.EquipmentTwoChecked
        };
    }

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
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                id="equipmentOne"
                                type="checkbox"
                                onChange={e => {
                                    this.setState({equipmentOneChecked: e.target.checked});
                                }}                                
                                checked={this.state.equipmentOneChecked}
                            />
                            &nbsp;&nbsp;
                            <label className="form-check-label" htmlFor="equipmentOne">
                                {this.props.EquipmentOne}
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                id="equipmentTwo"
                                type="checkbox"
                                onChange={e => {
                                    this.setState({equipmentTwoChecked: e.target.checked});
                                }}
                                checked={this.state.equipmentTwoChecked}
                            />
                            &nbsp;&nbsp;
                            <label className="form-check-label" htmlFor="equipmentTwo">
                                {this.props.EquipmentTwo}
                            </label>
                        </div>
                    </td>
                    <td>
                        <StyledSelect  id="grade" defaultValue={this.props.Grade}>
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="High Performance">High Performance</option>
                        </StyledSelect>
                    </td>
                </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default ActivityEquipmentCard;
