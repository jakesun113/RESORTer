import React, { Component } from "react";
// css

import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleCardBackgroundTop = styled.div`
  border-bottom: 5px solid cornflowerblue;
  height: 100px;
  background-image: url("https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE3XFxcLzEyXFxcLzExMTM1MzUxXFxcL2lTdG9jay02MTUxMDEwMzAuanBnXCIsXCJ3aWR0aFwiOjc2NyxcImhlaWdodFwiOjQzMSxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3Lmhlci5pZVxcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2hlclxcXC9uby1pbWFnZS5wbmc_dj01XCJ9IiwiaGFzaCI6ImI5MTExMzZiOTBkZmNkNTkyNjMyODI1ZDE2NTQwZTU1ZDVlMzhhNTYifQ==/istock-615101030.jpg");
`;

const StyleCardBackgroundBottom = styled.div`
  margin-top: 30px;
`;
const StyleUserPic = styled.div`
  z-index: 1;
  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-radius: 100%;
  background-color: aliceblue;
  background-size: cover;
  background-repeat: no-repeat;
  border: 3px solid cornflowerblue;
  position: absolute;
  text-align: center;
`;

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    this.props.onLogout();
  };

  //if the token is invalid, remove from session and cookie to refresh navBar
  handleInvalid = () => {
    if (!this.props.tokenValid) {
      this.props.onLogout();
    }
  };

  const;

  render() {
    return (
      <React.Fragment>
        <StyleCardBackgroundTop />
        <StyleUserPic
          style={{
            backgroundImage: "url(" + this.props.userPic + ")"
          }}
        />
        <StyleCardBackgroundBottom />
        {/* user name */}
        <div
          style={{
            textAlign: "center",
            color: "black !important"
          }}
        >
          {this.props.userName}
        </div>
        <br />
        {/* btn */}
        {this.props.isProfileComplete === 0 ? (
          <Link
            className="dropdown-item"
            to={{
              pathname: "/newProfile",
              state: {
                lastValid: this.props.tokenValid
              }
            }}
            onClick={this.handleInvalid}
          >
            My Profile
          </Link>
        ) : (
          <Link
            className="dropdown-item"
            to={{
              pathname: "/profile",
              state: {
                lastValid: this.props.tokenValid
              }
            }}
            onClick={this.handleInvalid}
          >
            My Profile
          </Link>
        )}
        <div className="dropdown-divider" />
        <Link
          className="dropdown-item"
          to={{
            pathname: "/group-member",
            state: { lastValid: this.props.tokenValid }
          }}
          onClick={this.handleInvalid}
        >
          My Group Members
        </Link>
        <div className="dropdown-divider" />
        <Link
          className="dropdown-item"
          to={{
            pathname: "/change-password",
            state: { lastValid: this.props.tokenValid }
          }}
          onClick={this.handleInvalid}
        >
          Change Password
        </Link>
        <div className="dropdown-divider" />
        <a className="dropdown-item" href="/" onClick={this.handleLogout}>
          Log Out
        </a>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default ProfileCard;
