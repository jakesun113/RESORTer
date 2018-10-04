'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");
const Resort = use("App/Models/ResortInfo");
const Mail = use("Mail");

class SendQuoteController {
    async sendQuoteEmail({request}) {
        try {
            const token = await Token.findBy('Token', request.input('token'));
            const member = await Member.findBy('id', token.MemberID);
            //TODO: Need to use resort id sent from frontend to identify resort
            const resort = await Resort.findBy('Name', request.input('place'));
            const mailData = {
              member: member.toJSON(),
              resort: resort.toJSON(),
              place: request.input('place')
            };
            // send email to user's email address
            await Mail.send('auth.emails.userQuoteEmail', mailData, message => {
              message
                .to(member.Email)
                .from('RESORTer <no-reply@site-members.com>')
                .subject('Congratulations! Plan submitted!')
            });
            // send email to resort's email address
            await Mail.send('auth.emails.resortQuoteEmail', mailData, message => {
              message
                .to(resort.OwnerEmail)
                .from('RESORTer <no-reply@site-members.com>')
                .subject('New order submitted!')
            });

            console.log("send email successfully")
          } catch (error) {
            console.log(error)   
          }

    }

}
module.exports = SendQuoteController;
