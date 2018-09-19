'use strict'
const Database = use('Database');
const Trip = use('App/Models/Trip');
const ResortInfo = use('App/Models/ResortInfo');
const ValidationToken = use("App/Models/ValidationToken");
const moment = use('moment');

/**

 */
class TripController {

  /*
  REQUEST: {"resortName":"","token":""}
  */
  async enrollNewTrip({request, response}) {

    try {
      console.log(request.all())
      const validationToken = await ValidationToken.findBy('Token', request.input('token'));
      const resortInfo = await ResortInfo.findBy('Name', request.input('resortName'));

      const newTrip = new Trip();
      newTrip.ResortID = resortInfo.id;
      newTrip.MasterMemberID = validationToken.MemberID;
      newTrip.IsTripDone = 0;
      await newTrip.save()

      let responseData = new Object();
      responseData.status = 'success'
      responseData.masterID = validationToken.MemberID;
      responseData.tripID = newTrip.id;
      responseData.resortID = resortInfo.id;

      return response.send(JSON.stringify(responseData))

    } catch (err) {

      response.send(JSON.stringify({status: 'fail'}))
      console.log(err)

    }
  }

  async tripMemberAges({response, params}) {
    const tripID = params.tripID;
    const masterID = params.masterID;
    const result = await  Database.select('IsMasterMemberGoing', 'GroupMemberIDs').from('trip_whodates').where({TripID: tripID});

    //GroupMemberIDs here is a string, parsed into JSON later
    const {IsMasterMemberGoing, GroupMemberIDs} = result[0];

    const GroupMembers = [1, 2, 3];

    let ageInfo = {
      adults: 0,
      toddlers: 0,
      children: 0
    };

    const ages = [1, 17, 4, 18, 20];


    GroupMembers.forEach(async (id) => {
      const dob = await Database.select('DOB').from('family_members').where({id: id});
      const age = moment().diff(moment(dob[0]['DOB']), "years");
      if (age >= 18) {
        ageInfo["adults"] = ageInfo['adults'] + 1;
      } else if (age <= 2) {
        ageInfo["toddlers"] = ageInfo["toddlers"] + 1;
      } else {
        ageInfo["children"] = ageInfo["children"] + 1;
      }
    });


    return {adults: 2, toddler: 1}
  }

}

module.exports = TripController
