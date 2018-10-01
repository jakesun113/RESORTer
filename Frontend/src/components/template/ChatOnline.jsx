import React, { Component } from "react";

class ChatOnline extends Component {
  state = { isShowTitle: true };
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            position: "fixed",
            border: "1px solid grey",
            right: "10ex",
            bottom: "0%",
            width: "auto",
            height: "auto"
          }}
        >
          {/* title */}

          <div
            style={{
              backgroundColor: "rgb(21, 93, 233)",
              color: "white",
              padding: "30px 30px"
            }}
            onClick={() => {}}
          >
            <div style={{ textAlign: "right" }}>
              <i
                class="fas fa-times"
                style={{ fontSize: "3ex" }}
                id="close_chat_btn"
                onClick={this.props.onHandleClose}
              />
            </div>

            <p style={{ textAlign: "center" }}>
              <i class="far fa-smile" style={{ fontSize: "6ex" }} />
            </p>
            <p style={{ textAlign: "center" }}>Leave a Message</p>
            <p style={{ textAlign: "center" }}>
              Got a question about your trip?
            </p>
          </div>
          {/* chat area */}
          <div
            style={{
              backgroundColor: "rgb(165, 199, 255)",
              backgroundSize: "background-size: 168px 168px",
              height: "30ex"
            }}
          />

          {/* chat input */}
          <div style={{ backgroundColor: "white" }}>
            <div className="form-row">
              <span
                className="col-2 "
                style={{
                  paddingRight: "0"
                }}
              >
                <i class="far fa-smile form-control" />
              </span>
              <span
                className="col-8"
                style={{
                  paddingRight: "0",
                  paddingLeft: "0"
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message"
                />
              </span>
              <span
                className="col-2"
                style={{
                  paddingLeft: "0"
                }}
              >
                <i class="fas fa-paperclip form-control" />
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatOnline;
