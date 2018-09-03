import React, { Component } from "react";
import "../../css/template/ChatBtn.css";
import ChatOnline from "../template/ChatOnline";
const IconStyle = {
  color: "white",
  textAlign: "center",
  marginTop: "8px"
};

class ChatBtn extends Component {
  state = { isShowChatWindow: false };

  handleClose = () => {
    this.setState({ isShowChatWindow: false });
  };

  handleOpen = () => {
    this.setState({ isShowChatWindow: true });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ cursor: "pointer" }}
          className="chatBtn text-center"
          id="chat_btn"
          onClick={this.handleOpen}
        >
          <i style={IconStyle} className="fas fa-comment fa-2x" />
        </div>
        {this.state.isShowChatWindow === true ? (
          <div>
            <ChatOnline onHandleClose={this.handleClose} />
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default ChatBtn;
