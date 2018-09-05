import React, {Component} from "react";
import axios from "axios";
import AlertWindow from "../components/template/AlertWindow"

export default class ForgotPasswordPage extends Component {
    constructor() {
        super();
        this.state = {
            //redirect: false,
            emailExisted: true,
            emailDuplicated: false,
            duplicatedProvider: null,
            isActive: true,
            isShow: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {
        this.setState({
            emailExisted: true,
            emailDuplicated: false,
            isActive: true
        });
        document.getElementById("InputEmail").style.borderColor = "";
    }

    //Resend confirmation Email
    handleResendEmail() {
        fetch('http://127.0.0.1:3333/api/resendConfirmEmail', {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({email: document.getElementById("InputEmail").value})
        }).then(result => {
            result.json()
        })
          .then(response => {
            alert('Email Resend Successfully')
        })
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById("InputEmail").value;
        //console.log(email);
        await axios.post(`http://127.0.0.1:3333/api/forgot-password`, {email})
            .then(res => {
            
                if (res.data.emailExisted === false) {
                    console.log("email not exist");
                    console.log(res.data)
                    this.setState({
                        emailExisted: false
                    });
                }
                //handle duplicated login with other methods
                else if (res.data.emailDuplicated === true) {
                    console.log("user has logged in with another account");
                    this.setState({
                        emailDuplicated: true,
                        duplicatedProvider: res.data.duplicatedProvider
                    });
                }

                //handle email is not activated
                else if (res.data.isActive === false) {
                    console.log("user email is not activated");
                    this.setState({
                        isActive: false,
                       // redirect: false
                    });
                }

                else {
                    //console.log("correct email address");
                    //console.log(res.data);
                    this.setState({
                        isShow: true
                    });
                    
                }
            });

    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} data-toggle="validator">
                    <br/>
                    {/* title */}
                    <div className="row">
                        <div className="col"/>
                        <div className="col">
                            <div style={{textAlign: "center", marginBottom: "50px"}}>
                                <span style={{fontSize: "2.5rem"}}>Reset Password</span>
                                <br/>
                                <span>&ensp; Please enter your email address</span>
                            </div>
                        </div>
                        <div className="col"/>
                    </div>
                    {/* email input */}
                    <div className="row">
                        <div className="col-md-4"/>
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                style={{width: "100%"}}
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="InputEmail"
                                onChange={this.handleChange}
                                required
                                autoFocus
                            />
                            {this.state.emailExisted ? null : (
                                <div
                                    id="emailError"
                                    style={{color: "red", fontWeight: "bolder"}}
                                >
                                    Email does not exist
                                    <span hidden>
                      {
                          (document.getElementById(
                              "InputEmail"
                          ).style.borderColor = "red")
                      }
                    </span>
                                </div>
                            )}
                            {this.state.emailDuplicated ? (
                                <div 
                                id="emailError"
                                style={{color: "red", fontWeight: "bolder"}}>
                                    user who logged in with {this.state.duplicatedProvider} cannot change the password
                                    <span hidden>
                      {
                          (document.getElementById(
                              "InputEmail"
                          ).style.borderColor = "red")
                      }
                    </span>
                                </div>
                            ) : null}
                            {this.state.isActive === false ? (
                                    <AlertWindow
                                        displayText="Sorry, your email has not been activated, do you want to send a confirmation email now?"
                                        btnNum="1"
                                        mode="linkMode"
                                        btnText="OK"
                                        linkTo="/"
                                        onHandleClose={() => {
                                            this.handleResendEmail();
                                        }}
                                    />
                                ) : (
                                    ""
                                )}
                        </div>
                        <div className="col-md-4"/>
                    </div>
                    <br/>
                    {/* reset btn */}
                    <div className="row">
                        <div className="col-md-4"/>
                        <div className="col-md-4">
                            <button
                                className="login_btn_in_loginwindow"
                                style={{width: "100%"}}
                                type="submit"
                            >
                                Reset Password
                            </button>
                        </div>
                        <div className="col-md-4"/>
                    </div>
                </form>
                {/* send link success popup */}
                {/* success */}
                {this.state.isShow ? (
                    <AlertWindow 
                      displayText = "Please Check Your Email. We’ve emailed you a link to reset your password."
                      btnNum="1"
                      mode="linkMode"
                      btnText="OK"
                      linkTo="/"
                      onHandleClose = {()=>{this.setState({isShow: false})} }
                    />                    
                ) : (
                    ""
                )}
            </React.Fragment>
        );
    }
}
