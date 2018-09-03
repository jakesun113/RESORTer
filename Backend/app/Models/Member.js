'use strict'

const Model = use('Model')
const Hash = use('Hash')

class Member extends Model {

  familyMembers() {
    return this.hasMany('App/Models/FamilyMember')
  }

}

module.exports = Member

