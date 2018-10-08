import React, { Component } from "react";
import AbilityLevelTip from "../template/AbilityLevelTip";
import SliderBar from "../template/SliderBar";
import SmallEllipseBtn from "../template/SmallEllipseBtn";

class ForthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skiAbility: this.props.skiAbility,
      snowboardAbility: this.props.snowboardAbility,
      telemarkAbility: this.props.telemarkAbility,
      snowbikeAbility: this.props.snowbikeAbility,
      snowmobileAbility: this.props.snowmobileAbility,
      snowshoeAbility: this.props.snowshoeAbility
    };
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

  storeInfo() {
    // const skiAbility = document.getElementById("ski_ability").value;
    // const snowboardAbility = document.getElementById("snowboard_ability").value;
    // const telemarkAbility = document.getElementById("telemark_ability").value;
    // const snowbikeAbility = document.getElementById("snowbike_ability").value;
    // const snowmobileAbility = document.getElementById("snowmobile_ability").value;
    // const snowshoeAbility = document.getElementById("snowshoe_ability").value;
    this.props.onChangeState("skiAbility", this.state.skiAbility);
    this.props.onChangeState("telemarkAbility", this.state.telemarkAbility);
    this.props.onChangeState("snowbikeAbility", this.state.snowbikeAbility);
    this.props.onChangeState("snowmobileAbility", this.state.snowmobileAbility);
    this.props.onChangeState("snowboardAbility", this.state.snowboardAbility);
    this.props.onChangeState("snowshoeAbility", this.state.snowshoeAbility);
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
                  label="Ski"
                  min={1}
                  max={7}
                  id="ski_ability"
                  value={this.state.skiAbility}
                  onChange={this.handleSliderBarChange}
                />
              </div>
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  label="Snowboard"
                  min={1}
                  max={7}
                  id="snowboard_ability"
                  value={this.state.snowboardAbility}
                  onChange={this.handleSliderBarChange}
                />
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="container">
            <div className="form-row">
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  label="Telemark"
                  min={1}
                  max={7}
                  id="telemark_ability"
                  value={this.state.telemarkAbility}
                  onChange={this.handleSliderBarChange}
                />
              </div>
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  label="Snowbike"
                  min={1}
                  max={7}
                  id="snowbike_ability"
                  value={this.state.snowbikeAbility}
                  onChange={this.handleSliderBarChange}
                />
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="container">
            <div className="form-row">
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  label="Snowmobile"
                  min={1}
                  max={7}
                  id="snowmobile_ability"
                  value={this.state.snowmobileAbility}
                  onChange={this.handleSliderBarChange}
                />
              </div>
              <div className="form-group col-12 col-lg-6">
                <SliderBar
                  label="Snowshoe"
                  min={1}
                  max={7}
                  id="snowshoe_ability"
                  value={this.state.snowshoeAbility}
                  onChange={this.handleSliderBarChange}
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
                      style={{
                        backgroundColor: "rgba(0, 166, 255, 1)",
                        paddingLeft: "20px",
                        paddingRight: "20px"
                      }}
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
                      style={{
                        backgroundColor: "rgba(0, 166, 255, 1)",
                        paddingLeft: "35px",
                        paddingRight: "35px"
                      }}
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
