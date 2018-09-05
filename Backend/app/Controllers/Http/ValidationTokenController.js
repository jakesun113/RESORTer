'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");
const Encryption = use('Encryption');

/**
 * deal with login related function.
 * create or update token when users log in
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

      // console.log(dbEmail);

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

              const dbFirstName = await Database.table('members')
                .where("Email", email).select('Firstname');

              const dbLastName = await Database.table('members')
                .where("Email", email).select('Lastname');

              const userName = dbFirstName[0].Firstname + " " + dbLastName[0].Lastname;

              //console.log(userName);

              //todo: actually, user picture is saved in the local "public" file
              const dbPortrait = await Database.table('members')
                .where("Email", email).select('Portrait');

              const member = await Member.findBy('Email', email);
              // const newToken = await auth.withRefreshToken().attempt(email, dbpwd[0].EncryptedPW);

              const newToken = await auth.generate(member);
              console.log(newToken);

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

          const token = await Token.findBy('MemberID', dbMemberID[0].id);
          //only change token
          token.merge({Token: requestData.token});
          await token.save();
          return JSON.stringify({
            facebookDuplicated: false,
            duplicatedProvider: "",
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
          const token = await Token.findBy('MemberID', dbMemberID[0].id);
          //only change token
          token.merge({Token: requestData.token});
          await token.save();
          return JSON.stringify({
            googleDuplicated: false,
            duplicatedProvider: "",
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
}

module.exports = ValidationTokenController;
