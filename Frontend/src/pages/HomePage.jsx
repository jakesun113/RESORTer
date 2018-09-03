import React, {Component} from "react";
import PrompImageSlider from "../components/HomePage/PrompImageSlider";
import DiamondBtn from "../components/HomePage/DiamondBtn";
import FeedBackBtn from "../components/template/FeedBackBtn";
import ChatBtn from "../components/template/ChatBtn";
// import FooterNavBar from "../components/FooterNavBar";
import SearchArea from "../components/HomePage/searchPart";
import MostSearchArea from "../components/HomePage/MostPopular";
import BackTopBtn from "../components/template/BackTopBtn";

const ShortLineStyle = {
    marginTop: "50px",
    width: "90%"
};

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScrollHeight: 0
        };
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        window.onscroll = () => {
            const newHeight = Math.ceil(window.scrollY / 50) * 50;
            if (this.state.currentScrollHeight !== newHeight) {
                this.setState({currentScrollHeight: window.scrollY});
            }
        };

        // if (sessionStorage.getItem("userSocialData") || this.state.redirect) {
        //   let data = JSON.parse(sessionStorage.getItem("userSocialData"));
        //   this.setState({
        //     user: data.name,
        //     login: true
        //   });
        // }
    }

    render() {
        const opacity = Math.min(100 / this.state.currentScrollHeight, 1);

        //when clicking "make plan", if not login, redirect to login page
        // if (!sessionStorage.getItem('userSocialData') || this.state.redirect) {
        //     return (<Redirect to={'/login'}/>)
        // }

        return (
            <React.Fragment>
                <PrompImageSlider/>
                <div className="container">
                    <DiamondBtn text="Sneak Peek"/>
                    <hr style={ShortLineStyle}/>
                    <SearchArea/>
                    <hr style={ShortLineStyle}/>
                    <MostSearchArea/>
                </div>

                <FeedBackBtn/>
                <ChatBtn/>
                {opacity !== 1 ? (
                    <BackTopBtn scrollStepInPx="50" delayInMs="16.6"/>
                ) : (
                    ""
                )}
            </React.Fragment>
        );
    }
}

export default HomePage;
