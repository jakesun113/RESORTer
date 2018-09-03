import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/TermPrivacyPage/SideNav.css";

const BlackTextStyle = {
  color: "black"
};
const NoWrapStyle = {
  whiteSpace: "nowrap",
  color: "black"
};
export default class GuestUserContent extends React.Component {
  state = {
    currentActiveTab: ""
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            marginTop: "50px",
            height: "aotu"
          }}
        >
          {/* Check the Css section for the selector */}
          <nav id="v-pills-tab">
            <ul id="navbar-all-list">
              <span style={(BlackTextStyle, NoWrapStyle)}>Terms of Use</span>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <NavLink
                    activeClassName="active"
                    style={(BlackTextStyle, NoWrapStyle)}
                    to="/term-privacy/term-of-use"
                  >
                    Guest and Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="active"
                    style={BlackTextStyle}
                    to="/term-privacy/terms-resort-and-service-providers"
                  >
                    Resort and Service Providers
                  </NavLink>
                </li>
              </ul>
              {/* end of term of use */}
              <li>
                <NavLink
                  activeClassName="active"
                  style={(BlackTextStyle, NoWrapStyle)}
                  to="/term-privacy/privacy-statement"
                >
                  Privacy Statement
                </NavLink>
              </li>

              <li>
                <NavLink
                  activeClassName="active"
                  style={(BlackTextStyle, NoWrapStyle)}
                  to="/term-privacy/disclaimer"
                >
                  Disclaimer
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
