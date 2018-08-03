import React, { Component } from "react";
import NavBar from "../components/NavBar";
import MainBody from "./MainBody";

class App extends Component {
  state = {
    user: "",
    redirect: false,
    login: false
  };
  componentDidMount() {
    if (sessionStorage.getItem("userSocialData") || this.state.redirect) {
      let data = JSON.parse(sessionStorage.getItem("userSocialData"));
      this.setState({
        user: data.name,
        login: true
      });
    }
  }

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <NavBar login={this.state.login} user={this.state.user} />
        <MainBody />
      </div>
    );
  }
}

export default App;
