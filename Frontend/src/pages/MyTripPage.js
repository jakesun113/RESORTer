import React, { Component } from "react";
import BookHistoryCard from "../components/MyTripPage/BookHistoryCard";
import styled from "styled-components";
import axios from "axios/index";
import moment from "moment";


const StyledTable = styled.table`
  border-collapse: collapse !important;
`;
class MyTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTrips: true,
      bookingHistory: []
    };

    this.getBookingHistory = this.getBookingHistory.bind(this);
  }

  async getBookingHistory(token) {
    let BaseURL = "http://127.0.0.1:3333/api/";
    //get the list of countries
    await axios.get(BaseURL + "getBookingHistory/" + token).then(response => {
      console.log("get history trips successfully");
      //console.log(response.data.popularResorts);
      this.setState({
        hasTrips: response.data.hasTrips,
        bookingHistory: response.data.bookingHistory
      });
    });
  }

  componentDidMount() {
    if (sessionStorage.getItem("userToken")) {
      console.log("get token")
      let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
      this.getBookingHistory(tokenData.token);
    }  
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div className="form-row">
            {/* <div className="form-group col-2" /> */}
            <div className="form-group col-4">
              <span style={{ fontSize: "2rem", color: "#686369" }}>
                My Booking History
              </span>
            </div>
            <div className="form-group col-6" />
          </div>
          {/* table title */}
          <table className="table table-borderless">
            <thead>
              <tr style={{ color: "#686369" }}>
                <th scope="col">Submit Date</th>
                <th scope="col">Resort</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
        {this.state.hasTrips ? (  
          this.state.bookingHistory.map(trip => (
            <div className="col-12 col-md-6 col-lg-4" key={trip.id}>
              <BookHistoryCard
              //TODO: change data format to be the same as original website
                submitDate={moment(trip.submitDate).format('YYYY-MM-DD')}
                resort={trip.name}
                startDate={moment(trip.startDate).format('YYYY-MM-DD')}
                endDate={moment(trip.endDate).format('YYYY-MM-DD')}
                status={trip.status}
              />
              <br />
            </div>
          ))           
        ) : (
          null
        )}

            {/* <BookHistoryCard
              submitDate="26 July 2018, 2:35 pm"
              resort="Cardrona"
              startDate="30 July 2018"
              endDate="10 August 2018"
              status="Submitted"
              //price="$50"
            /> */}

          </table>

          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default MyTripPage;
