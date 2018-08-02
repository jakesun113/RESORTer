import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css';
import { Link } from 'react-router-dom'
import BackTopBtn from './BackTopBtn';


export default class Footer extends React.Component {

    render() {

        return (
          <footer class="page-footer font-small">
            
            <div class="container text-md-center py-3">
            <div class="row no-gutters">
               <div class="col-md-6 mt-md-0 mt-3">
                 <Link class="terms" to={`/terms`}>Terms of Use</Link>
               </div>
            
               <hr class="clearfix w-100 d-md-none pb-3" />
            
               <div class="col-md-6 mb-md-0 mb-3">
                <Link class="privacy" to={`/privacy-statement`}>Privacy Statement</Link>
               </div>
               <hr/>
            </div>

            <hr/>
            <div class="footer-copyright">
            <div class="row">
               <div class="col-md-3 mx-auto">
                 Melbourne, Australia
               </div>
               <div class="col-md-4 mx-auto">
                 <a href="mailto:info@resorter.app">info@resorter.app</a>
               </div>
               <div class="col-md-5 mx-auto">
                  Copyright 2017 - RESORTer - All Rights Reserved
               </div>
            </div>
            </div>
            </div>
            {this.props.isHidden !== 1 ? (
            <BackTopBtn scrollStepInPx="50" delayInMs="16.66" />
            ) : (
            ""
            )}
          </footer>   
        )
    }
}
