import React, { Component } from "react";
import AbilityLevelTip from "../template/AbilityLevelTip";
import SliderBar from "../template/SliderBar";
import SmallEllipseBtn from "../template/SmallEllipseBtn";
class ForthPage extends Component {
  state = {};

  storeInfo() {
    const skiAbility = document.getElementById("ski_ability").value;
    const snowboardAbility = document.getElementById("snowboard_ability").value;
    const telemarkAbility = document.getElementById("telemark_ability").value;
    const snowbikeAbility = document.getElementById("snowbike_ability").value;
    const snowmobileAbility = document.getElementById("snowmobile_ability")
      .value;
    const snowshoeAbility = document.getElementById("snowshoe_ability").value;
    this.props.onChangeState("skiAbility", skiAbility);
    this.props.onChangeState("telemarkAbility", telemarkAbility);
    this.props.onChangeState("snowbikeAbility", snowbikeAbility);
    this.props.onChangeState("snowmobileAbility", snowmobileAbility);
    this.props.onChangeState("snowboardAbility", snowboardAbility);
    this.props.onChangeState("snowshoeAbility", snowshoeAbility);
  }
  handleClickNext = () => {
    this.storeInfo();
    this.props.onHandleNextPage("page_5");
    this.props.onHandleProgress("100%");
  };

  handleClickPre = () => {
    this.storeInfo();
    this.props.onHandleNextPage("page_3");
    this.props.onHandleProgress("50%");
  };
  render() {
    return (
      <React.Fragment>
        <div className="next-page-animation">
          {/* title */}
          <div className="form-row ">
            <div className="form-group col-4">
              <span
                style={{
                  fontSize: "1.5rem",
                  color: "#686369",
                  whiteSpace: "nowrap"
                }}
              >
                Almost done...
              </span>
            </div>
            <div className="form-group col-8" />
          </div>
          {/* ability */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                color: "#686369",
                fontSize: "23px",
                textAlign: "center"
              }}
            >
              <label htmlFor="first_name">Your ability levels?</label>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          {/* not sure */}
          <div className="form-row">
            <div className="form-group col-3 col-lg-4" />
            <div
              className="form-group col-6 col-lg-4"
              style={{
                color: "#686369",
                fontSize: "23px",
                textAlign: "center"
              }}
            >
              <span
                htmlFor="first_name"
                style={{ color: "#4682B4", fontSize: "15px" }}
              >
                Not sure? <AbilityLevelTip />
              </span>
            </div>
            <div className="form-group col-3 col-lg-4" />
          </div>
          {/* ability choose */}
          <div className="container">
            <div className="form-row">
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  lable="Ski"
                  min="1"
                  max="7"
                  id="ski_ability"
                  value={this.props.skiAbility}
                />
              </div>
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  lable="Snowboard"
                  min="1"
                  max="7"
                  id="snowboard_ability"
                  value={this.props.snowboardAbility}
                />
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="container">
            <div className="form-row">
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  lable="Telemark"
                  min="1"
                  max="7"
                  id="telemark_ability"
                  value={this.props.telemarkAbility}
                />
              </div>
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  lable="Snowbike"
                  min="1"
                  max="7"
                  id="snowbike_ability"
                  value={this.props.snowbikeAbility}
                />
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="container">
            <div className="form-row">
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  lable="Snowmobile"
                  min="1"
                  max="7"
                  id="snowmobile_ability"
                  value={this.props.snowmobileAbility}
                />
              </div>
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  lable="Snowshoe"
                  min="1"
                  max="7"
                  id="snowshoe_ability"
                  value={this.props.snowshoeAbility}
                />
              </div>
            </div>
          </div>
          <br />
          {/* next btn */}
          <div className="form-row">
            <div className="form-group col-4" />
            <div className="form-group col-4">
              <div className="form-row">
                <div
                  className="form-group col-12 col-lg-6"
                  style={{ textAlign: "center" }}
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
                  style={{ textAlign: "center" }}
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
            <div className="form-group col-4" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ForthPage;
