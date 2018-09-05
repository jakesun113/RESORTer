import React, { Component } from "react";
import "../css/ProfilePage/ProfilePage.css";
import SliderBar from "../components/template/SliderBar";
import DisabilityForm from "../components/template/DisabilityForm";
import AbilityLevelTip from "../components/template/AbilityLevelTip";
import DisabilityTip from "../components/template/DisabilityTip";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import AlertWindow from "../components/template/AlertWindow";
import axios from "axios";
import moment from "moment";

class ProfilePage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            // activeTabName: "home",
            token: cookies.get('access-token') || null,
            isValidToken: true,
            isShow: false,
            email: "",
            portrait: "",
            age: "",
            skiability: "",
            snowboardability: "",
            telemarkability: "",
            snowbikeability: "",
            snowmobileability: "",
            snowshoeability: "",
            hasDisability: false,
            isdisabled: false,
            disabilitymembership: "",
            disabilitymemberid: "",
            disabilitydetail: ""
        
        };
    }

  //   upload btn animation
  handleHover = e => {
    if (e.target.id === "upload_btn") {
      e.target.style.backgroundColor = "rgba(78, 183, 245, 1)";
    }
  };

        componentDidMount() {
          if (this.state.token === null && sessionStorage.getItem("userToken")) {
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            this.setState({
                token: tokenData.token
            });
          }
          
            // let postData;
            // postData = {
            //     token: tokenData.token
            // };
            const setState = this.setState.bind(this);  
            let url =  "http://127.0.0.1:3333/api/user-profile/"+ JSON.parse(sessionStorage.getItem("userToken")).token
            console.log(url)
            axios.get(url).then(
                response => {    
                    //handle token is not valid
                    // if (response.data.tokenValid === false) {
                    //     console.log("token expired");
                    //     this.setState({
                    //         isValidToken: false,
                    //         isShow: true
                    //     });
                    // }
                    // //change success
                    // else {
                        console.log("get success");
                        // let sessionData;
                        // sessionData = {
                        //     token: response.data.token
                        // };
                        // sessionStorage.setItem("userToken", JSON.stringify(sessionData));
                        // this.setState({
                        //     token: response.data.token,
                        //     isValidToken: true
                        //     //isShow: true
                        // });
    
    
                        //save token into cookie
                        // let date = new Date();
                        // date.setTime(date.getTime() + +2592000);
                        // const {cookies} = this.props;
    
                        // //console.log(cookies);
                        // cookies.set("access-token", this.state.token, {
                        //     expires: date,
                        //     path: "/"
                        // });
                        // console.log(
                        //   "token has been extended. Token is: " + cookies.get("access-token")
                        // );
                      
                      
                       if (response.data.skiability != null) {
                        setState({
                          skiability: response.data.skiability
                        })
                        console.log(this.state.skiability)
                       }                  
                       if (response.data.snowboardability != null) {
                        setState({snowboardability: response.data.snowboardability});
                       }
                       if (response.data.telemarkability != null) {
                        setState({telemarkability: response.data.telemarkability});
                       }
                       if (response.data.snowbikeability != null) {
                        setState({snowbikeability: response.data.snowbikeability});
                       }
                       if (response.data.snowmobileability != null) {
                        setState({snowmobileability: response.data.snowmobileability});
                       }
                       if (response.data.snowshoeability != null) {
                        setState({snowshoeability: response.data.snowshoeability});
                       }                       
                    
                       if(response.data.isdisabled) {
                        this.setState ({
                          hasDisability: true 
                        });
                        setState({isdisabled: response.data.isdisabled});
                        setState({disabilitymembership: response.data.disabilitymembership});  
                        setState({disabilitymemberid: response.data.disabilitymembershipid});  
                        setState({disabilitydetail: response.data.disabilitydetail});
                      
                      }

                       setState({email: response.data.email})
                       
                      if (response.data.gender != null) {
                        document.getElementById("gender").value = response.data.gender;
                      }
                      if (response.data.firstname != null) {
                        document.getElementById("firstName").value = response.data.firstname;
                      }
                      if (response.data.lastname != null) {
                        document.getElementById("lastName").value = response.data.lastname;
                      }
                      if (response.data.phonecode != null) {
                        document.getElementById("phone_number_pre").value = response.data.phonecode;
                      }
                      if (response.data.phonenumber != null) {
                       document.getElementById("phoneNumber").value = response.data.phonenumber;
                      }
                      if (response.data.dob != null) {
                       document.getElementById("dob").value = moment(response.data.dob).format("YYYY-MM-DD");
                       
                      }
                      document.getElementById("country").value = response.data.country;
                      document.getElementById("postcode").value = response.data.postcode;
                      
                       
                      if(this.state.hasDisability) {
                        document.getElementById("is_disability").checked = true
                      } else {
                        document.getElementById("is_disability").checked = false
                      }
                    }
                //}
            );
            // if (skiability != null) {
            //   console.log(skiability)
            //   document.getElementById("ski_ability").value = skiability;
              
            //  }   
            console.log(this.state.skiability)

    }

    ageCount = () => {
      let countAge = moment().diff(moment(document.getElementById("dob")).format("YYYY"),'years')
      this.setState ({
        age: countAge
      })
    }


    handleSubmit = e => {
      e.preventDefault();
      if (this.state.token === null && sessionStorage.getItem("userToken")) {
        let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
        this.setState({
            token: tokenData.token
        });
      }
      
    

      const isDisabledValue = document.getElementById("is_disability").checked;
      let disabilityMembershipValue = "";
      let disabilityMembershipIDValue = "";
      let disabilityDetailValue = "";
  
      if (isDisabledValue === true) {
        disabilityMembershipValue = document.getElementById(
          "disability_membership"
        ).value;
        disabilityMembershipIDValue = document.getElementById(
          "disability_memberid"
        ).value;
        disabilityDetailValue = document.getElementById("disability_detail")
          .value;
      } else {
        disabilityMembershipValue = "";
        disabilityMembershipIDValue = "";
        disabilityDetailValue = "";
      }
  
      const data = JSON.stringify({    
        SkiAbility: document.getElementById("ski_ability").value,
        SnowboardAbility: document.getElementById("snowboard_ability").value,
        TelemarkAbility: document.getElementById("telemark_ability").value,
        SnowbikeAbility: document.getElementById("snowbike_ability").value,
        SnowmobileAbility: document.getElementById("snowmobile_ability").value,
        SnowshoeAbility: document.getElementById("snowshoe_ability").value,
        IsDisabled: isDisabledValue,
        DisabilityMembership: disabilityMembershipValue,
        DisabilityMembershipID: disabilityMembershipIDValue,
        DisabilityDetail: disabilityDetailValue,
        token: this.state.token,
        FirstName: document.getElementById("firstName").value,
        LastName: document.getElementById("lastName").value,
        Gender: document.getElementById("gender").value,
        DOB: moment(document.getElementById("dob").value).format("YYYY-MM-DD"),
        PhoneAreaCode: document.getElementById("phone_number_pre").value,
        PhoneNumber: document.getElementById("phoneNumber").value,
        Country: document.getElementById("country").value,
        Postcode: document.getElementById("postcode").value,
      });

      console.log(this.state.skiability)
      console.log(document.getElementById("ski_ability").value)

      axios.put("http://127.0.0.1:3333/api/user-profile", JSON.parse(data)).then(
        /*Proceed subsequent actions based on value */
        response => {
          //handle token is not valid
          if (response.data.tokenValid === false) {
            console.log("token expired");
            this.setState({
                isValidToken: false,
                isShow: true
            });
          } else {
            console.log("change success");
            //save token into session
            let sessionData;
            sessionData = {
              token: response.data.token
            };
            sessionStorage.setItem("userToken", JSON.stringify(sessionData));
           
            //save token into cookie
    
            let date = new Date();
            date.setTime(date.getTime() + +2592000);
            const { cookies } = this.props;
            this.setState({
                token: response.data.token,
                isValidToken: true, 
                isShow: true
             });

            //only when user click "remember me", update the token in cookies
            if (cookies.get("access-token")) {
              cookies.set("access-token", this.state.token, {
                expires: date,
                path: "/"
              });
    
              console.log(
                "token has been extended. Token is: " + cookies.get("access-token")
              ); 
              
          
          }
        }
      }
    );
  }

    render() { 
      if (this.state.email) {
        return (
          <React.Fragment>
            <div className="container">
              <br />
              {/* title */}
              <div className="form-row">
                <div className="form-group col-lg-2" />
                <div className="form-group col-4 col-lg-4">
                  <span style={{ fontSize: "2rem", whiteSpace: "nowrap" }}>
                    My Profile
                  </span>
                </div>
                <div className="form-group col-8 col-lg-6" />
              </div>
    
              <br />
              <form 
              data-toggle="validator"
              onSubmit={this.handleSubmit}>
                {/* photo */}
                <div className="form-row">
                  <div className="form-group col-3" />
                  <div
                    className="form-group col-6"
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                      alignContent: "center"
                    }}
                  >
                    <div
                      id="user_pic"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        fontSize: "20px",
                        color: "#fff",
                        lineHeight: "60px",
                        textAlign: "center",
                        boxShadow: "2px 2px 2px 2px grey",
                        border: "5px solid white",
                        backgroundSize: "contain",
                        margin: "auto auto",
                        backgroundImage:
                          "url(https://static.wixstatic.com/media/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.png/v1/fill/w_150,h_150,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.webp)"
                      }}
                    />
                  </div>
                  <div className="form-group col-3" />
                </div>
                {/* upload btn */}
                <div className="form-row">
                  <div className="form-group col-3 col-lg-5" />
                  <label
                    id="upload_btn"
                    className="form-group col-6 col-lg-2"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px 20px 20px 20px",
                      backgroundColor: "rgba(56, 153, 236, 1)",
                      boxShadow: "1px 1px 1px gray",
                      textAlign: "center",
                      margin: "auto auto",
                      padding: "5px 20px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "20px",
                      whiteSpace: "nowrap"
                    }}
                    onMouseEnter={this.handleHover}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    Upload photo +
                    <input type="file" accept="image/*" hidden />
                  </label>
                  <div className="form-group col-3 col-lg-5" />
                </div>
                {/* max size text */}
                <div className="form-row">
                  <div className="form-group col-3" />
                  <div
                    className="form-group col-6"
                    style={{
                      width: "auto",
                      height: "auto",
                      margin: "auto auto",
                      textAlign: "center",
                      color: "#737373",
                      opacity: "0.7",
                      direction: "ltr"
                    }}
                  >
                    Max File Size 15MB
                  </div>
                  <div className="form-group col-3" />
                </div>
    
                {/* user info */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  {/* email */}
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      id="inputEmail"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value= {this.state.email}
                      readOnly
                    />
                  </div>
                  &ensp; &ensp;
                  {/* gender */}
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="gender">Gender</label>
    
                    <select id="gender" className="form-control">
                      <option value="male">
                        Male
                      </option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-lg-2" />
                </div>
    
                {/* first name */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  &ensp; &ensp;
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="inputPassword">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group col-lg-2" />
                </div>
    
                {/* phone */}
                <div className="form-row">
                  <div className="form-group col-2" />
                  {/* phone */}
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="phoneNumber">Phone</label>
                    <div className="form-row">
                      <div className="form-group col-4 col-lg-4">
                        <select className="custom-select" id='phone_number_pre'
                        >
                          <option value="+61">+61</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="form-group col-8 col-lg-8">
                        <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>
                  &ensp; &ensp;
                  {/* DOB */}
                  <div className="form-group col-12 col-lg-4">
                    <div className="form-row">
                      <div className="form-group col-10 col-lg-10">
                        <label htmlFor="inputPassword">Date of Birth</label>
                        <input
                          type="text"
                          className="form-control"
                          id="dob"
                          placeholder="YYYY-MM-DD"
                          onblur={this.ageCount()}
                        />
                      </div>
                      <div className="form-group col-2 col-lg-2">
                        <label htmlFor="inputPassword">Age</label>
                        <input
                          type="text"
                          className="form-control"
                          id="age"
                          placeholder=""
                          value={this.state.age}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-2" />
                </div>
    
                {/* country */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="inputEmail">Country</label>
                    <input type="" className="form-control" id="country" placeholder="" 
                     />
                  </div>
                  &ensp; &ensp;
                  <div className="form-group col-12 col-lg-4">
                    <label htmlFor="inputPassword">Postcode</label>
                    <input type="" className="form-control" id="postcode" placeholder="" 
                    />
                  </div>
                  <div className="form-group col-lg-2" />
                </div>
    
                {/* line */}
                <div style={{ position: "absolute", left: "50%" }}>
                  <span
                    style={{ position: "relative", left: "-50%", fontSize: "20px" }}
                  >
                    - Ability Level -
                  </span>
                </div>
                <br />
                <br />
    
                {/* my ability */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-10">
                    My Ability&ensp;
                    {/* tooltip */}
                    <AbilityLevelTip />
                    {/* end tooltip */}
                    &ensp; Not sure about your ability level?
                  </div>
                </div>
    
                {/* first line */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-4">
                    <SliderBar
                      lable="Ski"
                      min="1"
                      max="7"
                      id="ski_ability"
                      name="skiability"
                      value={this.state.skiability}
                      //nChange={e => this.handleSetState(e)}
                    />
                  </div>
                  &ensp; &ensp;
                  <div className="form-group col-12 col-lg-4">
                    <SliderBar
                      lable="Snowboard"
                      min="1"
                      max="7"
                      id="snowboard_ability"
                      value={this.state.snowboardability}
                    />
                  </div>
                  <div className="form-group col-lg-2" />
                </div>
    
                {/* second line */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-4">
                    <SliderBar
                      lable="Telemark"
                      min="1"
                      max="7"
                      id="telemark_ability"
                      value={this.state.telemarkability}
                    />
                  </div>
                  &ensp; &ensp;
                  <div className="form-group col-12 col-lg-4">
                    <SliderBar
                      lable="Snowbike"
                      min="1"
                      max="7"
                      id="snowbike_ability"
                      value={this.state.snowbikeability}
                    />
                  </div>
                  <div className="form-group  col-lg-2" />
                </div>
    
                {/* third line */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-4">
                    <SliderBar
                      lable="Snowmobile"
                      min="1"
                      max="7"
                      id="snowmobile_ability"
                      value={this.state.snowmobileability}
                    />
                  </div>
                  &ensp; &ensp;
                  <div className="form-group col-12 col-lg-4">
                    <SliderBar
                      lable="Snowshoe"
                      min="1"
                      max="7"
                      id="snowshoe_ability"
                      value={this.state.snowshoeability}
                    />
                  </div>
                  <div className="form-group col-lg-2" />
                </div>
    
                {/* disable */}
                <div className="form-row">
                  <div className="form-group col-lg-2" />
                  <div className="form-group col-12 col-lg-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={e => {
                        this.setState({ hasDisability: e.target.checked });
                      }}
                      id="is_disability"
                      value={this.state.isdisabled}
                    />
                    <label className="form-check-label" htmlFor="is_disability">
                      Any physical or learning disabilities?
                    </label>
                    &ensp;
                    {/* tooltip */}
                    <DisabilityTip />
                  </div>
                </div>
    
                {/* disable form */}
                {this.state.hasDisability === true ? 
                <DisabilityForm 
                selected={this.state.disabilitymembership}
                disabilityMemberid={this.state.disabilitymemberid}
                disabilityDetail={this.state.disabilitydetail}
                /> : ""}
    
                {/* save btn */}
                <div className="form-row">
                  <div className="form-group col-4 col-lg-2" />
                  <div className="form-group col-4 col-lg-4">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                  <div className="form-group col-4 col-lg-6" />
                </div>
              </form>
            </div>
          
          {this.state.isValidToken && this.state.isShow ? (
          <AlertWindow
            displayText="Your profile has been saved."
            btnNum="1"
            mode="linkMode"
            btnText="OK"
            linkTo="/profile"
            onHandleClose={() => {
              this.setState({ isShow: false });
              window.location.reload();
            }}
          />
        ) : (
          ""
        )}

        {this.state.isValidToken === false && this.state.isShow ? (
          <AlertWindow
            displayText="Sorry, your token has expired, please log in again"
            btnNum="1"
            mode="linkMode"
            btnText="OK"
            linkTo="/login"
            onHandleClose={() => {
              this.setState({isShow: false});
              this.handleLogout();
          }}
          />
        ) : (
          ""
        )}
          </React.Fragment>
        );
      }
      return <div>Loading...</div>;

      } 
    
    }
export default withCookies(ProfilePage);
