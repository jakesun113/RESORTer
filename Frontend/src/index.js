import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter } from "react-router-dom";
// package
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
// page
import HomePage from "./pages/HomePage";
import HowItWorkPage from "./pages/HowItWorksPage";
// component
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy-statement" component={Privacy} />
      <Route path="/how-it-works" component={HowItWorkPage} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
// registerServiceWorker();
