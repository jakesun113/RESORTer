import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import HomePage from "./template/components/HomePage";

ReactDOM.render(<HomePage />, document.getElementById("root"));
registerServiceWorker();
