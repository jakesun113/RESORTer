import React, {Component} from "react";
import ablilityImg from "../../materials/AbilityChart/newAbilityChart.PNG.png";

class AbilityImg extends Component {
    render() {
        return (
            <React.Fragment>
                {/* img */}
                <div style={{position: "absolute", left: "50%"}}>
                    <img
                        style={{
                            position: "relative",
                            width: '600px',
                            zIndex: "10",
                            left: "-50%"
                        }}
                        alt="ablilityImg"
                        src={ablilityImg}
                    />
                </div>
            </React.Fragment>
        );
    }
}

class AbilityLevelTip extends Component {
    state = {isShow: false};

    render() {
        return (
            <React.Fragment>
                <i
                    className="fas fa-exclamation-circle"
                    id="tooltip-icon"
                    style={{color: "rgba(255, 97, 97, 1)", fontSize: "20px"}}
                    onMouseEnter={() => {
                        this.setState({isShow: true});
                    }}
                    onMouseLeave={() => {
                        this.setState({isShow: false});
                    }}
                />
                {this.state.isShow ? <AbilityImg/> : ""}
            </React.Fragment>
        );
    }
}

export default AbilityLevelTip;
