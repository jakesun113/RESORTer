'use strict';
const Member = use('App/Models/Member');
const ValidationToken = use('App/Models/ValidationToken');
const FamilyMember = use('App/Models/FamilyMember');
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

  async deleteMember({response, request,auth}){

    try{

      if(request.input('provider') === "email"){
      //1) if token expired
      try{

        await auth.check()

      }catch(err){

        console.log(err);
        return response.send(JSON.stringify({status: 'ExpiredJWT'}))

      }
      //2) Delete familyMember
      const familyMember = await FamilyMember.find(request.input('id'));
      await familyMember.delete()

      //3) Generate new Token and merge old one
      const validationToken = await ValidationToken.findBy('Token', request.input('token'));
      const member = await Member.findBy('id', validationToken.MemberID);


      let userToken = await auth.generate(member);
      validationToken.merge({Token: userToken.token});
      await validationToken.save();

      return response.send(JSON.stringify({status:'success',token:userToken.token}))
    }
    //Login with facebook and google,no need check the token
    else{

      // Delete familyMember
      const familyMember = await FamilyMember.find(request.input('id'));
      await familyMember.delete()

      return response.send(JSON.stringify({status:'success',token:request.input('token')}))

    }
    }catch(err){
      console.log(err)
      return response.send(JSON.stringify({status:'fail'}))
    }
  }
  async acquireGroupMember({response,params}){

    try{
      const validationToken = await ValidationToken.findBy('Token', params.token);
      const familyMember = await FamilyMember
                      .query()
                      .where('MemberID', '=', validationToken.MemberID)
                      .fetch()

      return response.send(familyMember.toJSON());

    }catch (err){

      console.log(err)

    }
  }
  async addMember({request, response, auth}) {
    try {

      if(request.input('provider') === "email"){
      try {
        await auth.check();
      }
      catch (err) {
        console.log(err);
        return response.send(JSON.stringify({status: 'ExpiredJWT'}))
      }

      const requestData = request.post();

      const validationToken = await ValidationToken.findBy('Token', request.input('token'));
      const member = await Member.findBy('id', validationToken.MemberID);


      let userToken = await auth.generate(member);
      validationToken.merge({Token: userToken.token});
      await validationToken.save();

      const newMember = new FamilyMember();
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
        token: userToken.token,
        addMember:newMember
      }));
    }
    //Login with facebook and google, no need to check the token
    else{
      const requestData = request.post();

      const validationToken = await ValidationToken.findBy('Token', request.input('token'));

      const newMember = new FamilyMember();
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
        token: request.input('token'),
        addMember:newMember
      }));

    }
    } catch (err) {
      console.log(err);
      return response.send(JSON.stringify({status: 'fail', reason: 'Database Error'}))
    }
  }
}

module.exports = FamilyMemberController;
