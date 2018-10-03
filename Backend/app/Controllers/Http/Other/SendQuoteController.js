'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");
const Mail = use("Mail");

class SendQuoteController {
    async sendQuoteEmail({request}) {
        try {
            const token = await Token.findBy('Token', request.input('token'));
            const member = await Member.findBy('id', token.MemberID);
            const mailData = {
              member: member.toJSON(),
              place: request.input('place')
            };
            // send email to user's email address
            await Mail.send('auth.emails.quoteEmail', mailData, message => {
              message
                .to(member.Email)
                .from('RESORTer <no-reply@site-members.com>')
                .subject('Congratulations! Plan submitted!')
            });
            console.log("send email successfully")
          } catch (error) {
            console.log(error)   
          }

    }

}
module.exports = SendQuoteController;
