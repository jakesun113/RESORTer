'use strict';
const Database = use('Database');
const Trip = use('App/Models/Trip');
const ResortInfo = use('App/Models/ResortInfo');
const Member = use("App/Models/Member");
const ValidationToken = use("App/Models/ValidationToken");
const FamilyMember = use("App/Models/FamilyMember")
const moment = use('moment');
const topSix = 6;

/**

 */

class TripController {

  async acquireSelfInfoAndFamilyInfo({response,params}){

    try{
      const validationToken = await ValidationToken.findBy('Token', params.token);
      const userInfo = await Member
                    .query()
                    .where('id','=',validationToken.MemberID)
                    .fetch()
      let user = userInfo.rows[0]
      //FIXME:Better way to exclude EncryptedPW column
      user.EncryptedPW = null
      const familyMember = await FamilyMember
                      .query()
                      .where('MemberID', '=', validationToken.MemberID)
                      .fetch()

      let dataResponse = new Object();
      dataResponse.user = user;
      dataResponse.familyMember = familyMember;

      return response.send(dataResponse);

    }catch(err){
      console.log(err)
      return response.send('SERVER ERROR')
    }

  }
  async addFakeTripData() {

    const userID1 = 1;
    const userID2 = 2;
    //in Australia
    const mtBullerNum = 1;
    const ThredboNum = 2;
    const PerisherNum = 3;
    const MountHothamNum = 4;
    const FallsCreekNum = 5;
    //in New Zealand
    const CoronetPeakNum = 6;
    const CardronaNum = 7;
    //in USA
    const AspenSnowmassNum = 8;
    const TellurideNum = 9;
    //in Japan
    const NisekoNum = 10;

    console.log("Start adding fake trip data.");
    //fake data for resort Mt.Buller
    for (let i = 0; i < mtBullerNum; i++) {
      const trip = new Trip();
      trip.ResortID = 1;
      trip.MasterMemberID = userID1;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Thredbo
    for (let i = 0; i < ThredboNum; i++) {
      const trip = new Trip();
      trip.ResortID = 429;
      trip.MasterMemberID = userID1;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Perisher
    for (let i = 0; i < PerisherNum; i++) {
      const trip = new Trip();
      trip.ResortID = 1204;
      trip.MasterMemberID = userID1;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Mount Hotham
    for (let i = 0; i < MountHothamNum; i++) {
      const trip = new Trip();
      trip.ResortID = 1516;
      trip.MasterMemberID = userID1;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Falls Creek
    for (let i = 0; i < FallsCreekNum; i++) {
      const trip = new Trip();
      trip.ResortID = 2670;
      trip.MasterMemberID = userID1;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Coronet Peak
    for (let i = 0; i < CoronetPeakNum; i++) {
      const trip = new Trip();
      trip.ResortID = 2886;
      trip.MasterMemberID = userID2;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Cardrona
    for (let i = 0; i < CardronaNum; i++) {
      const trip = new Trip();
      trip.ResortID = 2893;
      trip.MasterMemberID = userID2;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Aspen Snowmass
    for (let i = 0; i < AspenSnowmassNum; i++) {
      const trip = new Trip();
      trip.ResortID = 2;
      trip.MasterMemberID = userID2;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Telluride
    for (let i = 0; i < TellurideNum; i++) {
      const trip = new Trip();
      trip.ResortID = 402;
      trip.MasterMemberID = userID2;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    //fake data for resort Niseko
    for (let i = 0; i < NisekoNum; i++) {
      const trip = new Trip();
      trip.ResortID = 3;
      trip.MasterMemberID = userID2;
      trip.IsTripDone = true;
      trip.StartDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      trip.EndDate = moment().add(1, "days").format("YYYY-MM-DD");
      trip.SubmitDate = moment().format("YYYY-MM-DD");

      await trip.save();
    }
    console.log("Finish adding fake trip data.");
  }

  /*
  REQUEST: {"resortName":"","token":""}
  */
  async enrollNewTrip({request, response}) {

    try {
      console.log(request.all());
      const validationToken = await ValidationToken.findBy('Token', request.input('token'));
      const resortInfo = await ResortInfo.findBy('Name', request.input('resortName'));

      const newTrip = new Trip();
      newTrip.ResortID = resortInfo.id;
      newTrip.MasterMemberID = validationToken.MemberID;
      newTrip.IsTripDone = 0;
      await newTrip.save();

      let responseData = {};
      responseData.status = 'success';
      responseData.masterID = validationToken.MemberID;
      responseData.tripID = newTrip.id;
      responseData.resortID = resortInfo.id;

      return response.send(JSON.stringify(responseData))

    } catch (err) {

      response.send(JSON.stringify({status: 'fail'}));
      console.log(err)

    }
  }

  async tripMemberAges({response, params}) {

    //TODO: modify here when database is ready
    // const tripID = params.tripID;
    // const masterID = params.masterID;
    const tripID = 1;
    const masterID = 1;

    const result = await  Database.select('IsMasterMemberGoing', 'GroupMemberIDs').from('trip_whodates').where({TripID: tripID});

    //todo: GroupMemberIDs here is a Json array {key_name:[1,2,3]}, parsed into JSON later
    const {IsMasterMemberGoing, GroupMemberIDs} = result[0];


    const GroupMembers = [1, 2, 3];

    let ageInfo = {
      adults: 0,
      toddlers: 0,
      children: 0
    };

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

    response.send(JSON.stringify(ageInfo));
  }

  async getPopularResorts() {

    //first, get most popular resorts ID from trip table
    //only return the resort ID whose trip is "done"
    const resortIDs = await Database.table('trips')
      .where({'IsTripDone': 1}).column('ResortID');
    //console.log(resortIDs);

    //array contains all the resorts ID
    let resortArray = [];
    for (let i = 0; i < resortIDs.length; i++) {
      resortArray[i] = resortIDs[i].ResortID;
    }
    //console.log(resortArray);

    //object that each resort ID with its occurrence time
    let counts = {};
    for (let i = 0; i < resortArray.length; i++) {
      let num = resortArray[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    //console.log(counts);

    //array that sorts the resort by its occurring time
    let popularResortArray = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a]
    });
    //console.log(popularResortArray);

    let minNum = Math.min(topSix, popularResortArray.length);
    //then, based on the resorts ID, return corresponding resorts information
    let resortInfoArray = [];
    for (let i = 0; i < minNum; i++) {
      let resortID = popularResortArray[i];

      let resortInfo = {};
      const resort = await ResortInfo.findBy('id', resortID);
      resortInfo.id = resort.id;
      resortInfo.image = resort.Image;
      resortInfo.name = resort.Name;
      resortInfo.country = resort.Country;
      resortInfo.description = resort.Description;
      //console.log(resortInfo);

      resortInfoArray.push(resortInfo);
    }

    //console.log(resortInfoArray);

    return JSON.stringify({
      popularResorts: resortInfoArray
    })
  }

  async getPopularResortsByCountry({params}) {

    //first, get the country of the user
    const token = params.token;
    //console.log(token);
    const dbMemberID = await Database.table('validation_tokens')
      .where("Token", token).select('MemberID');

    const member = await Member.findBy('id', dbMemberID[0].MemberID);
    const country = member.Country;
    console.log(country);

    //then, get most popular resorts ID from trip table
    //only return the resort ID whose trip is "done"
    const resortIDs = await Database.table('trips')
      .where({'IsTripDone': 1}).column('ResortID');
    //console.log(resortIDs);

    //array contains all the resorts ID
    let resortArray = [];
    for (let i = 0; i < resortIDs.length; i++) {
      resortArray[i] = resortIDs[i].ResortID;
    }
    //console.log(resortArray);

    //object that each resort ID with its occurrence time
    let counts = {};
    for (let i = 0; i < resortArray.length; i++) {
      let num = resortArray[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let identicalResortIDs = [];

    // whether resorts in the specific country is in the trip table,
    //if so, add the resort ID in the array
    for (let i = 0; i < Object.keys(counts).length; i++) {
      const resort = await ResortInfo.findBy('id', Object.keys(counts)[i]);
      if (resort.Country === country) {
        identicalResortIDs.push(Object.keys(counts)[i]);
      }
    }
    console.log(identicalResortIDs);

    //only when there is at least one searched resort in that country,
    //do the ranking and return corresponding information
    if (identicalResortIDs.length > 0) {
      console.log("this country has resorts");
      //array that sorts the resort by its occurring time
      let popularResortArray = identicalResortIDs.sort(function (a, b) {
        return counts[b] - counts[a]
      });
      //console.log(popularResortArray);

      let minNum = Math.min(topSix, popularResortArray.length);
      //then, based on the resorts ID, return corresponding resorts information
      let resortInfoArray = [];
      for (let i = 0; i < minNum; i++) {
        let resortID = popularResortArray[i];

        let resortInfo = {};
        const resort = await ResortInfo.findBy('id', resortID);
        resortInfo.id = resort.id;
        resortInfo.image = resort.Image;
        resortInfo.name = resort.Name;
        resortInfo.country = resort.Country;
        resortInfo.description = resort.Description;
        //console.log(resortInfo);

        resortInfoArray.push(resortInfo);
      }

      //console.log(resortInfoArray);

      return JSON.stringify({
        hasResorts: true,
        popularResorts: resortInfoArray
      });
    }
    //otherwise, return no resorts found in that country
    else {
      console.log("this country doesn't have resorts");
      return JSON.stringify({
        hasResorts: false
      });
    }
  }

  async getBookingHistory({params}) {
     //first, get the user ID
     const token = params.token;
     const dbMemberID = await Database.table('validation_tokens')
       .where("Token", token).select('MemberID');

    //then, get all the trips ID from trip table
    //only return the trip ID of the specific member
    const trips = await Database.table('trips')
      .where({'MasterMemberID': dbMemberID[0].MemberID});
    //console.log(trips);

    if (trips.length > 0) {
        //array contains all the trips
        let tripArray = [];
        for (let i = 0; i < trips.length; i++) {
          let tripInfo = {};
          const resort = await ResortInfo.findBy('id', trips[i].ResortID);
          tripInfo.id = trips[i].id;
          if (trips[i].SubmitDate) {
            tripInfo.submitDate = moment(trips[i].SubmitDate).format("YYYY-MM-DD");
          } else {
            tripInfo.submitDate = "-"
          }
          tripInfo.name = resort.Name;
          tripInfo.startDate = moment(trips[i].StartDate).format("YYYY-MM-DD");
          tripInfo.endDate = moment(trips[i].EndDate).format("YYYY-MM-DD");
          if (trips[i].IsTripDone) {
            tripInfo.status = "Submitted"
            tripInfo.checkButton = "View"
          } else {
            tripInfo.status = "In Progress"
            tripInfo.checkButton = "Continue"
          }  
          tripInfo.bookingStep = await getBookingStep(tripInfo.id, tripInfo.name)
          console.log(tripInfo.bookingStep)
          tripArray.push(tripInfo);
        }
  
      //console.log(tripArray);
      return JSON.stringify({
        hasTrips: true,
        bookingHistory: tripArray
      });
    } 
    //otherwise, return no trips found in that user
    else {
      console.log("this member doesn't have trips");
      return JSON.stringify({
        hasTrips: false
      });
    }

  async function getBookingStep(tripID, resortName) {

     const trip = await Trip.findBy('id', tripID); 
     const stepPrefix = "/booking/" + resortName
     let bookingStep = null;

     //if the trip has been submitted, go to the trip summary page
     if (trip.IsTripDone) {
      bookingStep = "/trip/" + resortName
     } 
     //otherwise, go to the corresponding booking step
     else {
      const tripAccommodation = await Database.table('trip_accommodations')
      .where("tripID", tripID);

      //if the accommodation step has been completed
       if (tripAccommodation[0]) {
        const tripActivity = await Database.table('trip_activities')
        .where("tripID", tripID);
        //if the activity step has been completed
        if (tripActivity[0]) {
          const tripEquipment = await Database.table('trip_equipments')
          .where("tripID", tripID);

          //if the equipment step has been completed
          if (tripEquipment[0]) {
            const tripLesson = await Database.table('trip_lessons')
            .where("tripID", tripID);
            
            //if the lesson step has been completed, go to the plan summary step
            if (tripLesson[0]) {
              bookingStep = stepPrefix + "/summary"
            } 
            //otherwise, go to the lesson step
            else {
              bookingStep = stepPrefix + "/learn"
            }
          } 
          //otherwise, go to the equipment step
          else {
            bookingStep = stepPrefix + "/equipment"
          }
        } 
        //otherwise, go to the activity step
        else {
          bookingStep = stepPrefix + "/doing"
        }
       } 
       //otherwise, go to the accommodation step
       else {        
        bookingStep = stepPrefix + "/sleep"
       }
     }
     return bookingStep;
  }
}

}

module.exports = TripController;
