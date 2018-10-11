'use strict';
const TripLiftPass = use('App/Models/TripLiftpass');

class TripLiftpassController {

  async updateLiftPassInfo({request}) {

    const requestData = request.all();

    try {

      const dbTripLiftPass = await TripLiftPass.findBy("TripID", requestData.tripID);
      if (requestData.isRemoved) {

        let tripLiftPass;
        if (dbTripLiftPass === null) {
          tripLiftPass = new TripLiftPass();
        }
        else {
          tripLiftPass = dbTripLiftPass;
        }
        tripLiftPass.TripID = requestData.tripID;
        tripLiftPass.IsRemoved = true;

        await tripLiftPass.save();
      }
      else {
        let tripLiftPass;
        if (dbTripLiftPass === null) {
          tripLiftPass = new TripLiftPass();
        }
        else {
          tripLiftPass = dbTripLiftPass;
        }
        tripLiftPass.TripID = requestData.tripID;
        tripLiftPass.IsRemoved = false;
        tripLiftPass.Comment = requestData.comment;
        tripLiftPass.LiftpassInfo = JSON.stringify({liftPassInfo: requestData.liftPassInfo});

        await tripLiftPass.save();
      }

      return JSON.stringify({
        saveLiftPassSuccess: true
      });
    }
    catch (e) {
      console.log(e);
      return JSON.stringify({
        saveLiftPassSuccess: false
      });
    }

  }
}

module.exports = TripLiftpassController;
