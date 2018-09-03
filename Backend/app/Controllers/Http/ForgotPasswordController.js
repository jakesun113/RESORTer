'use strict'
const nodemailer = require('nodemailer')
const Email = require('email-templates');


class ForgotPasswordController {

  index({request}) {

    // console.log(request.body)
    // Generate SMTP service account from ethereal.email
// nodemailer.createTestAccount((err, account) => {
//    if (err) {
//       console.error('Failed to create a testing account. ' + err.message);
//       return process.exit(1);
//   }
//   console.log('Credentials obtained, sending message...');

//   // create reusable transporter object using the default SMTP transport
//    let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: account.smtp.port,
//     secure: account.smtp.secure, // true for 465, false for other ports
//     auth: {
//         user: account.user, // generated ethereal user
//         pass: account.pass  // generated ethereal password
//     }
//     });
     
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
      {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'wangruoyi0122@gmail.com', // generated ethereal user
        pass: 'violet920628' // generated ethereal password
      }
    }
  );

    const email = new Email();
    email.render('ResetPasswordEmail/html', {
      email: request.body.email
    }).then(
      (result) => {

        const htmlEmail = result

        //console.log(htmlEmail)

        //setup email data with unicode symbols
        let mailOptions = {
          //NOTE: not work, "from" filed always return host email
          from: '"resorterapp-test"<no-reply@site-members.com>', // sender address
          to: request.body.email, // list of resceivers
          replyTo: '"resorterapp-test"<no-reply@site-members.com>',
          subject: 'Reset your password', // Subject line
          //text: request.body.message, // plain text body
          html: htmlEmail // html body
        };


        //send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error occurred. ' + error.message);
            return process.exit(1);
          }
          console.log('Message sent: %s', info.messageId);
          //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
      }
    );
  }
}

module.exports = ForgotPasswordController