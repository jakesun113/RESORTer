import React, {Component} from "react";
import DisabilityTip from "../template/DisabilityTip";
import DisabilityForm from "../template/DisabilityForm";
import SmallEllipseBtn from "../template/SmallEllipseBtn";

class FifthPage extends Component {
    state = {
        hasDisability: "no",
        disability_memberid_wrong: false,
        disability_detail_wrong: false
    };

    componentDidMount() {
        if (this.props.hasDisability === "yes") {
            this.setState({hasDisability: "yes"});
        }
    }

    storeInfo() {
        const hasDisability = document.getElementById("is_disability").value;
        let disabilityMembership = "";
        let disabilityMemberid = "";
        let disabilityDetail = "";
        if (hasDisability === "no") {
            disabilityMembership = "";
            disabilityMemberid = "";
            disabilityDetail = "";
        } else {
            disabilityMembership = document.getElementById("disability_membership")
                .value;
            disabilityMemberid = document.getElementById("disability_memberid").value;
            disabilityDetail = document.getElementById("disability_detail").value;
        }

        this.props.onChangeState("hasDisability", hasDisability);
        this.props.onChangeState("disabilityMembership", disabilityMembership);
        this.props.onChangeState("disabilityMemberId", disabilityMemberid);
        this.props.onChangeState("disabilityDetail", disabilityDetail);
    }

    validator = () => {
        let isValid = true;
        // has diability
        if (this.state.hasDisability === "yes") {
            let memberId = document.getElementById("disability_memberid");
            let detail = document.getElementById("disability_detail");

            if (memberId.value === "") {
                isValid = false;
                memberId.style.borderColor = "red";
                this.setState({disability_memberid_wrong: true});
            } else {
                try {
                    let match = memberId.value.match(/[0-9]/g);
                    let input = memberId.value;
                    if (match.length !== input.length) {
                        memberId.style.borderColor = "red";
                        this.setState({disability_memberid_wrong: true});
                        isValid = false;
                        return isValid;
                    }
                } catch (e) {
                    memberId.style.borderColor = "red";
                    this.setState({disability_memberid_wrong: true});
                    isValid = false;
                    return isValid;
                }
            }
            if (detail.value === "") {
                isValid = false;
                detail.style.borderColor = "red";
                this.setState({disability_detail_wrong: true});
            }
        }

        return isValid;
    };

    handleChange = e => {
        let state = {};
        let stateName = e.target.id + "_wrong";
        state[stateName] = false;
        e.target.style.borderColor = "";
        this.setState(state);
    };

    handleSubmit = () => {
        const isValid = this.validator();
        if (isValid === true) {
            this.storeInfo();
            this.props.onHandleTriggerSubmit();
        }
    };

    handleClickPre = () => {
        this.storeInfo();
        this.props.onHandleNextPage("page_4");
    };

    render() {
        return (
            <React.Fragment>
                <div className="next-page-animation">
                    {/* disabilities */}
                    <div className="form-row ">
                        <div className="form-group col-3 col-lg-3"/>
                        <div
                            className="form-group col-6 col-lg-6"
                            style={{
                                color: "#686369",
                                fontSize: "23px",
                                textAlign: "center"
                            }}
                        >
              <span>
                Any physical or learning disabilities?&nbsp;
                  <DisabilityTip/>
              </span>
                        </div>
                        <div className="form-group col-3 col-lg-3"/>
                    </div>
                    {/* has disability? */}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-5"/>
                        <div
                            className="form-group col-6 col-lg-2"
                            style={{
                                width: "100%",
                                margin: "auto"
                            }}
                        >
                            <select
                                value={this.state.hasDisability}
                                id="is_disability"
                                className="form-control"
                                style={{
                                    boxShadow: "0px 2px 0px 0px rgba(70,130,180,1)",
                                    boxSizing: "border-box !important",
                                    outline: "none !important",
                                    color: "#525252",
                                    padding: "3px",
                                    textAlign: "center",
                                    textAlignLast: "center",
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
                                onChange={e => {
                                    this.setState({hasDisability: e.target.value});
                                }}
                            >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div className="form-group col-3 col-lg-5"/>
                    </div>
                    {/* form */}
                    <div className="form-row">
                        <div className="form-group col-3 col-lg-1"/>
                        <div
                            className="form-group col-6 col-lg-10"
                            style={{alignItems: "center"}}
                        >
                            {this.state.hasDisability === "no" ? (
                                ""
                            ) : (
                                <DisabilityForm
                                    disabilityMemberid={this.props.disabilityMemberid}
                                    disabilityDetail={this.props.disabilityDetail}
                                    selected={this.props.disabilityMembership}
                                    memberIdWrong={this.state.disability_memberid_wrong}
                                    detailWrong={this.state.disability_detail_wrong}
                                    onHandleChange={this.handleChange}
                                />
                            )}
                        </div>
                        <div className="form-group col-3 col-lg-1"/>
                    </div>
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
                  <span onClick={this.handleSubmit}>
                    <SmallEllipseBtn
                        text="Finish"
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
                </div>
            </React.Fragment>
        );
    }
}

export default FifthPage;
