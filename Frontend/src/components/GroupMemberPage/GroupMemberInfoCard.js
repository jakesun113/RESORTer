import React, {Component} from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import axios from "axios";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import {Redirect} from "react-router-dom";
import AlertWindow from "../template/AlertWindow";
import styled from "styled-components";
import moment from "moment";


const MemberInfoCard = styled.div`
  border: 2px solid rgb(218, 227, 242);
  height: auto;
  width: auto;
  padding-top: 10px;
  @media only screen and (max-width: 100px) {
    width: 100%;
  }
`;

class GroupMemberInfoCard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            tokenExpire: false,
            alert: null,
            showAlertWindow: false, //whether show the alertWindow
            provider: cookies.get("user-provider") || null
        };
    }

    componentDidMount() {
        //Acquiring provider
        if (sessionStorage.getItem("userSocialData")) {
            let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
            if (userData.provider) {
                this.setState({
                    provider: userData.provider
                });
            }
        }
    }

    //Delete Group Member
    handleOnClick = () => {
        axios
            .delete("http://127.0.0.1:3333/api/delete-member", {
                data: {
                    id: this.props.id,
                    token: JSON.parse(sessionStorage.getItem("userToken")).token,
                    provider: this.state.provider
                }
            })
            .then(response => {
                //If Success => alert Success
                if (response.data.status === "success") {
                    this.setState({
                        alert: "success"
                    });

                    //Update token
                    console.log("token valid");
                    let userToken = {
                        token: response.data.token
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
                        cookies.set("user-provider", "email", {
                            expires: date,
                            path: "/"
                        });
                        console.log(
                            "token has been extended. Token is: " +
                            cookies.get("access-token")
                        );
                    }
                    //Update the numberOfGroupMember in GroupMemberPage, also Pass the token
                    this.props.deleteGroupNumber(response.data.token.token);
                }
                //If Fail => either token expire or member does not exist
                else if (response.data.status === "fail") {
                    this.setState({
                        alert: "fail"
                    });
                } else if (response.data.status === "ExpiredJWT") {
                    this.setState({
                        alert: "tokenExpire"
                    });
                }
            });
        this.setState({showAlertWindow: true});
    };

    handleLogout = () => {
        const {cookies} = this.props;

        this.setState({
            provider: null
        });

        sessionStorage.removeItem("userSocialData");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userImage");
        sessionStorage.removeItem("userFinishProfile");
        sessionStorage.removeItem("userFinishTrip");
        sessionStorage.removeItem("userIsClicked");
        cookies.remove("user-name");
        cookies.remove("access-token");
        cookies.remove("user-pic");
        cookies.remove("user-provider");
        cookies.remove("user-profileFinished");
        cookies.remove("user-hasUnfinishedTrip");
    };

    render() {
        if (this.state.tokenExpire) {
            return <Redirect to={"/login"}/>;
        }
        let alertWindow;
        if (this.state.showAlertWindow) {
            if (this.state.alert === "tokenExpire") {
                alertWindow = (
                    <AlertWindow
                        displayText={
                            <div>Sorry, you token is expired. Please login again.</div>
                        }
                        btnNum="1"
                        btnText="Login"
                        mode="customMode"
                        onHandClick={() => {
                            this.setState({showAlertWindow: false});
                            this.setState({tokenExpire: true});
                            this.handleLogout();
                        }}
                    />
                );
            } else if (this.state.alert === "fail") {
                alertWindow = (
                    <AlertWindow
                        displayText={
                            <div>Woops, This user has been deleted. Please refresh.</div>
                        }
                        mode="customMode"
                        onHandClick={() => {
                            this.setState({showAlertWindow: false});
                            this.handleLogout();
                        }}
                    />
                );
            }
        }

        return (
            <React.Fragment>
                {alertWindow}
                <MemberInfoCard>
                    {/* <div id="info-card-in-member-page"> */}
                    {/* delete btn */}
                    <div
                        style={{
                            textAlign: "right",
                            cursor: "pointer",
                            paddingRight: "20px",
                            paddingTop: "10px"
                        }}
                    >
            <span onClick={this.handleOnClick}>
              <SmallEllipseBtn text="DELETE" btnColor="grey"/>
            </span>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-4 col-lg-1"/>
                        {/* user photo */}
                        <div className="col-4 col-lg-2">
                            <img
                                id="user_pic"
                                alt="groupMember"
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
                                    backgroundSize: "contain"
                                }}
                                src="https://static.wixstatic.com/media/25b4a3_3c026a3adb9a44e1a02bcc33e8a2f282~mv2.jpg/v1/crop/x_7,y_0,w_1184,h_1184/fill/w_96,h_96,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_3c026a3adb9a44e1a02bcc33e8a2f282~mv2.webp"
                            />
                        </div>
                        <div className="col-4 col-lg-1"/>
                        {/* name and dob */}
                        <div className="col-lg-7">
              <span
                  style={{
                      display: "table",
                      margin: "0 auto"
                  }}
              >
                {/* user name */}
                  <p id="name" style={{whiteSpace: "nowrap"}}>
                  {this.props.name}
                </p>
                  {/* Date of Birth: */}
                  <p id="birthday" style={{whiteSpace: "nowrap"}}>
                  {moment(this.props.dob).format("DD-MM-YYYY")}
                </p>
              </span>
                        </div>
                        <div className="col-lg-1"/>
                    </div>

                    {/* ability level */}

                    {/* first row */}
                    <div className="row">
                        {/* left */}
                        <div className="col-2 col-lg-1"/>
                        <div className="col-4 col-lg-2">
              <span>
                Lv <span id="ski_level">{this.props.skierLevel}</span>
              </span>
                        </div>
                        <div className="col-4 col-lg-1">
                            <span>Skier</span>
                        </div>
                        <div className="col-2 col-lg-1"/>
                        {/* right */}
                        <div className="col-2 col-lg-1"/>
                        <div className="col-4 col-lg-2">
              <span>
                Lv <span id="snowbiker_level">{this.props.snowBikerLevel}</span>
              </span>
                        </div>
                        <div className="col-4 col-lg-3">
                            <span>Snowbiker</span>
                        </div>
                        <div className="col-1 col-lg-1"/>
                    </div>

                    {/* second row */}

                    <div className="row">
                        {/* left */}
                        <div className="col-2 col-lg-1"/>
                        <div className="col-4 col-lg-2">
              <span>
                Lv{" "}
                  <span id="snowboarder_level">{this.props.snowBorderLevel}</span>
              </span>
                        </div>
                        <div className="col-4 col-lg-1">
                            <span>Snowboarder</span>
                        </div>
                        <div className="col-2 col-lg-1"/>
                        {/* right */}
                        <div className="col-2 col-lg-1"/>
                        <div className="col-4 col-lg-2">
              <span>
                Lv{" "}
                  <span id="snowmobiler_level">
                  {this.props.snowMobilerLevel}
                </span>
              </span>
                        </div>
                        <div className="col-4 col-lg-3">
                            <span>Snowmobiler</span>
                        </div>
                        <div className="col-1 col-lg-1"/>
                    </div>

                    {/* third row */}

                    <div className="row">
                        {/* left */}
                        <div className="col-2 col-lg-1"/>
                        <div className="col-4 col-lg-2">
              <span>
                Lv{" "}
                  <span id="telemarker_level">{this.props.teleMarkerLevel}</span>
              </span>
                        </div>
                        <div className="col-4 col-lg-1">
                            <span>Telemarker</span>
                        </div>
                        <div className="col-2 col-lg-1"/>
                        {/* right */}
                        <div className="col-2 col-lg-1"/>
                        <div className="col-4 col-lg-2">
              <span>
                Lv <span id="snowshoer_level">{this.props.snowShoerLevel}</span>
              </span>
                        </div>
                        <div className="col-4 col-lg-3">
                            <span>Snowshoer</span>
                        </div>
                        <div className="col-1 col-lg-1"/>
                    </div>
                </MemberInfoCard>
            </React.Fragment>
        );
    }
}

export default withCookies(GroupMemberInfoCard);
