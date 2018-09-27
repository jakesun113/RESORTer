import React, {Component} from "react";
import SliderBar from "../../components/template/SliderBar";
import DisabilityForm from "../../components/template/DisabilityForm";
import AbilityLevelTip from "../../components/template/AbilityLevelTip";
import DisabilityTip from "../../components/template/DisabilityTip";
import {withCookies, Cookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import {instanceOf} from "prop-types";
import AlertWindow from "../../components/template/AlertWindow";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import Input from "../../components/template/InputComponent";
import DatePickerComponent from "../../components/template/DatePickerComponent";
import countryList from "react-select-country-list";

const UploadBtn = styled.label`
  width: 100%;
  height: auto;
  border-radius: 20px 20px 20px 20px;
  background-color: rgba(56, 153, 236, 1);
  box-shadow: 1px 1px 1px gray;
  text-align: center;
  margin: auto auto;
  padding: 5px 20px;
  color: white;
  cursor: pointer;
  font-size: 20px;
  white-space: nowrap;
  &:hover {
    background-color: rgba(78, 183, 245, 1);
    font-weight: bold;
  }
`;

// Profile page to show and edit user profile
class ProfilePage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            token: cookies.get("access-token") ||null,
            provider: cookies.get("user-provider") || null,
            isValidToken: true,
            isShow: false, //handle if the modal window need to show
            email: "",
            file: null,
            dob: moment().subtract(1, "days"),
            age: 0,
            gender: "",
            firstName: "",
            lastName: "",
            phoneCode: "",
            phoneNumber: "",
            country: "",
            countryName: countryList().getData(),
            postcode: "",
            skiAbility: 1,
            snowboardAbility: 1,
            telemarkAbility: 1,
            snowbikeAbility: 1,
            snowmobileAbility: 1,
            snowshoeAbility: 1,
            hasDisAbility: false, // if user has disability
            disabilityMembership: "",
            disabilityMemberId: "",
            disabilityDetail: "",
            getFinished: false,
            webServer: "http://127.0.0.1:8887/",
            user_pic: cookies.get("user-pic") ||
            "https://static.wixstatic.com/media/25b4a3_3c026a3adb9a44e1a02bcc33e8a2f282~mv2.jpg/v1/fill/w_141,h_141,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_3c026a3adb9a44e1a02bcc33e8a2f282~mv2.webp",
            phoneNumPre: [
                {
                    "name": "Australia",
                    "dial_code": "+61",
                    "code": "AU"
                },
                {
                    "name": "Afghanistan",
                    "dial_code": "+93",
                    "code": "AF"
                },
                {
                    "name": "Aland Islands",
                    "dial_code": "+358",
                    "code": "AX"
                },
                {
                    "name": "Albania",
                    "dial_code": "+355",
                    "code": "AL"
                },
                {
                    "name": "Algeria",
                    "dial_code": "+213",
                    "code": "DZ"
                },
                {
                    "name": "AmericanSamoa",
                    "dial_code": "+1 684",
                    "code": "AS"
                },
                {
                    "name": "Andorra",
                    "dial_code": "+376",
                    "code": "AD"
                },
                {
                    "name": "Angola",
                    "dial_code": "+244",
                    "code": "AO"
                },
                {
                    "name": "Anguilla",
                    "dial_code": "+1 264",
                    "code": "AI"
                },
                {
                    "name": "Antarctica",
                    "dial_code": "+672",
                    "code": "AQ"
                },
                {
                    "name": "Antigua and Barbuda",
                    "dial_code": "+1268",
                    "code": "AG"
                },
                {
                    "name": "Argentina",
                    "dial_code": "+54",
                    "code": "AR"
                },
                {
                    "name": "Armenia",
                    "dial_code": "+374",
                    "code": "AM"
                },
                {
                    "name": "Aruba",
                    "dial_code": "+297",
                    "code": "AW"
                },
                {
                    "name": "Austria",
                    "dial_code": "+43",
                    "code": "AT"
                },
                {
                    "name": "Azerbaijan",
                    "dial_code": "+994",
                    "code": "AZ"
                },
                {
                    "name": "Bahamas",
                    "dial_code": "+1 242",
                    "code": "BS"
                },
                {
                    "name": "Bahrain",
                    "dial_code": "+973",
                    "code": "BH"
                },
                {
                    "name": "Bangladesh",
                    "dial_code": "+880",
                    "code": "BD"
                },
                {
                    "name": "Barbados",
                    "dial_code": "+1 246",
                    "code": "BB"
                },
                {
                    "name": "Belarus",
                    "dial_code": "+375",
                    "code": "BY"
                },
                {
                    "name": "Belgium",
                    "dial_code": "+32",
                    "code": "BE"
                },
                {
                    "name": "Belize",
                    "dial_code": "+501",
                    "code": "BZ"
                },
                {
                    "name": "Benin",
                    "dial_code": "+229",
                    "code": "BJ"
                },
                {
                    "name": "Bermuda",
                    "dial_code": "+1 441",
                    "code": "BM"
                },
                {
                    "name": "Bhutan",
                    "dial_code": "+975",
                    "code": "BT"
                },
                {
                    "name": "Bolivia, Plurinational State of",
                    "dial_code": "+591",
                    "code": "BO"
                },
                {
                    "name": "Bosnia and Herzegovina",
                    "dial_code": "+387",
                    "code": "BA"
                },
                {
                    "name": "Botswana",
                    "dial_code": "+267",
                    "code": "BW"
                },
                {
                    "name": "Brazil",
                    "dial_code": "+55",
                    "code": "BR"
                },
                {
                    "name": "British Indian Ocean Territory",
                    "dial_code": "+246",
                    "code": "IO"
                },
                {
                    "name": "Brunei Darussalam",
                    "dial_code": "+673",
                    "code": "BN"
                },
                {
                    "name": "Bulgaria",
                    "dial_code": "+359",
                    "code": "BG"
                },
                {
                    "name": "Burkina Faso",
                    "dial_code": "+226",
                    "code": "BF"
                },
                {
                    "name": "Burundi",
                    "dial_code": "+257",
                    "code": "BI"
                },
                {
                    "name": "Cambodia",
                    "dial_code": "+855",
                    "code": "KH"
                },
                {
                    "name": "Cameroon",
                    "dial_code": "+237",
                    "code": "CM"
                },
                {
                    "name": "Canada",
                    "dial_code": "+1",
                    "code": "CA"
                },
                {
                    "name": "Cape Verde",
                    "dial_code": "+238",
                    "code": "CV"
                },
                {
                    "name": "Cayman Islands",
                    "dial_code": "+ 345",
                    "code": "KY"
                },
                {
                    "name": "Central African Republic",
                    "dial_code": "+236",
                    "code": "CF"
                },
                {
                    "name": "Chad",
                    "dial_code": "+235",
                    "code": "TD"
                },
                {
                    "name": "Chile",
                    "dial_code": "+56",
                    "code": "CL"
                },
                {
                    "name": "China",
                    "dial_code": "+86",
                    "code": "CN"
                },
                {
                    "name": "Christmas Island",
                    "dial_code": "+61",
                    "code": "CX"
                },
                {
                    "name": "Cocos (Keeling) Islands",
                    "dial_code": "+61",
                    "code": "CC"
                },
                {
                    "name": "Colombia",
                    "dial_code": "+57",
                    "code": "CO"
                },
                {
                    "name": "Comoros",
                    "dial_code": "+269",
                    "code": "KM"
                },
                {
                    "name": "Congo",
                    "dial_code": "+242",
                    "code": "CG"
                },
                {
                    "name": "Congo, The Democratic Republic of the Congo",
                    "dial_code": "+243",
                    "code": "CD"
                },
                {
                    "name": "Cook Islands",
                    "dial_code": "+682",
                    "code": "CK"
                },
                {
                    "name": "Costa Rica",
                    "dial_code": "+506",
                    "code": "CR"
                },
                {
                    "name": "Cote d'Ivoire",
                    "dial_code": "+225",
                    "code": "CI"
                },
                {
                    "name": "Croatia",
                    "dial_code": "+385",
                    "code": "HR"
                },
                {
                    "name": "Cuba",
                    "dial_code": "+53",
                    "code": "CU"
                },
                {
                    "name": "Cyprus",
                    "dial_code": "+357",
                    "code": "CY"
                },
                {
                    "name": "Czech Republic",
                    "dial_code": "+420",
                    "code": "CZ"
                },
                {
                    "name": "Denmark",
                    "dial_code": "+45",
                    "code": "DK"
                },
                {
                    "name": "Djibouti",
                    "dial_code": "+253",
                    "code": "DJ"
                },
                {
                    "name": "Dominica",
                    "dial_code": "+1 767",
                    "code": "DM"
                },
                {
                    "name": "Dominican Republic",
                    "dial_code": "+1 849",
                    "code": "DO"
                },
                {
                    "name": "Ecuador",
                    "dial_code": "+593",
                    "code": "EC"
                },
                {
                    "name": "Egypt",
                    "dial_code": "+20",
                    "code": "EG"
                },
                {
                    "name": "El Salvador",
                    "dial_code": "+503",
                    "code": "SV"
                },
                {
                    "name": "Equatorial Guinea",
                    "dial_code": "+240",
                    "code": "GQ"
                },
                {
                    "name": "Eritrea",
                    "dial_code": "+291",
                    "code": "ER"
                },
                {
                    "name": "Estonia",
                    "dial_code": "+372",
                    "code": "EE"
                },
                {
                    "name": "Ethiopia",
                    "dial_code": "+251",
                    "code": "ET"
                },
                {
                    "name": "Falkland Islands (Malvinas)",
                    "dial_code": "+500",
                    "code": "FK"
                },
                {
                    "name": "Faroe Islands",
                    "dial_code": "+298",
                    "code": "FO"
                },
                {
                    "name": "Fiji",
                    "dial_code": "+679",
                    "code": "FJ"
                },
                {
                    "name": "Finland",
                    "dial_code": "+358",
                    "code": "FI"
                },
                {
                    "name": "France",
                    "dial_code": "+33",
                    "code": "FR"
                },
                {
                    "name": "French Guiana",
                    "dial_code": "+594",
                    "code": "GF"
                },
                {
                    "name": "French Polynesia",
                    "dial_code": "+689",
                    "code": "PF"
                },
                {
                    "name": "Gabon",
                    "dial_code": "+241",
                    "code": "GA"
                },
                {
                    "name": "Gambia",
                    "dial_code": "+220",
                    "code": "GM"
                },
                {
                    "name": "Georgia",
                    "dial_code": "+995",
                    "code": "GE"
                },
                {
                    "name": "Germany",
                    "dial_code": "+49",
                    "code": "DE"
                },
                {
                    "name": "Ghana",
                    "dial_code": "+233",
                    "code": "GH"
                },
                {
                    "name": "Gibraltar",
                    "dial_code": "+350",
                    "code": "GI"
                },
                {
                    "name": "Greece",
                    "dial_code": "+30",
                    "code": "GR"
                },
                {
                    "name": "Greenland",
                    "dial_code": "+299",
                    "code": "GL"
                },
                {
                    "name": "Grenada",
                    "dial_code": "+1 473",
                    "code": "GD"
                },
                {
                    "name": "Guadeloupe",
                    "dial_code": "+590",
                    "code": "GP"
                },
                {
                    "name": "Guam",
                    "dial_code": "+1 671",
                    "code": "GU"
                },
                {
                    "name": "Guatemala",
                    "dial_code": "+502",
                    "code": "GT"
                },
                {
                    "name": "Guernsey",
                    "dial_code": "+44",
                    "code": "GG"
                },
                {
                    "name": "Guinea",
                    "dial_code": "+224",
                    "code": "GN"
                },
                {
                    "name": "Guinea-Bissau",
                    "dial_code": "+245",
                    "code": "GW"
                },
                {
                    "name": "Guyana",
                    "dial_code": "+595",
                    "code": "GY"
                },
                {
                    "name": "Haiti",
                    "dial_code": "+509",
                    "code": "HT"
                },
                {
                    "name": "Holy See (Vatican City State)",
                    "dial_code": "+379",
                    "code": "VA"
                },
                {
                    "name": "Honduras",
                    "dial_code": "+504",
                    "code": "HN"
                },
                {
                    "name": "Hong Kong",
                    "dial_code": "+852",
                    "code": "HK"
                },
                {
                    "name": "Hungary",
                    "dial_code": "+36",
                    "code": "HU"
                },
                {
                    "name": "Iceland",
                    "dial_code": "+354",
                    "code": "IS"
                },
                {
                    "name": "India",
                    "dial_code": "+91",
                    "code": "IN"
                },
                {
                    "name": "Indonesia",
                    "dial_code": "+62",
                    "code": "ID"
                },
                {
                    "name": "Iran, Islamic Republic of Persian Gulf",
                    "dial_code": "+98",
                    "code": "IR"
                },
                {
                    "name": "Iraq",
                    "dial_code": "+964",
                    "code": "IQ"
                },
                {
                    "name": "Ireland",
                    "dial_code": "+353",
                    "code": "IE"
                },
                {
                    "name": "Isle of Man",
                    "dial_code": "+44",
                    "code": "IM"
                },
                {
                    "name": "Israel",
                    "dial_code": "+972",
                    "code": "IL"
                },
                {
                    "name": "Italy",
                    "dial_code": "+39",
                    "code": "IT"
                },
                {
                    "name": "Jamaica",
                    "dial_code": "+1 876",
                    "code": "JM"
                },
                {
                    "name": "Japan",
                    "dial_code": "+81",
                    "code": "JP"
                },
                {
                    "name": "Jersey",
                    "dial_code": "+44",
                    "code": "JE"
                },
                {
                    "name": "Jordan",
                    "dial_code": "+962",
                    "code": "JO"
                },
                {
                    "name": "Kazakhstan",
                    "dial_code": "+7 7",
                    "code": "KZ"
                },
                {
                    "name": "Kenya",
                    "dial_code": "+254",
                    "code": "KE"
                },
                {
                    "name": "Kiribati",
                    "dial_code": "+686",
                    "code": "KI"
                },
                {
                    "name": "Korea, Democratic People's Republic of Korea",
                    "dial_code": "+850",
                    "code": "KP"
                },
                {
                    "name": "Korea, Republic of South Korea",
                    "dial_code": "+82",
                    "code": "KR"
                },
                {
                    "name": "Kuwait",
                    "dial_code": "+965",
                    "code": "KW"
                },
                {
                    "name": "Kyrgyzstan",
                    "dial_code": "+996",
                    "code": "KG"
                },
                {
                    "name": "Laos",
                    "dial_code": "+856",
                    "code": "LA"
                },
                {
                    "name": "Latvia",
                    "dial_code": "+371",
                    "code": "LV"
                },
                {
                    "name": "Lebanon",
                    "dial_code": "+961",
                    "code": "LB"
                },
                {
                    "name": "Lesotho",
                    "dial_code": "+266",
                    "code": "LS"
                },
                {
                    "name": "Liberia",
                    "dial_code": "+231",
                    "code": "LR"
                },
                {
                    "name": "Libyan Arab Jamahiriya",
                    "dial_code": "+218",
                    "code": "LY"
                },
                {
                    "name": "Liechtenstein",
                    "dial_code": "+423",
                    "code": "LI"
                },
                {
                    "name": "Lithuania",
                    "dial_code": "+370",
                    "code": "LT"
                },
                {
                    "name": "Luxembourg",
                    "dial_code": "+352",
                    "code": "LU"
                },
                {
                    "name": "Macao",
                    "dial_code": "+853",
                    "code": "MO"
                },
                {
                    "name": "Macedonia",
                    "dial_code": "+389",
                    "code": "MK"
                },
                {
                    "name": "Madagascar",
                    "dial_code": "+261",
                    "code": "MG"
                },
                {
                    "name": "Malawi",
                    "dial_code": "+265",
                    "code": "MW"
                },
                {
                    "name": "Malaysia",
                    "dial_code": "+60",
                    "code": "MY"
                },
                {
                    "name": "Maldives",
                    "dial_code": "+960",
                    "code": "MV"
                },
                {
                    "name": "Mali",
                    "dial_code": "+223",
                    "code": "ML"
                },
                {
                    "name": "Malta",
                    "dial_code": "+356",
                    "code": "MT"
                },
                {
                    "name": "Marshall Islands",
                    "dial_code": "+692",
                    "code": "MH"
                },
                {
                    "name": "Martinique",
                    "dial_code": "+596",
                    "code": "MQ"
                },
                {
                    "name": "Mauritania",
                    "dial_code": "+222",
                    "code": "MR"
                },
                {
                    "name": "Mauritius",
                    "dial_code": "+230",
                    "code": "MU"
                },
                {
                    "name": "Mayotte",
                    "dial_code": "+262",
                    "code": "YT"
                },
                {
                    "name": "Mexico",
                    "dial_code": "+52",
                    "code": "MX"
                },
                {
                    "name": "Micronesia, Federated States of Micronesia",
                    "dial_code": "+691",
                    "code": "FM"
                },
                {
                    "name": "Moldova",
                    "dial_code": "+373",
                    "code": "MD"
                },
                {
                    "name": "Monaco",
                    "dial_code": "+377",
                    "code": "MC"
                },
                {
                    "name": "Mongolia",
                    "dial_code": "+976",
                    "code": "MN"
                },
                {
                    "name": "Montenegro",
                    "dial_code": "+382",
                    "code": "ME"
                },
                {
                    "name": "Montserrat",
                    "dial_code": "+1664",
                    "code": "MS"
                },
                {
                    "name": "Morocco",
                    "dial_code": "+212",
                    "code": "MA"
                },
                {
                    "name": "Mozambique",
                    "dial_code": "+258",
                    "code": "MZ"
                },
                {
                    "name": "Myanmar",
                    "dial_code": "+95",
                    "code": "MM"
                },
                {
                    "name": "Namibia",
                    "dial_code": "+264",
                    "code": "NA"
                },
                {
                    "name": "Nauru",
                    "dial_code": "+674",
                    "code": "NR"
                },
                {
                    "name": "Nepal",
                    "dial_code": "+977",
                    "code": "NP"
                },
                {
                    "name": "Netherlands",
                    "dial_code": "+31",
                    "code": "NL"
                },
                {
                    "name": "Netherlands Antilles",
                    "dial_code": "+599",
                    "code": "AN"
                },
                {
                    "name": "New Caledonia",
                    "dial_code": "+687",
                    "code": "NC"
                },
                {
                    "name": "New Zealand",
                    "dial_code": "+64",
                    "code": "NZ"
                },
                {
                    "name": "Nicaragua",
                    "dial_code": "+505",
                    "code": "NI"
                },
                {
                    "name": "Niger",
                    "dial_code": "+227",
                    "code": "NE"
                },
                {
                    "name": "Nigeria",
                    "dial_code": "+234",
                    "code": "NG"
                },
                {
                    "name": "Niue",
                    "dial_code": "+683",
                    "code": "NU"
                },
                {
                    "name": "Norfolk Island",
                    "dial_code": "+672",
                    "code": "NF"
                },
                {
                    "name": "Northern Mariana Islands",
                    "dial_code": "+1 670",
                    "code": "MP"
                },
                {
                    "name": "Norway",
                    "dial_code": "+47",
                    "code": "NO"
                },
                {
                    "name": "Oman",
                    "dial_code": "+968",
                    "code": "OM"
                },
                {
                    "name": "Pakistan",
                    "dial_code": "+92",
                    "code": "PK"
                },
                {
                    "name": "Palau",
                    "dial_code": "+680",
                    "code": "PW"
                },
                {
                    "name": "Palestinian Territory, Occupied",
                    "dial_code": "+970",
                    "code": "PS"
                },
                {
                    "name": "Panama",
                    "dial_code": "+507",
                    "code": "PA"
                },
                {
                    "name": "Papua New Guinea",
                    "dial_code": "+675",
                    "code": "PG"
                },
                {
                    "name": "Paraguay",
                    "dial_code": "+595",
                    "code": "PY"
                },
                {
                    "name": "Peru",
                    "dial_code": "+51",
                    "code": "PE"
                },
                {
                    "name": "Philippines",
                    "dial_code": "+63",
                    "code": "PH"
                },
                {
                    "name": "Pitcairn",
                    "dial_code": "+872",
                    "code": "PN"
                },
                {
                    "name": "Poland",
                    "dial_code": "+48",
                    "code": "PL"
                },
                {
                    "name": "Portugal",
                    "dial_code": "+351",
                    "code": "PT"
                },
                {
                    "name": "Puerto Rico",
                    "dial_code": "+1 939",
                    "code": "PR"
                },
                {
                    "name": "Qatar",
                    "dial_code": "+974",
                    "code": "QA"
                },
                {
                    "name": "Romania",
                    "dial_code": "+40",
                    "code": "RO"
                },
                {
                    "name": "Russia",
                    "dial_code": "+7",
                    "code": "RU"
                },
                {
                    "name": "Rwanda",
                    "dial_code": "+250",
                    "code": "RW"
                },
                {
                    "name": "Reunion",
                    "dial_code": "+262",
                    "code": "RE"
                },
                {
                    "name": "Saint Barthelemy",
                    "dial_code": "+590",
                    "code": "BL"
                },
                {
                    "name": "Saint Helena, Ascension and Tristan Da Cunha",
                    "dial_code": "+290",
                    "code": "SH"
                },
                {
                    "name": "Saint Kitts and Nevis",
                    "dial_code": "+1 869",
                    "code": "KN"
                },
                {
                    "name": "Saint Lucia",
                    "dial_code": "+1 758",
                    "code": "LC"
                },
                {
                    "name": "Saint Martin",
                    "dial_code": "+590",
                    "code": "MF"
                },
                {
                    "name": "Saint Pierre and Miquelon",
                    "dial_code": "+508",
                    "code": "PM"
                },
                {
                    "name": "Saint Vincent and the Grenadines",
                    "dial_code": "+1 784",
                    "code": "VC"
                },
                {
                    "name": "Samoa",
                    "dial_code": "+685",
                    "code": "WS"
                },
                {
                    "name": "San Marino",
                    "dial_code": "+378",
                    "code": "SM"
                },
                {
                    "name": "Sao Tome and Principe",
                    "dial_code": "+239",
                    "code": "ST"
                },
                {
                    "name": "Saudi Arabia",
                    "dial_code": "+966",
                    "code": "SA"
                },
                {
                    "name": "Senegal",
                    "dial_code": "+221",
                    "code": "SN"
                },
                {
                    "name": "Serbia",
                    "dial_code": "+381",
                    "code": "RS"
                },
                {
                    "name": "Seychelles",
                    "dial_code": "+248",
                    "code": "SC"
                },
                {
                    "name": "Sierra Leone",
                    "dial_code": "+232",
                    "code": "SL"
                },
                {
                    "name": "Singapore",
                    "dial_code": "+65",
                    "code": "SG"
                },
                {
                    "name": "Slovakia",
                    "dial_code": "+421",
                    "code": "SK"
                },
                {
                    "name": "Slovenia",
                    "dial_code": "+386",
                    "code": "SI"
                },
                {
                    "name": "Solomon Islands",
                    "dial_code": "+677",
                    "code": "SB"
                },
                {
                    "name": "Somalia",
                    "dial_code": "+252",
                    "code": "SO"
                },
                {
                    "name": "South Africa",
                    "dial_code": "+27",
                    "code": "ZA"
                },
                {
                    "name": "South Georgia and the South Sandwich Islands",
                    "dial_code": "+500",
                    "code": "GS"
                },
                {
                    "name": "Spain",
                    "dial_code": "+34",
                    "code": "ES"
                },
                {
                    "name": "Sri Lanka",
                    "dial_code": "+94",
                    "code": "LK"
                },
                {
                    "name": "Sudan",
                    "dial_code": "+249",
                    "code": "SD"
                },
                {
                    "name": "Suriname",
                    "dial_code": "+597",
                    "code": "SR"
                },
                {
                    "name": "Svalbard and Jan Mayen",
                    "dial_code": "+47",
                    "code": "SJ"
                },
                {
                    "name": "Swaziland",
                    "dial_code": "+268",
                    "code": "SZ"
                },
                {
                    "name": "Sweden",
                    "dial_code": "+46",
                    "code": "SE"
                },
                {
                    "name": "Switzerland",
                    "dial_code": "+41",
                    "code": "CH"
                },
                {
                    "name": "Syrian Arab Republic",
                    "dial_code": "+963",
                    "code": "SY"
                },
                {
                    "name": "Taiwan",
                    "dial_code": "+886",
                    "code": "TW"
                },
                {
                    "name": "Tajikistan",
                    "dial_code": "+992",
                    "code": "TJ"
                },
                {
                    "name": "Tanzania, United Republic of Tanzania",
                    "dial_code": "+255",
                    "code": "TZ"
                },
                {
                    "name": "Thailand",
                    "dial_code": "+66",
                    "code": "TH"
                },
                {
                    "name": "Timor-Leste",
                    "dial_code": "+670",
                    "code": "TL"
                },
                {
                    "name": "Togo",
                    "dial_code": "+228",
                    "code": "TG"
                },
                {
                    "name": "Tokelau",
                    "dial_code": "+690",
                    "code": "TK"
                },
                {
                    "name": "Tonga",
                    "dial_code": "+676",
                    "code": "TO"
                },
                {
                    "name": "Trinidad and Tobago",
                    "dial_code": "+1 868",
                    "code": "TT"
                },
                {
                    "name": "Tunisia",
                    "dial_code": "+216",
                    "code": "TN"
                },
                {
                    "name": "Turkey",
                    "dial_code": "+90",
                    "code": "TR"
                },
                {
                    "name": "Turkmenistan",
                    "dial_code": "+993",
                    "code": "TM"
                },
                {
                    "name": "Turks and Caicos Islands",
                    "dial_code": "+1 649",
                    "code": "TC"
                },
                {
                    "name": "Tuvalu",
                    "dial_code": "+688",
                    "code": "TV"
                },
                {
                    "name": "Uganda",
                    "dial_code": "+256",
                    "code": "UG"
                },
                {
                    "name": "Ukraine",
                    "dial_code": "+380",
                    "code": "UA"
                },
                {
                    "name": "United Arab Emirates",
                    "dial_code": "+971",
                    "code": "AE"
                },
                {
                    "name": "United Kingdom",
                    "dial_code": "+44",
                    "code": "GB"
                },
                {
                    "name": "United States",
                    "dial_code": "+1",
                    "code": "US"
                },
                {
                    "name": "Uruguay",
                    "dial_code": "+598",
                    "code": "UY"
                },
                {
                    "name": "Uzbekistan",
                    "dial_code": "+998",
                    "code": "UZ"
                },
                {
                    "name": "Vanuatu",
                    "dial_code": "+678",
                    "code": "VU"
                },
                {
                    "name": "Venezuela, Bolivarian Republic of Venezuela",
                    "dial_code": "+58",
                    "code": "VE"
                },
                {
                    "name": "Vietnam",
                    "dial_code": "+84",
                    "code": "VN"
                },
                {
                    "name": "Virgin Islands, British",
                    "dial_code": "+1 284",
                    "code": "VG"
                },
                {
                    "name": "Virgin Islands, U.S.",
                    "dial_code": "+1 340",
                    "code": "VI"
                },
                {
                    "name": "Wallis and Futuna",
                    "dial_code": "+681",
                    "code": "WF"
                },
                {
                    "name": "Yemen",
                    "dial_code": "+967",
                    "code": "YE"
                },
                {
                    "name": "Zambia",
                    "dial_code": "+260",
                    "code": "ZM"
                },
                {
                    "name": "Zimbabwe",
                    "dial_code": "+263",
                    "code": "ZW"
                }
            ],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handle when date is selected
    dateChanged = (date, choice) => {
        //console.log("date changed");
        this.setState(
            {
                [choice]: date,
                dob: date
            },
            () => {
                // calculate the age by birthday
                let countAge = moment().diff(
                    moment(this.state.dob),
                    "years"
                );
                if (countAge !== this.state.age) {
                    this.setState({
                        age: countAge
                    });
                }
            }
        );
    };

    handleUploadFile = e => {
        if (window.FileReader) {
            const reader = new FileReader();
            const file = e.target.files[0];

            //console.log(file)
            reader.addEventListener(
                "load",
                () => {
                    //console.log(reader.result);
                    this.setState({
                        user_pic: reader.result,
                        file: file
                    });
                },
                false
            );
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            alert("Not supported by your browser!");
        }
    };

    handleLogout = () => {
        const {cookies} = this.props;

        this.setState({
            token: null,
            user_pic: "",
            provider: null
        });

        sessionStorage.removeItem("userSocialData");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userImage");
        sessionStorage.removeItem("userFinishProfile");
        sessionStorage.removeItem("userFinishTrip");
        sessionStorage.removeItem("userIsClicked");
        cookies.remove("user-name");
        cookies.remove("access-token");
        cookies.remove("user-pic");
        cookies.remove("user-provider");
        cookies.remove("user-profileFinished");
        cookies.remove("user-hasUnfinishedTrip");
    };

    componentDidMount() {
        // get the user social data from session
        if (sessionStorage.getItem("userSocialData")) {
            let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
            this.setState({
                provider: userData.provider
            });
        }

        // when the token can be found from session, get the user data
        if (sessionStorage.getItem("userToken")
            && sessionStorage.getItem("userSocialData")
            && sessionStorage.getItem("userImage")) {
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            let userData = JSON.parse(sessionStorage.getItem("userSocialData"));
            let userImage = JSON.parse(sessionStorage.getItem("userImage"));
            this.setState({
                token: tokenData.token
            });

            const setState = this.setState.bind(this);
            let url =
                "http://127.0.0.1:3333/api/user-profile/" +
                tokenData.token;
            //get the user data from database
            axios.get(url).then(response => {
                console.log("get success");

                if (response.data.skiAbility != null) {
                    setState({
                        skiAbility: response.data.skiAbility
                    });
                }
                if (response.data.snowboardAbility != null) {
                    setState({snowboardAbility: response.data.snowboardAbility});
                }
                if (response.data.telemarkAbility != null) {
                    setState({telemarkAbility: response.data.telemarkAbility});
                }
                if (response.data.snowbikeAbility != null) {
                    setState({snowbikeAbility: response.data.snowbikeAbility});
                }
                if (response.data.snowmobileAbility != null) {
                    setState({snowmobileAbility: response.data.snowmobileAbility});
                }
                if (response.data.snowshoeAbility != null) {
                    setState({snowshoeAbility: response.data.snowshoeAbility});
                }

                if (response.data.isDisabled) {
                    setState({
                        hasDisability: true,
                        disabilityMembership: response.data.disabilityMembership,
                        disabilityMemberId: response.data.disabilityMembershipId,
                        disabilityDetail: response.data.disabilityDetail
                    });
                    //setState({isDisabled: response.data.isDisabled});
                }

                setState({
                    email: response.data.email
                });

                if (userData.provider !== "email") {
                    setState({
                        user_pic: userImage.provider_pic
                    });
                }

                else if (response.data.portrait != null) {

                    setState({
                        user_pic: this.state.webServer + response.data.portrait
                    });
                }
                else {
                    setState({
                        user_pic: "https://static.wixstatic.com/media/25b4a3_3c026a3adb9a44e1a02bcc33e8a2f282~mv2.jpg/v1/fill/w_141,h_141,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_3c026a3adb9a44e1a02bcc33e8a2f282~mv2.webp"
                    });
                }

                if (response.data.gender != null) {
                    setState({gender: response.data.gender});
                }
                if (response.data.firstName != null) {
                    setState({firstName: response.data.firstName});
                }
                if (response.data.lastName != null) {
                    setState({lastName: response.data.lastName});
                }
                if (response.data.phoneCode != null) {
                    setState({phoneCode: response.data.phoneCode});
                }
                if (response.data.phoneNumber != null) {
                    setState({phoneNumber: response.data.phoneNumber});
                }
                if (response.data.dob != null) {
                    setState({dob: response.data.dob});
                    let countAge = moment().diff(
                        moment(this.state.dob),
                        "years"
                    );
                    setState({
                        age: countAge
                    });
                }

                if (response.data.country != null) {
                    setState({country: response.data.country});
                }

                if (response.data.postcode != null) {
                    setState({postcode: response.data.postcode});
                }

                //indicate get method is finished
                setState({getFinished: true});
            });
        }
    }

    // handle submitting the profile data to the database
    async handleSubmit(e) {
        e.preventDefault();

        const isDisabledValue = document.getElementById("is_disability").checked;
        let disabilityMembershipValue = null;
        let disabilityMembershipIDValue = null;
        let disabilityDetailValue = null;

        // if the disability checkbox has been check, set the disability information
        if (isDisabledValue === true) {
            disabilityMembershipValue = document.getElementById(
                "disability_membership"
            ).value;
            disabilityMembershipIDValue = document.getElementById(
                "disability_memberid"
            ).value;
            disabilityDetailValue = document.getElementById("disability_detail")
                .value;
        }
        // if user does not disability, set the disability information as null
        else {
            disabilityMembershipValue = null;
            disabilityMembershipIDValue = null;
            disabilityDetailValue = null;
        }

        //send portrait to the backend, only when user upload one image
        if (this.state.file !== null) {
            const formData = new FormData();
            //console.log(this.state.file);
            formData.append('file', this.state.file);

            await axios({
                method: 'put',
                headers: {'content-type': 'multipart/form-data'},
                url: "http://127.0.0.1:3333/api/user-image/" + this.state.token,
                data: formData
            }).then(
                /*Proceed subsequent actions based on value */
                response => {
                    console.log("change portrait success");

                    //save picture into session
                    let userImage;
                    userImage = {
                        provider_pic: this.state.webServer + response.data.portrait
                    };
                    console.log(response.data.portrait);
                    sessionStorage.setItem(
                        "userImage",
                        JSON.stringify(userImage)
                    );
                    //save picture into cookie
                    const {cookies} = this.props;

                    //only when user click "remember me", update the token in cookies
                    if (cookies.get("access-token")) {
                        let date = new Date();
                        date.setTime(date.getTime() + +2592000);
                        cookies.set("user-pic", this.state.webServer + response.data.portrait, {
                            expires: date,
                            path: "/"
                        });
                    }
                    this.setState({
                        user_pic: this.state.webServer + response.data.portrait
                    });
                }
            );
        }

        const data = {
            SkiAbility: document.getElementById("ski_ability").value,
            SnowboardAbility: document.getElementById("snowboard_ability").value,
            TelemarkAbility: document.getElementById("telemark_ability").value,
            SnowbikeAbility: document.getElementById("snowbike_ability").value,
            SnowmobileAbility: document.getElementById("snowmobile_ability").value,
            SnowshoeAbility: document.getElementById("snowshoe_ability").value,
            IsDisabled: isDisabledValue,
            DisabilityMembership: disabilityMembershipValue,
            DisabilityMembershipID: disabilityMembershipIDValue,
            DisabilityDetail: disabilityDetailValue,
            token: this.state.token,
            provider: this.state.provider,
            FirstName: document.getElementById("firstName").value,
            LastName: document.getElementById("lastName").value,
            Gender: document.getElementById("gender").value,
            DOB: moment(this.state.dob).format("YYYY-MM-DD"),
            PhoneAreaCode: document.getElementById("phone_number_pre").value,
            PhoneNumber: document.getElementById("phoneNumber").value,
            Country: document.getElementById("country").value,
            Postcode: document.getElementById("postcode").value,
            IsProfileComplete: true
        };

        // update the user profile data in the database
        await axios.put("http://127.0.0.1:3333/api/user-profile", data).then(
            /*Proceed subsequent actions based on value */
            response => {
                //handle token is not valid
                if (response.data.tokenValid === false) {
                    console.log("token expired");
                    this.setState({
                        isValidToken: false,
                        isShow: true
                    });
                } else {
                    console.log("change success");
                    //save token into session
                    let userSocialData;
                    userSocialData = {
                        name: response.data.name,
                        provider: this.state.provider
                    };
                    sessionStorage.setItem(
                        "userSocialData",
                        JSON.stringify(userSocialData)
                    );
                    let userToken;
                    userToken = {
                        token: response.data.token
                    };
                    sessionStorage.setItem("userToken", JSON.stringify(userToken));
                    //if success, set profile is finished
                    let userFinishProfile;
                    userFinishProfile = {
                        isFinished: 1
                    };
                    sessionStorage.setItem(
                        "userFinishProfile",
                        JSON.stringify(userFinishProfile)
                    );

                    //save token into cookie
                    const {cookies} = this.props;

                    //only when user click "remember me", update the token in cookies
                    if (cookies.get("access-token")) {
                        let date = new Date();
                        date.setTime(date.getTime() + +2592000);
                        cookies.set("access-token", this.state.token, {
                            expires: date,
                            path: "/"
                        });
                        cookies.set("user-name", response.data.name, {
                            expires: date,
                            path: "/"
                        });
                        cookies.set("user-profileFinished", 1, {
                            expires: date,
                            path: "/"
                        });
                        cookies.set("user-provider", "email", {
                            expires: date,
                            path: "/"
                        });

                        console.log(
                            "token has been extended. Token is: " +
                            cookies.get("access-token")
                        );
                    }

                    this.setState({
                        token: response.data.token,
                        isValidToken: true,
                        isShow: true
                    });
                }
            }
        );
    }

    handleSliderBarChange = (id, abilityValue) => {
        switch (id) {
            case "ski_ability":
                this.setState({
                    skiAbility: parseInt(abilityValue, 10)
                });
                break;
            case "snowboard_ability":
                this.setState({
                    snowboardAbility: parseInt(abilityValue, 10)
                });
                break;
            case "telemark_ability":
                this.setState({
                    telemarkAbility: parseInt(abilityValue, 10)
                });
                break;
            case "snowbike_ability":
                this.setState({
                    snowbikeAbility: parseInt(abilityValue, 10)
                });
                break;
            case "snowmobile_ability":
                this.setState({
                    snowmobileAbility: parseInt(abilityValue, 10)
                });
                break;
            case "snowshoe_ability":
                this.setState({
                    snowshoeAbility: parseInt(abilityValue, 10)
                });
                break;
            default:
                break;
        }
        this.forceUpdate();
    };

    render() {
        const {cookies} = this.props;
        //if token has been expired, redirect to login page
        //console.log(this.props.location.state);
        if (this.props.location.state) {
            const {lastValid} = this.props.location.state;
            //console.log(lastValid);

            if (!lastValid) {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: this.props.location.pathname}
                        }}
                    />
                );
            }
        }

        //if directly type this page's url, redirect to login page
        if (!sessionStorage.getItem("userToken") && !cookies.get("access-token")) {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: this.props.location.pathname}
                    }}
                />
            );
        }

        //if directly type this page's url, and user has finished the profile
        if (sessionStorage.getItem("userFinishProfile")) {
            let userFinishProfile = JSON.parse(
                sessionStorage.getItem("userFinishProfile")
            );
            if (userFinishProfile.isFinished === 0) {
                return <Redirect to={"/newProfile"}/>;
            }
        }

        let readOnly;
        let disabled;
        // if the provider is google or facebook, user cannot edit user name and upload portrait
        if (this.state.provider !== "email") {
            readOnly = true;
            disabled = true;
        } else {
            readOnly = false;
            disabled = false;
        }

        if (this.state.getFinished) {
            return (
                <React.Fragment>
                    <div className="container">
                        <br/>
                        {/* title */}
                        <div className="form-row">
                            <div className="form-group col-lg-2"/>
                            <div className="form-group col-4 col-lg-4">
                <span style={{fontSize: "2rem", whiteSpace: "nowrap"}}>
                  My Profile
                </span>
                            </div>
                            <div className="form-group col-8 col-lg-6"/>
                        </div>

                        <br/>
                        <form data-toggle="validator" onSubmit={this.handleSubmit}>
                            {/* photo */}
                            <div className="form-row">
                                <div className="form-group col-3"/>
                                <div
                                    className="form-group col-6"
                                    style={{
                                        alignItems: "center",
                                        textAlign: "center",
                                        alignContent: "center"
                                    }}
                                >
                                    <img
                                        id="user_pic"
                                        alt="userPortrait"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            fontSize: "20px",
                                            color: "#fff",
                                            lineHeight: "60px",
                                            textAlign: "center",
                                            boxShadow: "2px 2px 2px 2px grey",
                                            border: "5px solid white",
                                            backgroundSize: "contain",
                                            margin: "auto auto"
                                        }}
                                        src={this.state.user_pic}
                                    />
                                </div>
                                <div className="form-group col-3"/>
                            </div>
                            {/* upload btn */}
                            <div className="form-row">
                                <div className="form-group col-3 col-lg-5"/>
                                <UploadBtn className="form-group col-6 col-lg-2">
                                    Upload photo +
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        disabled={disabled}
                                        onChange={this.handleUploadFile}
                                    />
                                </UploadBtn>
                                <div className="form-group col-3 col-lg-5"/>
                            </div>
                            {/* max size text */}
                            <div className="form-row">
                                <div className="form-group col-3"/>
                                <div
                                    className="form-group col-6"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                        margin: "auto auto",
                                        textAlign: "center",
                                        color: "#737373",
                                        opacity: "0.7",
                                        direction: "ltr"
                                    }}
                                >
                                    Max File Size 15MB
                                </div>
                                <div className="form-group col-3"/>
                            </div>

                            {/* user info */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                {/* email */}
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input
                                        id="inputEmail"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        readOnly
                                    />
                                </div>
                                &ensp; &ensp;
                                {/* gender */}
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="gender">Gender</label>

                                    <select
                                        id="gender"
                                        className="form-control"
                                        defaultValue={this.state.gender}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-lg-2"/>
                            </div>

                            {/* first name */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="firstName">First Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="First Name"
                                        readOnly={readOnly}
                                        value={this.state.firstName}
                                    />
                                </div>
                                &ensp; &ensp;
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="inputPassword">Last Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Last Name"
                                        readOnly={readOnly}
                                        value={this.state.lastName}
                                    />
                                </div>
                                <div className="form-group col-lg-2"/>
                            </div>

                            {/* phone */}
                            <div className="form-row">
                                <div className="form-group col-2"/>
                                {/* phone */}
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="phoneNumber">Phone</label>
                                    <div className="form-row">
                                        <div className="form-group col-4 col-lg-4">
                                            <select
                                                defaultValue={this.state.phoneCode}
                                                id="phone_number_pre"
                                                className="custom-select"
                                                required
                                                onChange={e => {
                                                    this.setState({phoneCode: e.target.value});
                                                }}
                                            >
                                                {this.state.phoneNumPre.length === 0
                                                    ? null
                                                    : this.state.phoneNumPre.map(phoneNum => {
                                                        return (
                                                            <option key={phoneNum.code} value={phoneNum.dial_code}>
                                                                {phoneNum.dial_code}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                        <div className="form-group col-8 col-lg-8">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="phoneNumber"
                                                placeholder="Phone"
                                                value={this.state.phoneNumber}
                                            />
                                        </div>
                                    </div>
                                </div>
                                &ensp; &ensp;
                                {/* DOB */}
                                <div className="form-group col-12 col-lg-4">
                                    <div className="form-row">
                                        <div className="form-group col-10 col-lg-10">
                                            <label htmlFor="inputPassword">Date of Birth</label>
                                            <DatePickerComponent
                                                selected={this.state.dob}
                                                onHandleChange={this.dateChanged}
                                            />
                                        </div>
                                        <div className="form-group col-2 col-lg-2">
                                            <label htmlFor="inputPassword">Age</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="age"
                                                placeholder=""
                                                value={this.state.age}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-2"/>
                            </div>

                            {/* country */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="inputEmail">Country</label>
                                    <select
                                        id="country"
                                        className="form-control"
                                        value={this.state.country}
                                        required
                                        onChange={e => {
                                            this.setState({country: e.target.value});
                                        }}
                                    >
                                        {this.state.countryName.length === 0
                                            ? null
                                            : this.state.countryName.map(country => {
                                                return (
                                                    <option key={country.value} value={country.label}>
                                                        {country.label}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                &ensp; &ensp;
                                <div className="form-group col-12 col-lg-4">
                                    <label htmlFor="inputPassword">Postcode</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="postcode"
                                        placeholder=""
                                        value={this.state.postcode}
                                    />
                                </div>
                                <div className="form-group col-lg-2"/>
                            </div>

                            {/* line */}
                            <div style={{position: "absolute", left: "50%"}}>
                <span
                    style={{
                        position: "relative",
                        left: "-50%",
                        fontSize: "20px"
                    }}
                >
                  - Ability Level -
                </span>
                            </div>
                            <br/>
                            <br/>

                            {/* my ability */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-10">
                                    My Ability&ensp;
                                    {/* tooltip */}
                                    <AbilityLevelTip/>
                                    {/* end tooltip */}
                                    &ensp; Not sure about your ability level?
                                </div>
                            </div>

                            {/* first line */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-4">
                                    <SliderBar
                                        label="Ski"
                                        min={1}
                                        max={7}
                                        id="ski_ability"
                                        name="skiability"
                                        value={this.state.skiAbility}
                                        onChange={this.handleSliderBarChange}
                                    />
                                </div>
                                &ensp; &ensp;
                                <div className="form-group col-12 col-lg-4">
                                    <SliderBar
                                        label="Snowboard"
                                        min={1}
                                        max={7}
                                        id="snowboard_ability"
                                        value={this.state.snowboardAbility}
                                        onChange={this.handleSliderBarChange}
                                    />
                                </div>
                                <div className="form-group col-lg-2"/>
                            </div>

                            {/* second line */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-4">
                                    <SliderBar
                                        label="Telemark"
                                        min={1}
                                        max={7}
                                        id="telemark_ability"
                                        value={this.state.telemarkAbility}
                                        onChange={this.handleSliderBarChange}
                                    />
                                </div>
                                &ensp; &ensp;
                                <div className="form-group col-12 col-lg-4">
                                    <SliderBar
                                        label="Snowbike"
                                        min={1}
                                        max={7}
                                        id="snowbike_ability"
                                        value={this.state.snowbikeAbility}
                                        onChange={this.handleSliderBarChange}
                                    />
                                </div>
                                <div className="form-group  col-lg-2"/>
                            </div>

                            {/* third line */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-4">
                                    <SliderBar
                                        label="Snowmobile"
                                        min={1}
                                        max={7}
                                        id="snowmobile_ability"
                                        value={this.state.snowmobileAbility}
                                        onChange={this.handleSliderBarChange}
                                    />
                                </div>
                                &ensp; &ensp;
                                <div className="form-group col-12 col-lg-4">
                                    <SliderBar
                                        label="Snowshoe"
                                        min={1}
                                        max={7}
                                        id="snowshoe_ability"
                                        value={this.state.snowshoeAbility}
                                        onChange={this.handleSliderBarChange}
                                    />
                                </div>
                                <div className="form-group col-lg-2"/>
                            </div>

                            {/* disable */}
                            <div className="form-row">
                                <div className="form-group col-lg-2"/>
                                <div className="form-group col-12 col-lg-10">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={e => {
                                            this.setState({hasDisability: e.target.checked});
                                        }}
                                        id="is_disability"
                                        checked={this.state.hasDisability}
                                    />
                                    <label className="form-check-label" htmlFor="is_disability">
                                        Any physical or learning disabilities?
                                    </label>
                                    &ensp;
                                    {/* tooltip */}
                                    <DisabilityTip/>
                                </div>
                            </div>

                            {/* disable form */}
                            {this.state.hasDisability === true ? (
                                <DisabilityForm
                                    selected={this.state.disabilityMembership}
                                    disabilityMemberid={this.state.disabilityMemberId}
                                    disabilityDetail={this.state.disabilityDetail}
                                />
                            ) : (
                                ""
                            )}

                            {/* save btn */}
                            <div className="form-row">
                                <div className="form-group col-4 col-lg-2"/>
                                <div className="form-group col-4 col-lg-4">
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                                <div className="form-group col-4 col-lg-6"/>
                            </div>
                        </form>
                    </div>

                    {this.state.isValidToken && this.state.isShow ? (
                        <AlertWindow
                            displayText="Your profile has been saved."
                            btnNum="1"
                            mode="linkMode"
                            btnText="OK"
                            linkTo="/profile"
                            onHandleClose={() => {
                                this.setState({isShow: false});
                                window.location.reload();
                            }}
                        />
                    ) : (
                        ""
                    )}

                    {this.state.isValidToken === false && this.state.isShow ? (
                        <AlertWindow
                            displayText="Sorry, your token has expired, please log in again"
                            btnNum="1"
                            mode="linkMode"
                            btnText="OK"
                            linkTo={{
                                pathname: "/login",
                                state: {from: this.props.location.pathname}
                            }}
                            onHandleClose={() => {
                                this.setState({isShow: false});
                                this.handleLogout();
                            }}
                        />
                    ) : (
                        ""
                    )}
                </React.Fragment>
            );
        }
        return <div>Loading...</div>;
    }
}

export default withCookies(ProfilePage);
