import React, { Component } from "react";
import "./css/ImageCard.css";
const CardSubTitleStyle = {
  color: "aqua"
};

class ImageCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="card h-100" style={{ width: "20rem" }}>
          <img class="card-img-top" src={this.props.img} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{this.props.title}</h5>
            <p style={CardSubTitleStyle}>{this.props.subTitle}</p>
            <p className="card-text">{this.props.text}</p>
            <div className="botton_right">
              <a href="#" class="btn btn-primary">
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
