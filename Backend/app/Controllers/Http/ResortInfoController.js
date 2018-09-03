'use strict'

const csv = require('csvtojson');
const csvFilePath = '';


class ResortInfoController {
  async pushResortInfo() {
    const jsonArray = await csv().fromFile(csvFilePath);

  }
}

module.exports = ResortInfoController
