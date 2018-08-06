import React, { Component } from 'react';
import '../css/search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropDown from './Dropdown'

// Params from Country will be pass into Search Class, and eventually passing into ResortsFromCountry Class 
// Reference on Official Document "Lefting State Up" (https://reactjs.org/docs/lifting-state-up.html)
class Country extends Component {

    constructor(props){
        super(props);
        // this.handleChange.bind(this);
        this.state = {
            countryName:['Algeria', 'Andorra', 'Argentina', 'Armenia', 'Australia', 'Austria', 
            'Azerbaijan', 'Belgium', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Canada', 
            'Central Russia', 'Chile', 'China', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 
            'Egypt', 'Estonia', 'Far Eastern Federal District', 'Finland', 'France', 'Georgia', 'Germany', 
            'Greece', 'Greenland', 'Hungary', 'Iceland', 'India', 'Iran', 'Israel', 'Italy', 'Japan', 
            'Kazakhstan', 'Kosovo', 'Kyrgyzstan', 'Latvia', 'Lebanon', 'Lesotho', 'Liechtenstein', 
            'Lithuania', 'Macedonia', 'Mexico', 'Mongolia', 'Montenegro', 'Morocco', 'Netherlands', 
            'New Zealand', 'North Caucasus', 'North Korea', 'Northwest Russia', 'Norway', 'Pakistan', 
            'Poland', 'Portugal', 'Romania', 'Serbia', 'Siberia', 'Slovakia', 'Slovenia', 'South Africa', 
            'South Korea', 'Southern Russia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 
            'United Arab Emirates', 'United Kingdom', 'USA'],
        }
    }

    handleCountryChange(dropDownValue) {
        this.props.setCountryChange(dropDownValue);
      }
    render(){
        return(
            <div>
                <DropDown defaultName='By Country' options={this.state.countryName} dropDownValue={this.handleCountryChange.bind(this)} />
            </div>
        );
    }
}
class LeftPass extends Component{

    constructor(props){
        super(props);
        // this.handleChange.bind(this);
        this.state = {
            leftPasses:['Collective','Epic','Ikon'],
        }
    }

    handleLeftPassChange(dropDownValue) {
        this.props.setLeftPassChange(dropDownValue);
      }
    render(){
        return(
          <DropDown defaultName='By LeftPass' options={this.state.leftPasses} dropDownValue={this.handleLeftPassChange.bind(this)} />  
        );
    }
}

class ResortsFromCountry extends Component {
    constructor(props){
        super(props);
    }

    handleResortChange(dropDownValue){
        //params will be use
        this.props.handleSelectedCountryResorts(dropDownValue)
    }
    render() {
        return(
        <DropDown defaultName="By Resorts" options={this.props.countryResorts} dropDownValue={this.handleResortChange.bind(this)} />
        );
    }
}

class ResortsFromLeftPass extends Component {
    constructor(props){
        super(props);
    }

    handleResortChange(dropDownValue){
        
        this.props.handleSelectedLeftPassResorts(dropDownValue)
    }
    render() {
        return(
        <DropDown defaultName="By LeftPass" options={this.props.leftPassResorts} dropDownValue={this.handleResortChange.bind(this)} />
        );
    }
}

class TitlePart_1 extends Component {
    render(){
        return(
            <div>
                <h1 className="text-justify">Search Resorts</h1>
                <div className="text-justify"><h1>By Country / Resort</h1></div>
            </div>
        )
    }
}
class TitlePart_2 extends Component {
    render(){
        return(
            <div>
               <div className="text-justify" id="titleSearchPart2">
                <h1>By Resort Alliance Program
                <span id="invokeHidden">
                    <img id="questionFig" src={require("../materials/homepageSearch&Popular/questionFigHomePage.png")}  alt="questionTipFigure"/>
                    <span id="hiddenTip">Plan a trip at any of the resorts in these Alliances and 
                    enjoy reciprocal benefits with other member resorts. See the specific 
                    Alliance's website for more details</span>
                </span>
                </h1> 
            </div>
            </div>
        )
    }
}


class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            countryResorts:[],
            leftPassResorts:[],
            selectedCountryResorts:'',
            selectedLeftPassResorts:''
        }
    }

    // Will be called in "Country" class so as to change the "selectedCountry" in state
    handleChangedCountry(selected){
       //Make HTTP request HERE for country based resorts
        this.setState({countryResorts:[selected]})
    }

    // Will be called in "LeftPass" class so as to change the "selectedLeftPass" in state
    handleChangedLeftPass(selected){
       //Make HTTP request HERE for LeftPass based resorts
        this.setState({leftPassResorts:[selected]})
    }

    //Set the selected Resort, it will be used to make order
    handleSelectedCountryResorts(selected){
       
        this.setState({selectedCountryResorts:selected})
    }

    //Set the selected Resort, it will be used to make order
    handleSelectedLeftPassResorts(selected){
        
        this.setState({selectedLeftPassResorts:selected})
    }
  render() {
   return(

    <div className="container">
   
    <TitlePart_1 />

    <div className="row">
            <div className="col-sm">
            <Country setCountryChange={this.handleChangedCountry.bind(this)}/>
            </div>
            <div className="col-sm">
            <ResortsFromCountry countryResorts={this.state.countryResorts} handleSelectedCountryResorts={this.handleSelectedCountryResorts.bind(this)}/>
            </div>
            <div className="col-sm">
            <button className="btn">Make a Quote</button>
            </div>
    </div>
    
    <TitlePart_2 />

    <div className="row">
        <div className="col-sm">
        <LeftPass setLeftPassChange={this.handleChangedLeftPass.bind(this)}/>
        </div>
        <div className="col-sm">
        <ResortsFromLeftPass leftPassResorts={this.state.leftPassResorts} handleSelectedLeftPassResorts={this.handleSelectedLeftPassResorts.bind(this)}/>
        </div>
        <div className="col-sm">
        <button className="btn">Make a Quote</button>
        </div>
    </div>

    </div>
       
    );
  }
}

export default Search;
