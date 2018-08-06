'use strict'
const nodemailer = require('nodemailer')
const Email = require('email-templates');

class ContactController {

  index({request}) {

    // console.log(request.body)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'jakesun113@gmail.com', // generated ethereal user
        pass: 'ausjc113' // generated ethereal password
      }
    });

    const email = new Email();
    email.render('contactForm/html', {
      name: request.body.name,
      telephone: request.body.telephone,
      email: request.body.email,
      message: request.body.message,
      invest: request.body.invest,
      work: request.body.work
    }).then(
      (result) => {

        const htmlEmail = result

        //console.log(htmlEmail)

        //setup email data with unicode symbols
        let mailOptions = {
          //NOTE: not work, "from" filed always return host email
          from: request.body.email, // sender address
          to: 'jakesun113@gmail.com', // list of receivers
          replyTo: request.body.email,
          subject: 'User Request from Resorter.app', // Subject line
          text: request.body.message, // plain text body
          html: htmlEmail // html body
        };


        //send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);

        });
      }
    );

  }
}

module.exports = ContactController
