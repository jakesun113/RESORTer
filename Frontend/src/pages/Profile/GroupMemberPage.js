import React, {Component} from "react";
import SmallEllipseBtn from "../../components/template/SmallEllipseBtn";
import AddGroupMemberCard from "../../components/GroupMemberPage/AddGroupMemberCard";
import GroupMemberInfoCard from "../../components/GroupMemberPage/GroupMemberInfoCard";
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
import {Redirect} from "react-router-dom";

class GroupMemberPage extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            token: cookies.get('access-token') || null,
            isAddMember: false
        };
    }

    componentDidMount() {
        if (this.state.token === null && sessionStorage.getItem("userToken")) {
            let tokenData = JSON.parse(sessionStorage.getItem("userToken"));
            this.setState({
                token: tokenData.token
            });
        }
    }

    handleClose = () => {
        this.setState({isAddMember: false});
    };

    render() {


        //if token has been expired, redirect to login page
        //console.log(this.props.location.state);
        if (this.props.location.state) {
            const {lastValid} = this.props.location.state;
            //console.log(lastValid);

            if (!lastValid) {
                return <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: this.props.location.pathname}
                    }}
                />
            }
        }

        //if directly type this page's url, redirect to login page
        if (!sessionStorage.getItem("userToken")) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: {from: this.props.location.pathname}
                }}
            />
        }

        return (
            <React.Fragment>
                <div className="container">
                    <br/>
                    {/* title */}
                    <div className="form-row">
                        {/* <div className="form-group col-2" /> */}
                        <div className="form-group col-4">
                            <span style={{fontSize: "2rem"}}>Group Members</span>
                        </div>
                        <div className="form-group col-6"/>
                    </div>
                    {/* two btn */}
                    <span
                        onClick={() => {
                            this.setState({isAddMember: true});
                        }}
                    >
            <SmallEllipseBtn
                text="+ ADD GROUP MEMBER"
                btnColor="rgba(255, 97, 97, 1)"
            />
          </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <SmallEllipseBtn
                        text="None? Search your Resort"
                        btnColor="rgba(104, 99, 105, 1)"
                    />
                    <br/>
                    {/* add member window */}
                    {this.state.isAddMember === true ? (
                        <AddGroupMemberCard onHandleClose={this.handleClose} token={this.state.token}/>
                    ) : (
                        ""
                    )}
                    {/* text bottom */}
                    {/* if have member shoud not appear */}
                    <span>
            You have not added any group members yet, click&nbsp;
                        <span style={{color: "blue", textDecoration: "underline"}}>
              +Add Group Member
            </span>
                        &nbsp; button above to add your group members so you can simply add
            them to any trips in the future to boost your booking experience!
          </span>
                    {/* group member card */}
                    <GroupMemberInfoCard/>
                    {/* end container */}
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(GroupMemberPage);
