"use strict";
const Database = use("Database");
const Trip = use("App/Models/Trip");
const TripAccommodation = use("App/Models/TripAccommodation");
const TripActivity = use("App/Models/TripActivity");
const TripEquipment = use("App/Models/TripEquipment");
const TripLiftPass = use("App/Models/TripLiftpass");
const ResortInfo = use("App/Models/ResortInfo");
const Member = use("App/Models/Member");
const ValidationToken = use("App/Models/ValidationToken");
const FamilyMember = use("App/Models/FamilyMember");
const moment = use("moment");
const topSix = 6;

/*

 */

class TripController {
  async acquireTripMember({ params, response }) {
    try {
      const trip = await Trip.find(params.tripID)
      let member;
      let familyMember;
      if(trip.IsMasterMemberGoing === 1){
        member = await Member.find(trip.MasterMemberID)
      }else{
        member = null
      }

      if(JSON.parse(trip.GroupMemberIDs).family_members.length > 0){
        familyMember = await Database.from("family_members").whereIn('id',JSON.parse(trip.GroupMemberIDs).family_members)
      }else{
        familyMember = null
      }

      response.send(JSON.stringify({masterMember:member,familyMember:familyMember}))
    } catch (err) {
      console.log(err);
    }
  }

  async acquireTripDate({ params, response }) {
    try {
      const trip = await Trip.find(params.tripID);
      response.send(
        JSON.stringify({ startDate: trip.StartDate, endDate: trip.EndDate })
      );
    } catch (err) {
      console.log(err);
    }
  }
  async acquireSelfInfoAndFamilyInfo({ response, params }) {
    try {
      const validationToken = await ValidationToken.findBy(
        "Token",
        params.token
      );
      const userInfo = await Member.query()
        .where("id", "=", validationToken.MemberID)
        .fetch();
      let user = userInfo.rows[0];
      //FIXME:Better way to exclude EncryptedPW column
      user.EncryptedPW = null;
      const familyMember = await FamilyMember.query()
        .where("MemberID", "=", validationToken.MemberID)
        .fetch();

      let dataResponse = {};
      dataResponse.user = user;
      dataResponse.familyMember = familyMember;

      return response.send(dataResponse);
    } catch (err) {
      console.log(err);
      return response.send("SERVER ERROR");
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

    //family member num
    const familyNum = 3;
    //equipment number, (how many people in a trip, by default, self + family member)
    const equipmentNum = familyNum + 1;
    //trip ID that equipment, accommodation and activity is null
    const tripID = 16;
    //total number of trip table
    const totalTripNum = 55;

    const familyCount = await FamilyMember.getCount();
    const tripCount = await Trip.getCount();
    const tripEquipmentCount = await TripEquipment.getCount();
    const tripActivityCount = await TripActivity.getCount();
    const tripAccommodationCount = await TripAccommodation.getCount();
    const tripLiftPassCount = await TripLiftPass.getCount();

    //fake data of family member table
    if (familyCount === 0) {
      console.log("Start adding fake family member data.");
      //fake data for family member
      for (let i = 0; i < familyNum; i++) {
        const familyMember = new FamilyMember();
        familyMember.FirstName = "Fake";
        familyMember.LastName = "Member" + i;
        familyMember.Gender = "Male";
        familyMember.SkiAbility = 3;
        familyMember.SnowboardAbility = 1;
        familyMember.TelemarkAbility = 1;
        familyMember.SnowbikeAbility = 1;
        familyMember.SnowmobileAbility = 1;
        familyMember.SnowshoeAbility = 1;
        familyMember.DOB = moment()
          .subtract(1000, "days")
          .format("YYYY-MM-DD");
        familyMember.IsDisabled = false;
        familyMember.MemberID = userID2;

        await familyMember.save();
      }
      console.log("Finish adding fake family member data.");
    }

    //fake data of trip table
    if (tripCount === 0) {
      console.log("Start adding fake trip data.");
      //fake data for resort Mt.Buller
      for (let i = 0; i < mtBullerNum; i++) {
        const trip = new Trip();
        trip.ResortID = 1;
        trip.MasterMemberID = userID1;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Thredbo
      for (let i = 0; i < ThredboNum; i++) {
        const trip = new Trip();
        trip.ResortID = 429;
        trip.MasterMemberID = userID1;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Perisher
      for (let i = 0; i < PerisherNum; i++) {
        const trip = new Trip();
        trip.ResortID = 1204;
        trip.MasterMemberID = userID1;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Mount Hotham
      for (let i = 0; i < MountHothamNum; i++) {
        const trip = new Trip();
        trip.ResortID = 1516;
        trip.MasterMemberID = userID1;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Falls Creek
      for (let i = 0; i < FallsCreekNum; i++) {
        const trip = new Trip();
        trip.ResortID = 2670;
        trip.MasterMemberID = userID1;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Coronet Peak
      for (let i = 0; i < CoronetPeakNum; i++) {
        const trip = new Trip();
        trip.ResortID = 2886;
        trip.MasterMemberID = userID2;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Cardrona
      for (let i = 0; i < CardronaNum; i++) {
        const trip = new Trip();
        trip.ResortID = 2893;
        trip.MasterMemberID = userID2;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Aspen Snowmass
      for (let i = 0; i < AspenSnowmassNum; i++) {
        const trip = new Trip();
        trip.ResortID = 2;
        trip.MasterMemberID = userID2;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Telluride
      for (let i = 0; i < TellurideNum; i++) {
        const trip = new Trip();
        trip.ResortID = 402;
        trip.MasterMemberID = userID2;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      //fake data for resort Niseko
      for (let i = 0; i < NisekoNum; i++) {
        const trip = new Trip();
        trip.ResortID = 3;
        trip.MasterMemberID = userID2;
        trip.IsTripDone = true;
        trip.IsMasterMemberGoing = true;
        trip.GroupMemberIDs = JSON.stringify({ family_members: [1, 2, 3] });
        trip.StartDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        trip.EndDate = moment()
          .add(1, "days")
          .format("YYYY-MM-DD");
        trip.SubmitDate = moment().format("YYYY-MM-DD");
        trip.Comment = "Fake further comments";

        await trip.save();
      }
      console.log("Finish adding fake trip data.");
    }

    //fake data of trip accommodation table
    if (tripAccommodationCount === 0) {
      console.log("Start adding fake trip accommodation data.");
      //fake data for trip accommodation

      for (let i = 0; i < totalTripNum; i++) {
        const tripAccommodation = new TripAccommodation();
        //insert empty data for tripID 16
        if (i === tripID - 1) {
          tripAccommodation.TripID = i + 1;
        } else {
          tripAccommodation.TripID = i + 1;
          tripAccommodation.AccoType = "Apartment";
          tripAccommodation.AccoCate = "Economy";
          tripAccommodation.NumOfAdults = "4";
          tripAccommodation.NumOfChildren = "0";
          tripAccommodation.NumOfToddlers = "0";
          tripAccommodation.NumOfBathroom = "2";
          tripAccommodation.NumOfBedroom = "2";
          tripAccommodation.Requirement = "Fake requirement";
        }

        await tripAccommodation.save();
      }

      console.log("Finish adding fake trip accommodation data.");
    }

    //fake data of trip activity table
    if (tripActivityCount === 0) {
      console.log("Start adding fake trip activity data.");
      //fake data for trip activity

      for (let i = 0; i < totalTripNum; i++) {
        const tripActivity = new TripActivity();
        //insert empty data for tripID 16
        if (i === tripID - 1) {
          tripActivity.TripID = i + 1;
          let master_activity = {
            activity: [false, false, false, false, false, false],
            ability: [1, 1, 3, 1, 1],
            skipEquipmentLesson: false
          };
          tripActivity.MasterMemberActivity = JSON.stringify({
            2: master_activity
          });
          let family_activity = {
            activity: [false, false, false, false, false, false],
            ability: [3, 1, 1, 1, 1],
            skipEquipmentLesson: false
          };
          tripActivity.GroupMemberActivity = JSON.stringify({
            1: family_activity,
            2: family_activity,
            3: family_activity
          });
        } else {
          tripActivity.TripID = i + 1;
          let master_activity = {
            activity: [true, true, true, true, true, true],
            ability: [1, 1, 3, 1, 1],
            skipEquipmentLesson: false
          };
          tripActivity.MasterMemberActivity = JSON.stringify({
            2: master_activity
          });
          let family_activity = {
            activity: [true, false, false, false, false, false],
            ability: [3, 1, 1, 1, 1],
            skipEquipmentLesson: false
          };
          tripActivity.GroupMemberActivity = JSON.stringify({
            1: family_activity,
            2: family_activity,
            3: family_activity
          });
        }

        await tripActivity.save();
      }

      console.log("Finish adding fake trip activity data.");
    }

    //fake data of trip equipment table
    if (tripEquipmentCount === 0) {
      let masterRentalInfo = {};
      let masterRentalSkiArray = [];

      let startDate = moment().subtract(1, "days");
      let endDate = moment().add(1, "days");
      let duration = moment.duration(endDate.diff(startDate));
      let days = Math.round(duration.asDays());
      //console.log(days);

      for (let i = 0; i <= days; i++) {
        let masterRentalInfoByDay = {};
        let startDate = moment().subtract(1, "days");
        masterRentalInfoByDay.participant = "Jiacheng Sun";
        masterRentalInfoByDay.date = startDate
          .add(i, "days")
          .format("D MMMM YYYY");
        masterRentalInfoByDay.duration = "Full Day";
        masterRentalInfoByDay.boots = true;
        masterRentalInfoByDay.poles = false;
        masterRentalInfoByDay.grade = "Standard";
        masterRentalSkiArray.push(masterRentalInfoByDay);
      }

      masterRentalInfo.skiInfo = masterRentalSkiArray;

      let masterRentalSnowboardArray = [];

      for (let i = 0; i <= days; i++) {
        let masterRentalInfoByDay = {};
        let startDate = moment().subtract(1, "days");
        masterRentalInfoByDay.participant = "Jiacheng Sun";
        masterRentalInfoByDay.date = startDate
          .add(i, "days")
          .format("D MMMM YYYY");
        masterRentalInfoByDay.duration = "Full Day";
        masterRentalInfoByDay.boots = true;
        masterRentalInfoByDay.board = false;
        masterRentalInfoByDay.grade = "Standard";
        masterRentalSnowboardArray.push(masterRentalInfoByDay);
      }

      masterRentalInfo.snowboardInfo = masterRentalSnowboardArray;
      masterRentalInfo.telemarkInfo = masterRentalSkiArray;
      masterRentalInfo.otherInfo = null;
      //console.log(masterRentalInfo);

      let familyRentalInfo = [];
      for (let j = 0; j <= 2; j++) {
        let singleFamilyRentalInfo = {};
        //add ski info
        let singleFamilyRentalSkiArray = [];

        for (let i = 0; i <= days; i++) {
          let singleFamilyRentalInfoByDay = {};
          let startDate = moment().subtract(1, "days");
          singleFamilyRentalInfoByDay.participant = "Fake Member" + j;
          singleFamilyRentalInfoByDay.date = startDate
            .add(i, "days")
            .format("D MMMM YYYY");
          singleFamilyRentalInfoByDay.duration = "Full Day";
          singleFamilyRentalInfoByDay.boots = true;
          singleFamilyRentalInfoByDay.poles = false;
          singleFamilyRentalInfoByDay.grade = "Standard";
          singleFamilyRentalSkiArray.push(singleFamilyRentalInfoByDay);
        }

        singleFamilyRentalInfo.skiInfo = singleFamilyRentalSkiArray;
        singleFamilyRentalInfo.snowboardInfo = null;
        singleFamilyRentalInfo.telemarkInfo = null;

        //add other equipment info
        let familyRentalOtherArray = [];

        for (let i = 0; i <= days; i++) {
          let singleFamilyRentalInfoByDay = {};
          let startDate = moment().subtract(1, "days");
          singleFamilyRentalInfoByDay.participant = "Fake Member" + j;
          singleFamilyRentalInfoByDay.date = startDate
            .add(i, "days")
            .format("D MMMM YYYY");
          singleFamilyRentalInfoByDay.duration = "Full Day";
          singleFamilyRentalInfoByDay.outfit = "Medium";
          singleFamilyRentalInfoByDay.helmet = "Small";
          familyRentalOtherArray.push(singleFamilyRentalInfoByDay);
        }

        singleFamilyRentalInfo.otherInfo = familyRentalOtherArray;

        //console.log(singleFamilyRentalInfo);
        familyRentalInfo.push(singleFamilyRentalInfo);
      }

      console.log("Start adding fake trip equipment data.");
      //fake data for trip equipment
      for (let i = 0; i < totalTripNum; i++) {
        //insert empty data for tripID 16
        if (i === tripID - 1) {
          //for each trip, insert number of group member data
          for (let j = 0; j < equipmentNum; j++) {
            const tripEquipment = new TripEquipment();
            tripEquipment.TripID = i + 1;
            if (j === 0) {
              tripEquipment.MemberType = "master";
              tripEquipment.MemberID = userID2;
              tripEquipment.RentInfo = JSON.stringify({
                masterRentalInfo: {
                  skiInfo: null,
                  snowboardInfo: null,
                  telemarkInfo: null,
                  otherInfo: null
                }
              });
              tripEquipment.ShoeSize = null;
              tripEquipment.Height = null;
              tripEquipment.Weight = null;

              await tripEquipment.save();
            } else {
              tripEquipment.MemberType = "family";
              tripEquipment.MemberID = j;
              tripEquipment.RentInfo = JSON.stringify({
                familyRentalInfo: {
                  skiInfo: null,
                  snowboardInfo: null,
                  telemarkInfo: null,
                  otherInfo: null
                }
              });
              tripEquipment.ShoeSize = null;
              tripEquipment.Height = null;
              tripEquipment.Weight = null;

              await tripEquipment.save();
            }
          }
        } else {
          //for each trip, insert number of group member data
          for (let j = 0; j < equipmentNum; j++) {
            const tripEquipment = new TripEquipment();
            tripEquipment.TripID = i + 1;
            if (j === 0) {
              tripEquipment.MemberType = "master";
              tripEquipment.MemberID = userID2;
              tripEquipment.RentInfo = JSON.stringify({ masterRentalInfo });
              tripEquipment.ShoeSize = 7;
              tripEquipment.Height = 180;
              tripEquipment.Weight = 55;

              await tripEquipment.save();
            } else {
              tripEquipment.MemberType = "family";
              tripEquipment.MemberID = j;
              tripEquipment.RentInfo = JSON.stringify({
                familyRentalInfo: familyRentalInfo[j - 1]
              });
              tripEquipment.ShoeSize = 8;
              tripEquipment.Height = 178;
              tripEquipment.Weight = 65;

              await tripEquipment.save();
            }
          }
        }
      }
      console.log("Finish adding fake trip equipment data.");
    }

    //fake data of trip lift pass table
    if (tripLiftPassCount === 0) {
      let liftPassInfo = [];
      let startDate = moment().subtract(1, "days");
      let endDate = moment().add(1, "days");
      let duration = moment.duration(endDate.diff(startDate));
      let days = Math.round(duration.asDays());
      //console.log(days);

      for (let i = 0; i <= days; i++) {
        let liftPassObj = {};
        let startDate = moment().subtract(1, "days");
        liftPassObj.date = startDate.add(i, "days").format("D MMMM YYYY");
        liftPassObj.adultNumber = 4;
        liftPassObj.adultDuration = "Full Day";
        liftPassObj.childNumber = 0;
        liftPassObj.childDuration = "Full Day";
        liftPassInfo.push(liftPassObj);
      }
      console.log("Start adding fake trip lift pass data.");
      for (let i = 0; i < totalTripNum; i++) {
        const tripLiftPass = new TripLiftPass();
        //insert empty data for tripID 16
        if (i === tripID - 1) {
          tripLiftPass.TripID = i + 1;
          tripLiftPass.IsRemoved = true;
          tripLiftPass.LiftpassInfo = JSON.stringify({ liftPassInfo: null });
        } else {
          tripLiftPass.TripID = i + 1;
          tripLiftPass.IsRemoved = false;
          tripLiftPass.Comment = "Fake Comment";
          tripLiftPass.LiftpassInfo = JSON.stringify({ liftPassInfo });
        }

        await tripLiftPass.save();
      }

      console.log("Finish adding fake trip lift pass data.");
    }
  }

  /*
  REQUEST: {"resortName":"","token":""}
  */
  async enrollNewTrip({ request, response, auth }) {
    try {
      let backToken = request.input("token"); //token that will be sent back to front end
      try {
        if (request.input("provider") === "email") {
          await auth.check();
          //Update new token for email user
          console.log(request.input("token"));
          const validationToken = await ValidationToken.findBy(
            "Token",
            request.input("token")
          );
          const member = await Member.findBy("id", validationToken.MemberID);

          let userToken = await auth.generate(member);
          backToken = userToken.token;
          validationToken.merge({ Token: userToken.token });
          await validationToken.save();
        }
      } catch (err) {
        console.log(err);
        return response.send(JSON.stringify({ status: "ExpiredJWT" }));
      }

      const validationToken = await ValidationToken.findBy("Token", backToken);
      const resortInfo = await ResortInfo.findBy(
        "Name",
        request.input("ResortName")
      );

      let groupMemberId = [];
      await request.input("GroupMember").map(member => {
        groupMemberId.push(member.id);
      });

      const newTrip = new Trip();
      newTrip.ResortID = resortInfo.id;
      newTrip.MasterMemberID = validationToken.MemberID;
      newTrip.IsTripDone = 0;
      newTrip.StartDate = request.input("StartDate");
      newTrip.EndDate = request.input("EndDate");
      newTrip.IsMasterMemberGoing = request.input("IsMasterMemberGoing");
      newTrip.GroupMemberIDs = JSON.stringify({
        family_members: groupMemberId
      });
      await newTrip.save();

      let responseData = {};
      responseData.status = "success";
      responseData.masterID = validationToken.MemberID;
      responseData.token = backToken;
      responseData.tripID = newTrip.id;
      responseData.resortID = resortInfo.id;

      return response.send(JSON.stringify(responseData));
    } catch (err) {
      response.send(JSON.stringify({ status: "fail" }));
      console.log(err);
    }
  }

  async getPopularResorts() {
    //first, get most popular resorts ID from trip table
    //only return the resort ID whose trip is "done"
    try {
      const resortIDs = await Database.table("trips")
        .where({ IsTripDone: 1 })
        .column("ResortID");
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
      let popularResortArray = Object.keys(counts).sort(function(a, b) {
        return counts[b] - counts[a];
      });
      //console.log(popularResortArray);

      let minNum = Math.min(topSix, popularResortArray.length);
      //then, based on the resorts ID, return corresponding resorts information
      let resortInfoArray = [];
      for (let i = 0; i < minNum; i++) {
        let resortID = popularResortArray[i];

        let resortInfo = {};
        const resort = await ResortInfo.findBy("id", resortID);
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
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getPopularResortsByCountry({ params }) {
    try {
      //first, get the country of the user
      const token = params.token;
      //console.log(token);
      const dbMemberID = await Database.table("validation_tokens")
        .where("Token", token)
        .select("MemberID");

      const member = await Member.findBy("id", dbMemberID[0].MemberID);
      const country = member.Country;
      console.log(country);

      //then, get most popular resorts ID from trip table
      //only return the resort ID whose trip is "done"
      const resortIDs = await Database.table("trips")
        .where({ IsTripDone: 1 })
        .column("ResortID");
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
        const resort = await ResortInfo.findBy("id", Object.keys(counts)[i]);
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
        let popularResortArray = identicalResortIDs.sort(function(a, b) {
          return counts[b] - counts[a];
        });
        //console.log(popularResortArray);

        let minNum = Math.min(topSix, popularResortArray.length);
        //then, based on the resorts ID, return corresponding resorts information
        let resortInfoArray = [];
        for (let i = 0; i < minNum; i++) {
          let resortID = popularResortArray[i];

          let resortInfo = {};
          const resort = await ResortInfo.findBy("id", resortID);
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
    } catch (e) {
      console.log(e);
    }
  }

  async getBookingHistory({ params }) {
    try {
      //first, get the user ID
      const token = params.token;
      const dbMemberID = await Database.table("validation_tokens")
        .where("Token", token)
        .select("MemberID");

      //then, get all the trips ID from trip table
      //only return the trip ID of the specific member
      const trips = await Database.table("trips").where({
        MasterMemberID: dbMemberID[0].MemberID
      });
      //console.log(trips);

      if (trips.length > 0) {
        //array contains all the trips
        let tripArray = [];
        for (let i = 0; i < trips.length; i++) {
          let tripInfo = {};
          const resort = await ResortInfo.findBy("id", trips[i].ResortID);
          tripInfo.id = trips[i].id;
          if (trips[i].SubmitDate) {
            tripInfo.submitDate = moment(trips[i].SubmitDate).format(
              "D MMMM YYYY"
            );
          } else {
            tripInfo.submitDate = "-";
          }
          tripInfo.name = resort.Name;
          tripInfo.startDate = moment(trips[i].StartDate).format("D MMMM YYYY");
          tripInfo.endDate = moment(trips[i].EndDate).format("D MMMM YYYY");
          if (trips[i].IsTripDone) {
            tripInfo.status = "Submitted";
            tripInfo.checkButton = "View";
          } else {
            tripInfo.status = "In Progress";
            tripInfo.checkButton = "Continue";
          }
          tripInfo.bookingStep = await this.getBookingStep(
            tripInfo.id,
            tripInfo.name
          );
          tripInfo.masterID = dbMemberID[0].MemberID;
          tripInfo.resortID = trips[i].ResortID;
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
    } catch (e) {
      console.log(e);
    }
  }

  async getBookingStep(tripID, resortName) {
    const trip = await Trip.findBy("id", tripID);
    const stepPrefix = "/booking/" + resortName;
    let bookingStep = null;

    //if the trip has been submitted, go to the trip summary page
    if (trip.IsTripDone) {
      bookingStep = "/trip/" + tripID + "/summary";
    }
    //otherwise, go to the corresponding booking step
    else {
      const tripAccommodation = await Database.table(
        "trip_accommodations"
      ).where("tripID", tripID);

      //if the accommodation step has been completed
      if (tripAccommodation[0]) {
        const tripActivity = await Database.table("trip_activities").where(
          "tripID",
          tripID
        );
        //if the activity step has been completed
        if (tripActivity[0]) {
          const tripEquipment = await Database.table("trip_equipments").where(
            "tripID",
            tripID
          );

          //if the equipment step has been completed
          if (tripEquipment[0]) {
            // const tripLesson = await Database.table('trip_lessons')
            //   .where("tripID", tripID);

            //if the lesson step has been completed, go to the plan summary step
            // if (tripLesson[0]) {
            bookingStep = stepPrefix + "/summary";
            // }
            //otherwise, go to the lesson step
            // else {
            //   bookingStep = stepPrefix + "/learn"
            // }
          }
          //otherwise, go to the equipment step
          else {
            bookingStep = stepPrefix + "/equipment";
          }
        }
        //otherwise, go to the activity step
        else {
          bookingStep = stepPrefix + "/doing";
        }
      }
      //otherwise, go to the accommodation step
      else {
        bookingStep = stepPrefix + "/sleep";
      }
    }
    return bookingStep;
  }

  async getTripSummary({ params }) {
    try {
      const tripID = params.id;
      console.log(tripID);
      const dbTrip = await Trip.findBy("id", tripID);
      const resort = await ResortInfo.findBy("id", dbTrip.ResortID);
      const tripAccommodation = await TripAccommodation.findBy(
        "TripID",
        tripID
      );
      const tripActivity = await TripActivity.findBy("TripID", tripID);
      const tripLiftPass = await TripLiftPass.findBy("TripID", tripID);
      //add trip basic info
      let tripInfo = {};
      tripInfo.place = resort.Name;
      const startDate = moment(dbTrip.StartDate);
      const endDate = moment(dbTrip.EndDate);
      const duration = moment.duration(endDate.diff(startDate));
      const days = Math.round(duration.asDays());
      tripInfo.startDate = startDate.format("D MMMM YYYY");
      tripInfo.endDate = endDate.format("D MMMM YYYY");
      tripInfo.submitDate = moment(dbTrip.SubmitDate).format("D MMMM YYYY");
      tripInfo.comment = dbTrip.Comment;
      tripInfo.days = days + 1;
      //add member info (information on who are going to the trip)
      let memberInfoArray = [];
      const activityArray = [
        "ski",
        "snowboard",
        "telemark",
        "snowbike",
        "snowshoe",
        "snowmobile"
      ];
      //activity based rental information
      let rentalInfo = {};
      //if master member is going, add his information
      if (dbTrip.IsMasterMemberGoing === 1) {
        const member = await Member.findBy("id", dbTrip.MasterMemberID);
        const tripEquipmentMaster = await TripEquipment.findBy({
          TripID: tripID,
          MemberType: "master",
          MemberID: dbTrip.MasterMemberID
        });
        let name = "";
        if (member.Firstname !== null && member.Lastname !== null) {
          name = member.Firstname + " " + member.Lastname;
        }
        let memberInfo = {};
        memberInfo.name = name;
        memberInfo.dob = moment(member.DOB).format("D MMMM YYYY");
        memberInfo.disability = member.IsDisabled;

        memberInfo.shoeSize = tripEquipmentMaster.ShoeSize;
        memberInfo.weight = tripEquipmentMaster.Weight;
        memberInfo.height = tripEquipmentMaster.Height;

        //add master rental information
        let masterRentalInfo = JSON.parse(tripEquipmentMaster.RentInfo)
          .masterRentalInfo;
        rentalInfo.skiInfo = masterRentalInfo.skiInfo;
        rentalInfo.snowboardInfo = masterRentalInfo.snowboardInfo;
        rentalInfo.telemarkInfo = masterRentalInfo.telemarkInfo;
        rentalInfo.otherInfo = masterRentalInfo.otherInfo;

        //add master member activity information
        let masterActivity = JSON.parse(tripActivity.MasterMemberActivity);
        //masterActivity = {2: master_activity}
        // master_activity = {
        //   activity: [true, true, true, true, true, true],
        //   ability: [2, 2, 2, 2, 2],
        //   skipEquipmentLesson: false
        // };
        let activityBoolArray = masterActivity[2].activity;
        let memberActivityArray = [];
        for (let i = 0; i < activityBoolArray.length; i++) {
          if (activityBoolArray[i]) {
            memberActivityArray.push(activityArray[i]);
          }
        }
        memberInfo.activity = memberActivityArray;

        //memberInfo.activityAbility = masterActivity[2].ability;

        memberInfoArray.push(memberInfo);
      }
      //add group member information
      let familyMemberArray = JSON.parse(dbTrip.GroupMemberIDs).family_members;
      //[1, 2, 3]
      let familyActivity = JSON.parse(tripActivity.GroupMemberActivity);
      // familyActivity = {
      //   1: family_activity,
      //   2: family_activity,
      //   3: family_activity
      // };
      // family_activity = {
      //   activity: [true, false, false, false, false, false],
      //   ability: [3, 3, 3, 3, 3],
      //   skipEquipmentLesson: false
      // };

      //add family member information
      for (let i = 0; i < familyMemberArray.length; i++) {
        let familyMemberID = familyMemberArray[i];
        //console.log(familyMemberID);
        const familyMember = await FamilyMember.findBy("id", familyMemberID);
        const tripEquipmentFamily = await TripEquipment.findBy({
          TripID: tripID,
          MemberType: "family",
          MemberID: familyMemberID
        });
        let name = "";
        if (familyMember.FirstName !== null && familyMember.LastName !== null) {
          name = familyMember.FirstName + " " + familyMember.LastName;
        }
        let memberInfo = {};
        let familyRentalInfo = {};
        memberInfo.name = name;
        memberInfo.dob = moment(familyMember.DOB).format("D MMMM YYYY");
        memberInfo.disability = familyMember.IsDisabled;

        memberInfo.shoeSize = tripEquipmentFamily.ShoeSize;
        memberInfo.weight = tripEquipmentFamily.Weight;
        memberInfo.height = tripEquipmentFamily.Height;

        //add family rental information

        familyRentalInfo = JSON.parse(tripEquipmentFamily.RentInfo)
          .familyRentalInfo;

        //only when family individual rental information is not null
        if (familyRentalInfo.skiInfo !== null) {
          if (rentalInfo.skiInfo !== null) {
            rentalInfo.skiInfo = rentalInfo.skiInfo.concat(
              familyRentalInfo.skiInfo
            );
          } else {
            rentalInfo.skiInfo = familyRentalInfo.skiInfo;
          }
        }

        if (familyRentalInfo.snowboardInfo !== null) {
          if (rentalInfo.skiInfo !== null) {
            rentalInfo.snowboardInfo = rentalInfo.snowboardInfo.concat(
              familyRentalInfo.snowboardInfo
            );
          } else {
            rentalInfo.snowboardInfo = familyRentalInfo.snowboardInfo;
          }
        }

        if (familyRentalInfo.telemarkInfo !== null) {
          if (rentalInfo.skiInfo !== null) {
            rentalInfo.telemarkInfo = rentalInfo.telemarkInfo.concat(
              familyRentalInfo.telemarkInfo
            );
          } else {
            rentalInfo.telemarkInfo = familyRentalInfo.telemarkInfo;
          }
        }

        if (familyRentalInfo.otherInfo !== null) {
          if (rentalInfo.otherInfo !== null) {
            rentalInfo.otherInfo = rentalInfo.otherInfo.concat(
              familyRentalInfo.otherInfo
            );
          } else {
            rentalInfo.otherInfo = familyRentalInfo.otherInfo;
          }
        }

        //add group member activity information
        let familyActivityBoolArray = familyActivity[i + 1].activity;
        //console.log(familyActivityBoolArray);
        let memberActivityArray = [];
        for (let i = 0; i < familyActivityBoolArray.length; i++) {
          if (familyActivityBoolArray[i]) {
            memberActivityArray.push(activityArray[i]);
          }
        }
        memberInfo.activity = memberActivityArray;

        //memberInfo.activityAbility = familyActivity[i + 1].ability;

        memberInfoArray.push(memberInfo);
      }

      //add accommodation information
      let accommodationInfo = {};

      accommodationInfo.type = tripAccommodation.AccoType;
      accommodationInfo.category = tripAccommodation.AccoCate;
      accommodationInfo.adultNum = tripAccommodation.NumOfAdults;
      accommodationInfo.childNum = tripAccommodation.NumOfChildren;
      accommodationInfo.todNum = tripAccommodation.NumOfToddlers;
      accommodationInfo.bedNum = tripAccommodation.NumOfBedroom;
      accommodationInfo.bathNum = tripAccommodation.NumOfBathroom;
      accommodationInfo.requirement = tripAccommodation.Requirement;

      //add liftPass information
      let liftPassInfo = {};
      //first time to go to summary page
      if (tripLiftPass === null) {
        let liftPassArray = [];
        //console.log(days);

        for (let i = 0; i <= days; i++) {
          let liftPassObj = {};
          let firstDate = startDate;
          liftPassObj.date = firstDate.add(i, "days").format("D MMMM YYYY");
          liftPassObj.adultNumber = memberInfoArray.length;
          liftPassObj.adultDuration = "Full Day";
          liftPassObj.childNumber = 0;
          liftPassObj.childDuration = "Full Day";
          liftPassArray.push(liftPassObj);
        }

        liftPassInfo.isRemoved = false;
        liftPassInfo.comment = "";
        liftPassInfo.liftPassArray = liftPassArray;
      } else {
        liftPassInfo.isRemoved = tripLiftPass.IsRemoved;
        liftPassInfo.comment = tripLiftPass.Comment;
        liftPassInfo.liftPassArray = JSON.parse(
          tripLiftPass.LiftpassInfo
        ).liftPassInfo;
      }

      //console.log(rentalInfo);
      return JSON.stringify({
        tripInfo: tripInfo,
        memberInfo: memberInfoArray,
        accommodationInfo: accommodationInfo,
        liftPassInfo: liftPassInfo,
        rentalInfo: rentalInfo
      });
    } catch (e) {
      console.log(e);
    }
  }

  async completeTrip({ request }) {
    try {
      const requestData = request.all();
      const dbTrip = await Trip.findBy("id", requestData.tripID);

      dbTrip.merge({
        Comment: requestData.comment,
        IsTripDone: true,
        SubmitDate: requestData.submitDate
      });

      await dbTrip.save();

      return JSON.stringify({
        completeTripSuccess: true
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify({
        completeTripSuccess: false
      });
    }
  }

  async checkTokenAuth({ request, response, auth }) {
    try {
      let backToken = request.input("token"); //token that will be sent back to front end
      try {
        if (request.input("provider") === "email") {
          await auth.check();
          const validationToken = await ValidationToken.findBy(
            "Token",
            request.input("token")
          );
          const member = await Member.findBy("id", validationToken.MemberID);

          let userToken = await auth.generate(member);
          backToken = userToken.token;
          validationToken.merge({ Token: userToken.token });
          await validationToken.save();
        }
      } catch (e) {
        console.log(e);
        return response.send(JSON.stringify({ status: "ExpiredJWT" }));
      }
      let responseData = {};
      responseData.status = "success";
      responseData.token = backToken;
      return response.send(JSON.stringify(responseData));
    } catch (e) {
      response.send(JSON.stringify({ status: "fail" }));
      console.log(e);
    }
  }
}

module.exports = TripController;
