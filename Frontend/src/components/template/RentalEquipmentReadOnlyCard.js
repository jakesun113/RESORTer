import React, {Component} from "react";

class RentalEquipmentReadOnlyCard extends Component {

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
                    <td>{this.props.participant}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.duration}</td>
                    <td>{this.props.boots}</td>
                    <td>{this.props.poles}</td>
                </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default RentalEquipmentReadOnlyCard;
