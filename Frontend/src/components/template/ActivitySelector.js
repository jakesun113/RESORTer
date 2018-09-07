import React, {Component} from "react";
import pic_ski from '../../materials/ActivityIcons/ski.png';
import pic_snowbiking from '../../materials/ActivityIcons/snowbiking.jpg';
import pic_snowboard from '../../materials/ActivityIcons/snowboard.png';
import pic_snowmobile from '../../materials/ActivityIcons/snowmobile.jpg';
import pic_snowshoeing from '../../materials/ActivityIcons/snowshoeing.png';
import pic_telemark from '../../materials/ActivityIcons/telemark.jpeg';
import styled from "styled-components";

const IMG = styled.img`
    width: 35px;
    height:35px; 
`;

const IMG_Container = styled.div`
    padding-left:0

`;

const TEXT = styled.span`
    color: #676362;
`;

const CHECKBOX = styled.div`
    transform: translate(8px,-9px);
    @media(max-width: 992px){
      transform: translate(15px,-9px);
    }
    @media(max-width: 768px){
      transform: translate(30px,-9px);
    }
    @media(max-width: 576px){
      transform: translate(60px,-9px);
    }
`;

const ROW = styled.div`
    margin: 0 0 15px 0;
`;

const NOTE = styled.p`
    margin-top: 10px;
    font-size: 0.6rem;
`;

class ActivitySelector extends Component {
    render() {
        return (
            <div className='container'>
                <p><strong>Activity</strong></p>
                <ROW className='row'>
                    <IMG_Container className='col-1'>
                        <IMG src={pic_ski} alt="ski"/>
                    </IMG_Container>
                    <div className='col-2' style={{transform: 'translate(0,5px)'}}>
                        <TEXT><strong>Ski</strong></TEXT>
                    </div>
                    <CHECKBOX className='col-1 form-check'>
                        <input className="form-check-input" type="checkbox" value="" id="ski"/>
                        <label className="form-check-label" htmlFor="ski"/>
                    </CHECKBOX>
                </ROW>
                <ROW className='row'>
                    <IMG_Container className='col-1'>
                        <IMG src={pic_snowboard} alt="snowboard"/>
                    </IMG_Container>
                    <div className='col-2' style={{transform: 'translate(0,5px)'}}>
                        <TEXT><strong>Snowboard</strong></TEXT>
                    </div>
                    <CHECKBOX className='col-1 form-check'>
                        <input className="form-check-input" type="checkbox" value="" id="snowboard"/>
                        <label className="form-check-label" htmlFor="snowboard"/>
                    </CHECKBOX>
                </ROW>
                <ROW className='row'>
                    <IMG_Container className='col-1'>
                        <IMG src={pic_telemark} alt="telemark"/>
                    </IMG_Container>
                    <div className='col-2' style={{transform: 'translate(0,5px)'}}>
                        <TEXT><strong>Telemark*</strong></TEXT>
                    </div>
                    <CHECKBOX className='col-1 form-check'>
                        <input className="form-check-input" type="checkbox" value="" id="telemark"/>
                        <label className="form-check-label" htmlFor="telemark"/>
                    </CHECKBOX>
                </ROW>
                <ROW className='row'>
                    <IMG_Container className='col-1'>
                        <IMG src={pic_snowbiking} alt="snowbiking"/>
                    </IMG_Container>
                    <div className='col-2' style={{transform: 'translate(0,5px)'}}>
                        <TEXT><strong>Snowbiking*</strong></TEXT>
                    </div>
                    <CHECKBOX className='col-1 form-check'>
                        <input className="form-check-input" type="checkbox" value="" id="snowbiking"/>
                        <label className="form-check-label" htmlFor="snowbiking"/>
                    </CHECKBOX>
                </ROW>
                <ROW className='row'>
                    <IMG_Container className='col-1'>
                        <IMG src={pic_snowshoeing} alt="snowshoeing"/>
                    </IMG_Container>
                    <div className='col-2' style={{transform: 'translate(0,5px)'}}>
                        <TEXT><strong>Snowshoeing*</strong></TEXT>
                    </div>
                    <CHECKBOX className='col-1 form-check'>
                        <input className="form-check-input" type="checkbox" value="" id="snowshoeing"/>
                        <label className="form-check-label" htmlFor="snowshoeing"/>
                    </CHECKBOX>
                </ROW>
                <ROW className='row'>
                    <IMG_Container className='col-1'>
                        <IMG src={pic_snowmobile} alt="snowmobile"/>
                    </IMG_Container>
                    <div className='col-2' style={{transform: 'translate(0,5px)'}}>
                        <TEXT><strong>Snowmobiling*</strong></TEXT>
                    </div>
                    <CHECKBOX className='col-1 form-check'>
                        <input className="form-check-input" type="checkbox" value="" id="snowmobile"/>
                        <label className="form-check-label" htmlFor="snowmobile"/>
                    </CHECKBOX>
                </ROW>
                <NOTE>*Lessons and rental in this are subject to availability at resort</NOTE>
            </div>

        )
    }
}

export default ActivitySelector;