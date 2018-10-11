import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import BookTripNavBar from "../../components/BookTripPage/BookTripNavBar";
import BookTripWhoPage from "./BookTripWhoPage";
import BookingAccommodation from "./BookingAccommodation";
import BookingActivity from "./BookingActivity";
import EquipmentPage from "./EquipmentPage";
import PlanSummaryPage from "./PlanSummaryPage";
import BookingLesson from "./BookingLesson";

class BookIndex extends Component {
    render() {
        const {match, history, location} = this.props;
        const place = match.params.placeName;

        let masterID;
        let resortID;
        let tripID;
        //FIXME:no need "equipment,learn and summary"
        let re = new RegExp(/\/booking\/[^\n]*\/who|equipment|learn|summary/, "g");
        if (!re.test(this.props.location.pathname)) {
            masterID = location.state.masterID;
            resortID = location.state.resortID;
            tripID = location.state.tripID;
        }

        return (
            <div>
                <div className="row">
                    <BookTripNavBar placeName={place}/>
                </div>
                <div className="row">
                    <Switch>
                        <Route
                            path={`/booking/${place}/who`}
                            render={() => <BookTripWhoPage place={place}
                                                           history={history}/>}
                        />
                        <Route
                            path={`/booking/${place}/sleep`}
                            render={() => (
                                <BookingAccommodation
                                    masterID={masterID}
                                    resortID={resortID}
                                    tripID={tripID}
                                    place={place}
                                    history={history}
                                />
                            )}
                        />
                        <Route
                            path={`/booking/${place}/doing`}
                            render={() => (
                                <BookingActivity
                                    masterID={masterID}
                                    resortID={resortID}
                                    tripID={tripID}
                                    place={place}
                                    history={history}
                                />
                            )}
                        />

                        {/*/!* euipment page *!/ */}
                        <Route
                            path={`/booking/${place}/equipment`}
                            render={() => <EquipmentPage place={place}
                                                         history={history}/>}
                        />

                        <Route
                            path={`/booking/${place}/learn`}
                            render={() => <BookingLesson place={place}
                                                         history={history}/>}
                        />

                        {/* plan summary page */}
                        <Route
                            path={`/booking/${place}/summary`}
                            render={() => <PlanSummaryPage place={place}
                                                           history={history}/>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default BookIndex;
