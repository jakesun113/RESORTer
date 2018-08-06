import React, {Component} from "react";

const ChatBoxStyle = {
    width: "50px",
    height: "50px",
    WebkitBorderRadius: "50px",
    MozBorderRadius: "50px",
    borderRadius: "50px",
    borderStyle: "solid",
    borderWidth: "1px",
    background: "cornflowerblue",
    position: "fixed",
    bottom: "20px",
    right: "10px",
    padding: "auto"
};
const IconStyle = {
    color: "white",
    textAlign: "center",
    marginTop: "8px"
};

class ChatBtn extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <a href="">
                    <div style={ChatBoxStyle} className="text-center">
                        <i style={IconStyle} className="fas fa-comment fa-2x"/>
                    </div>
                </a>
            </React.Fragment>
        );
    }
}

export default ChatBtn;
