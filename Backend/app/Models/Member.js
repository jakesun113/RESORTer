'use strict'

const Model = use('Model')

class Member extends Model {

  familyMembers() {
    return this.hasMany('App/Models/FamilyMember')
  }

  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'MemberHook.hashPassword')
    this.addHook('beforeUpdate', 'MemberHook.hashPassword')
  }
}

module.exports = Member

