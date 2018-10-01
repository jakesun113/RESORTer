import React, {Component} from "react";
import SliderBar from "../../components/template/SliderBar";
import DisabilityForm from "../../components/template/DisabilityForm";
import AbilityLevelTip from "../../components/template/AbilityLevelTip";
import DisabilityTip from "../../components/template/DisabilityTip";
import phoneCode from "../../components/template/PhoneCode";
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
import handleLogOut from "../../components/template/HandleLogOut";

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
            phoneNumPre: phoneCode
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

        //remove session and cookies
        handleLogOut(cookies);
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
                        <form data-toggle="validator"
                              onSubmit={this.handleSubmit}>
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
                                <UploadBtn
                                    className="form-group col-6 col-lg-2">
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
                                    <label htmlFor="firstName">First
                                        Name</label>
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
                                    <label htmlFor="inputPassword">Last
                                        Name</label>
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
                                        <div
                                            className="form-group col-4 col-lg-4">
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
                                        <div
                                            className="form-group col-8 col-lg-8">
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
                                        <div
                                            className="form-group col-10 col-lg-10">
                                            <label htmlFor="inputPassword">Date
                                                of Birth</label>
                                            <DatePickerComponent
                                                selected={this.state.dob}
                                                onHandleChange={this.dateChanged}
                                            />
                                        </div>
                                        <div
                                            className="form-group col-2 col-lg-2">
                                            <label
                                                htmlFor="inputPassword">Age</label>
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
                                    <label
                                        htmlFor="inputPassword">Postcode</label>
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
                                    <label className="form-check-label"
                                           htmlFor="is_disability">
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
                                    <button type="submit"
                                            className="btn btn-primary">
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
