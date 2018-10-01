import React, {Component} from "react";
import SmallEllipseBtn from "./SmallEllipseBtn";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"
function StartDate(props) {
    function handleChange(date) {
        props.onChange(date, "startDate");
    }

    return (
        <DatePicker
            selected={props.startDate}
            onChange={handleChange}
            minDate={props.validMinDate}
        /> 
    );
}

function EndDate(props) {
    function handleChange(date) {
        props.onChange(date, "endDate");
    }

    return (
        <DatePicker
            selected={props.endDate}
            onChange={handleChange}
            minDate={props.validMinDate}
        />
    );
}

class SelectTripDate extends Component {

 constructor(props){
    super(props);
    this.state = {
        startDate: moment().add(4, "days"), // initially, start date is today + 4 days
        endDate: moment().add(9, "days"),
        width:0,
        hidePlanButton:false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      //Responsive
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth});
      }

    //Handle PlanYourTrip button click
    handleClick = () => {
        //TODO: If user is not login, alert either want to 'login' or 'guestUser'

        //1) While Login
        try{
            //if login & Personal Profile was completed
            //FIXME: can not auth token in normal way
            if (sessionStorage.getItem('userSocialData')){  
                axios
                .get("http://127.0.0.1:3333/api/checkProfile/"+JSON.parse(sessionStorage.getItem("userToken")).token)
                .then(response => {
                    if(response.data.status === 'success'){
                        //show the addTrip
                        this.props.showAddTripMember()

                    }else if(response.data.status === 'fail'){
                        //redirect to Profile Page
                        this.props.history.push({
                            pathname: '/newProfile'
                          });

                    }
                });
            }
            //no login
            else{
                alert('guest or login')
                //alert window

            }

            this.setState({
                hidePlanButton : true
            })

        }catch(err){

        }
    };
    // choice is either "startDate" or "endDate"
    handleChange = (date, choice) => {
        const {startDate, endDate} = this.state;

        if (choice === "endDate") {
            this.setState({
                [choice]: date
            });
        } else {
            if (date > endDate) {
                this.setState({
                    [choice]: date,
                    endDate: moment(date).add(5, "days")
                });
            } else {
                this.setState({
                    [choice]: date
                });
            }
        }
    };

    render() {
        let currentStartDate = this.state.startDate;
        
        let planButton =<div>   
                            <p style={{opacity:0}}>
                                <strong>Place Holder</strong>
                            </p>
                            {/* Responsive */}
                            {this.state.width < 990 && this.state.width > 575 ? <div style={{opacity:0}}>1</div> : null}
                            <span onClick={this.handleClick}>
                                <SmallEllipseBtn
                                    text="Plan Your Trip"
                                    btnColor="rgba(255, 97, 97, 1)"
                                />
                            </span>
                        </div>
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <p>
                            <strong>Start Date </strong> (4 days + in advance only)
                        </p>
                        <StartDate
                            startDate={this.state.startDate}
                            onChange={this.handleChange}
                            validMinDate={moment(currentStartDate)}
                        />
                    </div>
                    <div className="col-sm">
                        <p>
                            <strong>End Date</strong>
                        </p>
                        {/* Responsive */}
                        {this.state.width < 990 && this.state.width > 575 ? <div style={{opacity:0}}>1</div> : null }
                        <EndDate
                            endDate={this.state.endDate}
                            onChange={this.handleChange}
                            validMinDate={moment(currentStartDate)}
                        />
                    </div>
                    <div className="col-sm" id="planTripBtn" style={{textAlign:'center'}}>
                        {this.state.hidePlanButton ? null : planButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectTripDate;
