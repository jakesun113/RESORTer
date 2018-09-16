import React, {Component} from "react";
import GoogleMap from "../../components/template/GoogleMapRender";
import DatePicker from "../../components/template/SelectTripDate";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import GroupMemberInfoCard from "../../components/GroupMemberPage/GroupMemberInfoCard";
import {Redirect} from "react-router-dom";

class BookTripPage extends Component {
    state = {};

    render() {
        const {place} = this.props;
        
        console.log(this.props.history.location.pathname)
         //if directly type this page's url, redirect to login page
         if (!sessionStorage.getItem("userToken")) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: {from: this.props.history.location.pathname}
                }}
            />
        }
        return (
            <React.Fragment>
                <div className="container">
                    <br/>
                    {/* title */}
                    <div
                        className="row"
                        style={{color: "#4682B4", fontSize: "26px", fontWeight: "bold"}}
                    >
                        <div className="col-1"/>
                        <div className="col-4"> 1. WHEN & WHO?</div>
                        <div className="col-7"/>
                    </div>
                    <br/>
                    {/* map */}
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10">
                            <GoogleMap/>
                        </div>
                        <div className="col-1"/>
                    </div>
                    <br/>
                    {/* date picker */}
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-10">
                            <DatePicker/>
                        </div>
                        <div className="col-1"/>
                    </div>
                    <br/>
                    {/* Add member */}
                    <div
                        className="row"
                        style={{color: "#4682B4", fontSize: "26px", fontWeight: "bold"}}
                    >
                        <div className="col-1"/>
                        <div className="col-4">Trip Members:</div>
                        <div className="col-7"/>
                    </div>
                    <br/>
                    {/* add member btn */}
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-2">
                            <SmallEllipseBtn
                                text="+ Add Me"
                                btnColor="orangered"
                                paddingLeft="5ex"
                                paddingRight="5ex"
                            />
                        </div>
                        <div className="col-3">
                            <SmallEllipseBtn
                                text="+ Add Saved group Member"
                                btnColor="orangered"
                            />
                        </div>
                        <div className="col-3">
                            <SmallEllipseBtn
                                text="+ Add new Group Member"
                                btnColor="orangered"
                            />
                        </div>
                        <div className="col-3"/>
                    </div>
                    <br/>
                    {/* already added group member */}
                    <div className="row">
                        <div className="col-1"/>
                        <div className="col-5">
                            <GroupMemberInfoCard/>
                        </div>
                        <div className="col-5">
                            <GroupMemberInfoCard/>
                        </div>
                        <div className="col-1"/>
                    </div>
                    <br/>
                    {/* continue btn */}
                    <div className="row">
                        <div className="col-8"/>
                        <div className="col-4">
                            <a href={`/booking/${place}/sleep`}><SmallEllipseBtn text="Save and Continue"
                                                                                 btnColor="orangered"/></a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookTripPage;