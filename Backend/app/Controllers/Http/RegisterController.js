"use strict";
const Encryption = use("Encryption");
const Database = use("Database");
const Member = use("App/Models/Member");
const Mail = use("Mail");
const Hash = use("Hash");

class RegisterController {
  async activateUser({ request, auth, response }) {
    try {
      const isTokenValid = await auth.check();
      // get user by the provider token

      const member = await Member.query()
        .where("id", request.input("id"))
        .first();

      //if the user is already activated
      if (member.IsActive == true) {
        response.send(JSON.stringify({ status: "activated" }));
      }

      member.IsActive = true;
      await member.save();

      return JSON.stringify({
        status: "success"
      });
    } catch (error) {
      // display error message
      console.log(error);
      return JSON.stringify({
        status: "fail",
        reason: "token expires"
      });
    }
  }

  async sendConfirmationEmail(userEmail, token, id) {
    try {
      const mailData = {
        userEmail,
        token,
        id
      };
      await Mail.send("auth.emails.confirmationEmail", mailData, message => {
        message
          .to(userEmail)
          .from("resorterapp-test <no-reply@site-members.com>")
          .subject("Email Confirmation");
      });
      console.log("email sent successful");
      return "You have successfully sent confirmation Email";
    } catch (error) {
      console.log(error);
    }
  }

  /* API:/api/resendConfirmEmail  request: {'email':EMAIL,'id':id}  response:{'email':EMAIL, status: 'success/fail'}  */
  async resendConfirmEmail({ request, auth, response }) {
    try {
      let member;
      if ("email" in request.all()) {
        member = await Member.findBy("Email", request.input("email"));
      } else {
        member = await Member.findBy("id", request.input("id"));
      }

      let userToken = await auth.generate(member);
      this.sendConfirmationEmail(member.Email, userToken.token, member.id);

      response.send(
        JSON.stringify({ status: "success", email: request.input("email") })
      );
    } catch (err) {
      response.send(JSON.stringify({ status: "fail" }));
      console.log(err);
    }
  }

  async register({ request, auth }) {
    try {
      const requestData = request.all();
      const encrypted = Encryption.encrypt(requestData.registerPassword);

      const userEmail = await Database.table("members")
        .where("Email", requestData.registerEmail)
        .select("Email");

      //email is not exist -> new user
      if (userEmail.length <= 0) {
        const member = new Member();
        member.Email = requestData.registerEmail;
        member.EncryptedPW = encrypted;
        member.IsActive = false;
        member.Provider = requestData.provider;
        member.Portrait = requestData.provider_pic;
        await member.save();

        //Generate a JWT to a user that needs confirm email
        let userToken = await auth.generate(member);

        //send confirmation email
        this.sendConfirmationEmail(
          requestData.registerEmail,
          userToken.token,
          member.id
        );

        return JSON.stringify({
          registerEmail: requestData.registerEmail,
          status: "success"
        });
      } else {
        return JSON.stringify({
          registerEmail: requestData.registerEmail,
          status: "fail"
        });
      }
    } catch (err) {
      console.log(err);

      return JSON.stringify({
        status: "fail"
      });
    }
  }

  async fillProfile({ request }) {
    try {
      const requestData = request.all();

      const userEmail = await Database.table("members")
        .where("Email", requestData.email)
        .select("Email");
      // can find user
      if (userEmail.length > 0) {
        const member = await Member.findBy("Email", requestData.email);

        // member.Email = requestData.registerEmail;
        member.Firstname = requestData.firstName;
        member.Lastname = requestData.lastName;
        member.Gender = requestData.gender;
        member.PhoneAreaCode = requestData.phoneNumberPre;
        member.PhoneNumber = requestData.phoneNumber;
        member.DOB = requestData.dob;
        member.Country = requestData.country;
        member.Postcode = requestData.postcode;
        member.IsDisabled = requestData.hasDisability;
        member.DisabilityMembership = requestData.disabilityMembership;
        member.DisabilityMembershipID = requestData.disabilityMemberid;
        member.DisabilityDetail = requestData.disabilityDetail;
        member.SkiAbility = requestData.skiAbility;
        member.SnowboardAbility = requestData.snowboardAbility;
        member.TelemarkAbility = requestData.telemarkAbility;
        member.SnowbikeAbility = requestData.snowbikeAbility;
        member.SnowmobileAbility = requestData.snowmobileAbility;
        member.SnowshoeAbility = requestData.snowshoeAbility;

        await member.save();
        return JSON.stringify({
          registerEmail: requestData.registerEmail,
          status: "success"
        });
      }
    } catch (err) {
      console.log(err);
      return JSON.stringify({
        status: "fail"
      });
    }
  }
}

module.exports = RegisterController;
