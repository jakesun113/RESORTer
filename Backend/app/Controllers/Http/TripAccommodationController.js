'use strict';

const Database = use('Database');
const TripAccommodation = use('App/Models/TripAccommodation');
const moment = use('moment');


class TripAccommodationController {
  async getAccoInfo({response, params}) {
    
    async function getMasterMemberAge(id) {
      const dob = await Database.select('DOB').from('members').where({id: id});
      return moment().diff(moment(dob[0]['DOB']), "years");
    }

    async function getGroupMemberAge(id) {
      const dob = await Database.select('DOB').from('family_members').where({id: id});
      return moment().diff(moment(dob[0]['DOB']), "years");
    }


    async function updateAgeInfo(list, ageInfo) {
      for (let i = 0; i < list.length; i++) {
        let age = await
          getGroupMemberAge(list[i]);
        if (age >= 18) {
          ageInfo["adults"] = ageInfo['adults'] + 1;
        } else if (age <= 2) {
          ageInfo["toddlers"] = ageInfo["toddlers"] + 1;
        } else {
          ageInfo["children"] = ageInfo["children"] + 1;
        }
      }
      return ageInfo;
    }

    try {
      const tripID = params.tripID;
      const masterID = params.masterID;

      //check if tripID already exists
      const tmp = await Database.select('*').from('trip_accommodations').where({TripID: tripID});

      if (tmp.length === 0) {
        const result = await  Database.select('IsMasterMemberGoing', 'GroupMemberIDs').from('trips').where({id: tripID});
        const {IsMasterMemberGoing, GroupMemberIDs} = result[0];
        const GroupMembers = JSON.parse(GroupMemberIDs)['family_members']; //todo: the key name is to be negotiated
        let ageInfo = {
          adults: 0,
          toddlers: 0,
          children: 0
        };

        ageInfo = await updateAgeInfo(GroupMembers, ageInfo);

        if (IsMasterMemberGoing) {
          const master_age = await getMasterMemberAge(masterID);
          if (master_age >= 18) {
            ageInfo["adults"] = ageInfo['adults'] + 1;
          } else if (master_age <= 2) {
            ageInfo["toddlers"] = ageInfo["toddlers"] + 1;
          } else {
            ageInfo["children"] = ageInfo["children"] + 1;
          }
        }

        response.send(JSON.stringify({
          status: "trip is new",
          ageInfo: ageInfo
        }));
      } else {
        const {AccoType, AccoCate, NumOfAdults, NumOfChildren, NumOfToddlers, NumOfBathroom, NumOfBedroom, Requirement} = tmp[0];
        response.send(JSON.stringify({
          status: "trip already exists",
          accoInfo: {
            acco_type: AccoType,
            acco_cate: AccoCate,
            num_adult: NumOfAdults,
            num_child: NumOfChildren,
            num_toddler: NumOfToddlers,
            num_bedroom: NumOfBathroom,
            num_bathroom: NumOfBedroom,
            requirement: Requirement,
          }
        }))
      }
    } catch (e) {
      response.send("Error In Getting Accommodation Information.")
    }

  }

  async uploadAccoInfo({request, response}) {

    try {
      const {acco_type, acco_cate, num_adult, num_child, num_toddler, num_bedroom, num_bathroom, requirement, tripID} = JSON.parse(request.raw());
      const tmp = await Database.select('*').from('trip_accommodations').where({TripID: tripID});

      if (tmp.length === 0) {
        const new_trip_acco = new TripAccommodation();
        new_trip_acco.TripID = tripID;
        new_trip_acco.AccoType = acco_type;
        new_trip_acco.AccoCate = acco_cate;
        new_trip_acco.NumOfAdults = num_adult;
        new_trip_acco.NumOfChildren = num_child;
        new_trip_acco.NumOfToddlers = num_toddler;
        new_trip_acco.NumOfBathroom = num_bedroom;
        new_trip_acco.NumOfBedroom = num_bathroom;
        new_trip_acco.Requirement = requirement;
        await new_trip_acco.save();
      } else {
        const old_trip_id = tmp[0].id;
        const old_trip = await TripAccommodation.find(old_trip_id);
        old_trip.AccoType = acco_type;
        old_trip.AccoCate = acco_cate;
        old_trip.NumOfAdults = num_adult;
        old_trip.NumOfChildren = num_child;
        old_trip.NumOfToddlers = num_toddler;
        old_trip.NumOfBathroom = num_bedroom;
        old_trip.NumOfBedroom = num_bathroom;
        old_trip.Requirement = requirement;
        await old_trip.save()
      }
      response.send("Upload Successfully.")
    } catch (e) {
      console.log(e);
      response.send("Error In Uploading Accommodation Information.")
    }
  }
}

module.exports = TripAccommodationController
