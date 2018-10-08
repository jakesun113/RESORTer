import React, { Component } from "react";

class LessonCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* title */}
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-12 col-lg-1">
            <img
              style={{
                width: "97px",
                height: "97px",
                objectFit: "cover"
              }}
              alt="rentalsImage"
              src="https://static.wixstatic.com/media/25b4a3_9e9a18b029e147ea9b4d6e3b78802f3e~mv2.png/v1/fill/w_194,h_194,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_9e9a18b029e147ea9b4d6e3b78802f3e~mv2.webp"
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
            Lessons
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
          <div className="col-lg-6" />
        </div>

        <div className="row">
          <div className="col-lg-1" />
          <div
            className="col-lg-10"
            style={{ paddingLeft: "20px", fontSize: "13px" }}
          >
            FTP: First Time Package - lesson, pass, and rental
          </div>
          <div className="col-lg-1" />
        </div>
        <br />
        {/* Rental lists */}
        {/* {activityList.map(eachActivity => ( */}
        {/* <div className="row">
          <div className="col-lg-1" />
          <div className="col-lg-10">
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
              {eachActivity}
            </span>
            <table
              className="table table-borderless"
              style={{ color: "#686369" }}
            >
              <thead>
                <tr>
                  <th scope="col">Participant</th>
                  <th scope="col">Date</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Boots</th>
                  <th scope="col">{SecondEquipmentName}</th>
                  <th scope="col">Grade</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {rentalList.map(eachRental => (
                  <tr
                    style={{
                      border: "1px solid rgb(232, 234, 237)",
                      height: "auto",
                      boxShadow: "2px 3px rgb(232, 234, 237)"
                    }}
                  >
                    <td>{eachRental.participant}</td>
                    <td>{eachRental.date}</td>
                    <td>{eachRental.duration}</td>
                    <td style={{ color: "#8CB50B" }}>{eachRental.boots}</td>
                    <td style={{ color: "#8CB50B" }}>{eachRental.skis}</td>
                    <td>{eachRental.grade}</td>
                    <td style={{ cursor: "pointer" }}>
                      <i class="far fa-trash-alt" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* ))} */}
      </React.Fragment>
    );
  }
}

export default LessonCard;
