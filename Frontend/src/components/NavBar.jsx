import React, { Component } from "react";
import "../css/NavBar.css";
import SmallEllipseBtn from "./SmallEllipseBtn";
import ContactBtn from "./ContactBtn";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* new design */}
        <div className="container-fluid">
          <nav>
            {/* up */}
            <div className="row">
              <div className="col-xs-0 col-sm-0 col-lg-2" />
              <div className="col-xs-12 col-sm-4 col-lg-3 logo_coming_soon">
                <span>
                  <img src="https://static.wixstatic.com/media/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png/v1/fill/w_200,h_200,al_c,usm_0.66_1.00_0.01/25b4a3_0a86277c361e458298291ef1d9ed0ba8~mv2.png" />
                </span>
              </div>
              <div className="col-xs-12 col-sm-4 col-lg-3 logo_front">
                <span>
                  <img src="https://static.wixstatic.com/media/25b4a3_476f364fc74b4d3fb6c657519d3c90d2~mv2.png/v1/fill/w_366,h_156,al_c,usm_0.66_1.00_0.01/25b4a3_476f364fc74b4d3fb6c657519d3c90d2~mv2.png" />
                </span>
              </div>
              <div className="col-xs-12 col-sm-4 col-sm-4 col-lg-3 button_admin">
                <a className="navbar-brand" href="#">
                  <img src="https://static.wixstatic.com/media/25b4a3_fae0b5a09c5c4a4cbd36b211a9075836~mv2.png/v1/fill/w_66,h_66,al_c,lg_1/25b4a3_fae0b5a09c5c4a4cbd36b211a9075836~mv2.png" />
                </a>
              </div>
            </div>

            {/* down */}

            <div className="row">
              {/* left */}
              <div className="col-xs-12 col-lg-6">
                <div className="row">
                  <div className="col-lg-3 col-md-2 col-sm-1 col-xs-0" />

                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 left_border">
                    <a
                      className="nav-link button_style initial_active"
                      href="#"
                    >
                      HOME
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 left_border">
                    <a className="nav-link button_style" href="#">
                      How it Works
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 left_border">
                    <a className="nav-link button_style" href="#">
                      <ContactBtn buttonName="Contact" />
                    </a>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="col-xs-12 col-lg-6">
                <a className="nav-link login_btn" href="#">
                  <SmallEllipseBtn text="Log In" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
