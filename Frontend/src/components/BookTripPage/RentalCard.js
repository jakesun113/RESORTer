import React, {Component} from "react";

class OtherEquipmentCard extends Component {
    state = {
        equipment: {
            participant: "s",
            date: "8 October 2018",
            duration: "Full day",
            outerwear: "Small",
            helmet: "None"
        }
    };

    render() {
        const {equipment} = this.state;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-1"/>
                    <div className="col-lg-10">
            <span style={{fontSize: "25px", fontWeight: "bold"}}>
              Other Equipment
            </span>
                        <table
                            className="table table-borderless"
                            style={{color: "#686369"}}
                        >
                            <thead>
                            <tr>
                                <th scope="col">Participant</th>
                                <th scope="col">Date</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Outerwear</th>
                                <th scope="col">Helmet</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                style={{
                                    border: "1px solid rgb(232, 234, 237)",
                                    height: "auto",
                                    boxShadow: "2px 3px rgb(232, 234, 237)"
                                }}
                            >
                                <td>{equipment.participant}</td>
                                <td>{equipment.date}</td>
                                <td>{equipment.duration}</td>
                                <td style={{color: "#4682B4"}}>{equipment.outerwear}</td>
                                <td style={{color: "#4682B4"}}>{equipment.helmet}</td>
                                <td style={{cursor: "pointer"}}>
                                    <i className="far fa-trash-alt"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

class RentalCard extends Component {
    state = {noNeedLiftPass: false};

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
        const {noNeedLiftPass} = this.state;
        const {activityList, rentalList} = this.props;
        let SecondEquipmentName = "";
        if (this.props.activityType === "ski" || "telemark") {
            SecondEquipmentName = "Skis & Poles";
        }
        if (this.props.activityType === "snowboard") {
            SecondEquipmentName = "Board";
        }
        return (
            <React.Fragment>
                {/* title */}
                <div className="row">
                    <div className="col-lg-1"/>
                    <div className="col-12 col-lg-1">
                        <img
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover"
                            }}
                            alt="rentalsImage"
                            src="https://static.wixstatic.com/media/25b4a3_2dc5dc31a0b8432aa954074e0fd46924~mv2.jpg/v1/fill/w_160,h_160,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_2dc5dc31a0b8432aa954074e0fd46924~mv2.webp"
                        />
                    </div>
                    <div
                        className="col-12 col-lg-1"
                        style={{
                            color: "#686369",
                            fontSize: "22px",
                            marginTop: "50px",
                            fontWeight: "bold"
                        }}
                    >
                        Rentals
                    </div>
                    <div
                        className="col-12 col-lg-3"
                        style={{
                            color: "black",
                            fontSize: "13px",
                            paddingLeft: "15px",
                            marginTop: "57px"
                        }}
                    >
                        Lessons and rental for snowbiking, snowshoeing and snowmobiling are
                        arranged directly with resort
                    </div>
                    <div className="col-lg-6"/>
                </div>
                <br/>

                {/* Rental lists */}
                {activityList.map((eachActivity, index) => (
                    <div className="row" key={index}>
                        <div className="col-lg-1"/>
                        <div className="col-lg-10">
              <span style={{fontSize: "25px", fontWeight: "bold"}}>
                {eachActivity}
              </span>
                            <table
                                className="table table-borderless"
                                style={{color: "#686369"}}
                            >
                                <thead>
                                <tr>
                                    <th scope="col">Participant</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Boots</th>
                                    <th scope="col">{SecondEquipmentName}</th>
                                    <th scope="col">Grade</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {rentalList.map((eachRental, index) => (
                                    <tr
                                        style={{
                                            border: "1px solid rgb(232, 234, 237)",
                                            height: "auto",
                                            boxShadow: "2px 3px rgb(232, 234, 237)"
                                        }}
                                        key={index}
                                    >
                                        <td>{eachRental.participant}</td>
                                        <td>{eachRental.date}</td>
                                        <td>{eachRental.duration}</td>
                                        <td style={{color: "#8CB50B"}}>{eachRental.boots}</td>
                                        <td style={{color: "#8CB50B"}}>{eachRental.skis}</td>
                                        <td>{eachRental.grade}</td>
                                        <td style={{cursor: "pointer"}}>
                                            <i className="far fa-trash-alt"/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
                {/* other equipment */}
                <OtherEquipmentCard/>
            </React.Fragment>
        );
    }
}

export default RentalCard;
