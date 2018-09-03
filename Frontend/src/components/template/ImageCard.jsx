import React, {Component} from "react";
import "../../css/template/ImageCard.css";

const CardSubTitleStyle = {
    color: "#2ab4ff"
};

class ImageCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="card h-100" style={{width: "20rem"}}>
                    <img
                        className="card-img-top"
                        src={this.props.imgSrc}
                        alt="Card cap"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p style={CardSubTitleStyle}>{this.props.subTitle}</p>
                        <p className="card-text card-body-size">{this.props.text}</p>
                        <div className="botton_right">
                            <a
                                href={`/booking/${this.props.title}/who`}
                                className="btn btn-primary"
                            >
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
