import React, {Component} from "react";
//TODO: handle login when clicking "trash" button
class RentalEquipmentCard extends Component {

    state = {timeSpan: this.props.duration};

    handleChangeDuration = () => {
        const spanList = ["Full Day", "AM", "PM"];
        const indexOfCurrent = spanList.indexOf(this.state.timeSpan);
        let resultIndex = 0;
        if (indexOfCurrent === 2) {
            resultIndex = 0;
            this.setState({timeSpan: spanList[resultIndex]});
        } else {
            resultIndex = indexOfCurrent + 1;
            this.setState({timeSpan: spanList[resultIndex]});
        }
    };

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
                <tr style={{
                    border: "1px solid rgb(232, 234, 237)",
                    height: "auto",
                    boxShadow: "2px 3px rgb(232, 234, 237)"
                }}>
                    <td>{this.props.participant}</td>
                    <td>{this.props.date}</td>
                    <td>{this.state.timeSpan}
                        <br/>
                        <span
                            style={{
                                color: "#F5980C",
                                textDecoration: "underline",
                                cursor: "pointer"
                            }}
                            onClick={this.handleChangeDuration}
                        >
            (Change)
          </span></td>
                    <td style={{color: "#4682B4"}}>{this.props.boots}</td>
                    <td style={{color: "#4682B4"}}>{this.props.poles}</td>
                    <td>{this.props.grade}</td>
                    <td style={{cursor: "pointer"}}>
                        <i className="far fa-trash-alt"/>
                    </td>
                </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default RentalEquipmentCard;
