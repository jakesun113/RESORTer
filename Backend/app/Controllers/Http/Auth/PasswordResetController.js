'use strict';
const User = use('App/Models/Member');
const Database = use("Database");
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
          console.log(user.Email);

          const newToken = await auth.generate(user);

          const mailData = {
            user: user.toJSON(),
            token: newToken.token
          };

          console.log(newToken.token);

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


  async resetPassword({request, response, auth}) {

    try {
      const isTokenValid = await auth.check();
      console.log(isTokenValid);
      // get user by the provider token
      const user = await User.findBy('id', request.input('id'));
      console.log(user.Email);
      user.EncryptedPW = Encryption.encrypt(request.input('password'));
      await user.save();
      console.log("password reset successful " + Encryption.decrypt(user.EncryptedPW));
      return response.send(JSON.stringify({
          status: 'success'
        })
      )

    }
    catch (error) {
      // display error message
      console.log(error);
      return response.send(JSON.stringify({
          status: 'fail',
          reason: 'token expires'
        })
      )
    }

  }
}

module.exports = PasswordResetController;
