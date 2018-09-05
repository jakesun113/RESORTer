import React, { Component } from "react";
import BookHistoryCard from "../components/MyTripPage/BookHistoryCard";
class MyTripPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div className="form-row">
            {/* <div className="form-group col-2" /> */}
            <div className="form-group col-4">
              <span style={{ fontSize: "2rem" }}>My Booking History</span>
            </div>
            <div className="form-group col-6" />
          </div>
          {/* table title */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Submit Date</th>
                <th scope="col">Resort</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col" />
              </tr>
            </thead>

            <BookHistoryCard
              submitDate="26 July 2018, 2:35 pm"
              resort="Cardrona"
              startDate="30 July 2018"
              endDate="10 August 2018"
              status="Submitted"
              price="$50"
            />
          </table>

          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default MyTripPage;
