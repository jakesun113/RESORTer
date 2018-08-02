import React, { Component } from "react";
import "../../css/homepageSearch&Popular/ImageCard.css";
const CardSubTitleStyle = {
  color: "#2ab4ff"
};

class ImageCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="card h-100" style={{ width: "20rem" }}>
          <img className="card-img-top" src={this.props.imgSrc} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p style={CardSubTitleStyle}>{this.props.subTitle}</p>
            <p className="card-text card-body-size">{this.props.text}</p>
            <div className="botton_right">
              <a href="#" className="btn btn-primary">
                <span>{this.props.btnText}</span>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageCard;
