import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// package
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
// page
import NavBar from "./components/NavBar";
import FooterNavBar from "./components/FooterNavBar";
import HomePage from "./pages/HomePage";
import HowItWorkPage from "./pages/HowItWorksPage";


ReactDOM.render(
  <BrowserRouter>
      <div>
          <NavBar />
          <main>
              <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/how-it-works" component={HowItWorkPage} />
              </Switch>
          </main>
          <FooterNavBar />
      </div>
  </BrowserRouter>,
  document.getElementById("root")
);
