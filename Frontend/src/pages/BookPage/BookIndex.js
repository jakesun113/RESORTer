import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import BookTripNavBar from "../../components/BookTripPage/BookTripNavBar";
import BookTripWhoPage from "./BookTripWhoPage";
import BookingAccommodation from "./BookingAccommodation";
import BookingActivity from "./BookingActivity";
import EquipmentPage from "./EquipmentPage";

class BookIndex extends Component {
  state = {};

  render() {
    // const {match, history, location} = this.props;
    const { match } = this.props;
    const place = match.params.placeName;
    const { history } = this.props;
    // const masterID = location.state.masterID;
    // const resortID = location.state.resortID;
    // const tripID = location.state.tripID;

    return (
      <div>
        <div className="row">
          <BookTripNavBar placeName={place} />
        </div>
        <div className="row">
          <Switch>
            <Route
              path={`/booking/${place}/who`}
              render={() => <BookTripWhoPage place={place} history={history} />}
              // render={() => <BookTripWhoPage masterID={masterID} resortID={resortID} tripID={tripID}
              //                                place={place} history={history}/>}
            />
            <Route
              path={`/booking/${place}/sleep`}
              render={() => (
                <BookingAccommodation place={place} history={history} />
              )}
              // render={() => <BookingAccommodation masterID={masterID} resortID={resortID} tripID={tripID}
              //                                     place={place} history={history}/>}
            />
            <Route
              path={`/booking/${place}/doing`}
              render={() => <BookingActivity place={place} history={history} />}
              // render={() => <BookingActivity masterID={masterID} resortID={resortID} tripID={tripID}
              //                                place={place} history={history}/>}
            />

            {/* euipment page */}
            <Route
              path={`/booking/${place}/equipment`}
              render={() => <EquipmentPage place={place} history={history} />}
              // render={() => <BookingActivity masterID={masterID} resortID={resortID} tripID={tripID}
              //                                place={place} history={history}/>}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default BookIndex;
