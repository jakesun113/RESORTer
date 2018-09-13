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
    //transform: translate(8px,-9px);
    //@media(max-width: 992px){
    //  transform: translate(15px,-9px);
    //}
    //@media(max-width: 768px){
    //  transform: translate(30px,-9px);
    //}
    //@media(max-width: 576px){
    //  transform: translate(60px,-9px);
    //}
`;

const ROW = styled.div`
    margin: 0 0 15px 0;
`;

const NOTE = styled.p`
    margin-top: 10px;
    font-size: 0.6rem;
`;

class ActivityRow extends Component {

    handleChange = (e) => {
        const {onChange} = this.props;
        onChange(e.target.id, e.target.checked);
    };

    render() {
        const {pic, alt, text, checkStatus, id} = this.props;
        return (
            <ROW className='row'>
                <IMG_Container className='col-1'>
                    <IMG src={pic} alt={alt}/>
                </IMG_Container>
                <div className='col-md-8 col-9' style={{transform: 'translate(0,5px)'}}>
                    <TEXT><strong>{text}</strong></TEXT>
                </div>
                <CHECKBOX className='col-2 form-check'>
                    <input className="form-check-input" type="checkbox" checked={checkStatus} id={id}
                           onChange={this.handleChange}/>
                    <label className="form-check-label" htmlFor={id}/>
                </CHECKBOX>
            </ROW>
        )
    }
}

class ActivitySelector extends Component {

    handleChange = (id, isChecked) => {
        const {onChange} = this.props;
        onChange(id, isChecked);
    };

    render() {
        const {activity} = this.props;
        return (
            <div className='container' style={{paddingLeft: '0'}}>
                <p><strong>Activity</strong></p>
                <ActivityRow onChange={this.handleChange} pic={pic_ski} alt={'ski'} text={'Ski'}
                             checkStatus={activity[0]}
                             id={'0'}/>
                <ActivityRow onChange={this.handleChange} pic={pic_snowboard} alt={'snowboard'} text={'Snowboard'}
                             checkStatus={activity[1]}
                             id={'1'}/>
                <ActivityRow onChange={this.handleChange} pic={pic_telemark} alt={'telemark'} text={'Telemark*'}
                             checkStatus={activity[2]}
                             id={'2'}/>
                <ActivityRow onChange={this.handleChange} pic={pic_snowbiking} alt={'snowbiking'} text={'Snowbiking*'}
                             checkStatus={activity[3]}
                             id={'3'}/>
                <ActivityRow onChange={this.handleChange} pic={pic_snowshoeing} alt={'snowshoeing'}
                             text={'Snowshoeing*'}
                             checkStatus={activity[4]}
                             id={'4'}/>
                <ActivityRow onChange={this.handleChange} pic={pic_snowmobile} alt={'snowmobile'} text={'Snowmobiling*'}
                             checkStatus={activity[5]}
                             id={'5'}/>
                <NOTE>*Lessons and rental in this are subject to availability at resort</NOTE>
            </div>

        )
    }
}

export default ActivitySelector;