import React, {Component} from "react";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
import countryList from 'react-select-country-list';
import phoneCode from "../template/PhoneCode";

// third page
class ThirdPage extends Component {
    state = {
        phoneNumPre: phoneCode,
        phoneNumberPre: "",
        country: "",
        post_code_wrong: false,
        phone_number_wrong: false,
        countryName: countryList().getData()
    };

    componentDidMount() {

        // previous phone
        if (this.props.phoneNumberPre !== "") {
            this.setState({phoneNumberPre: this.props.phoneNumberPre});
        } else {
            this.setState({phoneNumberPre: ""});
        }
        // previous country
        if (this.props.country !== "") {
            this.setState({country: this.props.country});
        } else {
            this.setState({country: ""});
        }
    }

    validator = () => {
        let phoneNumber = document.getElementById("phone_number");
        let isValid = true;
        // if already get error for previous operation
        if (
            this.state.phone_number_wrong === true ||
            this.state.post_code_wrong === true
        ) {
            isValid = false;
            return isValid;
        }
        // first time try to submit form
        else {
            // phone number validate
            if (phoneNumber.value === "" && phoneNumber.required) {
                phoneNumber.style.boxShadow = "0px 2px 0px 0px red";
                this.setState({phone_number_wrong: true});
                isValid = false;
                return isValid;
            }
            if (phoneNumber.value !== "") {
                try {
                    let match = phoneNumber.value.match(/[0-9]/g);
                    let input = phoneNumber.value;
                    if (match.length !== input.length) {
                        phoneNumber.style.boxShadow = "0px 2px 0px 0px red";
                        this.setState({phone_number_wrong: true});
                        isValid = false;
                        return isValid;
                    }
                } catch (e) {
                    phoneNumber.style.boxShadow = "0px 2px 0px 0px red";
                    this.setState({phone_number_wrong: true});
                    isValid = false;
                    return isValid;
                }
            }
            // post code validate
            let postCode = document.getElementById("post_code");
            isValid = true;
            if (postCode.value === "" && postCode.required) {
                postCode.style.boxShadow = "0px 2px 0px 0px red";
                this.setState({post_code_wrong: true});
                isValid = false;
                return isValid;
            }
            if (postCode.value !== "") {
                try {
                    let match = postCode.value.match(/[0-9]/g);
                    let input = postCode.value;
                    if (match.length !== input.length) {
                        postCode.style.boxShadow = "0px 2px 0px 0px red";
                        this.setState({post_code_wrong: true});
                        isValid = false;
                        return isValid;
                    }
                } catch (e) {
                    postCode.style.boxShadow = "0px 2px 0px 0px red";
                    this.setState({post_code_wrong: true});
                    isValid = false;
                    return isValid;
                }
            }
            return isValid;
        }
    };

    //  when change the input of
    //   phone number field
    //   post code field
    //   will call this function
    handleChange = e => {
        let state = {};
        let stateName = e.target.id + "_wrong";
        state[stateName] = false;
        e.target.style.boxShadow = "0px 2px 0px 0px rgba(70,130,180,1)";
        this.setState(state);
    };

    // store the info of this page to the pages/NewUserProfilePage
    storeInfo() {
        const phoneNumberPre = document.getElementById("phone_pre").value;
        const phoneNumber = document.getElementById("phone_number").value;
        const country = document.getElementById("country").value;
        const postcode = document.getElementById("post_code").value;
        this.props.onChangeState("phoneNumberPre", phoneNumberPre);
        this.props.onChangeState("phoneNumber", phoneNumber);
        this.props.onChangeState("country", country);
        this.props.onChangeState("postcode", postcode);
    }

    handleClickNext = () => {
        const isValid = this.validator();
        if (isValid === true) {
            this.storeInfo();
            this.props.onHandleNextPage("page_4");
            this.props.onHandleProgress("75%");
        }
    };

    handleClickPre = () => {
        this.storeInfo();
        this.props.onHandleNextPage("page_2");
        this.props.onHandleProgress("25%");
    };

    render() {
        return (
            <React.Fragment>
                <div className="next-page-animation">
                    {/* phone number */}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-4"/>
                        <div
                            className="form-group col-6 col-lg-4"
                            style={{
                                color: "#686369",
                                fontSize: "23px",
                                textAlign: "center"
                            }}
                        >
                            <label htmlFor="first_name">Your phone number?</label>
                        </div>
                        <div className="form-group col-3 col-lg-4"/>
                    </div>

                    {/* input for phone*/}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-4"/>
                        <div
                            className="form-group col-6 col-lg-4"
                            style={{
                                width: "100%",
                                margin: "auto",
                                textAlign: "center"
                            }}
                        >
                            <div className="form-row">
                                <div className="form-group col-lg-1"/>
                                <div className="form-group col-4 col-lg-3">
                                    <select
                                        value={this.state.phoneNumberPre}
                                        id="phone_pre"
                                        className="form-control"
                                        style={{
                                            boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                                            boxSizing: "border-box !important",
                                            outline: "none !important",
                                            color: "#525252",
                                            padding: "3px",
                                            textAlign: "center",
                                            maxWidth: "100%",
                                            minWidth: "100%",
                                            minHeight: "100%",
                                            textOverflow: "ellipsis",
                                            margin: "auto auto",
                                            background: "transparent !important",
                                            border: "none",
                                            fontSize: "20px",
                                            paddingLeft: "0",
                                            paddingRight: "0",
                                            textAlignLast: "center"
                                        }}
                                        required
                                        onChange={e => {
                                            this.setState({phoneNumberPre: e.target.value});
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
                                    <input
                                        type="text"
                                        id="phone_number"
                                        style={{
                                            boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                                            boxSizing: "border-box !important",
                                            outline: "none !important",
                                            color: "#525252",
                                            padding: "3px",
                                            textAlign: "center",
                                            maxWidth: "80%",
                                            minWidth: "80%",
                                            minHeight: "100%",
                                            textOverflow: "ellipsis",
                                            margin: "auto auto",
                                            background: "transparent !important",
                                            border: "none",
                                            fontSize: "20px",
                                            paddingLeft: "0",
                                            paddingRight: "0"
                                        }}
                                        required
                                        onChange={this.handleChange}
                                        defaultValue={this.props.phoneNumber}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-3 col-lg-4"/>
                    </div>
                    {/* if wrong */}
                    {this.state.phone_number_wrong ? (
                        <div className="form-row">
                            <div className="form-group col-3 col-lg-4"/>
                            <div
                                className="form-group col-6 col-lg-4"
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                    fontSize: " 1rem "
                                }}
                            >
                                Please fill the correct phone number
                            </div>
                            <div className="form-group col-3 col-lg-4"/>
                        </div>
                    ) : (
                        ""
                    )}
                    <br/>
                    {/* your country */}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-4"/>
                        <div
                            className="form-group col-6 col-lg-4"
                            style={{
                                color: "#686369",
                                fontSize: "23px",
                                textAlign: "center"
                            }}
                        >
                            <label htmlFor="country">Your country?</label>
                        </div>
                        <div className="form-group col-3 col-lg-4"/>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-3 col-lg-4"/>
                        <div
                            className="form-group col-6 col-lg-4"
                            style={{
                                width: "100%",
                                margin: "auto",
                                textAlign: "center"
                            }}
                        >
                            <select
                                id="country"
                                className="form-control"
                                value={this.state.country}
                                style={{
                                    boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                                    boxSizing: "border-box !important",
                                    outline: "none !important",
                                    color: "#525252",
                                    padding: "3px",
                                    alignContent: "center",
                                    maxWidth: "80%",
                                    minWidth: "80%",
                                    minHeight: "100%",
                                    textOverflow: "ellipsis",
                                    margin: "auto auto",
                                    background: "transparent !important",
                                    border: "none",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    textAlignLast: "center"
                                }}
                                required
                                onChange={e => {
                                    this.setState({country: e.target.value});
                                }}
                                placeholder="Select your country"
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
                        <div className="form-group col-3 col-lg-4"/>
                    </div>

                    <br/>
                    {/* your country */}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-4"/>
                        <div
                            className="form-group col-6 col-lg-4"
                            style={{
                                color: "#686369",
                                fontSize: "23px",
                                textAlign: "center"
                            }}
                        >
                            <label htmlFor="post_code">Your postcode?</label>
                        </div>
                        <div className="form-group col-3 col-lg-4"/>
                    </div>
                    {/* inout for post code */}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-4"/>
                        <div
                            className="form-group col-6 col-lg-4"
                            style={{
                                width: "100%",
                                margin: "auto",
                                textAlign: "center"
                            }}
                        >
                            <input
                                type="text"
                                id="post_code"
                                style={{
                                    boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                                    boxSizing: "border-box !important",
                                    outline: "none !important",
                                    color: "#525252",
                                    padding: "3px",
                                    textAlign: "center",
                                    maxWidth: "80%",
                                    minWidth: "80%",
                                    minHeight: "100%",
                                    textOverflow: "ellipsis",
                                    margin: "auto auto",
                                    background: "transparent !important",
                                    border: "none",
                                    fontSize: "20px"
                                }}
                                required
                                onChange={this.handleChange}
                                defaultValue={this.props.postcode}
                            />
                            {/* if wrong */}
                            {this.state.post_code_wrong ? (
                                <div style={{color: "red"}}>
                                    Please fill the correct post code
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group col-3 col-lg-4"/>
                    </div>
                    <br/>
                    {/* next btn */}
                    <div className="form-row">
                        <div className="form-group col-4"/>
                        <div className="form-group col-4">
                            <div className="form-row">
                                <div
                                    className="form-group col-12 col-lg-6"
                                    style={{textAlign: "center"}}
                                >
                  <span onClick={this.handleClickPre}>
                    <SmallEllipseBtn
                        text="Previous"
                        btnColor="rgba(0, 166, 255, 1)"
                        paddingLeft="20px"
                        paddingRight="20px"
                    />
                  </span>
                                </div>
                                <div
                                    className="form-group col-12 col-lg-6"
                                    style={{textAlign: "center"}}
                                >
                  <span onClick={this.handleClickNext}>
                    <SmallEllipseBtn
                        text="Next"
                        btnColor="rgba(0, 166, 255, 1)"
                        paddingLeft="35px"
                        paddingRight="35px"
                    />
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-4"/>
                    </div>

                    {/* end */}
                </div>
            </React.Fragment>
        );
    }
}

export default ThirdPage;
