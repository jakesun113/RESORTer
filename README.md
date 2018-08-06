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


# Merge Private Branch to "Dev" Branch
- Go to private branch: __git checkout "You Branch Name"__ 
- Commit:               __git commit -m "COMMENTS"__
- Go to "Dev" branch:   __git checkout Dev__
- Commit:               __git commit -m "COMMENTS"__
- In Dev branch do:     __git merge "Private Branch Name"__
- In Dev branch do:     __git push__

# How to Run the Application
<ul><li>Backend:<p>npm install</p><p>adonis serve --dev</p></li><li>Frontend:<p>npm install</p><p>npm start</p></li></ul> 




