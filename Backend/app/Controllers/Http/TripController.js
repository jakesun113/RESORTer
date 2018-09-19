'use strict'
const Database = use('Database');
const Trip = use('App/Models/Trip');
const ResortInfo = use('App/Models/ResortInfo');
const ValidationToken = use("App/Models/ValidationToken");
/**

 */
class TripController {

  /*
  REQUEST: {"resortName":"","token":""}
  */
  async enrollNewTrip({response}){

    try{

      const validationToken = await ValidationToken.findBy('Token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTUzNzMxNjAyNywiZXhwIjoxNTM3MzE2MDU3fQ.WJi_fO8uWojhLhv98qA5vtWHuStiBUBxsdWzpcsWSCU');
      const resortInfo = await ResortInfo.findBy('Name', 'Mt. Buller');

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

    }catch (err){

      response.send(JSON.stringify({status:'fail'}))
      console.log(err)

    }
  }

}

module.exports = TripController
