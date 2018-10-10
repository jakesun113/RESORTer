'use strict'

const Database = use('Database');
const TripEquipment = use('App/Models/TripEquipment');
const Member = use("App/Models/Member");
const FamilyMember = use("App/Models/FamilyMember");
const TripActivity = use("App/Models/TripActivity")
const moment = use('moment');

class TripEquipmentController {
    async getEquipmentInfo({params}) {
        try {
          const tripID = params.tripID;
          const masterID = params.masterID;
    
          const {GroupMemberIDs, IsMasterMemberGoing} = (await Database.select('GroupMemberIDs', 'IsMasterMemberGoing').from('trips').where({id: tripID}))[0];
          const family_members = JSON.parse(GroupMemberIDs).family_members;

          // see if trip equipment for master member already exists
          const masterEquipment = await TripEquipment.findBy({
            "TripID": tripID,
            'MemberType': "master",
            'MemberID': masterID
          });
          let members = {};
          
          if (IsMasterMemberGoing) {
            const {DOB, FirstName, LastName}
              = (await Database
              .select('DOB', 'FirstName', 'LastName')
              .from('members')
              .where({id: masterID}))[0];
    
            members["master " + masterID.toString()] = {
              "id": "master " + masterID.toString(),
              "firstName": FirstName,
              "fullName": FirstName + " " + LastName,
              "activity": [false, false, false, false, false, false],
              "age": moment().diff(moment(DOB), "years"),
              "skiInfo": null,
              "snowboardInfo": null,
              "telemarkInfo": null,
              "otherInfo": null,
              "shoeSize": null,
              "weight": null,
              "height": null
            };
            const activity_tmp = await TripActivity.findBy("TripID", tripID);
            const MasterMemberActivity = JSON.parse(activity_tmp.MasterMemberActivity)
            const key = Object.keys(MasterMemberActivity); // single element array 

            if (key.length > 0) {
                const master_key = key[0];
                const activity_history = MasterMemberActivity[master_key].activity;
                members["master " + masterID.toString()].activity = activity_history;
            }
            
            if (masterEquipment) {
              const masterMemberRentalInfo = JSON.parse(masterEquipment.RentalInfo)
              const key = Object.keys(masterMemberRentalInfo); // single element array
              if (key.length > 0) {
                const master_key = key[0];
                const skiInfo = masterMemberRentalInfo[master_key].skiInfo;
                const snowboardInfo = masterMemberRentalInfo[master_key].snowboardInfo;
                const telemarkInfo = masterMemberRentalInfo[master_key].telemarkInfo;
                const otherInfo = masterMemberRentalInfo[master_key].otherInfo;
                const shoeSize = masterEquipment.ShoeSize;
                const weight = masterEquipment.Weight;
                const height = masterEquipment.Height;

                members["master " + masterID.toString()].skiInfo = skiInfo;
                members["master " + masterID.toString()].snowboardInfo = snowboardInfo;
                members["master " + masterID.toString()].snowboardInfo = snowboardInfo;
                members["master " + masterID.toString()].telemarkInfo = telemarkInfo;
                members["master " + masterID.toString()].otherInfo = otherInfo;
                members["master " + masterID.toString()].shoeSize = shoeSize;
                members["master " + masterID.toString()].weight = weight;
                members["master " + masterID.toString()].height = height;

              }
            }
      }

      for (let i = 0; i < family_members.length; i++) {
        const family_member_id = family_members[i];
        const {DOB, FirstName, LastName}
          = (await Database
          .select('DOB', 'FirstName', 'LastName')
          .from('family_members')
          .where({id: family_member_id}))[0];

        members[family_member_id.toString()] = {
            "id": family_member_id,
            "firstName": FirstName,
            "fullName": FirstName + " " + LastName,
            "activity": [false, false, false, false, false, false],
            "age": moment().diff(moment(DOB), "years"),
            "skiInfo": null,
            "snowboardInfo": null,
            "telemarkInfo": null,
            "otherInfo": null,
            "shoeSize": null,
            "weight": null,
            "height": null
        }

        const familyMemberEquipment = await TripEquipment.findBy({
          'TripID': tripID,
          'MemberType': "family",
          'MemberID': family_member_id
        });
        
        if (familyMemberEquipment) {
          const familyMemberRentalInfo = JSON.parse(familyMemberEquipment.RentalInfo)
          const key = Object.keys(familyMemberRentalInfo); // single element array
          if (key.length > 0) {
            const family_key = key[0];
            const skiInfo = familyMemberRentalInfo[family_key].skiInfo;
            const snowboardInfo = familyMemberRentalInfo[family_key].snowboardInfo;
            const telemarkInfo = familyMemberRentalInfo[family_key].telemarkInfo;
            const otherInfo = familyMemberRentalInfo[family_key].otherInfo;
            const shoeSize = familyMemberEquipment.ShoeSize;
            const weight = familyMemberEquipment.Weight;
            const height = familyMemberEquipment.Height;

            members[family_member_id].skiInfo = skiInfo;
            members[family_member_id].snowboardInfo = snowboardInfo;
            members[family_member_id].snowboardInfo = snowboardInfo;
            members[family_member_id].telemarkInfo = telemarkInfo;
            members[family_member_id].otherInfo = otherInfo;
            members[family_member_id].shoeSize = shoeSize;
            members[family_member_id].weight = weight;
            members[family_member_id].height = height;
        }
      }
    }
      return JSON.stringify(members);
      
    } catch (e) {
      console.log(e);
      return "Error in Getting Equipment Information."
    }
  }
}

module.exports = TripEquipmentController
