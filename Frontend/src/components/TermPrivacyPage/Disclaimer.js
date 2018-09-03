import React from "react";
import BackTopBtn from "../template/BackTopBtn";
import FeedBackBtn from "../template/FeedBackBtn";
import ChatBtn from "../template/ChatBtn";

export default class Disclaimer extends React.Component {
  state = {
    currentScrollHeight: 0
  };
  componentDidMount() {
    window.scrollTo(0, 0);

    window.onscroll = () => {
      const newHeight = Math.ceil(window.scrollY / 50) * 50;
      if (this.state.currentScrollHeight !== newHeight) {
        this.setState({ currentScrollHeight: window.scrollY });
      }
    };
  }
  render() {
    const opacity = Math.min(100 / this.state.currentScrollHeight, 1);
    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            marginTop: "50px",
            marginBottom: "50px",
            fontSize: "15px",
            lineHeight: "1.5em",
            color: "rgb(62, 62, 65)"
          }}
        >
          <p className="h1">Disclaimer</p>
          <br />
          <p>
            We only access minimum permissions required to enable and run this
            App. We require your acceptance to do this for you to use this App.
            In the event of any material changes to permission access in any
            update, we will notify you to give you an opportunity to decline.
            You agree and acknowledge that use of this App is at your own risk
            and we are not liable for any loss or damage that may result from
            your use of this App, however it may occur. We are also not liable
            for the disclosure of any of your personal or other information that
            may result from use of this App.
          </p>
          <p>
            RESORTer is an App that provides a service for planning of resort,
            activities, accommodation facilities (‘Services’). We do not provide
            services beyond this planning facility and do not guarantee any
            booking, reservation, activity or experience you may try to book
            using our Services. We do not make any representations or warranties
            of any kind, express or implied about any resort, activity,
            experience, offer, or anything you may access using our Services.
            You use our Services at your own risk and need to make your own
            enquiries to determine if any booking you wish to make is suitable
            for your purposes.
          </p>
          <p>
            Immediately report any problems or issues with our App to RESORTer
            so that we can fix bugs reported on a best endeavors basis.
          </p>
        </div>
        {opacity !== 1 ? (
          <BackTopBtn scrollStepInPx="50" delayInMs="16.66" />
        ) : (
          ""
        )}
        <FeedBackBtn />
        <ChatBtn />
      </React.Fragment>
    );
  }
}
