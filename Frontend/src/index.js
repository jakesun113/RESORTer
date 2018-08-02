import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import HomePage from "./pages/HomePage";
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

ReactDOM.render((
    <BrowserRouter>
      <div>
      <Route exact path='/' component={HomePage}/>
      <Route path='/terms' component={Terms}/> 
      <Route path='/privacy-statement' component={Privacy}/> 

      </div>
    </BrowserRouter>
), 
    document.getElementById('root'));
// registerServiceWorker();
