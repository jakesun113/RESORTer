import React, { Component } from "react";
import BookHistoryCard from "../components/MyTripPage/BookHistoryCard";
import styled from "styled-components";
import axios from "axios/index";
import Pagination from "../components/template/Pagination";


const StyledTable = styled.table`
  border-collapse: collapse !important;
`;
class MyTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTrips: true,
      allTrips: [],
      currentTrips: [],
      currentPage: null,
      totalPages: null
    };

    this.getBookingHistory = this.getBookingHistory.bind(this);
  }

  async getBookingHistory(token) {
    let BaseURL = "http://127.0.0.1:3333/api/";
    //get the list of trips
    await axios.get(BaseURL + "getBookingHistory/" + token).then(response => {
      console.log("get history trips successfully");
      this.setState({
        hasTrips: response.data.hasTrips,
        allTrips: response.data.bookingHistory
      });
    });
    console.log("hasTrips " + this.state.hasTrips)
  }

  onPageChanged = data => {
    const { allTrips } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTrips = allTrips.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentTrips, totalPages });
  };

  componentDidMount() {
    if (sessionStorage.getItem("userToken")) {
      let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
      this.getBookingHistory(tokenData.token);
    }  
  }

  render() {
    const {
      hasTrips,
      allTrips,
      currentTrips,
      currentPage,
      totalPages
    } = this.state;

    let totalTrips = 0;
    if (hasTrips) {
      totalTrips = allTrips.length;
    }
    if (totalTrips === 0) return null;
    
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
                {/* <th scope="col">Price</th> */}
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
        {hasTrips ? (  
          currentTrips.map(trip => (
              <BookHistoryCard
              //TODO: change data format to be the same as original website
                submitDate = {trip.submitDate}
                resort = {trip.name}
                startDate={trip.startDate}
                endDate={trip.endDate}
                status={trip.status}
                id={trip.id}
                buttonText={trip.checkButton}
              />
          ))     
        ) : (
          null
        )}
      </table>

      {hasTrips ? ( 
        <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalTrips}
                pageLimit={5}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
              <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>        
        </div>
      ) : (
        null
      )}
 
          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default MyTripPage;
