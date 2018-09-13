import React, {Component} from "react";
import {Title, HeaderLine, BtmEllipseButton} from './BookingAccommodation'
import styled from "styled-components";
import SliderBar from "../../components/template/SliderBar"
import ActivitySelector from "../../components/template/ActivitySelector"

const MemberCard = styled.div`
  position: relative;
  width: 170px;
  height: 40px;
  background-color: white;
  box-shadow: 5px 5px 3px rgba(0,0,0,0.06);
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

class BookingActivity extends Component {
    // constructor(props) {
    //     super(props);
    //     this.members = {
    //         "member1": {"activity": [true, false, true, false, true, false], "ability": [1, 2, 3, 4, 5, 6], "age": 25},
    //         "member2": {"activity": [0, 1, 0, 1, 0, 1], "ability": [6, 5, 4, 3, 2, 1], 'age': 30},
    //     };
    // }

    state = {
        currentMember: 'member1',
        members: {
            "member1": {"activity": [true, false, true, false, true, false], "ability": [1, 2, 3, 4, 5, 6], "age": 25},
            "member2": {"activity": [false, true, false, true, false, true], "ability": [6, 5, 4, 3, 2, 1], 'age': 30},
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

    render() {
        let {currentMember, members} = this.state;
        // console.log(members[currentMember]['activity']);

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
                        <div className='col-6'>
                            <ActivitySelector activity={members[currentMember]['activity']}
                                              onChange={this.handleActivityChange}/>
                        </div>
                        <div className='col-6'>
                            <SliderBar/>
                        </div>
                    </div>


                </HeaderLine>
            </div>
        )
    }

}

export default BookingActivity;