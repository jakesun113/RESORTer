import React, { Component } from "react";

class GroupMemberInfoCard extends Component {
  state = {};
  componentDidMount() {
    // css
    let widthValue = window.screen.width > 750 ? "450" : "350";
    document.getElementById("info-card-in-member-page").style.cssText =
      "border: 1px solid rgb(218, 227, 242);height: auto;paddingTop: 10px;" +
      "width:" +
      widthValue +
      "px";
  }
  render() {
    return (
      <React.Fragment>
        <div id="info-card-in-member-page">
          <div
            style={{
              textAlign: "right",
              cursor: "pointer",
              paddingRight: "20px"
            }}
          >
            <i
              className="fas fa-times"
              style={{ fontSize: "3ex" }}
              id="close_chat_btn"
              onClick={this.props.onHandleDelete}
            />
          </div>
          {/* user photo */}
          <div className="form-row">
            <div className="form-group col-12 col-lg-4">
              <div
                id="user_pic"
                style={{
                  display: "table",
                  margin: "0 auto",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  fontSize: "20px",
                  color: "#fff",
                  boxShadow: "2px 2px 2px 2px grey",
                  border: "5px solid white",
                  backgroundSize: "contain",
                  backgroundImage:
                    "url(https://static.wixstatic.com/media/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.png/v1/fill/w_150,h_150,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_29bd27b433da40b28e6f1df4987482b9~mv2_d_2240_2240_s_2.webp)"
                }}
              />
            </div>

            <div className="form-group col-12 col-lg-8">
              <span
                style={{
                  display: "table",
                  margin: "0 auto"
                }}
              >
                <span id="phone_number">1313 13123131</span>
                <br />
                {/* Date of Birth: */}
                <span id="birthday">1 Feb 1980</span>
              </span>
            </div>
          </div>

          {/* first row */}
          <div className="row">
            {/* left */}
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="ski_level">1</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Skier</span>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowbiker_level">1</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowbiker</span>
                </div>
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowboarder_level">1</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowboarder</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowmobiler_level">1</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowmobiler</span>
                </div>
              </div>
            </div>
          </div>
          {/* third row */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="telemarker_level">1</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Telemarker</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-3">
                  <span>
                    Lv <span id="snowshoer_level">1</span>
                  </span>
                </div>
                <div className="col-9">
                  <span>Snowshoer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupMemberInfoCard;
