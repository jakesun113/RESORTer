import React, {Component} from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import MemberBtn from "../../components/BookTripPage/MemberBtn";
//import MemberCard from "../../components/BookTripPage/EquipmentMemberCard";
import axios from "axios/index";
import handleLogOut from "../../components/template/HandleLogOut";
import EquipmentPageTip from "../../components/BookTripPage/EquipmentPageTip";
import ActivityCard from "../../components/BookTripPage/ActivityEquipmentCard";
import NumberSelector from "../../components/template/NumberSelector";
import styled from "styled-components";
import {Link} from "react-router-dom";

const UpperEllipseButton = styled.button`
  border: 0 solid black;
  padding: 4px 20px;
  background-color: rgba(104, 99, 105, 1);
  border-radius: 20px;
  transition: background-color 1s;
  transform: translate(0, -5px);

  &:hover {
    background-color: black;
    cursor: pointer;
  }
`;
const StyledSelect = styled.select`
  width: 80%;
  border: solid 1px rgba(198, 226, 247, 1);
`;

class Equipmentpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMember: null,
            members: {},
            hasActivity: true,
            currentActivity: [],
            outfit: null,
            helmet: null,
            warning: false,
            isShowTip: true,
            token: JSON.parse(sessionStorage.getItem("userToken")).token || null,
            provider: JSON.parse(sessionStorage.getItem("userSocialData"))['provider'] || null,
            getFinished: false
        };
        this.handleSkipRental = this.handleSkipRental.bind(this);
    }

    async handleSkipRental() {
        const {place, history, masterID, resortID, tripID} = this.props;
        let BaseURL = "http://127.0.0.1:3333/api/";
        let postData;
        postData = {
            tripID: tripID,
            masterID: masterID
        };

        //send lift pass related information
        await axios.post(BaseURL + "skipEquipmentInfo", postData).then(response => {
            if (response.data.skipRentalSuccess) {
              const url = `/booking/${place}/learn`;
              history.push({
                  pathname: url,
                  state: {masterID: masterID, resortID: resortID, tripID: tripID}
              });
              console.log("skip rental info success");
              console.log(response.data);
            } else {
              alert("Error in skip rental info");
              console.log(response.data);
            }
            
        }).catch(error => {
            console.log(error);
        });
    };

    handleAuth = async eventType => {
        const {provider, token} = this.state;
        const {cookies, history, masterID, resortID, tripID} = this.props;

        if (sessionStorage.getItem("guestUser") === null) {
            // not a guest user
            if (provider === "email") {
                const BaseURL = "http://127.0.0.1:3333/api/";
                const postData = {
                    token: token,
                    provider: provider
                };

                await axios
                    .post(BaseURL + "checkTokenAuth", postData)
                    .then(response => {
                        if (response.data.status === "ExpiredJWT") {
                            alert("Token Expire");
                            handleLogOut(cookies);
                            history.push({
                                pathname: "/login",
                                state: {
                                    from: history.location.pathname,
                                    masterID: masterID,
                                    resortID: resortID,
                                    tripID: tripID
                                }
                            });
                        } else if (response.data.status === "fail") {
                            alert("Server Error, Please Try again");
                        } else if (response.data.status === "success") {
                            //save token into session
                            const sessionData = {
                                token: response.data.token
                            };
                            sessionStorage.setItem("userToken", JSON.stringify(sessionData));

                            //save token into cookie
                            const date = new Date();
                            date.setTime(date.getTime() + +2592000);

                            //only when user click "remember me", update the token in cookies
                            if (cookies.get("access-token")) {
                                cookies.set("access-token", response.data.token, {
                                    expires: date,
                                    path: "/"
                                });

                                console.log(
                                    "token has been extended. Token is: " +
                                    cookies.get("access-token")
                                );
                            }

                            switch (eventType) {
                                case "goPrevious":
                                    this.goPrevious();
                                    break;
                                case "goNext":
                                    this.goNext("learn");
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                } else {
                    switch (eventType) {
                        case "skipAccommodation":
                            this.skipAccommodation();
                            break;
                        case "goPrevious":
                            this.goPrevious();
                            break;
                        case "goNext":
                            this.goNext("doing");
                            break;
                        default:
                            break;
                    }
                }
        } else {
            // is a guest user, then no need to handle auth
            switch (eventType) {
                case "goPrevious":
                    this.goPrevious();
                    break;
                case "goNext":
                    this.goNext("learn");
                    break;
                default:
                    break;
            }
        }
    };

    handleEquipmentOneChange = (id, isChecked) => {
        const {currentActivity} = this.state;
        currentActivity[id-1].EquipmentOneChecked = isChecked;
        console.log(id)
        this.forceUpdate();
    };

    handleEquipmentTwoChange = (id, isChecked) => {
        const {currentActivity} = this.state;
        currentActivity[id-1].EquipmentTwoChecked = isChecked;
        this.forceUpdate();
    };

    handleGradeChange = (id, gradeValue) => {
        const {currentActivity} = this.state;
        currentActivity[id-1].Grade = gradeValue;
        this.forceUpdate();
    };


    goPrevious = () => {
        const {members} = this.state;
        const {place, history, masterID, resortID, tripID} = this.props;
        const keys = Object.keys(members);
        let masterEquipment = {};
        let familyEquipment= {};

    //     keys.forEach(key => {
    //       if (key.indexOf("master") === -1) {
    //           // family member equipment
    //           familyEquipment[members[key].id] = {
    //               skiInfo: {
    //                   boots: document
    //               },
    //               ability: members[key].ability,
    //               skipEquipmentLesson: members[key].skipEquipmentLesson
    //           };
    //       } else {
    //           // master equipment
    //           const master_id = key.split(" ")[1];
    //           masterEquipment[master_id] = {
    //               activity: members[key].activity,
    //               ability: members[key].ability,
    //               skipEquipmentLesson: members[key].skipEquipmentLesson
    //           };
    //       }
    //   });

        
        const url = `/booking/${place}/doing`;
        history.push({
            pathname: url,
            state: {
                masterID: masterID,
                resortID: resortID,
                tripID: tripID
            }
        });


    };

    goNext = pageName => {
    };

    componentDidMount() {
        //if user is already clicked tip before
        if (sessionStorage.getItem("userCloseTip")) {
            this.setState({
                isShowTip: false
            });
        }
        const {tripID, masterID} = this.props;
        const url = "http://127.0.0.1:3333/api/getEquipmentInfo/" + tripID + "/" + masterID;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                if (data === "Error in Getting Equipment Information.") {
                    alert(data)
                } else {
                    const membersInfo = JSON.parse(data);
                    const keys = Object.keys(membersInfo);
                    this.setState({
                            currentMember: keys[0],
                            members: membersInfo,
                        }, () => {
                            this.handleRentalInfo();
                        }
                    )
                }
            })
            .catch(error => console.log(error))
    }

    handleRentalInfo = () => {
        let {currentMember, members} = this.state;
        const ski = members[currentMember].activity[0];
        const snowboard = members[currentMember].activity[1];
        const telemark = members[currentMember].activity[2];
        let activities = {};
        console.log("ski " + ski);
        console.log("snowboard " + snowboard);
        console.log("telemark " + telemark);
        if (ski) {
            activities[1] = {
                id: 1,
                ActivityName: "Ski",
                EquipmentOne: "Boots",
                EquipmentOneChecked: false,
                EquipmentTwo: "Skis & Poles",
                EquipmentTwoChecked: false,
                Grade: "Standard"
            };
            this.setState({
                hasActivity: true
            });

            if (members[currentMember].skiInfo !== null) {
                const boots = members[currentMember].skiInfo[0].boots;
                const poles = members[currentMember].skiInfo[0].poles;
                const grade = members[currentMember].skiInfo[0].grade;
                activities[1].EquipmentOneChecked = boots;
                activities[1].EquipmentTwoChecked = poles;
                activities[1].Grade = grade;
            }

        }
        if (snowboard) {
            activities[2] = {
                id: 2,
                ActivityName: "Snowboard",
                EquipmentOne: "Boots",
                EquipmentOneChecked: false,
                EquipmentTwo: "Board",
                EquipmentTwoChecked: false,
                Grade: "Standard"
            };
            this.setState({
                hasActivity: true
            });
            if (members[currentMember].snowboardInfo !== null) {
                const boots = members[currentMember].snowboardInfo[0].boots;
                const board = members[currentMember].snowboardInfo[0].board;
                const grade = members[currentMember].snowboardInfo[0].grade;
                activities[2].EquipmentOneChecked = boots;
                activities[2].EquipmentTwoChecked = board;
                activities[2].Grade = grade;
            }
        }

        if (telemark) {
            activities[3] = {
                id: 3,
                ActivityName: "Telemark",
                EquipmentOne: "Boots",
                EquipmentOneChecked: false,
                EquipmentTwo: "Skis & Poles",
                EquipmentTwoChecked: false,
                Grade: "Standard"
            };
            this.setState({
                hasActivity: true
            });
            if (members[currentMember].telemarkInfo !== null) {
                const boots = members[currentMember].telemarkInfo[0].boots;
                const poles = members[currentMember].telemarkInfo[0].poles;
                const grade = members[currentMember].telemarkInfo[0].grade;
                activities[3].EquipmentOneChecked = boots;
                activities[3].EquipmentTwoChecked = poles;
                activities[3].Grade = grade;
            }
        }

        if (members[currentMember].otherInfo !== null) {
            const outfit = members[currentMember].otherInfo[0].outfit;
            const helmet = members[currentMember].otherInfo[0].helmet;
            this.setState({
                outfit: outfit,
                helmet: helmet
            })

        }

        if (!ski && !snowboard && !telemark) {
            this.setState({
                hasActivity: false
            })
        }
        let activityArray = [];
        Object.keys(activities).forEach(activity_id => {
            activityArray.push(activities[activity_id])
        });

        this.setState({
            currentActivity: activityArray,
            getFinished: true
        })
    };

    // change current memeber
    handleChangeCurrentMember = memberId => {
        this.setState({
                getFinished: false,
                currentMember: memberId
            }, () => {
                this.handleRentalInfo()
            }
        );
    };

    render() {
        let {currentMember, members, isShowTip, warning, hasActivity, currentActivity, outfit, helmet, getFinished} = this.state;
        let memberArray = [];
        Object.keys(members).forEach(member_id => {
            memberArray.push(members[member_id])
        });

        if (getFinished) {
            return (
                <React.Fragment>
                    <div className="container">
                        <br/>
                        {/* title */}
                        <div
                            className="row"
                            style={{
                                color: "#4682B4",
                                fontSize: "26px",
                                fontWeight: "bold"
                            }}
                        >
                            <div className="col-lg-1"/>
                            <div className="col-12 col-lg-2"> 4. EQUIPMENT?</div>
                            <div className="col-lg-1"/>
                            <div className="col-12 col-lg-2">
                                <UpperEllipseButton onClick={this.handleSkipRental}>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "white"
                                        }}
                                    >
                                        Skip Rental
                                    </div>
                                </UpperEllipseButton>
                            </div>
                            <div className="col-lg-4"/>
                        </div>
                        <br/>
                        {/* members */}
                        <div className="row">
                            <div className="col-lg-1"/>
                            {memberArray.map(eachMember => (
                                <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                                    <MemberBtn
                                        key={eachMember.id.toString()}
                                        text={eachMember.firstName}
                                        onHandleClick={() =>
                                            this.handleChangeCurrentMember(eachMember.id.toString())
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        <br/>
                        {/* equipment info */}
                        <div>
                    {/* 1 */}
                    <div
                        className="row"
                        style={{marginBottom: "10px", marginTop: "20px"}}
                    >
                        <div className="col-lg-1"/>
                        <div className="col-12 col-lg-4" style={{whiteSpace: "nowrap"}}>
                            Rental for &nbsp;
                            <span style={{color: "#FF4040"}}>{members[currentMember].fullName}</span>
                        </div>
                        <div className="col-12 col-lg-2" style={{whiteSpace: "nowrap"}}>
                            Age &nbsp;
                            <span style={{color: "#3D9BE9"}}>{members[currentMember].age}</span>
                        </div>

                        <div className="col-12 col-lg-4">
                            {isShowTip ? (
                                <EquipmentPageTip onHandleClose={this.handleClose}/>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-12 col-lg-1"/>
                    </div>
                    {/* tip for first time book */}
                    <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-12 col-lg-1"/>
                        <div className="col-md-12 col-lg-10">
                            <table className="table table-borderless">
                                <thead>
                                <tr style={{color: "#FF4040"}}>
                                    <th scope="col-10">
                                        <p style={{textAlign: "center"}}>
                                            A first time package is sold if you have never done a
                                            snowsport (skiing, snowboarding, or telemarking) and
                                            includes a lift pass, gear rental and a lesson.
                                        </p>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="col-12 col-lg-1"/>
                    </div>

                    {/* 2 */}
                    <div
                        className="row"
                        style={{
                            fontWeight: "bold",
                            marginBottom: "10px",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <div className="col-lg-1"/>
                        <div className="col-md-12 col-lg-10">
                            <table className="table table-borderless">
                                <thead>
                                <tr style={{color: "#686369"}}>
                                    <th scope="col-2">Activity</th>
                                    <th scope="col-4">Equipment</th>
                                    <th scope="col-4">Grade</th>
                                </tr>
                                </thead>
                                {hasActivity
                                    ? currentActivity.map(activity => (
                                        <ActivityCard
                                            key={activity.id}
                                            id={activity.id}
                                            ActivityName={activity.ActivityName}
                                            EquipmentOne={activity.EquipmentOne}
                                            EquipmentOneChecked={activity.EquipmentOneChecked}
                                            EquipmentTwo={activity.EquipmentTwo}
                                            EquipmentTwoChecked={activity.EquipmentTwoChecked}
                                            Grade={activity.Grade}
                                            handleEquipmentOneChange={this.handleEquipmentOneChange}
                                            handleEquipmentTwoChange={this.handleEquipmentTwoChange}
                                            handleGradeChange={this.handleGradeChange}
                                        />
                                    ))
                                    : null}
                            </table>
                        </div>
                        <div className="col-lg-1"/>
                    </div>

                    {/* 3 */}
                    <div
                        className="row"
                        style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <div className="col-lg-1"/>
                        <div className="col-md-12 col-lg-10">
                            <table
                                className="table table-borderless"
                                style={{color: "#686369"}}
                            >
                                <thead>
                                <tr>
                                    <th scope="col-3"/>
                                    <th scope="col-3"/>
                                    <th scope="col-2"/>
                                    <th scope="col-1"/>
                                    <th scope="col-3"/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Outfit (jacket, pants):*</td>
                                    <td>
                                        <StyledSelect id="outfit" defaultValue={outfit}>
                                            <option value="None">None</option>
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </StyledSelect>
                                    </td>
                                    <td/>
                                    <td>
                                        Helmet:
                                        <p style={{color: "red", position: "absolute"}}>
                                            Helmets are compulsory for children up to 15 (3-15)
                                        </p>
                                    </td>
                                    <td>
                                        <StyledSelect id="helmet" defaultValue={helmet}>
                                            <option value="None">None</option>
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </StyledSelect>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-1"/>
                    </div>

                    {/* 4 */}
                    <div
                        className="row"
                        style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <div className="col-lg-1"/>
                        <div className="col-md-12 col-lg-10">
                            <table
                                className="table table-borderless"
                                style={{color: "#686369"}}
                            >
                                <thead>
                                <tr>
                                    <th scope="col-4"/>
                                    <th scope="col-4"/>
                                    <th scope="col-4"/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {/* 1 */}
                                    <td>
                                        <NumberSelector
                                            labelName="Shoe size**:"
                                            referName="shoeSize"
                                            cur_value={members[currentMember].shoeSize}
                                            onChange={this.handleChange}
                                            unit="(AU)"
                                        />
                                    </td>
                                    {/* 2 */}
                                    <td>
                                        <NumberSelector
                                            labelName="Height**:"
                                            referName="height"
                                            cur_value={members[currentMember].height}
                                            onChange={this.handleChange}
                                            unit="(cm)"
                                        />
                                    </td>
                                    {/* 3 */}
                                    <td>
                                        <NumberSelector
                                            labelName="Weight**:"
                                            referName="weight"
                                            cur_value={members[currentMember].weight}
                                            onChange={this.handleChange}
                                            unit="(kg)"
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-1"/>
                    </div>
                    {/* tips */}
                    <div
                        className="row"
                        style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <div className="col-lg-1"/>
                        <div className="col-md-12 col-lg-10">
                            <table
                                className="table table-borderless"
                                style={{color: "#686369"}}
                            >
                                <thead>
                                <tr>
                                    <th scope="col-12"/>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td style={{fontSize: "15px", color: "#4682B4"}}>
                                        <p>
                                            * subject to availability. Confirm with resort when they
                                            make contact
                                        </p>
                                        <p>** required fields</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-1"/>
                    </div>
                    {/* privacy statement */}
                    <div
                        className="row"
                        style={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <div className="col-lg-1"/>
                        <div className="col-md-12 col-lg-10">
                            <table
                                className="table table-borderless"
                                style={{color: "#686369"}}
                            >
                                <thead>
                                <tr>
                                    <td style={{fontSize: "15px", color: "#4682B4"}}>
                                        <Link to="/term-privacy/privacy-statement">
                                            Privacy Statement
                                        </Link>
                                    </td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="col-lg-1"/>
                    </div>
                </div>

                        {/* btn */}
                        <div
                            className="row"
                            style={{color: "#4682B4", fontSize: "20px", fontWeight: "bold"}}
                        >
                            <div className="col-lg-1" style={{paddingRight: "15px"}}/>
                            <div className="col-2">
                                <SmallEllipseBtn
                                    text="Back"
                                    onClick={this.goPrevious}
                                    style={{
                                        backgroundColor: "rgba(255, 97, 97, 1)",
                                        width: "100%",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }}
                                />
                            </div>
                            <div className="col-6"/>
                            <div className="col-2">
                                <SmallEllipseBtn
                                    text="Save & Continue"
                                    //onClick={}
                                    style={{
                                        backgroundColor: "rgba(255, 97, 97, 1)",
                                        width: "100%",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }}
                                />
                            </div>
                            <div className="col-lg-1"/>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default Equipmentpage;
