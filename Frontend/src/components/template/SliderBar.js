import React, {Component} from "react";
import "../../css/template/SliderBar.css";

class SliderBar extends Component {

    handleChange = e => {
        const {onChange} = this.props;
        onChange(e.target.id, e.target.value)
    };

    render() {
        const {min, max, id, value, label} = this.props;
        console.log("label is");

        return (
            <React.Fragment>
                <div className="row" style={{transform: 'translate(0,10px)'}}>
                    {label === undefined ? null : (<div className="col-2" style={{paddingLeft: '0'}}>
                        <label style={{fontWeight: '600', fontSize: '0.8em', color: '#607375'}} htmlFor={id}>
                            {label}
                        </label>
                    </div>)}
                    <div className="col-8">
                        <input
                            type="range"
                            className="color-slider-bar"
                            min={min}
                            max={max}
                            step="1"
                            id={id}
                            onChange={this.handleChange}
                            value={value}
                        />
                    </div>
                    <div className='col-2'>
                        <span style={{fontWeight: "bold"}}>{value}</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SliderBar;
