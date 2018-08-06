import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.js";
import { Link } from 'react-router-dom';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import '../../css/Terms&Privacy/SideNav.css';
 

export default class GuestUserContent extends React.Component {

    render() 
    {
        return (
          <React.Fragment>
 <div class="nav flex-column nav-pills" id="v-pills-tab" href="" role="tablist" aria-orientation="vertical">
   
   <li class="dropdown nav-item">
   <a class="nav-link active dropdown-toggle" data-toggle="dropdown" id="v-pills-disclaimer-tab" role="tab" aria-controls="v-pills-disclaimer" aria-selected="true">
    Terms of Use
   </a>
   <div class="dropdown-menu">
      <a class="dropdown-item" href={'/terms'}>Guest and Users</a>
      <a class="dropdown-item" href="">Resort and Service Providers</a>
    </div>
  </li>
  <a class="nav-link" activeClassName="active" href={'/privacy-statement'} id="v-pills-disclaimer-tab" role="tab" aria-controls="v-pills-disclaimer" aria-selected="false">
    Privacy Statement
  </a>
  <a class="nav-link" href="" id="v-pills-disclaimer-tab" data-toggle="pill" role="tab" aria-controls="v-pills-disclaimer" aria-selected="false">Disclaimer</a>
</div>
{/* <div id="main-menu" class="list-group">
                <a href="#sub-menu" class="list-group-item active" data-toggle="collapse" data-parent="#main-menu">Item 1 <span class="caret"></span></a>
                <div class="collapse list-group-level1" id="sub-menu">
                    <a href="#" class="list-group-item" data-parent="#sub-menu">Sub Item 1</a>
                    <a href="#" class="list-group-item" data-parent="#sub-menu">Sub Item 2</a>
                    <a href="#sub-sub-menu" class="list-group-item" data-toggle="collapse" data-parent="#sub-menu">Sub Item 3 <span class="caret"></span></a>
                </div>
            <a href="#" class="list-group-item">Item 2</a>
</div> */}
          </React.Fragment>
        );
    }
}