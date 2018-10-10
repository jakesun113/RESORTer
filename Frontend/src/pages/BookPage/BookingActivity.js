import React, {Component} from "react";
import {
    Title,
    HeaderLine,
    LeaveRow,
    BtmEllipseButton
} from './BookingAccommodation'
import styled from "styled-components";
import '@fortawesome/fontawesome-free';
import SliderBar from "../../components/template/SliderBar"
import ActivitySelector from "../../components/template/ActivitySelector"
import AbilityLevelTip from '../../components/template/AbilityLevelTip'
import pic_ski from '../../materials/ActivityIcons/ski.png';
import pic_snowbiking from '../../materials/ActivityIcons/snowbiking.jpg';
import pic_snowboard from '../../materials/ActivityIcons/snowboard.png';
import pic_snowmobile from '../../materials/ActivityIcons/snowmobile.jpg';
import pic_snowshoeing from '../../materials/ActivityIcons/snowshoeing.png';
import pic_telemark from '../../materials/ActivityIcons/telemark.jpeg';
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import axios from "axios/index";
import handleLogOut from "../../components/template/HandleLogOut";


const Warning = styled.p`
  margin-top: 10px; 
  color:rgba(255, 97, 97, 1);
  font-style: italic;
  font-weight: 100;
  font-size:smaller;
`;

const MemberCard = styled.div`
  position: relative;
  width: 170px;
  height: 40px;
  background-color: white;
  box-shadow: 5px 5px 3px rgba(0,0,0,0.06);
`;

const NOTE = styled.p`
    margin-top: 10px;
    font-size: 0.6rem;
`;

const MemberButton = styled.button`
  position: absolute;
  top: 4px;
  left: 10px;
  width: 150px;
  height: 32px;
  border: 0 solid black;
  background-color: rgba(255, 97, 97, 1);
  border-radius: 20px;
  transition: background-color 0.4s ease-in;
  
  &:hover  {
    background-color: black;
    cursor: pointer;
  }
`;

const MemberInfo = styled.p`
  display: inline-block;
  font-size: 1.1em;
  color:#607375;
`;

const AArow = styled.div`
  padding-bottom: 10px;
`;

const CheckBoxInput = styled.input`
  &:checked + label:before, &:not(:checked) + label:before{
    content: '';
    position: absolute;
    left: -6px;
    top: 2px;
    width: 19px;
    height: 19px;
    border: 1px solid rgba(198, 226, 247, 1);
    border-radius: 20%;
    background: #fff;
  }
  

  &:not(:checked):hover+ label:before{
      background: rgba(198, 226, 247, 1);
  }
  
  &:checked + label:after, &:not(:checked) + label:after{
    content: "\f00c";
    font-family: "Font Awesome 5 Free"; 
    position: absolute;
    top: 1px;
    left: -3px;
    font-size: 0.9em;
    color:#00A6FF;
    font-weight: 600;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
   
  &:not(:checked) + label:after{
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
   
  &:checked + label:after{
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

class BookingActivity extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            currentMember: '1',
            members: {
                "1": {
                    'id': 1,
                    "firstName": "",
                    'fullName': "",
                    "activity": [false, false, false, false, false, false],
                    "ability": [1, 1, 1, 1, 1, 1],
                    "age": 0,
                    "skipEquipmentLesson": false
                }
            },
            warning: false,
            token: JSON.parse(sessionStorage.getItem("userToken")).token || null,
            provider: JSON.parse(sessionStorage.getItem("userSocialData"))['provider'] || null,
        }
    }

    componentDidMount() {
        const {tripID, masterID} = this.props;
        const url = `http://127.0.0.1:3333/api/getActivityInfo/${tripID}/${masterID}`;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                if (data === "Error in Getting Activity Information.") {
                    alert(data)
                } else {
                    const membersInfo = JSON.parse(data);
                    const keys = Object.keys(membersInfo);
                    this.setState({
                        currentMember: keys[0],
                        members: membersInfo
                    })
                }
            })
            .catch(err => console.log(err))
    }

    handleAuth = async (eventType) => {

        const {provider, token} = this.state;
        const {cookies, history, masterID, resortID, tripID} = this.props;

        if (sessionStorage.getItem('guestUser') === null) {
            // not a guest user
            if (provider === 'email') {
                const BaseURL = "http://127.0.0.1:3333/api/";
                const postData = {
                    token: token,
                    provider: provider
                };

                await axios.post(BaseURL + "checkTokenAuth", postData).then(response => {
                    if (response.data.status === "ExpiredJWT") {
                        alert('Token Expire');
                        handleLogOut(cookies);
                        history.push({
                            pathname: "/login",
                            state: {
                                from: history.location.pathname,
                                masterID: masterID,
                                resortID: resortID,
                                tripID: tripID,
                            }
                        });
                    } else if (response.data.status === "fail") {
                        alert('Server Error, Please Try again')
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
                            case"goNext":
                                this.goNext();
                                break;
                            default:
                                break;
                        }
                    }
                })

            }
        } else {
            // is a guest user, then no need to handle auth
            switch (eventType) {
                case "goPrevious":
                    this.goPrevious();
                    break;
                case"goNext":
                    this.goNext();
                    break;
                default:
                    break;
            }

        }

    };

    handleActivityChange = (id, isChecked) => {
        const {members, currentMember} = this.state;
        members[currentMember]['activity'][id] = isChecked;
        this.forceUpdate();
    };

    handleAbilityChange = (id, abilityValue) => {
        const {members, currentMember} = this.state;
        members[currentMember]['ability'][id] = parseInt(abilityValue, 10);
        this.forceUpdate();
    };

    handleCheckboxChange = (e) => {
        let {members, currentMember} = this.state;
        const activities = members[currentMember].activity;
        const skipEquipmentLesson = members[currentMember].skipEquipmentLesson;

        const is_all_false = activities.every((element) => {
            return element === false;
        });

        if (is_all_false && !skipEquipmentLesson) {
            this.setState({
                warning: true
            })
        } else {
            members[currentMember]['skipEquipmentLesson'] = e.target.checked;
            this.setState({
                warning: false
            })
        }
    };

    handleCurrentMemberChange = (memberID) => {
        this.setState({
            currentMember: memberID
        })
    };

    goPrevious = () => {
        const {members} = this.state;
        const {place, history, resortID, tripID, masterID} = this.props;


        const keys = Object.keys(members);

        let master_activity = {};
        let group_activity = {};

        keys.forEach(key => {
            if (key.indexOf("master") === -1) {
                // family member activity
                group_activity[members[key].id] = {
                    activity: members[key].activity,
                    ability: members[key].ability,
                    skipEquipmentLesson: members[key].skipEquipmentLesson
                }
            } else {
                // master activity
                const master_id = key.split(" ")[1];
                master_activity[master_id] = {
                    activity: members[key].activity,
                    ability: members[key].ability,
                    skipEquipmentLesson: members[key].skipEquipmentLesson
                }
            }
        });

        const api_url = `http://127.0.0.1:3333/api/uploadActivityInfo`;
        const upload_data = {
            TripID: tripID,
            MasterMemberActivity: master_activity,
            GroupMemberActivity: group_activity,
        };

        fetch(api_url, {method: 'POST', body: JSON.stringify(upload_data)})
            .then(response => response.text())
            .then(data => {
                if (data === "Success") {
                    const previous_page_url = `/booking/${place}/sleep`;
                    history.push({
                        pathname: previous_page_url,
                        state: {
                            masterID: masterID,
                            resortID: resortID,
                            tripID: tripID
                        },
                    });
                }
                if (data === "Error in uploading activity information.") {
                    alert(data)
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    goNext = () => {
        const {members} = this.state;
        const {place, history, resortID, tripID, masterID} = this.props;

        const keys = Object.keys(members);

        let master_activity = {};
        let group_activity = {};
        let skip_state = [];

        keys.forEach(key => {
            skip_state.push(members[key].skipEquipmentLesson);
            if (key.indexOf("master") === -1) {
                // family member activity
                group_activity[members[key].id] = {
                    activity: members[key].activity,
                    ability: members[key].ability,
                    skipEquipmentLesson: members[key].skipEquipmentLesson
                }
            } else {
                // master activity
                const master_id = key.split(" ")[1];
                master_activity[master_id] = {
                    activity: members[key].activity,
                    ability: members[key].ability,
                    skipEquipmentLesson: members[key].skipEquipmentLesson
                }
            }
        });

        const api_url = `http://127.0.0.1:3333/api/uploadActivityInfo`;
        const upload_data = {
            TripID: tripID,
            MasterMemberActivity: master_activity,
            GroupMemberActivity: group_activity,
        };

        fetch(api_url, {method: 'POST', body: JSON.stringify(upload_data)})
            .then(response => response.text())
            .then(data => {
                if (data === "Success") {
                    let next_page_url = `/booking/${place}/equipment`;
                    if (skip_state.every(skip => skip)) {
                        next_page_url = `/booking/${place}/summary`;
                    }
                    history.push({
                        pathname: next_page_url,
                        state: {
                            masterID: masterID,
                            resortID: resortID,
                            tripID: tripID
                        },
                    });
                }
                if (data === "Error in uploading activity information.") {
                    alert(data)
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    render() {
        let {currentMember, members, warning} = this.state;
        let member_array = [];
        Object.keys(members).forEach(member_id => {
            member_array.push(members[member_id])
        });

        const member_cards = member_array.map(member =>
            <div key={member.id.toString()}
                 className='col-xl-2 col-lg-3 col-md-4 col-6'>
                <MemberCard>
                    <MemberButton
                        onClick={() => this.handleCurrentMemberChange(member.id.toString())}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>{member.firstName}
                        </div>
                    </MemberButton>
                </MemberCard>
            </div>
        );

        return (
            <div className='container' style={{marginTop: '20px'}}>
                <HeaderLine>
                    <Title>
                        <strong>3. ACTIVITIES</strong>
                    </Title>
                </HeaderLine>


                <div className='row' style={{marginTop: '30px'}}>
                    {member_cards}
                </div>

                <div className='text-center' style={{marginTop: '30px'}}>
                    <MemberInfo style={{marginRight: '14vw'}}>Select
                        activities
                        for <span
                            style={{
                                color: 'rgba(255, 97, 97, 1)',
                                marginLeft: '10px'
                            }}>{members[currentMember].fullName}</span></MemberInfo>
                    <MemberInfo style={{display: 'inline-block'}}>Age: <span
                        style={{
                            color: 'rgba(255, 97, 97, 1)',
                            marginLeft: '10px'
                        }}>{members[currentMember].age}</span></MemberInfo>
                </div>

                <div className='row'>
                    <div className='col-5'>
                        <p><strong>Activity</strong></p>
                    </div>
                    <div className='col-7'>
                        <p style={{display: 'inline', marginRight: '1vw'}}>
                            <strong>Ability Level</strong>
                        </p>
                        <AbilityLevelTip/>
                        <p style={{
                            display: 'inline',
                            marginLeft: '1vw',
                            color: '#607375'
                        }}><strong>Not
                            sure
                            about
                            your ability
                            level?</strong></p>
                    </div>
                </div>

                <AArow className='row'>
                    <div className='col-5'>
                        <ActivitySelector
                            onChange={this.handleActivityChange} pic={pic_ski}
                            alt={'ski'}
                            text={'Ski'}
                            checkStatus={members[currentMember]['activity'][0]}
                            id={'0'}/>
                    </div>
                    <div className='col-7'>
                        <SliderBar value={members[currentMember]['ability'][0]}
                                   min={1} max={7} id={'0'}
                                   onChange={this.handleAbilityChange}/>
                    </div>
                </AArow>

                <AArow className='row'>
                    <div className='col-5'>
                        <ActivitySelector
                            onChange={this.handleActivityChange}
                            pic={pic_snowboard} alt={'snowboard'}
                            text={'Snowboard'}
                            checkStatus={members[currentMember]['activity'][1]}
                            id={'1'}/>
                    </div>
                    <div className='col-7'>
                        <SliderBar value={members[currentMember]['ability'][1]}
                                   min={1} max={7} id={'1'}
                                   onChange={this.handleAbilityChange}/>
                    </div>
                </AArow>

                <AArow className='row'>
                    <div className='col-5'>
                        <ActivitySelector
                            onChange={this.handleActivityChange}
                            pic={pic_telemark} alt={'telemark'}
                            text={'Telemark*'}
                            checkStatus={members[currentMember]['activity'][2]}
                            id={'2'}/>
                    </div>
                    <div className='col-7'>
                        <SliderBar value={members[currentMember]['ability'][2]}
                                   min={1} max={7} id={'2'}
                                   onChange={this.handleAbilityChange}/>
                    </div>
                </AArow>

                <AArow className='row'>
                    <div className='col-5'>
                        <ActivitySelector
                            onChange={this.handleActivityChange}
                            pic={pic_snowbiking} alt={'snowbiking'}
                            text={'Snowbiking*'}
                            checkStatus={members[currentMember]['activity'][3]}
                            id={'3'}/>
                    </div>
                    <div className='col-7'>
                        <SliderBar value={members[currentMember]['ability'][3]}
                                   min={1} max={7} id={'3'}
                                   onChange={this.handleAbilityChange}/>
                    </div>
                </AArow>

                <AArow className='row'>
                    <div className='col-5'>
                        <ActivitySelector
                            onChange={this.handleActivityChange}
                            pic={pic_snowshoeing} alt={'snowshoeing'}
                            text={'Snowshoeing*'}
                            checkStatus={members[currentMember]['activity'][4]}
                            id={'4'}/>
                    </div>
                    <div className='col-7'>
                        <SliderBar value={members[currentMember]['ability'][4]}
                                   min={1} max={7} id={'4'}
                                   onChange={this.handleAbilityChange}/>
                    </div>
                </AArow>

                <AArow className='row'>
                    <div className='col-5'>
                        <ActivitySelector
                            onChange={this.handleActivityChange}
                            pic={pic_snowmobile} alt={'snowmobile'}
                            text={'Snowmobiling*'}
                            checkStatus={members[currentMember]['activity'][5]}
                            id={'5'}/>
                    </div>
                    <div className='col-7'>
                        <SliderBar value={members[currentMember]['ability'][5]}
                                   min={1} max={7} id={'5'}
                                   onChange={this.handleAbilityChange}/>
                    </div>
                </AArow>

                <NOTE>*Lessons and rental in this are subject to availability at
                    resort</NOTE>

                <div className='row'>
                    <div className='col-12'
                         style={{transform: 'translate(20px,0)'}}>
                        <CheckBoxInput className="form-check-input"
                                       type="checkbox"
                                       checked={members[currentMember]['skipEquipmentLesson']}
                                       id='skip'
                                       onChange={this.handleCheckboxChange}/>
                        <label style={{marginLeft: '20px', color: "#607375"}}
                               className="form-check-label"
                               htmlFor='skip'>Only lift
                            passes required, lessons and rental not required for
                            this trip</label>
                    </div>
                </div>

                {warning ?
                    <Warning>You have not chosen any activities.</Warning>
                    : null}

                <div style={{height: '40px'}}/>

                <LeaveRow>
                    <BtmEllipseButton
                        onClick={() => this.handleAuth('goPrevious')}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Back
                        </div>
                    </BtmEllipseButton>
                    <BtmEllipseButton onClick={() => this.handleAuth('goNext')}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Save & Continue
                        </div>
                    </BtmEllipseButton>
                </LeaveRow>

            </div>
        )
    }
}

export default withCookies(BookingActivity);