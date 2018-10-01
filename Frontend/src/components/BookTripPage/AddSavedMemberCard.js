import React, { Component } from "react";
import axios from "axios";
import GroupMemberInfoCard from "./TripMemberInfoCard";

class AddSavedMemberCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        savedGroupMember: null
    };
  }
  componentDidMount(){
      this.setState({
          savedGroupMember:this.props.savedGroupMember
      })
  }

  addSavedMemberCard(index){
      this.props.handleSavedMember(this.state.savedGroupMember[index])
  }

  render() {
    let groupMember = null
    if(this.state.savedGroupMember != null){
        groupMember = this.state.savedGroupMember
    }
    return (
    <React.Fragment>
    <div className="row">
    {groupMember === null ? null :
        groupMember.map((info,index) => {
          return (
              <div className="col-12 col-lg-4">
              <br/>
                  <GroupMemberInfoCard
                      key={index}
                      id={info.id}
                      name={info.LastName + " " + info.FirstName}
                      dob={info.DOB}
                      skierLevel={info.SkiAbility}
                      snowBikerLevel={info.SnowbikeAbility}
                      snowBorderLevel={info.SnowboardAbility}
                      snowMobilerLevel={info.SnowmobileAbility}
                      snowShoerLevel={info.SnowshoeAbility}
                      teleMarkerLevel={info.TelemarkAbility}
                      handleClick={() => this.addSavedMemberCard(index)}
                      buttonName="Add"
                  />
              </div>
          );
        })
      }
      
    </div>
    </React.Fragment>
    )
  }
}

export default AddSavedMemberCard;
