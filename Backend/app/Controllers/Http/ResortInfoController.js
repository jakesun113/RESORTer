'use strict';
const Database = use("Database");
const Resorts = use("App/Models/ResortInfo");
const LiftPass = use("App/Models/Liftpass");
const ResortLiftPass = use("App/Models/ResortLiftpass");
const csv = require('csvtojson');
const resortInfo = "Data/Resorts.csv";
const onBoard = "Data/isOnBoard.csv";
const image = "Data/Image.csv";
const liftPass = "Data/LiftPass.csv";
const resortLiftPass = "Data/ResortLiftPass.csv";


class ResortInfoController {

  //import resort data from csv
  async getResortInfo() {
    const resortCount = await Resorts.getCount();
    const liftPassCount = await LiftPass.getCount();
    const resortLiftPassCount = await ResortLiftPass.getCount();
    //console.log(resortCount);
    //import data only when the ResortInfo table is empty
    if (resortCount === 0) {
      const resortArray = await csv().fromFile(resortInfo);
      const onBoardArray = await csv().fromFile(onBoard);
      const imageArray = await csv().fromFile(image);
      //console.log(jsonArray.length);
      console.log("Start loading resorts data.");
      for (let i = 0; i < resortArray.length; i++) {
        const resort = new Resorts();
        resort.Name = resortArray[i].Name;
        resort.Longitude = resortArray[i].longitude;
        resort.Latitude = resortArray[i].latitude;
        resort.Description = resortArray[i].description;
        resort.IsOnBoard = onBoardArray[i].isOnBoard;
        resort.Logo = resortArray[i].logo;
        resort.Country = resortArray[i].Country;
        resort.Continent = resortArray[i].Continent;
        resort.Union = resortArray[i].Union;
        resort.WixID = resortArray[i].ID;
        resort.Owner = resortArray[i].Owner;
        resort.OwnerEmail = resortArray[i].Email;
        if(imageArray[i].image !== null){
          resort.Image = imageArray[i].image;
        }
        await resort.save();
        console.log(i);
      }
      console.log("Finish loading resorts data.");
    }

    if (liftPassCount === 0) {
      const jsonArray = await csv().fromFile(liftPass);
      //console.log(jsonArray.length);
      console.log("Start loading liftpass data.");
      for (let i = 0; i < jsonArray.length; i++) {
        const liftPass = new LiftPass();
        liftPass.Name = jsonArray[i].Name;
        liftPass.WixID = jsonArray[i].WixID;
        await liftPass.save();
        //console.log(i);
      }

      console.log("Finish loading liftpass data.");
    }

    //import data only when the ResortLiftpass table is empty
    if (resortLiftPassCount === 0) {
      const jsonArray = await csv().fromFile(resortLiftPass);
      //console.log(jsonArray.length);
      console.log("Start loading resortLiftpass data.");
      for (let i = 0; i < jsonArray.length; i++) {
        const resortLiftPass = new ResortLiftPass();
        resortLiftPass.ResortWixID = jsonArray[i].ResortWixID;
        resortLiftPass.LiftpassWixID = jsonArray[i].LiftpassWixID;
        await resortLiftPass.save();
        //console.log(i);
      }

      console.log("Finish loading resortLiftpass data.");
    }


  }


  //get the list of all the countries
  async getCountry() {

    const countryName = await Database.table('resort_infos').column('Country').distinct();
    //console.log(countryName);
    let countryArray = [];
    for (let i = 0; i < countryName.length; i++) {
      countryArray[i] = countryName[i].Country;
    }

    //console.log(countryArray);

    const sortedCountryArray = countryArray.sort();
    //console.log(sortedCountryArray);

    return JSON.stringify({
      sortedCountryArray
    });

  }

  //get the list of all the liftPasses
  async getLiftPass() {

    const liftPassName = await Database.table('liftpasses').column('Name');
    //console.log(liftPassName);
    let liftPassArray = [];
    for (let i = 0; i < liftPassName.length; i++) {
      liftPassArray[i] = liftPassName[i].Name;
    }

    //console.log(liftPassArray);

    const sortedLiftPassArray = liftPassArray.sort();
    //console.log(sortedCountryArray);

    return JSON.stringify({
      sortedLiftPassArray
    });

  }

  //based on the country, get the list of resorts
  async getResortsByCountry({request}) {

    const requestData = request.all();
    const country = requestData.country;

    const resortName = await Database.table('resort_infos')
      .where("Country", country).select('Name');

    let resortArray = [];

    for (let i = 0; i < resortName.length; i++) {
      resortArray[i] = resortName[i].Name;
    }

    //console.log(resortArray);

    const sortedResortArray = resortArray.sort();
    //console.log(sortedResortArray);
    return JSON.stringify({
      sortedResortArray
    });

  }

  //based on the lift pass, get the list of resorts
  async getResortsByLiftPass({request}) {

    const requestData = request.all();
    const liftPass = requestData.liftPass;

    const liftPassID = await Database.table('liftpasses').where("Name", liftPass).select('WixID');
    //console.log(liftPassID);
    const resortIDList = await Database.table('resort_liftpasses')
      .where("LiftpassWixID", liftPassID[0].WixID).select('ResortWixID');

    //console.log(resortIDList);
    let resortArray = [];

    for (let i = 0; i < resortIDList.length; i++) {
      //resortIDArray[i] = resortIDList[i].ResortWixID;
      const resortName = await Database.table('resort_infos')
        .where("WixID", resortIDList[i].ResortWixID).select('Name');

      //append each resort into the array
      resortArray.push(resortName[0].Name);
    }

    //console.log(resortArray);

    const sortedResortArray = resortArray.sort();
    //console.log(sortedResortArray);
    return JSON.stringify({
      sortedResortArray
    });

  }

}

module.exports = ResortInfoController;
