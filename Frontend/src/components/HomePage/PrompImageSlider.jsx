import React, { Component } from "react";
import "../../css/Homepage/PrompImageSlider.css";
import firstSlide from "../../materials/SliderBackground/ValThorens-France-Getty.jpg";
import secondSlide from "../../materials/SliderBackground/holly-mandarich-525173.jpg";
import thirdSlide from "../../materials/SliderBackground/ski-lessons-at-cardrona-alpine-resort.jpg";
import styled from "styled-components";

const ImgStyle = {
  width: "100%",
  height: "700px",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center"
};
const ImgBlurStyle = {
  width: "100%",
  height: "700px",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: "0.5"
};

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
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 88px;
  text-align: center;
  letter-spacing: 0.3em;
`;

const StyledMedText = styled.h2`
  position: relative;
  top: -20%;
  left: -50%;
  color: white;
  font-size: 50px;
  text-align: center;
`;

const StyledSmallText = styled.h3`
  position: relative;
  top: -20%;
  left: -50%;
  color: white;
  font-size: 38px;
  text-align: center;
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
          style={{ fontFamily: "'Archivo Black', sans-serif !important" }}
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
                  <img
                    src="http://localhost:3000/static/media/service.ada9988a.png"
                    alt=""
                  />
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
              <img src={thirdSlide} alt="Third slide" style={ImgBlurStyle} />
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
