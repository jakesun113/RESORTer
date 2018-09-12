import React, {Component} from "react";
import "../../css/Homepage/search.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DropDown from "../template/Dropdown";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import axios from "axios";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryResorts: [],
            liftPassResorts: [],
            selectedCountryResorts: "",
            selectedLiftPassResorts: "",
            liftPasses: ["Collective", "Epic", "Ikon"],
            countryName: []
        };
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
              console.log("read resorts successfully");
              let resorts = response.data.resortArray;
              //Make HTTP request HERE for country based resorts
              this.setState({countryResorts: resorts}); 
            });
    }

    // Will be called in "LiftPass" class so as to change the "selectedLiftPass" in state
    handleChangedLiftPass(selected) {
        let BaseURL = "http://127.0.0.1:3333/api/";
        let postData;
        postData = {
            liftPass: selected
        };

        axios.post(BaseURL + "getResortsByLiftPass", postData)
            .then(response => {
              console.log("read resorts successfully");
              let resorts = response.data.resorts;
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
        axios.get(BaseURL + "getCountry").then(
            response => {
                console.log("read countries successfully");
                let countries = response.data.sortedCountryArray;
                console.log(countries)
                this.setState({countryName: countries}); 
            }
        )
    }

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
                            <SmallEllipseBtn
                                text="Make a Quote"
                                btnColor="rgba(255, 97, 97, 1)"
                                paddingLeft="90px"
                                paddingRight="90px"
                                paddingTop="8px"
                                paddingBottom="8px"
                            />
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
                            <SmallEllipseBtn
                                text="Make a Quote"
                                btnColor="rgba(255, 97, 97, 1)"
                                paddingLeft="90px"
                                paddingRight="90px"
                                paddingTop="8px"
                                paddingBottom="8px"
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;
