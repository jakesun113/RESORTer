import React, { Component } from 'react';
import '../../css/homepageSearch&Popular/search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

// Params from Country will be pass into Search Class, and eventually passing into ResortsFromCountry Class 
// Reference on Official Document "Lefting State Up" (https://reactjs.org/docs/lifting-state-up.html)
class Country extends Component {

    constructor(props){
        super(props);
        this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.countryChange(e.target.value);
      }
    render(){
        return(
            <select className="custom-select" onChange={this.handleChange.bind(this)}>
            <option selected="" value="" default="" disabled="" id="hiddenSearch">By Country</option>
            <option value="Algeria">Algeria</option>
            <option value="Andorra">Andorra</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Belgium">Belgium</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Brazil">Brazil</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Canada">Canada</option>
            <option value="Central Russia">Central Russia</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Croatia">Croatia</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Egypt">Egypt</option>
            <option value="Estonia">Estonia</option>
            <option value="Far Eastern Federal District">Far Eastern Federal District</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Mexico">Mexico</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Morocco">Morocco</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="North Caucasus">North Caucasus</option>
            <option value="North Korea">North Korea</option>
            <option value="Northwest Russia">Northwest Russia</option>
            <option value="Norway">Norway</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Romania">Romania</option>
            <option value="Serbia">Serbia</option>
            <option value="Siberia">Siberia</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Korea">South Korea</option>
            <option value="Southern Russia">Southern Russia</option>
            <option value="Spain">Spain</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Turkey">Turkey</option>
            <option value="USA">USA</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
        </select>
           
        );
    }
}

class ResortsFromCountry extends Component {

    render() {
        return(
        <select disabled="" className="custom-select" id="comp-jfxhov17collection">
            <option selected="" value="" default="" disabled="" id="hiddenSearch">
            By Resort
            </option>
            {
                this.props.resortsLen === 0 ? null : this.props.resorts[0].resorts.map((resort) =>{
                    return <option  key={resort}>{resort}</option>
                })
            }
        </select>
        )
    }
}

class ResortsFromLeftPass extends Component {

    render() {
        return(
        <select disabled="" className="custom-select" id="comp-jfxhov17collection">
            <option selected="" value="" default="" disabled="" id="hiddenSearch">
            By LeftPass
            </option>
            {
                this.props.resortsLen === 0 ? null : this.props.resorts[0].resorts.map((resort) =>{
                    return <option  key={resort}>{resort}</option>
                })
            }
        </select>
        )
    }
}

class LeftPass extends Component{

    constructor(props){
        super(props);
        this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.leftPassChange(e.target.value);
      }
    render(){
        return(
            <select className="custom-select" id="comp-jhslmjf2collection" onChange={this.handleChange.bind(this)}>
            <option selected="" value="" default="" id="hiddenSearch">By LiftPass</option>
            <option value="Collective">Collective</option>
            <option value="Epic">Epic</option>
            <option value="Ikon">Ikon</option></select>
        )
    }
}

class Search extends Component {
    constructor(props){
        super(props);
        this.handleChangedCountry.bind(this);
        this.state = {
            countryResorts : [{name:"Algeria", resorts:["Chrea"]},
                               {name:"Andorra", resorts:["Arcalís – Ordino (Vallnord)","Arinsal - LaMassana (Vallnord)","Canillo","El Tarter", "Encamp", "Grandvalira - Pas de la Casa", "Grau Roig", "Pal", "Soldeu"]}
                              ],
            selectedCountry : "",
            leftPass_Resorts : [{name : "Collective", resorts:["Alta","Aspen Snowmass","Big Sky Resort","Coronet Peak","Jackson Hole","Lake Louise","Mammoth Mountain","Mt. Norquay - Banff","Revelstoke Mountain Resort","Snowbasin","Snowbird","Squaw Valley","Sugarbush","Sun Valley Resort","Taos","The Remarkables","Thredbo"]}
                               ],
            selectedLeftPass : ""
        }
    }

    // Will be called in "Country" class so as to change the "selectedCountry" in state
    handleChangedCountry(selected){
        this.setState({selectedCountry:selected})
    }

    // Will be called in "LeftPass" class so as to change the "selectedLeftPass" in state
    handleChangedLeftPass(selected){
        this.setState({selectedLeftPass:selected})
    }
  render() {

    let countryResorts = this.state.countryResorts.filter(resort => {
        return resort.name === this.state.selectedCountry
    });

    let leftPassResorts = this.state.leftPass_Resorts.filter(resort => {
        return resort.name === this.state.selectedLeftPass
    });

    // If len is 0, which means that there is no corresponding resorts for this selection
    let leftPassResortsLen = leftPassResorts.length;
    let countryResortsLen = countryResorts.length; 
   

    return (
        
        <div className="container">
            <h1 className="text-justify">Search Resorts</h1>
            <div className="text-justify"><h1>By Country / Resort</h1></div>
        
            <div class="row" style={{width:'80%'}}>
                    <div class="col-sm">
                    <Country countryChange={this.handleChangedCountry.bind(this)} />
                    </div>
                    <div class="col-sm">
                    <ResortsFromCountry resortsLen={countryResortsLen} resorts={countryResorts}/>
                    </div>
                    <div class="col-sm">
                    <button className="btn">Make a Quote</button>
                    </div>
            </div>

            <div className="text-justify" id="titleSearchPart2">
                <h1>By Resort Alliance Program
                <span><img src={require("../../materials/homepageSearch&Popular/questionFigHomePage.png")} id="questionFig" alt="questionTipFigure"></img></span>
                <span id="hiddenTip">Plan a trip at any of the resorts in these Alliances and 
                    enjoy reciprocal benefits with other member resorts. See the specific 
                    Alliance's website for more details</span>
                </h1> 
            </div>
        
            <div class="row" style={{width:"80%"}}>
                <div class="col-sm">
                <LeftPass leftPassChange={this.handleChangedLeftPass.bind(this)}/>
                </div>
                <div class="col-sm">
                <ResortsFromLeftPass resortsLen={leftPassResortsLen} resorts={leftPassResorts}/>
                </div>
                <div class="col-sm">
                <button className="btn">Make a Quote</button>
                </div>
            </div>

            {/* <div className="line"></div> */}

        </div>

    );
  }
}

export default Search;
