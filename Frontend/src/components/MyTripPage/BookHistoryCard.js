import React, {Component} from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";

class BookHistoryCard extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <tbody
                    style={{
                        border: "1px solid rgb(232, 234, 237)",
                        height: "auto",
                        boxShadow: "3px 5px rgb(232, 234, 237)"
                    }}
                >
                <tr>
                    <td>{this.props.submitDate}</td>
                    <td>{this.props.resort}</td>
                    <td>{this.props.startDate}</td>
                    <td>{this.props.endDate}</td>
                    <td>{this.props.status}</td>
                    <td>{this.props.price}</td>
                    <td>
                        <SmallEllipseBtn text="View" btnColor="rgba(255, 97, 97, 1)"/>
                    </td>
                </tr>
                </tbody>
            </React.Fragment>
        );
    }
}

export default BookHistoryCard;
