'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");
const Mail = use("Mail");

class SendQuoteController {
    async sendQuoteEmail({request}) {
        try {
            const user = await Member.findBy('Email', request.input('email'));
      
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
      
            // email is validated
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
                // generate new token
                const newToken = await auth.generate(user);
      
                const mailData = {
                  user: user.toJSON(),
                  token: newToken.token
                };
      
                // send email to user's email address
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

}
