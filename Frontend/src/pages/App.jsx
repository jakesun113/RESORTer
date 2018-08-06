import React, { Component } from "react";
import NavBar from "../components/NavBar";
import MainBody from "./MainBody";
import FooterNavBar from "../components/FooterNavBar";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MainBody />
        <FooterNavBar />
      </div>
    );
  }
}

export default App;
