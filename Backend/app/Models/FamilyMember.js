'use strict'

const Model = use('Model')

class FamilyMember extends Model {
  member() {
    return this.belongsTo('App/Models/Member');
  }
}

module.exports = FamilyMember
