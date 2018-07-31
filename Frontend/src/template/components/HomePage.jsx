import React, { Component } from "react";
import Navbar from "./NavBar";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <div className="container" />
      </React.Fragment>
    );
  }
}

export default HomePage;
