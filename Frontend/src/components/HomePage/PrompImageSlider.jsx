import React, { Component } from "react";
import firstSlide from "../../materials/SliderBackground/ValThorens-France-Getty.jpg";
import secondSlide from "../../materials/SliderBackground/holly-mandarich-525173.jpg";
import thirdSlide from "../../materials/SliderBackground/ski-lessons-at-cardrona-alpine-resort.jpg";
import styled from "styled-components";

const ImgStyle = {
  width: "100%",
  height: "650px",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const ImgTextStyle = {
  fontSize: "20px"
};

const StyledBlurImg = styled.img`
  width: 100%;
  height: 800px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background: rgba(0, 0, 0, 0.7);
`;

const StyledDiv = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  color: white;
`;
const StyledBigText = styled.h1`
  position: relative;
  top: -20%;
  left: -50%;
  color: white !important;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 88px;
  text-align: center;
  letter-spacing: 0.2em;
  white-space: nowrap;
`;

const StyledMedText = styled.h2`
  position: relative;
  top: -20%;
  left: -50%;
  color: white !important;
  font-size: 50px;
  text-align: center;
  white-space: nowrap;
`;

const StyledSmallText = styled.h3`
  position: relative;
  top: -20%;
  left: -50%;
  color: white !important;
  font-size: 38px;
  text-align: center;
  white-space: nowrap;
`;

class PrompImageSlider extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div
          id="carouselExampleIndicators"
          className="carousel slide h-20"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            {/* first */}
            <div className="carousel-item active">
              <StyledDiv>
                <StyledBigText>Experiences</StyledBigText>
                <StyledMedText>Ski Resort Experience Planner</StyledMedText>
                <br />
                <StyledSmallText>
                  Accommodation | Liftpass | Equipment Rental | Lessons
                </StyledSmallText>
              </StyledDiv>
              <img
                // className="d-block w-100"
                style={ImgStyle}
                src={firstSlide}
                alt="First slide"
              />
            </div>
            {/* second */}
            <div className="carousel-item">
              <StyledDiv>
                <StyledBigText>plan</StyledBigText>
                <StyledMedText>Fast, Efficient Ski Trip Planner</StyledMedText>
                <br />
                <StyledSmallText>
                  <div className="row">
                    {/* 1 */}
                    <div className="col-1" />
                    <div className="col-2" style={{ width: "auto" }}>
                      <p>
                        <i class="fas fa-laptop" />
                      </p>
                      <br />
                      <p style={ImgTextStyle}>Plan your resort</p>
                      <p style={ImgTextStyle}>experience</p>
                    </div>
                    <div className="col-1">
                      <i class="fas fa-arrow-circle-right" />
                    </div>
                    {/* 2 */}
                    <div className="col-2" style={{ width: "auto" }}>
                      <p>
                        <i class="fas fa-globe" />
                      </p>

                      <br />
                      <p style={ImgTextStyle}>Resort confirms</p>
                      <p style={ImgTextStyle}>availability</p>
                    </div>
                    <div className="col-1">
                      <i class="fas fa-arrow-circle-right" />
                    </div>
                    {/* 3 */}
                    <div className="col-2" style={{ width: "auto" }}>
                      <p>
                        <i class="fas fa-user-alt" />
                      </p>
                      <br />
                      <p style={ImgTextStyle}>...processes it</p>
                    </div>
                    <div className="col-1">
                      <i class="fas fa-arrow-circle-right" />
                    </div>

                    {/* 4 */}
                    <div className="col-2" style={{ width: "auto" }}>
                      <p>
                        <i class="far fa-snowflake" />
                      </p>
                      <br />
                      <p style={ImgTextStyle}>...and you rest easy</p>
                    </div>
                  </div>
                </StyledSmallText>
              </StyledDiv>
              <img src={secondSlide} alt="Second slide" style={ImgStyle} />
            </div>
            {/* third */}
            <div className="carousel-item ">
              <StyledDiv>
                <StyledBigText>
                  Plan now. <br /> pay later.
                </StyledBigText>
              </StyledDiv>
              <StyledBlurImg
                src={thirdSlide}
                alt="Third slide"
                id="blur-image"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default PrompImageSlider;
