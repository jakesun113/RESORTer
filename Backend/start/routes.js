"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/
//TODO: change route name to meaningful
//todo: move different(register) controllers into MemberController
//todo: move other controllers (rather than change db table) to a new controller (in a new folder)
const Route = use("Route");

Route.on("/").render("welcome");

Route.post("/api/contact-form", "ContactController.index");
/*login route start*/
Route.post("/api/login/email", "ValidationTokenController.loginWithEmail");
Route.post("/api/login/google", "ValidationTokenController.loginWithGoogle");
Route.post("/api/login/facebook", "ValidationTokenController.loginWithFacebook");
/*login route end*/

Route.post(
  "/api/forgot-password",
  "Auth/PasswordResetController.sendResetLinkEmail"
);
Route.post("/api/reset-password", "Auth/PasswordResetController.reset");
Route.post("/api/change-password", "ProfileController.changePassword");

Route.post("/api/register", "RegisterController.register");
Route.post("/api/activateUser", "RegisterController.activateUser");
Route.post("/api/resendConfirmEmail", "RegisterController.resendConfirmEmail");

Route.post("/api/add-member", "FamilyMemberController.addMember");


Route.post("/api/show-profile", "ProfileController.showProfile");
Route.post("/api/add-profile", "ProfileController.addProfile");
//sign up profile
Route.post("/api/signupProfile", "RegisterController.fillProfile");
Route.post('/api/check-token', 'AuthenticationController.check');

Route.get("/pushResortInfo", "ResortInfoController.pushResortInfo");

Route.resource("member", "MemberController");
Route.resource("familyMembers", "FamilyMemberController");
