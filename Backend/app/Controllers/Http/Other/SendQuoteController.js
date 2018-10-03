'use strict';
const Database = use("Database");
const Member = use("App/Models/Member");
const Token = use("App/Models/ValidationToken");
const Mail = use("Mail");

class SendQuoteController {
    async sendQuoteEmail({request}) {
        try {
            console.log(request.data.token);
            const token = await Token.findBy('Token', request.data.token);
            const member = await Member.findBy('id', token.MemberID);
            const mailData = {
              member: member.toJSON()
            };
            // send email to user's email address
            await Mail.send('auth.emails.quoteEmail', mailData, message => {
              message
                .to(member.Email)
                .from('RESORTer <no-reply@site-members.com>')
                .subject('Congratulations! Plan submitted!')
            });
  
          } catch (error) {
            console.log(error)   
          }

    }

}
