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
  async enrollNewTrip({request,response}){

    try{
      console.log(request.all())
      const validationToken = await ValidationToken.findBy('Token',request.input('token'));
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

    }catch (err){

      response.send(JSON.stringify({status:'fail'}))
      console.log(err)

    }
  }

}

module.exports = TripController
