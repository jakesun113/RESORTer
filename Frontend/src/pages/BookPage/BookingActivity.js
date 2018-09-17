import React, {Component} from "react";
import {Title, HeaderLine, BtmEllipseButton} from './BookingAccommodation'
import styled from "styled-components";
import SliderBar from "../../components/template/SliderBar"
import ActivitySelector from "../../components/template/ActivitySelector"
import AbilityLevelTip from '../../components/template/AbilityLevelTip'
import pic_ski from '../../materials/ActivityIcons/ski.png';
import pic_snowbiking from '../../materials/ActivityIcons/snowbiking.jpg';
import pic_snowboard from '../../materials/ActivityIcons/snowboard.png';
import pic_snowmobile from '../../materials/ActivityIcons/snowmobile.jpg';
import pic_snowshoeing from '../../materials/ActivityIcons/snowshoeing.png';
import pic_telemark from '../../materials/ActivityIcons/telemark.jpeg';

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
    content: "\\f00c";
    font-family: "Font Awesome 5 Free",serif; 
    position: absolute;
    top: 1px;
    left: -3px;
    font-size: 0.9em;
    color:#00A6FF;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    font-weight: 100; 
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

    state = {
        currentMember: 'member1',
        members: {
            "member1": {
                "activity": [true, false, true, false, true, false],
                "ability": [1, 2, 3, 4, 5, 6],
                "age": 25,
                "skipEquipmentLesson": false
            },
            "member2": {
                "activity": [false, true, false, true, false, true],
                "ability": [6, 5, 4, 3, 2, 1],
                'age': 30,
                "skipEquipmentLesson": false
            },
        }
    };

    componentDidMount() {
        //todo: call api
    }

    handleActivityChange = (id, isChecked) => {
        const {members, currentMember} = this.state;
        members[currentMember]['activity'][id] = isChecked;
        this.forceUpdate();
    };

    handleAbilityChange = (id, abilityValue) => {
        const {members, currentMember} = this.state;
        members[currentMember]['ability'][id] = parseInt(abilityValue);
        this.forceUpdate();
    };

    handleCheckboxChange = (e) => {
        const {members, currentMember} = this.state;
        members[currentMember]['skipEquipmentLesson'] = e.target.checked;
        this.forceUpdate()
    };

    render() {
        let {currentMember, members} = this.state;
        return (
            <div className='container' style={{marginTop: '20px'}}>
                <HeaderLine>
                    <Title>
                        <strong>3. ACTIVITIES</strong>
                    </Title>

                    <div className='row' style={{marginTop: '30px'}}>
                        <div className='col-xl-2 col-lg-3 col-md-4 col-6'>
                            <MemberCard>
                                <MemberButton>
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>member 1
                                    </div>
                                </MemberButton>
                            </MemberCard>
                        </div>
                        <div className='col-xl-2 col-lg-3 col-md-4 col-6'>
                            <MemberCard>
                                <MemberButton>
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>member 2
                                    </div>
                                </MemberButton>
                            </MemberCard>
                        </div>
                        <div className='col-xl-2 col-lg-3 col-md-4 col-6'>
                            <MemberCard>
                                <MemberButton>
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>member 3
                                    </div>
                                </MemberButton>
                            </MemberCard>
                        </div>
                        <div className='col-xl-2 col-lg-3 col-md-4 col-6'>
                            <MemberCard>
                                <MemberButton>
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>member 4
                                    </div>
                                </MemberButton>
                            </MemberCard>
                        </div>
                        <div className='col-xl-2 col-lg-3 col-md-4 col-6'>
                            <MemberCard>
                                <MemberButton>
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>member 5
                                    </div>
                                </MemberButton>
                            </MemberCard>
                        </div>
                        <div className='col-xl-2 col-lg-3 col-md-4 col-6'>
                            <MemberCard>
                                <MemberButton>
                                    <div style={{
                                        fontSize: '12px',
                                        color: 'white',
                                    }}>member 6
                                    </div>
                                </MemberButton>
                            </MemberCard>
                        </div>
                    </div>

                    <div className='text-center' style={{marginTop: '30px'}}>
                        <MemberInfo style={{marginRight: '14vw'}}>Select
                            activities
                            for <span
                                style={{
                                    color: 'rgba(255, 97, 97, 1)',
                                    marginLeft: '10px'
                                }}>{currentMember}</span></MemberInfo>
                        <MemberInfo style={{display: 'inline-block'}}>Age: <span
                            style={{
                                color: 'rgba(255, 97, 97, 1)',
                                marginLeft: '10px'
                            }}>{members[currentMember]['age']}</span></MemberInfo>
                    </div>


                    <div className='row'>
                        <div className='col-5'>
                            <p><strong>Activity</strong></p>
                        </div>
                        <div className='col-7'>
                            <p style={{display: 'inline', marginRight: '1vw'}}><strong>Ability Level</strong>
                            </p>
                            <AbilityLevelTip/>
                            <p style={{display: 'inline', marginLeft: '1vw', color: '#607375'}}><strong>Not
                                sure
                                about
                                your ability
                                level?</strong></p>
                        </div>
                    </div>

                    <AArow className='row'>
                        <div className='col-5'>
                            <ActivitySelector
                                onChange={this.handleActivityChange} pic={pic_ski} alt={'ski'}
                                text={'Ski'}
                                checkStatus={members[currentMember]['activity'][0]}
                                id={'0'}/>
                        </div>
                        <div className='col-7'>
                            <SliderBar value={members[currentMember]['ability'][0]} min={1} max={7} id={'0'}
                                       onChange={this.handleAbilityChange} label={'Ski'}/>
                        </div>
                    </AArow>

                    <AArow className='row'>
                        <div className='col-5'>
                            <ActivitySelector
                                onChange={this.handleActivityChange} pic={pic_snowboard} alt={'snowboard'}
                                text={'Snowboard'}
                                checkStatus={members[currentMember]['activity'][1]}
                                id={'1'}/>
                        </div>
                        <div className='col-7'>
                            <SliderBar value={members[currentMember]['ability'][1]} min={1} max={7} id={'1'}
                                       onChange={this.handleAbilityChange} label={'Snowboard'}/>
                        </div>
                    </AArow>

                    <AArow className='row'>
                        <div className='col-5'>
                            <ActivitySelector
                                onChange={this.handleActivityChange} pic={pic_telemark} alt={'telemark'}
                                text={'Telemark*'}
                                checkStatus={members[currentMember]['activity'][2]}
                                id={'2'}/>
                        </div>
                        <div className='col-7'>
                            <SliderBar value={members[currentMember]['ability'][2]} min={1} max={7} id={'2'}
                                       onChange={this.handleAbilityChange} label={'Telemark*'}/>
                        </div>
                    </AArow>

                    <AArow className='row'>
                        <div className='col-5'>
                            <ActivitySelector
                                onChange={this.handleActivityChange} pic={pic_snowbiking} alt={'snowbiking'}
                                text={'Snowbiking*'}
                                checkStatus={members[currentMember]['activity'][3]}
                                id={'3'}/>
                        </div>
                        <div className='col-7'>
                            <SliderBar value={members[currentMember]['ability'][3]} min={1} max={7} id={'3'}
                                       onChange={this.handleAbilityChange} label={'Snowbiking*'}/>
                        </div>
                    </AArow>

                    <AArow className='row'>
                        <div className='col-5'>
                            <ActivitySelector
                                onChange={this.handleActivityChange} pic={pic_snowshoeing} alt={'snowshoeing'}
                                text={'Snowshoeing*'}
                                checkStatus={members[currentMember]['activity'][4]}
                                id={'4'}/>
                        </div>
                        <div className='col-7'>
                            <SliderBar value={members[currentMember]['ability'][4]} min={1} max={7} id={'4'}
                                       onChange={this.handleAbilityChange} label={'Snowshoeing*'}/>
                        </div>
                    </AArow>

                    <AArow className='row'>
                        <div className='col-5'>
                            <ActivitySelector
                                onChange={this.handleActivityChange} pic={pic_snowmobile} alt={'snowmobile'}
                                text={'Snowmobiling*'}
                                checkStatus={members[currentMember]['activity'][5]}
                                id={'5'}/>
                        </div>
                        <div className='col-7'>
                            <SliderBar value={members[currentMember]['ability'][5]} min={1} max={7} id={'5'}
                                       onChange={this.handleAbilityChange} label={'Snowmobiling*'}/>
                        </div>
                    </AArow>

                    <NOTE>*Lessons and rental in this are subject to availability at resort</NOTE>

                    <div className='row'>
                        <div className='col-12' style={{transform: 'translate(20px,0)'}}>
                            <CheckBoxInput className="form-check-input" type="checkbox"
                                           checked={members[currentMember]['skipEquipmentLesson']} id='skip'
                                           onChange={this.handleCheckboxChange}/>
                            <label style={{marginLeft: '20px', color: "#607375"}} className="form-check-label"
                                   htmlFor='skip'>Only lift
                                passes required, lessons and rental not required for this trip</label>
                        </div>
                    </div>


                </HeaderLine>
            </div>
        )
    }

}

export default BookingActivity;