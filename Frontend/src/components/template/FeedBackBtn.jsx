import React, {Component} from "react";

const FeedBackStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    right: "-40px",
    backgroundColor: "red",
    color: "white",
    WebkitTransform: "rotate(-90deg)",
    MozTransform: "rotate(-90deg)",
    transform: "rotate(-90deg)",
    padding: "5px 10px",
    textDecoration: "none"
};

const TextStyle = {
    marginLeft: "20px"
};

class FeedBackBtn extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <div>
                    <a href="#" style={FeedBackStyle}>
                        <i className="fas fa-envelope-square">
                            <span style={TextStyle}>Feedback</span>
                        </i>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default FeedBackBtn;
