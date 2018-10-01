import React, { Component } from "react";
import YouTube from "react-youtube";
class Youtube extends Component {
  state = {};

  render() {
    // youtube video
    const video = {
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <React.Fragment>
        {/* youtube video */}
        <div className="container" style={this.props.style}>
          <span
            style={{
              fontSize: "35px",
              position: "absolute",
              top: "0px",
              right: " -10px",
              color: "black"
            }}
            onClick={this.props.onHandleClose}
          >
            <i className="fas fa-times" />
          </span>
          <YouTube
            videoId="s51aYCGDYD8"
            opts={video}
            // onReady={this._onReady}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Youtube;
