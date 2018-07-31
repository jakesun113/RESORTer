import React, { Component } from "react";
import "./css/NavBar.css";
import SmallEllipseBtn from "./SmallEllipseBtn";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container-fullwidth">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
              <img
                className="logo_front"
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
                <li className="text_for_middle nav-item active">
                  <a className="nav-link" href="#">
                    <span>HOME</span>
                  </a>
                </li>

                <li className="nav-item text_for_middle">
                  <a className="nav-link" href="#">
                    <span>How it Works</span>
                  </a>
                </li>

                <li className="nav-item text_for_middle">
                  <a className="nav-link" href="#">
                    <span>Contect</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <SmallEllipseBtn text="Log In" />
                  </a>
                </li>

                <li className="nav-item logo_coming_soon">
                  <span className="navbar-brand mb-0 h1">
                    <img src="https://static.wixstatic.com/media/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png/v1/fill/w_200,h_200,al_c,usm_0.66_1.00_0.01/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png" />
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
