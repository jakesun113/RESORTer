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
  componentDidMount() {
    this.setState({
      savedGroupMember: this.props.savedGroupMember
    });
  }

  addSavedMemberCard(index) {
    this.props.handleSavedMember(this.state.savedGroupMember[index]);
  }

  render() {
    let groupMember = null;
    if (this.state.savedGroupMember != null) {
      groupMember = this.state.savedGroupMember;
    }
    return (
      <React.Fragment>
        <div
          style={{
            border: "1px solid grey",
            padding: "20px",
            WebkitBoxShadow: "10px 10px 5px 0px rgba(0,0,0,0.11)",
            MozBoxShadow: " 10px 10px 5px 0px rgba(0,0,0,0.11)",
            boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.11)"
          }}
        >
          <p
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "25px"
            }}
          >
            Currently Saved Group Members
          </p>
          <div className="row">
            {groupMember === null
              ? null
              : groupMember.map((info, index) => {
                  return (
                    <div className="col-12 col-lg-6 ocl-xl-6">
                      <br />
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
                })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddSavedMemberCard;
