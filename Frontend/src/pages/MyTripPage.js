import React, { Component } from "react";
import BookHistoryCard from "../components/MyTripPage/BookHistoryCard";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse !important;
`;
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

            <BookHistoryCard
              submitDate="26 July 2018, 2:35 pm"
              resort="Cardrona"
              startDate="30 July 2018"
              endDate="10 August 2018"
              status="Submitted"
              price="$50"
            />
            <BookHistoryCard
              submitDate="26 July 2018, 2:35 pm"
              resort="Sb Jiacheng"
              startDate="30 July 2018"
              endDate="10 August 2018"
              status="Submitted"
              price="$-50"
            />
            <BookHistoryCard
              submitDate="26 July 2018, 2:35 pm"
              resort="相当 Sb Jiacheng"
              startDate="30 July 2018"
              endDate="10 August 2018"
              status="Submitted"
              price="$-1050"
            />
          </table>

          {/* end container */}
        </div>
      </React.Fragment>
    );
  }
}

export default MyTripPage;
