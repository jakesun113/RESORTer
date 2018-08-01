import React, { Component } from "react";
import Navbar from "../components/NavBar";
import PrompImageSlider from "../components/PrompImageSlider";
import DiamondBtn from "../components/DiamondBtn";
import FeedBackBtn from "../components/FeedBackBtn";
import ChatBtn from "../components/ChatBtn";
import FooterNavBar from "../components/FooterNavBar";
import SearchArea from "../components/homepageSearch&Popular/search"
import MostSearchArea from "../components/homepageSearch&Popular/MostPopular"

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
