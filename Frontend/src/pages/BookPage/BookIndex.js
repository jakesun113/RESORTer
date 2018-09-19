import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import BookTripNavBar from "../../components/BookTripPage/BookTripNavBar";
import BookTripWhoPage from "./BookTripWhoPage";
import BookingAccommodation from './BookingAccommodation'
import BookingActivity from './BookingActivity'

class BookIndex extends Component {
    state = {};

    render() {
        const {match, history} = this.props;
        const place = match.params.placeName;

        return (
            <div>
                <div className="row">
                    <BookTripNavBar placeName={place}/>
                </div>
                <div className="row">
                    <Switch>
                        <Route
                            path={`/booking/${place}/who`}
                            render={() => <BookTripWhoPage place={place} history={history}/>}
                        />
                        <Route
                            path={`/booking/${place}/sleep`}
                            render={() => <BookingAccommodation place={place} history={history}/>}
                        />
                        <Route
                            path={`/booking/${place}/doing`}
                            render={() => <BookingActivity place={place} history={history}/>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default BookIndex;
