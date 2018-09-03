import React, { Component } from "react";
import "../../css/Homepage/PrompImageSlider.css";
import firstSlide from "../../materials/SliderBackground/ValThorens-France-Getty.jpg";
import secondSlide from "../../materials/SliderBackground/holly-mandarich-525173.jpg";
import thirdSlide from "../../materials/SliderBackground/ski-lessons-at-cardrona-alpine-resort.jpg";
const UpperTextStyle = {
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: "88px",
  textAlign: "center"
};
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
            <div className="carousel-item active ">
              <div className="text-block-first">
                <h1 style={UpperTextStyle}>Experiences</h1>
                <h2 style={{ fontSize: "50px", textAlign: "center" }}>
                  Ski Resort Experience Planner
                </h2>
                <br />
                <h3 style={{ fontSize: "38px" }}>
                  Accommodation | Liftpass | Equipment Rental | Lessons
                </h3>
              </div>
              <img
                className="d-block w-100"
                src={firstSlide}
                alt="First slide"
              />
            </div>
            {/* second */}
            <div className="carousel-item">
              <div className="text-block-second">
                <h1 style={UpperTextStyle}>plan</h1>
                <h2 style={{ fontSize: "50px" }}>
                  Fast, Efficient Ski Trip Planner
                </h2>
                <br />
                <h3 style={{ fontSize: "38px" }}>
                  <img
                    src="http://localhost:3000/static/media/service.ada9988a.png"
                    alt=""
                  />
                </h3>
              </div>
              <img
                className="d-block w-100"
                src={secondSlide}
                alt="Second slide"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  WebkitBackgroundSize: "cover",
                  MozBackgroundSize: "cover",
                  OBackgroundSize: "cover",
                  backgroundSize: "cover"
                }}
              />
            </div>
            {/* third */}
            <div className="carousel-item ">
              <div className="text-block-third">
                <span style={UpperTextStyle}>
                  Plan now. <br /> pay later.
                </span>
              </div>
              <img
                className="d-block w-100"
                src={thirdSlide}
                alt="Third slide"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  WebkitBackgroundSize: "fill",
                  MozBackgroundSize: "fill",
                  OBackgroundSize: "fill",
                  backgroundSize: "fill"
                }}
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
