import React, { Component } from "react";
import Navbar from "./NavBar";
import PrompImageSlider from "./PrompImageSlider";
import DiamondBtn from "./DiamondBtn";
import SearchArea from "./SearchArea";
import MostSearchArea from "./MostSearchArea";
import FeedBackBtn from "./FeedBackBtn";
import ChatBtn from "./ChatBtn";
import FooterNavBar from "./FooterNavBar";

const ShortLineStyle = {
  marginTop: "50px",
  width: "90%"
};

const LongLineStyle = {
  marginTop: "50px",
  width: "100%"
};
const color = {
  background: "black"
};
class HomePage extends Component {
  state = { currentScrollHeight: 0 };
  render() {
    const opacity = Math.min(100 / this.state.currentScrollHeight, 1);
    return (
      <React.Fragment>
        <Navbar />
        <PrompImageSlider />
        <div className="container">
          <DiamondBtn text="Sneak Peek" />
          <hr style={ShortLineStyle} />
          <SearchArea />
          <hr style={ShortLineStyle} />
          <MostSearchArea />
        </div>
        <hr style={LongLineStyle} />
        <FeedBackBtn />
        <ChatBtn />
        <FooterNavBar isHidden={opacity} />
      </React.Fragment>
    );
  }

  componentDidMount() {
    window.onscroll = () => {
      const newHeight = Math.ceil(window.scrollY / 50) * 50;
      if (this.state.currentScrollHeight !== newHeight) {
        this.setState({ currentScrollHeight: window.scrollY });
      }
    };
  }
}

export default HomePage;
