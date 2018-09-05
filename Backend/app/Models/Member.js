'use strict'

const Model = use('Model')

class Member extends Model {

  familyMembers() {
    return this.hasMany('App/Models/FamilyMember')
  }
}

module.exports = Member

