import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter } from "react-router-dom";
// package
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
// page
import App from "./pages/App";

// component
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

ReactDOM.render(
  <BrowserRouter>
    <App />

    {/* <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy-statement" component={Privacy} />
      <Route path="/how-it-works" component={HowItWorkPage} />
      <Route exact path="/login" component={SignUpPage} />
    </div> */}
  </BrowserRouter>,
  document.getElementById("root")
);
