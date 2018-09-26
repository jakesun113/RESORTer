import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// package
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
// // page
import NavBar from "./components/NavBar";
import FooterNavBar from "./components/FooterNavBar";
import HomePage from "./pages/HomePage";
import HowItWorkPage from "./pages/HowItWorksPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/LoginPage/SignupPage";
import ContactPage from "./pages/ContactPage";
import ForgotPasswordPage from "./pages/LoginPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/LoginPage/ResetPasswordPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import GroupMemberPage from "./pages/Profile/GroupMemberPage";
import ConfirmationEmailPage from "./pages/LoginPage/ConfirmationEmailPage";
import ChangePwdPage from "./pages/Profile/ChangePwdPage";
import MyTripPage from "./pages/MyTripPage";
// test
import NewUserProfilePage from "./pages/Profile/NewUserProfilePage";
import PromptPage from "./components/template/PromptPage";
// BookTrip

import BookIndex from "./pages/BookPage/BookIndex";

// term of use
import GuestUserTerms from "./components/TermPrivacyPage/GuestUserTerms";
import PrivacyStatement from "./components/TermPrivacyPage/PrivacyStatement";
import ResortProviderTerms from "./components/TermPrivacyPage/ResortProviderTerms";
import Disclaimer from "./components/TermPrivacyPage/Disclaimer";
import SideNav from "./components/TermPrivacyPage/SideNav";

ReactDOM.render(
  <BrowserRouter>
    <div className="container-fluid">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/how-it-works" component={HowItWorkPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/sign-up" component={SignupPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route
            path="/forgotPasswordToken/:id/:token"
            component={ResetPasswordPage}
          />
          <Route
            path="/forgotPasswordToken/:id/:token"
            component={ResetPasswordPage}
          />

          {/* test */}
          <Route path="/newProfile" component={NewUserProfilePage} />
          <Route path="/about-us" component={PromptPage} />
          {/* login required */}
          <Route path="/profile" component={ProfilePage} />
          <Route path="/my-trip" component={MyTripPage} />
          <Route path="/group-member" component={GroupMemberPage} />
          <Route path="/change-password" component={ChangePwdPage} />

          {/*ConfirmationEmail*/}
          <Route
            path="/Email_Confirmation/:token/:id"
            component={ConfirmationEmailPage}
          />

          {/* book page */}
          {/*<Route path="/booking/:placeName/"*/}
          {/*render={() => <BookIndex masterID={this.props.location.state.masterID}*/}
          {/*resortID={this.props.location.state.resortID}*/}
          {/*tripID={this.props.location.state.tripID}/>}/>*/}
          <Route path="/booking/:placeName/" component={BookIndex} />

          {/* term privacy */}
          <Route path="/term-privacy">
            <div>
              <div className="row">
                <div className="col-md-1 col-sm-12 col-2" />
                <div className="col-md-2 col-sm-2 col-4">
                  <SideNav />
                </div>
                <div className="col-md-1 col-sm-0 col-12" />
                <div className="col-md-7 col-sm-12 col-0 text-justify">
                  <Switch>
                    <Route
                      path="/term-privacy/term-of-use"
                      component={GuestUserTerms}
                    />
                    <Route
                      path="/term-privacy/privacy-statement"
                      component={PrivacyStatement}
                    />
                    <Route
                      path="/term-privacy/terms-resort-and-service-providers"
                      component={ResortProviderTerms}
                    />
                    <Route
                      path="/term-privacy/disclaimer"
                      component={Disclaimer}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
      <FooterNavBar />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
