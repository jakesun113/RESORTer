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

/*MemberController start*/
//change password
Route.post("/api/change-password", "MemberController.changePassword");

//SignUp
Route.post("/api/register", "MemberController.register");
Route.put("/api/activateUser", "MemberController.activateUser");
Route.post("/api/resendConfirmEmail", "MemberController.resendConfirmEmail");

//Sign up profile
Route.post("/api/signupProfile", "MemberController.fillProfile");

/*MemberController end*/


/*ValidationTokenController start*/
//login route
Route.post("/api/login/email", "ValidationTokenController.loginWithEmail");
Route.post("/api/login/google", "ValidationTokenController.loginWithGoogle");
Route.post("/api/login/facebook", "ValidationTokenController.loginWithFacebook");
/*ValidationTokenController end*/

/*FamilyMemberController*/
//Add Family Member
Route.post("/api/add-member", "FamilyMemberController.addMember");
/*FamilyMemberController end*/

Route.post(
  "/api/forgot-password",
  "MemberController.sendResetLinkEmail"
);
Route.post("/api/reset-password", "MemberController.resetPassword");

Route.get("/api/user-profile/:token", "ProfileController.showProfile");
Route.put("/api/user-profile", "ProfileController.addProfile");

Route.post('/api/check-token', 'AuthenticationController.check');

Route.get("/pushResortInfo", "ResortInfoController.pushResortInfo");

Route.resource("familyMembers", "FamilyMemberController");
