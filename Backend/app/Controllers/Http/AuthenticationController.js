'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");

class AuthenticationController {
  async check({request, auth}) {
    //token is valid
    try {
      const isTokenValid = await auth.check();
      console.log(isTokenValid);

      console.log("token valid");

      const requestData = request.all();

      const token = requestData.token;

      const dbMemberID = await Database.table('validation_tokens')
        .where("Token", token).select('MemberID');

      const member = await Member.findBy('id', dbMemberID[0].MemberID);

      const dbToken = await Token.findBy({
        'MemberID': dbMemberID[0].MemberID,
        'Type': "EmailLogin"
      });
      const newToken = await auth.generate(member);
      console.log(newToken);
      //only change token
      dbToken.merge({Token: newToken.token});
      await dbToken.save();

      return JSON.stringify({
        tokenValid: true,
        token: dbToken.Token
      })

    }
    //token is not valid
    catch (e) {
      console.log('token expired');
      console.log(e);
      return JSON.stringify({
        tokenValid: false
      });
    }
  }
}

module.exports = AuthenticationController;
