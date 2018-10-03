# RESORTer

## Package Used

| Package        | Install           | Import  |
| -------------  |:-------------:    | -----:  |
| Bootstrap | <ul><li>npm i bootstrap</li><li>npm install bootstrap jquery --save</li><li>npm install popper.js --save</li></ul> | <ul><li>import "bootstrap/dist/css/bootstrap.css";</li><li>import "bootstrap/dist/js/bootstrap.js";</li></ul>|
| Font Awasome | npm install @fortawesome/fontawesome-free | import "@fortawesome/fontawesome-free/css/all.css";|
| Axios | npm install axios -- save | import axios from "axios";|
| Validator | npm install bootstrap-validator |
|  React Router | npm install --save react-router-dom | import { Route, BrowserRouter } from 'react-router-dom'；import { Link } from 'react-router-dom'
| React Google Login | npm install react-google-login -- save | import {GoogleLogin} from 'react-google-login';|
| React Facebook Login | npm install react-facebook-login -- save | import FacebookLogin from 'react-facebook-login';|
| react-cookie | npm install react-cookie -- save | import { withCookies, Cookies } from 'react-cookie';|
| prop-types | npm install prop-types -- save | import { instanceOf } from 'prop-types';|
| fs-extra | npm install fs-extra -- save | const fs = require('fs-extra');|
| react-select-country-list | npm install react-select-country-list --save | import countryList from 'react-select-country-list';|

# Merge Private Branch to "Dev" Branch
- Go to private branch: __git checkout "You Branch Name"__ 
- Commit:               __git commit -m "COMMENTS"__
- Go to "Dev" branch:   __git checkout Dev__
- Commit:               __git commit -m "COMMENTS"__
- In Dev branch do:     __git merge "Private Branch Name"__
- In Dev branch do:     __git push__

# How to Run the Application
<ul><li>Backend:<p>npm install</p><p>adonis serve --dev</p></li><li>Frontend:<p>npm install</p><p>npm start</p></li></ul> 

# Load data to MySQL from CSV file
- Type the url of backend + "/getResortInfo" 
- For example, if your backend home url is "http://127.0.0.1:3333",
- just type "http://127.0.0.1:3333/getResortInfo" on the browser
- and you will see the data is start loading from your backend console
- You will get informed once the loading is finished.

# How to display different languages properly in the database
- Set the Collation in MySQL as __"utf8_unicode_ci"__, 
- at the table of __"resort_info"__, and the column of __"Name"__
- Reference: 
https://confluence.atlassian.com/confkb/how-to-fix-the-collation-and-character-set-of-a-mysql-database-670958160.html

# How to load local file on Chrome
- Download __Web Server for Chrome__,
- url: https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb
- Set folder as __"Backend/public"__
- Set port number as __"8887"__
- Reference: https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource

# Load fake trip data to the database
- __NOTE__: before doing this step, you have to have at least __TWO__ row data in Member table
- Type the url of backend + "/addFakeTripData" 
- For example, if your backend home url is "http://127.0.0.1:3333",
- just type "http://127.0.0.1:3333/addFakeTripData" on the browser
- and you will see the data is start loading from your backend console
- You will get informed once the loading is finished.
