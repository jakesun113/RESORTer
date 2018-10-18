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

//Send the quote email to user's email address
Route.post("/api/send-quote", "Other/SendQuoteController.sendQuoteEmail");

/*MemberController start*/
//SignUp
Route.post("/api/register", "MemberController.register");
Route.put("/api/activateUser", "MemberController.activateUser");
Route.post("/api/resendConfirmEmail", "MemberController.resendConfirmEmail");
//profile
Route.get("/api/user-profile/:token", "MemberController.showProfile");
Route.put("/api/user-profile", "MemberController.editProfile");
//update image
Route.put("/api/user-image/:token", "MemberController.updateImage");
//forget password
Route.post("/api/forgot-password", "MemberController.sendResetLinkEmail");
//reset password
Route.post("/api/reset-password", "MemberController.resetPassword");
//change password
Route.post("/api/change-password", "MemberController.changePassword");
//check profileStatus
Route.get("/api/checkProfile/:token", "MemberController.checkCompleteProfile");

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
//insert fake trip data into the database
Route.get("/addFakeTripData", "TripController.addFakeTripData");
//Enroll a new trip
Route.post("/api/enrollTrip", "TripController.enrollNewTrip");
//Acquire members and their family members information
Route.get("/api/acquireSelfInfoAndFamilyInfo/:token", "TripController.acquireSelfInfoAndFamilyInfo");
// check if token valid, return new if valid
Route.post('api/checkTokenAuth', 'TripController.checkTokenAuth');
//get most popular resorts
Route.get("/api/getPopularResorts", 'TripController.getPopularResorts');
//get user country, and return most popular resorts in that country
Route.get("/api/getPopularResortsByCountry/:token", "TripController.getPopularResortsByCountry");
//get user booking history, and return all trips of that user
Route.get("/api/getBookingHistory/:token", "TripController.getBookingHistory");
//get the summary information of one specific trip
Route.get("/api/getTripSummary/:id", "TripController.getTripSummary");
//complete a trip (IsTripDone, Comment, SubmitDate)
Route.post("/api/completeTrip", "TripController.completeTrip");
//request for startDate and EndDate for a trip
Route.get("api/acquireTripDate/:tripID","TripController.acquireTripDate")
//request for trip members for a trip
Route.get("api/acquireTripMember/:tripID","TripController.acquireTripMember")
/*TripController end*/

/*TripAccommodationController start*/
// Get the age information of trip members (i.e. number of adults/children/toddlers)
Route.get("/api/getAccoInfo/:tripID/:masterID", 'TripAccommodationController.getAccoInfo');
// upload user's accommodation info into database
Route.post("/api/uploadAccoInfo", "TripAccommodationController.uploadAccoInfo");
/*TripAccommodationController end*/

/*TripActivityController start*/
// Get the activity information
Route.get("/api/getActivityInfo/:tripID/:masterID", "TripActivityController.getActivityInfo");
// upload activity information
Route.post("/api/uploadActivityInfo", "TripActivityController.uploadActivityInfo");
/*TripActivityController end*/

/*TripEquipmentController start*/
// Get the equipment information
Route.get("/api/getEquipmentInfo/:tripID/:masterID", "TripEquipmentController.getEquipmentInfo");
// skip equipment page
Route.post("/api/skipEquipmentInfo", "TripEquipmentController.skipEquipmentInfo");
// upload equipment information
Route.post("/api/uploadEquipmentInfo", "TripEquipmentController.uploadEquipmentInfo");
/*TripEquipmentController end*/

/*TripLiftpassController start*/
// update lift pass information
Route.post("/api/updateLiftPassInfo", "TripLiftpassController.updateLiftPassInfo");
/*TripLiftpassController end*/
