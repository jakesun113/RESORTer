import React, {Component} from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import axios from "axios";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
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
        };
    }

    render() {
        return (
            <React.Fragment>
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
            <span onClick={this.props.handleClick}>
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
