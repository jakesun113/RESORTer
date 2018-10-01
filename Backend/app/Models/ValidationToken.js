'use strict'

const Model = use('Model')

class ValidationToken extends Model {
  member() {
    return this.belongsTo('App/Models/Member');
  }
}

module.exports = ValidationToken
