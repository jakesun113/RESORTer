import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
// style
const logoStyle = {
  width: "183px",
  height: "78px",
  marginRight: "170px"
};

const comingSoonLogoStyle = {
  position: "relative",
  margin: "auto",
  width: "100px",
  height: "100px"
};

const navbarTextStyle = {
  marginTop: "80px",
  marginLeft: "15px",
  fontWeight: "bold",
  float: "left"
};

const textColorChange = keyframes`
  from {
    background-color: orangered;
  }

  to {
    background-color: black;
  }
`;

const ColoredText = styled.span`
  margin-top: 80px;
  margin-left: 15px;
  font-weight: bold;
  float: left
$:hover {
    color: cornflowerblue;
  }
`;

class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container-fullwidth">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <img
                style={logoStyle}
                src="https://static.wixstatic.com/media/25b4a3_476f364fc74b4d3fb6c657519d3c90d2~mv2.png/v1/fill/w_366,h_156,al_c,usm_0.66_1.00_0.01/25b4a3_476f364fc74b4d3fb6c657519d3c90d2~mv2.png"
              />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    <ColoredText>HOME</ColoredText>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span style={navbarTextStyle}>How it Works</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span style={navbarTextStyle}>Contect</span>
                  </a>
                </li>

                <li className="nav-item login_button">
                  <a className="nav-link" href="#">
                    <span>
                      <p>Log In</p>
                    </span>
                  </a>
                </li>

                <li className="nav-item">
                  <span className="navbar-brand mb-0 h1">
                    <img
                      style={comingSoonLogoStyle}
                      src="https://static.wixstatic.com/media/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png/v1/fill/w_200,h_200,al_c,usm_0.66_1.00_0.01/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png"
                    />
                  </span>
                </li>

                <li className="nav-item button_admin">
                  <a className="navbar-brand" href="#">
                    <img src="https://static.wixstatic.com/media/25b4a3_fae0b5a09c5c4a4cbd36b211a9075836~mv2.png/v1/fill/w_66,h_66,al_c,lg_1/25b4a3_fae0b5a09c5c4a4cbd36b211a9075836~mv2.png" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
