import React, {Component} from "react";
import PrompImageSlider from "../components/HomePage/PrompImageSlider";
import SmallEllipseBtn from "../components/template/SmallEllipseBtn";
import FeedBackBtn from "../components/template/FeedBackBtn";
import ChatBtn from "../components/template/ChatBtn";
import SearchArea from "../components/HomePage/searchPart";
import MostSearchArea from "../components/HomePage/MostPopular";
import MostSearchInMyCountry from "../components/HomePage/MostPopularInMyCountry";
import BackTopBtn from "../components/template/BackTopBtn";
import YouTube from "../components/template/Youtube";
import axios from "axios/index";

const ShortLineStyle = {
    marginTop: "50px",
    width: "90%"
};

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasResorts: false,
            popularResorts: [],
            currentScrollHeight: 0,
            isShowVideo: false
        };
        this.getPopularResortsByCountry = this.getPopularResortsByCountry.bind(
            this
        );
    }

    async getPopularResortsByCountry(token) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        //get the list of countries
        await axios
            .get(BaseURL + "getPopularResortsByCountry/" + token)
            .then(response => {
                console.log("get user country successfully");
                //console.log(response.data.popularResorts);

                if (response.data.hasResorts === true) {
                    console.log("this country has resorts");
                    this.setState({
                        hasResorts: true,
                        popularResorts: response.data.popularResorts
                    });
                } else {
                    console.log("this country doesn't have resorts");
                }
            });
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        window.onscroll = () => {
            const newHeight = Math.ceil(window.scrollY / 50) * 50;
            if (this.state.currentScrollHeight !== newHeight) {
                this.setState({currentScrollHeight: window.scrollY});
            }
        };

        //console.log("in home mount");
        if (sessionStorage.getItem("userToken")) {
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            this.getPopularResortsByCountry(tokenData.token);
        }
    }

    render() {
        const opacity = Math.min(100 / this.state.currentScrollHeight, 1);

        return (
            <React.Fragment>
                <PrompImageSlider/>
                <div className="container">
                    {/* sneak peak btn */}
                    <div className="row">
                        <div className="col-4"/>
                        <div
                            className="col-4"
                            style={{textAlign: "center", marginTop: "50px"}}
                        >
              <span
                  onClick={() => {
                      this.setState({isShowVideo: !this.state.isShowVideo});
                  }}
              >
                <SmallEllipseBtn
                    text="Want a sneak peek?"
                    style={{
                        backgroundColor: "orangered"
                    }}
                />
              </span>
                        </div>
                        <div className="col-4"/>
                    </div>
                    {/* youtube */}
                    {this.state.isShowVideo ? (
                        <div className="row">
                            <div className="col-1"/>
                            <div
                                className="col-10"
                                style={{
                                    textAlign: "center",
                                    marginTop: "50px",
                                    width: "100%"
                                }}
                            >
                                <YouTube
                                    onHandleClose={() => {
                                        this.setState({isShowVideo: false});
                                    }}
                                />
                            </div>
                            <div className="col-1"/>
                        </div>
                    ) : (
                        ""
                    )}

                    <hr style={ShortLineStyle}/>
                    <SearchArea history={this.props.history}/>
                    {this.state.hasResorts ? (
                        <div>
                            <hr style={ShortLineStyle}/>
                            <MostSearchInMyCountry
                                popularResorts={this.state.popularResorts}
                                history={this.props.history}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                    <hr style={ShortLineStyle}/>
                    <MostSearchArea history={this.props.history}/>
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
