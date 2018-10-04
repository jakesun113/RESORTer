import React, {Component} from "react";

class LiftPassReadOnlyCard extends Component {
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
                    <td>{this.props.date}</td>
                    <td>Adult: {this.props.adultNum}</td>
                    <td>Period: {this.props.adultDuration}</td>
                    <td>Children: {this.props.childNum}</td>
                    <td>Period: {this.props.childDuration}</td>
                </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default LiftPassReadOnlyCard;
