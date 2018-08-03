import React, { Component } from "react";
import "../css/NavBar.css";
import SmallEllipseBtn from "./SmallEllipseBtn";
import ContactBtn from "./ContactBtn";
import LoginWindow from "./LoginWindow";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    activeTabName: "home",
    user: "",
    login: false,
    redirect: false
  };
  constructor(props) {
    super(props);

    console.log(props.user);
    console.log(props.login);
    console.log(props);
  }

  logout = () => {
    this.setState({
      user: "",
      login: false
    });
    sessionStorage.clear();
  };

  //   animation of nav bar
  handleClick(btnId) {
    this.setState({ activeTabName: btnId });
  }

  handleChangeActive(btnId) {
    let id = "";
    id += btnId === this.state.activeTabName ? "initial_active" : "";
    return id;
  }

  componentDidUpdate() {
    if (
      (sessionStorage.getItem("userSocialData") || this.state.redirect) &&
      this.state.login === false
    ) {
      let data = JSON.parse(sessionStorage.getItem("userSocialData"));
      this.setState({
        user: data.name,
        login: true
      });
    }
  }

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
                    <Link
                      onClick={() => this.handleClick("home")}
                      id={this.handleChangeActive("home")}
                      className="nav-link button_style"
                      to="/"
                    >
                      HOME
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 left_border">
                    <Link
                      onClick={() => this.handleClick("work")}
                      id={this.handleChangeActive("work")}
                      className="nav-link button_style"
                      to="/how-it-works"
                    >
                      How it Works
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 left_border">
                    <span
                      onClick={() => this.handleClick("contact")}
                      id={this.handleChangeActive("contact")}
                      className="nav-link button_style"
                    >
                      <ContactBtn buttonName="Contact" isSHowUnderline="" />
                    </span>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="col-xs-12 col-lg-6">
                {this.state.login ? (
                  // login state
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-0 col-xs-0" />

                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 userBtn">
                      <a className="nav-link" href="/">
                        <SmallEllipseBtn text="My trip" />
                      </a>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 userBtn">
                      <a
                        className="nav-link login_btn"
                        href="/"
                        onClick={this.logout}
                      >
                        <SmallEllipseBtn text="Log out" />
                      </a>
                    </div>

                    <div className="col-lg-3 col-md-2 col-sm-4 col-xs-4 userBtn">
                      <a className="nav-link" href="/" onClick={this.logout}>
                        <SmallEllipseBtn text={this.state.user} />
                      </a>
                    </div>

                    <div className="col-lg-2 col-md-1 col-sm-0 col-xs-0" />
                  </div>
                ) : (
                  // not login state
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-0" />
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                      <a href="/">
                        <LoginWindow />
                      </a>
                    </div>
                    <div className="col-lg-3 col-md-2 col-sm-0 col-xs-0" />
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
