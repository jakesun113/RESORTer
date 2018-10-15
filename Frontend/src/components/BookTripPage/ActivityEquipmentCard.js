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

    handleEquipmentOneChange = e => {
        this.props.handleEquipmentOneChange(e.target.id, e.target.checked);
    }

    handleEquipmentTwoChange= e => {
        this.props.handleEquipmentTwoChange(e.target.id, e.target.checked);
    }

    handleGradeChange= e => {
        this.props.handleGradeChange(e.target.id, e.target.value);
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
                                id={this.props.key}
                                type="checkbox"
                                onChange={e => {
                                    this.setState({equipmentOneChecked: e.target.checked},
                                    this.handleEquipmentOneChange(e));
                                }}                                
                                checked={this.state.equipmentOneChecked}
                            />
                            &nbsp;&nbsp;
                            <label className="form-check-label" htmlFor={this.props.key}>
                                {this.props.EquipmentOne}
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                id={this.props.key}
                                type="checkbox"
                                onChange={e => {
                                    this.setState({equipmentTwoChecked: e.target.checked},
                                    this.handleEquipmentTwoChange(e));
                                }}
                                checked={this.state.equipmentTwoChecked}
                            />
                            &nbsp;&nbsp;
                            <label className="form-check-label" htmlFor={this.props.key}>
                                {this.props.EquipmentTwo}
                            </label>
                        </div>
                    </td>
                    <td>
                        <StyledSelect  
                        id={this.props.key}
                        defaultValue={this.props.Grade}
                        onChange={e => {this.handleGradeChange(e)}}>
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
