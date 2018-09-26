'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");
const Encryption = use('Encryption');

/**
 * deal with Validation Token table
 * login - "loginWithEmail" (generate new token or update token)
 * login with social account - "loginWithFacebook", "loginWithGoogle" (act like register)
 * verify token - "check"
 */
class ValidationTokenController {

  async loginWithEmail({request, auth}) {

    const requestData = request.all();

    try {
      const email = requestData.email;
      const password = requestData.password;
      const provider = requestData.provider;

      const dbEmail = await Database.table('members')
        .where("Email", email).select('Email');

      //console.log(dbEmail);

      //email does not exist
      if (dbEmail.length <= 0) {

        console.log("email does not exist");
        return JSON.stringify({
          emailExisted: false,
          authenticationFailed: false
        });
      }
      //email is duplicated
      else {

        const dbProvider = await Database.table('members')
          .where("Email", email).select('Provider');

        // console.log(dbProvider);

        if (provider !== dbProvider[0].Provider) {
          console.log("email is duplicated");
          return JSON.stringify({
            emailExisted: true,
            emailDuplicated: true,
            duplicatedProvider: dbProvider[0].Provider,
            authenticationFailed: false
          });
        }
        else {
          const dbActive = await Database.table('members')
            .where("Email", email).select('IsActive');

          //not active account
          if (dbActive[0].IsActive === 0) {
            console.log("email is not activated");
            return JSON.stringify({
              emailExisted: true,
              emailDuplicated: false,
              isActive: false,
              authenticationFailed: false
            });
          }
          else {

            const dbpwd = await Database.table('members')
              .where("Email", email).select('EncryptedPW');

            //console.log(dbpwd[0].EncryptedPW);

            const decrptPwd = Encryption.decrypt(dbpwd[0].EncryptedPW);
            //wrong password
            if (password !== decrptPwd) {
              console.log("wrong password");
              return JSON.stringify({
                emailExisted: true,
                emailDuplicated: false,
                isActive: true,
                wrongPwd: true,
                authenticationFailed: false
              });
            }
            //all correct
            else {

              const dbMemberID = await Database.table('members')
                .where("Email", email).select('id');

              const dbPortrait = await Database.table('members')
                .where("Email", email).select('Portrait');

              //console.log(dbPortrait)

              const member = await Member.findBy('Email', email);

              let userName = "";
              if (member.Firstname !== null && member.Lastname !== null) {
                userName = member.Firstname + " " + member.Lastname;
              }
              //console.log(userName);
              // const newToken = await auth.withRefreshToken().attempt(email, dbpwd[0].EncryptedPW);

              const newToken = await auth.generate(member);
              //console.log(newToken);

              const dbToken = await Token.findBy({
                'MemberID': dbMemberID[0].id,
                'Type': "EmailLogin"
              });

              // console.log(dbToken);

              //first time log in, generate new token for the user
              if (dbToken === null) {

                console.log("login success - first time");

                const token = new Token();

                token.Token = newToken.token;
                token.Type = "EmailLogin";
                token.MemberID = Database.select('id').from('members').where('Email', email);

                await token.save();

                return JSON.stringify({
                  emailExisted: true,
                  emailDuplicated: false,
                  isActive: true,
                  wrongPwd: false,
                  token: token.Token,
                  name: userName,
                  isProfileComplete: member.IsProfileComplete,
                  user_pic: dbPortrait[0].Portrait,
                  authenticationFailed: false
                });
              }
              //already log in before , update token
              else {
                console.log("login success - already before");
                //only change token
                dbToken.merge({Token: newToken.token});
                await dbToken.save();

                return JSON.stringify({
                  emailExisted: true,
                  emailDuplicated: false,
                  isActive: true,
                  wrongPwd: false,
                  token: dbToken.Token,
                  name: userName,
                  isProfileComplete: member.IsProfileComplete,
                  user_pic: dbPortrait[0].Portrait,
                  authenticationFailed: false
                });
              }
            }
          }
        }
      }
    }
    catch (e) {
      console.log('authentication failed');
      //console.log(e);
      return JSON.stringify({
        authenticationFailed: true
      });
    }
  }

  async loginWithFacebook({request}) {

    console.log(request.all());

    try {
      const requestData = request.all();

      const dbEmail = await Database.table('members')
        .where("Email", requestData.email).select('Email');

      //if the email still not recorded into the database
      if (dbEmail.length <= 0) {
        console.log('first time log in');

        const member = new Member();
        const token = new Token();

        const name = requestData.name.split(" ");
        member.Firstname = name[0];
        member.Lastname = name[1];
        member.Email = requestData.email;
        member.Provider = requestData.provider;
        member.Portrait = requestData.provider_pic;
        member.IsActive = true;

        token.Token = requestData.token;
        token.Type = "FacebookLogin";
        token.MemberID = Database.select('id').from('members').where('Email', requestData.email);

        await member.save();
        await token.save();

        return JSON.stringify({
          facebookDuplicated: false,
          duplicatedProvider: "",
          isProfileComplete: member.IsProfileComplete,
          authenticationFailed: false
        });
      }
      else {
        const dbProvider = await Database.table('members')
          .where("Email", requestData.email).select('Provider');

        if (requestData.provider !== dbProvider[0].Provider) {
          console.log("email is duplicated");
          return JSON.stringify({
            facebookDuplicated: true,
            duplicatedProvider: dbProvider[0].Provider,
            authenticationFailed: false
          });
        }
        else {
          console.log('already logged in before');

          const dbMemberID = await Database.table('members')
            .where("Email", requestData.email).select('id');

          const dbIsProfileComplete = await Database.table('members')
            .where("Email", requestData.email).select('IsProfileComplete');

          const token = await Token.findBy('MemberID', dbMemberID[0].id);
          //only change token
          token.merge({Token: requestData.token});
          await token.save();
          return JSON.stringify({
            facebookDuplicated: false,
            duplicatedProvider: "",
            isProfileComplete: dbIsProfileComplete[0].IsProfileComplete,
            authenticationFailed: false
          });
        }
      }
    }
    catch (e) {
      console.log('authentication failed');
      // console.log(e);
      return JSON.stringify({
        authenticationFailed: true
      });
    }
  }

  async loginWithGoogle({request}) {

    console.log(request.all());

    try {
      const requestData = request.all();

      const dbEmail = await Database.table('members')
        .where("Email", requestData.email).select('Email');

      //if the email still not recorded into the database
      if (dbEmail.length <= 0) {
        console.log('first time log in');
        const member = new Member();
        const token = new Token();

        const name = requestData.name.split(" ");
        member.Firstname = name[0];
        member.Lastname = name[1];
        member.Email = requestData.email;
        member.Provider = requestData.provider;
        member.Portrait = requestData.provider_pic;
        member.IsActive = true;

        token.Token = requestData.token;
        token.Type = "GoogleLogin";
        token.MemberID = Database.select('id').from('members').where('Email', requestData.email);

        await member.save();
        await token.save();
        return JSON.stringify({
          googleDuplicated: false,
          duplicatedProvider: "",
          isProfileComplete: member.IsProfileComplete,
          authenticationFailed: false
        });
      }
      else {
        const dbProvider = await Database.table('members')
          .where("Email", requestData.email).select('Provider');

        if (requestData.provider !== dbProvider[0].Provider) {
          console.log("email is duplicated");
          return JSON.stringify({
            googleDuplicated: true,
            duplicatedProvider: dbProvider[0].Provider,
            authenticationFailed: false
          });
        }
        else {
          console.log('already logged in before');

          const dbMemberID = await Database.table('members')
            .where("Email", requestData.email).select('id');

          const dbIsProfileComplete = await Database.table('members')
            .where("Email", requestData.email).select('IsProfileComplete');

          const token = await Token.findBy('MemberID', dbMemberID[0].id);
          //only change token
          token.merge({Token: requestData.token});
          await token.save();
          return JSON.stringify({
            googleDuplicated: false,
            duplicatedProvider: "",
            isProfileComplete: dbIsProfileComplete[0].IsProfileComplete,
            authenticationFailed: false
          });
        }
      }
    }
    catch (e) {
      console.log('authentication failed');
      console.log(e);
      return JSON.stringify({
        authenticationFailed: true
      });
    }
  }

  async check({request, auth}) {
    //token is valid
    try {
      //console.log(request.all())
      const isTokenValid = await auth.check();
      //console.log(isTokenValid);

      //console.log("token valid");

      const requestData = request.all();
      //console.log(requestData);
      const token = requestData.token;
      const dbMemberID = await Database.table('validation_tokens')
        .where("Token", token).select('MemberID');

      const member = await Member.findBy('id', dbMemberID[0].MemberID);

      const dbToken = await Token.findBy({
        'MemberID': dbMemberID[0].MemberID,
        'Type': "EmailLogin"
      });
      const newToken = await auth.generate(member);
      //console.log(newToken);
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

module.exports = ValidationTokenController;
