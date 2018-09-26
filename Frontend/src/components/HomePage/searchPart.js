import React, {Component} from "react";
import "../../css/Homepage/search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DropDown from "../template/Dropdown";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import axios from "axios";
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';


class Search extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            countryResorts: [],
            liftPassResorts: [],
            selectedCountryResorts: null,
            selectedLiftPassResorts: null,
            liftPasses: [],
            countryName: [],
        };
        this.handleBook = this.handleBook.bind(this);
    }


    // Will be called in "Country" class so as to change the "selectedCountry" in state
   async handleChangedCountry(selected) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        let postData;
        postData = {
            country: selected
        };

        await axios.post(BaseURL + "getResortsByCountry", postData)
            .then(response => {
              //console.log("read resorts successfully");
              let resorts = response.data.sortedResortArray;
              //Make HTTP request HERE for country based resorts
              this.setState({countryResorts: resorts}); 
            });
    }

    // Will be called in "LiftPass" class so as to change the "selectedLiftPass" in state
    async handleChangedLiftPass(selected) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        let postData;
        postData = {
            liftPass: selected
        };

        await axios.post(BaseURL + "getResortsByLiftPass", postData)
            .then(response => {
              //console.log("read resorts successfully");
              let resorts = response.data.sortedResortArray;
              //Make HTTP request HERE for LiftPass based resorts
              this.setState({liftPassResorts: resorts}); 
            });
    }

    //Set the selected Resort, it will be used to make order
    handleSelectedCountryResorts(selected) {
        this.setState({selectedCountryResorts: selected});
    }

    //Set the selected Resort, it will be used to make order
    handleSelectedLiftPassResorts(selected) {
        this.setState({selectedLiftPassResorts: selected});
    }


    componentDidMount() {
        let BaseURL = "http://127.0.0.1:3333/api/";
        //get the list of countries
        axios.get(BaseURL + "getCountry").then(
            response => {
                //console.log("read countries successfully");
                let countries = response.data.sortedCountryArray;
                //console.log(countries);
                this.setState({countryName: countries}); 
            });

        //get the list of liftPasses
        axios.get(BaseURL + "getLiftPass").then(
            response => {
                //console.log("read liftPass successfully");
                let liftPass = response.data.sortedLiftPassArray;
                //console.log(countries);
                this.setState({liftPasses: liftPass});
            });
    }

    async handleBook(){

        //only handle login with email user
        if (sessionStorage.getItem('userSocialData') &&
            JSON.parse(sessionStorage.getItem('userSocialData')).provider === 'email') {
            let BaseURL = "http://127.0.0.1:3333/api/";
            let postData;
            postData = {
                token: JSON.parse(sessionStorage.getItem('userToken')).token
            };
            await axios.post(BaseURL + "check-token", postData).then(response => {

                //handle token is not valid, return to login
                if (response.data.tokenValid === false) {
                    console.log("token expired");

                    this.props.history.push({
                        pathname: '/login'
                        })
                }
                //token is valid
                else {
                    console.log("token valid");
                    //save token into session
                    let sessionData;
                    sessionData = {
                        token: response.data.token
                    };
                    sessionStorage.setItem("userToken", JSON.stringify(sessionData));

                    //save token into cookie

                    let date = new Date();
                    date.setTime(date.getTime() + +2592000);
                    const {cookies} = this.props;

                    //only when user click "remember me", update the token in cookies
                    if (cookies.get("access-token")) {
                        cookies.set("access-token", response.data.token, {
                            expires: date,
                            path: "/"
                        });

                        console.log(
                            "token has been extended. Token is: " +
                            cookies.get("access-token")
                        );
                    }

                    //Jump into book page
                    let postData = {};
                    postData.resortName = this.state.selectedCountryResorts;
                    postData.token = JSON.parse(sessionStorage.getItem('userToken')).token;

                    axios.post("http://127.0.0.1:3333/api/enrollTrip", postData)
                    .then(response => {
                        if(response.data.status === 'success'){
                            this.props.history.push({
                                pathname: `/booking/${this.state.selectedCountryResorts}/who`,
                                state: {masterID: response.data.masterID, resortID: response.data.resortID, tripID: response.data.tripID}
                                })
                        }else{
                            alert('SERVER ERROR, please try again.')
                        }
                    })
                }
            });
        }
        //facebook&google login
        else if(sessionStorage.getItem('userSocialData') &&
            JSON.parse(sessionStorage.getItem('userSocialData')).provider !== 'email'){
                //Jump into book page
                let postData = {};
                postData.resortName = this.state.selectedCountryResorts;
                postData.token = JSON.parse(sessionStorage.getItem('userToken')).token;
                await axios.post("http://127.0.0.1:3333/api/enrollTrip", postData)
                .then(response => {
                    if(response.data.status === 'success'){
                        this.props.history.push({
                            pathname: `/booking/${this.state.selectedCountryResorts}/who`,
                            state: {masterID: response.data.masterID, resortID: response.data.resortID, tripID: response.data.tripID}
                            })
                    }else{
                        alert('SERVER ERROR, please try again.')
                    }
                })
        //logout status
        }else if(!sessionStorage.getItem('userSocialData')){
            this.props.history.push({
                pathname: '/login'
                })
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1 className="text-justify">Search Resorts</h1>
                    <div className="text-justify">
                        <h1>By Country / Resort</h1>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <DropDown
                                defaultName="By Country"
                                options={this.state.countryName}
                                dropDownValue={this.handleChangedCountry.bind(this)}
                            />
                        </div>
                        <div className="col-sm">
                            <DropDown
                                defaultName="By Resort"
                                options={this.state.countryResorts}
                                dropDownValue={this.handleSelectedCountryResorts.bind(this)}
                            />
                        </div>
                        <div className="col-sm">
                        {this.state.selectedCountryResorts === null ? (
                            <SmallEllipseBtn
                                text="Make a Quote"
                                btnColor="rgba(255, 97, 97, 1)"
                                paddingLeft="90px"
                                paddingRight="90px"
                                paddingTop="8px"
                                paddingBottom="8px"
                            />
                        ) : (
                            <a
                            // href={`/booking/${this.state.selectedCountryResorts}/who`}
                            onClick={this.handleBook}
                            >
                            <SmallEllipseBtn
                                text="Make a Quote"
                                btnColor="rgba(255, 97, 97, 1)"
                                paddingLeft="90px"
                                paddingRight="90px"
                                paddingTop="8px"
                                paddingBottom="8px"
                            />
                            </a>
                        )}
                        </div>
                    </div>

                    <div className="text-justify" id="titleSearchPart2">
                        <h1>
                            By Resort Alliance Program
                            <span id="invokeHidden">
              <img
                  id="questionFig"
                  src={require("../../materials/HomePage/questionFigHomePage.png")}
                  alt="questionTipFigure"
              />
              <span id="hiddenTip">
                Plan a trip at any of the resorts in these Alliances and enjoy
                reciprocal benefits with other member resorts. See the specific
                Alliance's website for more details
              </span>
            </span>
                        </h1>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <DropDown
                                defaultName="By LiftPass"
                                options={this.state.liftPasses}
                                dropDownValue={this.handleChangedLiftPass.bind(this)}
                            />
                        </div>
                        <div className="col-sm">
                            <DropDown
                                defaultName="By Resort"
                                options={this.state.liftPassResorts}
                                dropDownValue={this.handleSelectedLiftPassResorts.bind(this)}
                            />
                        </div>
                        <div className="col-sm">
                        {this.state.selectedLiftPassResorts === null ? (
                            <SmallEllipseBtn
                                text="Make a Quote"
                                btnColor="rgba(255, 97, 97, 1)"
                                paddingLeft="90px"
                                paddingRight="90px"
                                paddingTop="8px"
                                paddingBottom="8px"
                            />
                        ) : (
                            <a //href={`/booking/${this.state.selectedLiftPassResorts}/who`}
                                onClick={this.handleBook}
                            >
                            <SmallEllipseBtn
                                text="Make a Quote"
                                btnColor="rgba(255, 97, 97, 1)"
                                paddingLeft="90px"
                                paddingRight="90px"
                                paddingTop="8px"
                                paddingBottom="8px"
                            />
                        </a>
                        
                        )} 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(Search);
