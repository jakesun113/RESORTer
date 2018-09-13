import React, { Component } from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import axios from "axios"
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import {Redirect} from "react-router-dom";
import AlertWindow from "../template/AlertWindow"
class GroupMemberInfoCard extends Component {
  
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props);
    this.state = {
      tokenExpire:false,
      alert:null,
      showAlertWindow: false, //whether show the alertWindow
    }
  }

  componentDidMount() {
    // css
    let widthValue = window.screen.width > 750 ? "450" : "350";
    document.getElementById("info-card-in-member-page").style.cssText =
      "border: 1px solid rgb(218, 227, 242);height: auto;paddingTop: 10px;" +
      "width:" +
      widthValue +
      "px";
  }

  //Delete Group Member
  handleOnClick = () => {
    axios.delete("http://127.0.0.1:3333/api/delete-member",{data:{id:this.props.id,token:JSON.parse(sessionStorage.getItem("userToken")).token}})
    .then(
      response=>{
        
        //If Success => alert Success
        if(response.data.status === 'success'){
          
          this.setState({
            alert:'success'
          })

          //Update token
          console.log("token valid");
          let userToken = {
            token: response.data.token.token
          };

        //save token into session
        sessionStorage.setItem("userToken", JSON.stringify(userToken));

        //save token into cookie
        let date = new Date();
        date.setTime(date.getTime() + +2592000);
        const {cookies} = this.props;

        //only when user click "remember me", update the token in cookies
        if (cookies.get("access-token")) {
            cookies.set("access-token", response.data.token.token, {
                expires: date,
                path: "/"
            });

            console.log(
                "token has been extended. Token is: " + cookies.get("access-token")
            );
        }
        //Update the numberOfGroupMember in GroupMemberPage, also Pass the token
        this.props.deleteGroupNumber(response.data.token.token);
        }
        //If Fail => either token expire or member does not exist
        else if(response.data.status === 'fail'){

          this.setState({
            alert:'fail'
          })

        }else if(response.data.status === 'ExpiredJWT'){

          this.setState({
            alert:'tokenExpire'
        });

        }
      })
      this.setState({showAlertWindow: true})
  }

  handleLogout = () => {
    const {cookies} = this.props;

    sessionStorage.removeItem("userSocialData");
    sessionStorage.removeItem("userToken");
    cookies.remove("user-name");
    cookies.remove("access-token");
    cookies.remove("user-pic");
};
  render() {

    if (this.state.tokenExpire) {
      return <Redirect to={"/login"}/>;
  }
  let alertWindow;
  if (this.state.showAlertWindow) {
      if (this.state.alert === 'success') {
          alertWindow = <AlertWindow
              displayText={<div>Congratulation, You have already successfully delete your group member.</div>}
              btnNum='1'
              btnText="OK"
              mode='customMode'
              onHandClick={() => this.setState({showAlertWindow: false})}
          />
      } else if (this.state.alert === 'tokenExpire') {
          alertWindow = <AlertWindow
              displayText={<div>Sorry, you token is expired. Please login again.</div>}
              btnNum='1'
              btnText="Login"
              mode='customMode'
              onHandClick={() => {
                  this.setState({showAlertWindow: false});
                  this.setState({tokenExpire: true});
                  this.handleLogout();
              }}
          />
      } else if (this.state.alert === 'fail') {
        alertWindow = <AlertWindow
            displayText={<div>Woops, This user has been deleted. Please refresh.</div>}
            mode='customMode'
            onHandClick={() => {
                this.setState({showAlertWindow: false});
                this.handleLogout();
            }}
        />
    }
  }

    return (
      <React.Fragment>
        {alertWindow}
        <div id="info-card-in-member-page">
          <div
            style={{
              textAlign: "right",
              cursor: "pointer",
              paddingRight: "20px"
            }}
          >
            <span onClick = {this.handleOnClick}>
              <SmallEllipseBtn text = "DELETE"/>
            </span>

          </div>
          {/* user photo */}
          <div className="form-row">
            <div className="form-group col-12 col-lg-4">
              <div
                id="user_pic"
                style={{
                  display: "table",
                  margin: "0 auto",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  fontSize: "20px",
                  color: "#fff",
                  boxShadow: "2px 2px 2px 2px grey",
                  border: "5px solid white",
                  backgroundSize: "contain",
                  backgroundImage:
                    "url(https://static.wixstatic.com/media/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.png/v1/fill/w_150,h_150,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.webp)"
                }}
              />
            </div>

            <div className="form-group col-12 col-lg-8">
              <span
                style={{
                  display: "table",
                  margin: "0 auto"
                }}
              >
                <span id="name">{this.props.name}</span>
                <br />
                {/* Date of Birth: */}
                <span id="birthday">{this.props.dob}</span>
              </span>
            </div>
          </div>

          {/* first row */}
          <div className="row">
            {/* left */}
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="ski_level">{this.props.skierLevel}</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Skier</span>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowbiker_level">{this.props.snowBikerLevel}</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowbiker</span>
                </div>
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowboarder_level">{this.props.snowBorderLevel}</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowboarder</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowmobiler_level">{this.props.snowMobilerLevel}</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowmobiler</span>
                </div>
              </div>
            </div>
          </div>
          {/* third row */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="telemarker_level">{this.props.teleMarkerLevel}</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Telemarker</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowshoer_level">{this.props.snowShoerLevel}</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowshoer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withCookies(GroupMemberInfoCard);
