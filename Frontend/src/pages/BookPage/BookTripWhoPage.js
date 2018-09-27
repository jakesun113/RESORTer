import React, { Component } from "react";
import GoogleMap from "../../components/template/GoogleMapRender";
import DatePicker from "../../components/template/SelectTripDate";
import AddTripMember from "../../components/BookTripPage/AddTripMember"

class BookTripPage extends Component {


  constructor(props){
      super(props);
      this.state = {
        addTripMember:null
      };
  }

  //Show the addTripMember Interface
  showAddTripMember = () =>{
      this.setState({
          addTripMember:true
      })
  }

  render() {
    // const {place, masterID, resortID, tripID, history} = this.props;
    const { place,history } = this.props;

    // if directly type this page's url, redirect to login page
    // if (!sessionStorage.getItem("userToken")) {
    //     return (
    //         <Redirect
    //             to={{
    //                 pathname: "/login",
    //                 state: {from: this.props.history.location.pathname}
    //             }}
    //         />
    //     );
    // }
    return (
      <React.Fragment>
        <div className="container">
          <br />
          {/* title */}
          <div
            className="row"
            style={{ color: "#4682B4", fontSize: "26px", fontWeight: "bold" }}
          >
            <div className="col-1" />
            <div className="col-4"> 1. WHEN & WHO?</div>
            <div className="col-7" />
          </div>
          <br />
          {/* map */}
          <div className="row">
            <div className="col-1" />
            <div className="col-10">
              <GoogleMap />
            </div>
            <div className="col-1" />
          </div>
          <br />
          {/* date picker */}
          <div className="row">
            <div className="col-1" />
            <div className="col-10">
              <DatePicker showAddTripMember={this.showAddTripMember} history={history}/>
            </div>
            <div className="col-1" />
          </div>
          {/* Whether Add new groupMember in this Trip */}
          {this.state.addTripMember === true ? <AddTripMember place={place}/>:null}
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default BookTripPage;
