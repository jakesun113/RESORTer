import React, {Component} from "react";
import "../css/HowItWorkPage/HowItWorksPage.css";
import device from "../materials/HowItWork/device.png";
import service from "../materials/HowItWork/service.png";
import ski from "../materials/HowItWork/ski.png";
import world from "../materials/HowItWork/world.png";
import downward from "../materials/HowItWork/downward.png";
import $ from "jquery";
import icon_workWithUs from "../materials/HowItWork/icon-workWithUs.png";
import icon_behindTheDesk from "../materials/HowItWork/icon-behindTheDesk.png";
import ContactBtn from "../components/HomePage/ContactBtn";
import BackTopBtn from "../components/template/BackTopBtn";

class SkiTripsMadeEasy extends Component {
    handleClick = divID => {
        $("html,body").animate({scrollTop: $("#" + divID).offset().top}, "slow");
    };

    render() {
        return (
            <div id="skiTripsMadeEasy" className="text-center container-fluid">
                <h1>Ski Trips Made Easy</h1>
                <p className="plaintext">
                    RESORTer is a web app to plan your activities at ski resorts
                    worldwide, all in the one place, to get you the best deal. The first
                    of its kind, RESORTer personalises the planning journey for future
                    bookings and sends the plan you make directly to the resort to quote.
                    Credit card payment is currently made direct with the resort but we're
                    working to allow payments on our site shortly. It's our first
                    iteration so things can only progress from here. Tell us what you
                    think using the feedback tab on each page or via our survey at the
                    end.
                </p>
                <p className="plaintext">Mobile app coming soon.</p>
                <h2>Fast, efficient trip planner...</h2>

                <div
                    className="row align-items-start"
                    style={{padding: "50px 5% 0 5%"}}
                >
                    <div className="col-sm-2 col-xs-5 myflex">
                        <img
                            className="img-fluid fourIMGs"
                            src={device}
                            style={{"max-width": "70%", height: "auto"}}
                        />
                        <p className="aroundicon ">Plan your resort experience</p>
                    </div>
                    <div className="col-sm-1 col-xs-1 fa far fa-arrow-circle-right myArrow"/>

                    <div className="col-sm-2 col-xs-5 myflex">
                        <img
                            className="img-fluid fourIMGs"
                            src={world}
                            style={{"max-width": "70%", height: "auto"}}
                        />
                        <p className="aroundicon ">Resort confirms availability</p>
                    </div>
                    <div className="col-sm-1 col-xs-1 fa far fa-arrow-circle-right myArrow"/>

                    <div className="col-sm-2 col-xs-5 myflex">
                        <img
                            className="img-fluid fourIMGs"
                            src={service}
                            style={{"max-width": "70%", height: "auto"}}
                        />
                        <p className="aroundicon ">...processes it</p>
                    </div>
                    <div className="col-sm-1 col-xs-1 fa far fa-arrow-circle-right myArrow"/>

                    <div className="col-sm-2 col-xs-5 myflex">
                        <img
                            className="img-fluid fourIMGs"
                            src={ski}
                            style={{maxWidth: "70%", height: "auto"}}
                        />
                        <p className="aroundicon ">...and you rest easy</p>
                    </div>
                </div>

                <p className="plaintext">
                    Choose in advance your Resort, dates, activities and experiences - eg.
                    skiing, snowboarding, snowbiking, snowshoeing, snowmobiling; or even
                    heliskiing or backcountry tours - or plan a private lesson with your
                    favourite instructor or join a group lesson - then choose the # of
                    days you need a lift pass and equipment rental. The Resort will
                    contact you direct to confirm availability and take payment.
                    RESORTer's planning engine is uniquely sequenced by snowsports experts
                    who have your convenience and safety in mind.
                </p>

                <h2>Plan now. Pay later...</h2>

                <p className="plaintext">
                    The best part is you can sleep on your plans...and make changes when
                    the Resort contacts you to confirm availability, offer the best deals,
                    and take payment.{" "}
                </p>

                <img
                    className="goDownDiv"
                    src={downward}
                    onClick={() => this.handleClick("behindTheDesks")}
                />
            </div>
        );
    }
}

class BehindTheDesks extends Component {
    handleClick = divID => {
        $("html,body").animate({scrollTop: $("#" + divID).offset().top}, "slow");
    };

    render() {
        return (
            <div id="behindTheDesks" className="text-center container-fluid">
                <h1>BEHIND THE DESKS...</h1>
                <p className="plaintext">
                    We are a team of techies and seasoned resorters who simply want a no
                    fuss way to book our trips all over the world and only ever have to
                    navigate one booking engine.
                </p>

                <h2>About the Founder</h2>

                <p className="plaintext">
                    At the age of three, I squished up with my four older siblings in the
                    back seat of the family car - all squealing with excitement - and
                    endured a seven hour journey to Thredbo, Australia. It was the
                    ultimate family experience, the type that's passed down through
                    generations. My father's passion for skiing meant we returned for a
                    week every year until he discovered somewhere a little closer, Falls
                    Creek - my winter home ever since. More recently, I have spent 18
                    magical winters ski instructing across the world, listening to guests
                    about what makes for a truly outstanding experience at the snow. What
                    rated high amongst them? A need for an easy, efficient way to plan and
                    book lessons, rental, and lift pass. RESORTer is for them, and for
                    anyone who has been too intimidated to try a wintersport for the first
                    time. I want my family experience to be accessible to more families by
                    making things easier for them and the whole experience ultimately more
                    affordable.
                </p>

                <img
                    className="goDownDiv"
                    src={downward}
                    onClick={() => this.handleClick("resortIMG")}
                />
            </div>
        );
    }
}

class ReosrtIMG extends Component {
    handleClick = divID => {
        $("html,body").animate({scrollTop: $("#" + divID).offset().top}, "slow");
    };

    render() {
        return (
            <div id="resortIMG" className="text-center container-fluid">
                <img
                    className="goDownDiv"
                    src={downward}
                    style={{position: "relative", top: "80%"}}
                    onClick={() => this.handleClick("workWithUs")}
                />
            </div>
        );
    }
}

class WorkWithUs extends Component {
    handleClick = divID => {
        $("html,body").animate({scrollTop: $("#" + divID).offset().top}, "slow");
    };

    render() {
        return (
            <div id="workWithUs" className="text-center container-fluid">
                <h1>WORK WITH US</h1>
                <p className="plaintext">
                    At RESORTer, our people are at the heart of what we do. If you see
                    yourself as someone who thrives working collaboratively and doesn’t
                    shy away from hard work and the seemingly impossible.{" "}
                </p>

                <p className="plaintext">
                    <ContactBtn buttonName="drop us a line" isSHowUnderline="underline"/>
                </p>

                <img
                    className="goDownDiv"
                    src={downward}
                    onClick={() => this.handleClick("highFiveIMG")}
                />
            </div>
        );
    }
}

class HighFive extends Component {
    render() {
        return (
            <div id="highFiveIMG" className="text-center container-fluid">
                {/*todo: make picture grey to see the */}
            </div>
        );
    }
}

class SideIcon extends Component {
    handleClick = divID => {
        $("html,body").animate({scrollTop: $("#" + divID).offset().top}, "slow");
    };

    render() {
        return (
            <div id="sideIcon">
                <div style={{marginBottom: "5%"}}>
                    <img src={icon_behindTheDesk} alt="icon_behindTheDesk"/>
                    <p onClick={() => this.handleClick("behindTheDesks")}>
                        Behind The Desk
                    </p>
                </div>
                <div>
                    <img src={icon_workWithUs} alt="icon_workWithUs"/>
                    <p onClick={() => this.handleClick("workWithUs")}>Work With Us</p>
                </div>
            </div>
        );
    }
}

class HowItWorks extends Component {
    state = {
        currentScrollHeight: 0
    };

    componentDidMount() {
        window.onscroll = () => {
            const newHeight = Math.ceil(window.scrollY / 50) * 50;
            if (this.state.currentScrollHeight !== newHeight) {
                this.setState({currentScrollHeight: window.scrollY});
            }
        };
    }

    render() {
        const opacity = Math.min(100 / this.state.currentScrollHeight, 1);
        return (
            <div className="HowItWorksCSS">
                <SkiTripsMadeEasy/>
                <BehindTheDesks/>
                <ReosrtIMG/>
                <WorkWithUs/>
                <HighFive/>
                <SideIcon/>
                {opacity !== 1 ? (
                    <BackTopBtn scrollStepInPx="50" delayInMs="16.66"/>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default HowItWorks;
