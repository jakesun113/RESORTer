import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Navbar from "../components/NavBar";
import PrompImageSlider from "../components/PrompImageSlider";
import DiamondBtn from "../components/DiamondBtn";
import FeedBackBtn from "../components/FeedBackBtn";
import ChatBtn from "../components/ChatBtn";
import FooterNavBar from "../components/FooterNavBar";
import SearchArea from "../components/homepageSearch&Popular/searchPart"
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
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            redirect: false,
            login: false,
            currentScrollHeight: 0
        };
    }

    componentDidMount() {
        window.onscroll = () => {
            const newHeight = Math.ceil(window.scrollY / 50) * 50;
            if (this.state.currentScrollHeight !== newHeight) {
                this.setState({currentScrollHeight: window.scrollY});
            }
        };

        if (sessionStorage.getItem('userSocialData') || this.state.redirect) {
            let data = JSON.parse(sessionStorage.getItem('userSocialData'));
            this.setState({
                user: data.name,
                login: true
            })
        }
    }

    render() {
        const opacity = Math.min(100 / this.state.currentScrollHeight, 1);

        //when clicking "make plan", if not login, redirect to login page
        // if (!sessionStorage.getItem('userSocialData') || this.state.redirect) {
        //     return (<Redirect to={'/login'}/>)
        // }

        return (
            <React.Fragment>
                <Navbar login={this.state.login} user={this.state.user}/>
                <PrompImageSlider/>
                <div className="container">
                    <DiamondBtn text="Sneak Peek"/>
                    <hr style={ShortLineStyle}/>
                    <SearchArea/>
                    <hr style={ShortLineStyle}/>
                    <MostSearchArea/>
                </div>
                <hr style={LongLineStyle}/>
                <FeedBackBtn/>
                <ChatBtn/>
                <FooterNavBar isHidden={opacity}/>
            </React.Fragment>
        );
    }


}

export default HomePage;
