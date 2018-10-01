import React, {Component} from "react";

class GroupMemberCard extends Component {

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
                    <td>{this.props.name}</td>
                    <td>{this.props.dob}</td>
                    <td>{this.props.shoeSize}</td>
                    <td>{this.props.weight}</td>
                    <td>{this.props.height}</td>
                    <td>{this.props.disability}</td>
                    <td>{this.props.foodAllergy}</td>
                    <td>{this.props.activity}</td>
                </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default GroupMemberCard;
