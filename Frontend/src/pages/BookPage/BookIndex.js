import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import BookTripNavBar from "../../components/BookTripPage/BookTripNavBar";
import BookTripWhoPage from "./BookTripWhoPage";
import BookingAccommodation from './BookingAccommodation'

class BookIndex extends Component {
    state = {};

    render() {
        const {match} = this.props;
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
                            render={() => <BookTripWhoPage place={place}/>}
                        />
                        <Route
                            path={`/booking/${place}/sleep`}
                            render={() => <BookingAccommodation place={place}/>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default BookIndex;
