import React, {Component} from "react";
// css
import "../../css/ProfilePage/ProfileCard.css";
import {Link} from 'react-router-dom'

class ProfileCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleLogout = () => {

        this.props.onLogout();
    };

    //if the token is invalid, remove from session and cookie to refresh navBar
    handleInvalid = () => {
        if (!this.props.tokenValid) {
            this.props.onLogout();
        }
    };

    render() {

        return (
            <React.Fragment>
                {/* <div className="card"> */}
                <div className="card-top"/>
                <div
                    className="user-pic"
                    style={{
                        backgroundImage: "url(" + this.props.userPic + ")"
                    }}
                />

                <div className="card-bottom"/>
                {/* user name */}
                <div className="userName">{this.props.userName}</div>
                <br/>
                {/* btn */}
                {this.props.isProfileComplete === 0 ? (
                    <Link className="dropdown-item" to={{
                        pathname: "/newProfile",
                        state: {
                            lastValid: this.props.tokenValid
                        }
                    }}
                          onClick={this.handleInvalid}
                    >
                        My Profile</Link>
                ) : <Link className="dropdown-item" to={{
                    pathname: "/profile",
                    state: {
                        lastValid: this.props.tokenValid
                    }
                }}
                          onClick={this.handleInvalid}
                >
                    My Profile</Link>}
                <div className="dropdown-divider"/>
                <Link className="dropdown-item" to={{
                    pathname: "/group-member",
                    state: {lastValid: this.props.tokenValid}
                }}
                      onClick={this.handleInvalid}
                >
                    My Group Members</Link>
                <div className="dropdown-divider"/>
                <Link className="dropdown-item" to={{
                    pathname: "/change-password",
                    state: {lastValid: this.props.tokenValid}
                }}
                      onClick={this.handleInvalid}
                >
                    Change Password</Link>
                <div className="dropdown-divider"/>
                <a className="dropdown-item" href="/" onClick={this.handleLogout}>
                    Log Out
                </a>
                {/* </div> */}
            </React.Fragment>
        );
    }
}

export default ProfileCard;
