'use strict';

const User = use('App/Models/Member');
const Database = use("Database");
// const Token = use('App/Models/ValidationToken')
// const randomString = require('random-string')
const Mail = use('Mail');
const Encryption = use('Encryption');


class PasswordResetController {

  async sendResetLinkEmail({request, auth}) {
    // validate from inputs
    try {
      const user = await User.findBy('Email', request.input('email'));

      const dbProvider = await Database.table('members')
        .where("Email", request.input('email')).select('Provider');

      //email does not exist
      if (user == null) {
        console.log("email does not exist");
        return JSON.stringify({
          emailExisted: false
        });
      }

      //email is duplicated
      else if (dbProvider[0].Provider !== "email") {
        console.log("cannot modify social account email");
        return JSON.stringify({
          emailExisted: true,
          emailDuplicated: true,
          duplicatedProvider: dbProvider[0].Provider
        });
      }

      else {
        const dbActive = await Database.table('members')
        .where("Email", user.Email).select('IsActive');

      //not active account
      if (dbActive[0].IsActive === 0) {
        console.log("email is not activated");
        return JSON.stringify({
          emailExisted: true,
          emailDuplicated: false,
          isActive: false
        });
      } else {
       console.log(user.Email)
       //const MemberID = Database.select('id').from('members').where('Email', user.Email);
       //await Token.query().where('MemberID', MemberID).update('IsRevoked', true)
      //  await Database
      //  .table('validation_tokens')
      //  .where('MemberID', MemberID)
      //  .update('IsRevoked', true)
       
      const newToken = await auth.generate(user);

      // const refreshToken = await auth
      //  .withRefreshToken()
      //  .attempt(user.Email, user.EncryptedPW)   
       
      
       
      //  const token = await Token.create({
      //      MemberID: MemberID,
      //      Token: newToken.Token,
      //      Type: "ForgotPassowrd",
      //      IsRevoked: false
      //  })
        const mailData = {
          user: user.toJSON(),
          token: newToken.token
        }; 
        
        console.log(newToken.token) 

        await Mail.send('auth.emails.password_reset', mailData, message => {
            message
            .to(user.Email)
            .from('resorterapp-test <no-reply@site-members.com>')
            .subject('Reset your password')
        });
        console.log("email sent successful");
        return JSON.stringify({
          emailExisted: true
        });
      }
      }

    } catch (error) {
      console.log(error)

    }
  }


  async reset({request, response, auth}) {

    try {

    // const token = await Database
    //   .table('validation_tokens')
    //   .where('Token', request.input('token'))
    //   .first()

    // console.log(token.Token)

     // check if password reet token exist for user 
    //  if (!token) {
    //     // display error message
    //     session.flash({
    //       notification: {
    //         type: 'danger',
    //         message: 'This password reset token does not exist.'
    //       }
    //     });

    //     return response.redirect('back')

    //   }

    try {
      const isTokenValid = await auth.check()
      console.log(isTokenValid)
      // get user by the provider token
      if(isTokenValid){
        const user = await User.findBy('id', request.input('id'));
        console.log(user.Email);
        user.EncryptedPW = Encryption.encrypt(request.input('password'));
        await user.save();
        console.log("password reset successful " + Encryption.decrypt(user.EncryptedPW));
        return response.send(JSON.stringify({
          status: 'success'
        })
      )}
    } catch (error) { 
        // display error message
        console.log(error);
        return response.send(JSON.stringify({
            status: 'fail',
            reason:'token expires'
          })
        )
    }
      
      // delete password reset token
      //token.IsRevoked = true;
      //await Token.query().where('MemberID', user.id).delete()

      // await Database
      //   .table('validation_tokens')
      //   .where('MemberID', user.id)
      //   .update('IsRevoked', true)

      // display success message
      
    } catch (error) {
      // display error message
      console.log(error);
      return response.redirect('back')
    }
  }
}

module.exports = PasswordResetController;
