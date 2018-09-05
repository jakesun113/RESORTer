'use strict';

/*
Request JSON
{
  MasterEmail:""
  FirstName:"",
  LastName:"",
  Gender:"",
  DOB:"XXXX-XX-XX",
  AbilityLevel:
    { SkiAbility:"",SnowboardAbility:"",TelemarkAbility:"",SnowbikeAbility:"",SnowmobileAbility:"",SnowshoeAbility:"" },
  Disability:
    { IsDisabled:"0 or 1",DisabilityMembership:"",DisabilityMembershipID:"",DisabilityDetail:"" }
}
*/
/**
 * Deal with Family Member table
 * add a new group member - "addMember"
 */
class FamilyMemberController {

  async addMember({request, response, auth}) {
    try {

      try {
        await auth.check();
      }
      catch (err) {
        console.log(err);
        return response.send(JSON.stringify({status: 'ExpiredJWT'}))
      }

      const requestData = request.post();
      const Member = use('App/Models/Member');
      const ValidationToken = use('App/Models/ValidationToken');
      const newGroupMember = use('App/Models/FamilyMember');

      const validationToken = await ValidationToken.findBy('Token', request.input('token'));
      const member = await Member.findBy('id', validationToken.MemberID);


      let userToken = await auth.generate(member);
      validationToken.merge({Token: userToken.token});
      await validationToken.save();

      const newMember = new newGroupMember();
      newMember.memberID = validationToken.MemberID,
        newMember.FirstName = request.input('FirstName'),
        newMember.LastName = request.input('LastName'),
        newMember.Gender = request.input('Gender'),
        newMember.DOB = request.input('DOB'),
        newMember.SkiAbility = JSON.parse(requestData.AbilityLevel).SkiAbility,
        newMember.SnowboardAbility = JSON.parse(requestData.AbilityLevel).SnowboardAbility,
        newMember.TelemarkAbility = JSON.parse(requestData.AbilityLevel).TelemarkAbility,
        newMember.SnowbikeAbility = JSON.parse(requestData.AbilityLevel).SnowbikeAbility,
        newMember.SnowmobileAbility = JSON.parse(requestData.AbilityLevel).SnowmobileAbility,
        newMember.SnowshoeAbility = JSON.parse(requestData.AbilityLevel).SnowshoeAbility,
        newMember.IsDisabled = JSON.parse(requestData.Disability).IsDisabled,
        newMember.DisabilityMembership = JSON.parse(requestData.Disability).DisabilityMembership,
        newMember.DisabilityMembershipID = JSON.parse(requestData.Disability).DisabilityMembershipID,
        newMember.DisabilityDetail = JSON.parse(requestData.Disability).DisabilityDetail
      await newMember.save();

      return response.send(JSON.stringify({
        status: 'success',
        Name: requestData.FirstName + requestData.LastName,
        token: userToken.token
      }));

    } catch (err) {
      console.log(err);
      return response.send(JSON.stringify({status: 'fail', reason: 'Database Error'}))
    }
  }
}

module.exports = FamilyMemberController;
