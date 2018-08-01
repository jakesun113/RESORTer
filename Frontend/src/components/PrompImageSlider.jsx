import React, { Component } from "react";
import "../css/PrompImageSlider.css";

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
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://img.grouponcdn.com/deal/5gzjirZ1RrkenmdES7yK/4n-2048x1229/v1/c700x420.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://img.grouponcdn.com/iam/eKTeB8onKCmeWunNGeHN/se-2048x1242/v1/c700x420.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://pcsindependentleft.files.wordpress.com/2018/03/image-php.jpg"
                alt="Third slide"
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
