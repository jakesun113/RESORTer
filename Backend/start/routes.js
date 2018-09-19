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

const Route = use("Route");

Route.on("/").render("welcome");

Route.post("/api/contact-form", "Other/ContactController.index");

/*MemberController start*/
//SignUp
Route.post("/api/register", "MemberController.register");
Route.put("/api/activateUser", "MemberController.activateUser");
Route.post("/api/resendConfirmEmail", "MemberController.resendConfirmEmail");

//profile
Route.get("/api/user-profile/:token", "MemberController.showProfile");
Route.put("/api/user-profile", "MemberController.editProfile");

//forget password
Route.post("/api/forgot-password", "MemberController.sendResetLinkEmail");

//reset password
Route.post("/api/reset-password", "MemberController.resetPassword");

//change password
Route.post("/api/change-password", "MemberController.changePassword");
/*MemberController end*/

/*ValidationTokenController start*/
//login route
Route.post("/api/login/email", "ValidationTokenController.loginWithEmail");
Route.post("/api/login/facebook", "ValidationTokenController.loginWithFacebook");
Route.post("/api/login/google", "ValidationTokenController.loginWithGoogle");

//authenticate token
Route.post('/api/check-token', 'ValidationTokenController.check');
/*ValidationTokenController end*/

/*FamilyMemberController start*/
//Add Family Member
Route.post("/api/add-member", "FamilyMemberController.addMember");
//Acquire Family Member
Route.get("/api/acquireGroupMember/:token", "FamilyMemberController.acquireGroupMember")
//Delete Family Member
Route.delete("/api/delete-member", "FamilyMemberController.deleteMember");
/*FamilyMemberController end*/

/*ResortInfoController start*/
//import data from csv to database at first
Route.get("/getResortInfo", "ResortInfoController.getResortInfo");

//get country list
Route.get("/api/getCountry", "ResortInfoController.getCountry");

//get liftPass list
Route.get("/api/getLiftPass", "ResortInfoController.getLiftPass");

//based on given country name, get resort list
Route.post("/api/getResortsByCountry", "ResortInfoController.getResortsByCountry");

//based on given lift-pass name, get resort list
Route.post("/api/getResortsByLiftPass", "ResortInfoController.getResortsByLiftPass");
/*ResortInfoController end*/

/*TripController start*/

//Enroll a new trip
Route.post("/api/enrollTrip", "TripController.enrollNewTrip");

// Get the age information of trip members (i.e. number of adults/children/toddlers)
Route.get("/api/tripMemberAges/:tripID/:masterID", 'TripController.tripMemberAges');

/*TripController end*/
