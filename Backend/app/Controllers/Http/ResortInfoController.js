'use strict';
const Database = use("Database");
const Resorts = use("App/Models/ResortInfo");
const csv = require('csvtojson');
const csvFilePath = "Data/Resorts.csv";


class ResortInfoController {

  //import resort data from csv
  async getResortInfo() {
    const resortCount = await Resorts.getCount();
    //console.log(resortCount);
    //import data only when the ResortInfo table is empty
    if (resortCount === 0) {
      const jsonArray = await csv().fromFile(csvFilePath);
      //console.log(jsonArray.length);
      console.log("Start loading resorts data.");
      for (let i = 0; i < jsonArray.length; i++) {
        const resort = new Resorts();
        resort.Name = jsonArray[i].Name;
        resort.Longitude = jsonArray[i].Longitude;
        resort.Latitude = jsonArray[i].Latitude;
        resort.Image = jsonArray[i].Image;
        resort.Description = jsonArray[i].Description;
        resort.IsOnBoard = jsonArray[i].IsOnBoard;
        resort.Logo = jsonArray[i].Logo;
        resort.Country = jsonArray[i].Country;
        resort.Continent = jsonArray[i].Continent;
        resort.Union = jsonArray[i].Union;
        resort.WixID = jsonArray[i].WixID;
        resort.Owner = jsonArray[i].Owner;
        resort.OwnerEmail = jsonArray[i].OwnerEmail;
        await resort.save();
        console.log(i);
      }

      console.log("Finish loading resorts data.");
    }
    else {
      console.log("You have loaded resorts data.")
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

    //TODO: get liftPass from database table (may change the position of the method)
    //const countryName = await Database.table('resort_infos').column('Country').distinct();
    //console.log(liftPassName);
    let liftPassArray = [];
    for (let i = 0; i < liftPassName.length; i++) {
      //TODO: column may subject to change
      liftPassArray[i] = liftPassName[i].LiftPass;
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

    //TODO: query the database table to get resorts name based on the liftPass
    // const resortName = await Database.table('resort_infos')
    //   .where("Country", country).select('Name');

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

}

module.exports = ResortInfoController;
