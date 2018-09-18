import React, {Component} from "react";
import styled from "styled-components";
import 'react-router-dom';


export const HeaderLine = styled.div`
  margin: 20px 0 30px 0;
`;

export const Title = styled.span`
  color: rgb(73,131,178);
  font-size: 25px;
  padding-right: 20px;
`;

const UpperEllipseButton = styled.button`
  border: 0 solid black;
  padding: 4px 20px;
  background-color: rgba(104,99,105,1);
  border-radius: 20px;
  transition: background-color 1s ;
  transform: translate(0,-5px);
  
  &:hover  {
    background-color: black;
    cursor: pointer;
  }
`;

const NumInput = styled.input`
  width: 100px;
  border: 1px solid rgba(198, 226, 247, 1);
  padding-left: 12px;
  border-radius: 8px;
  color: #00A6FF;
  
  &:hover {
    background-color: rgba(234, 247, 255, 1);
  }
`;

const TextInput = styled.textarea`
  width: 90%;
  height:150px;
  border: 1px solid rgba(198, 226, 247, 1);
  padding-left: 12px;
  border-radius: 8px;
  color: #00A6FF;
  resize: none;
  &::-webkit-input-placeholder {
    color: darkgray;
    font-size: smaller;
  }
`;

export const BtmEllipseButton = styled.button`
  border: 0 solid black;
  padding: 10px 40px;
  background-color: rgba(255, 97, 97, 1);
  border-radius: 20px;
  transition: background-color 0.4s ease-in;
  
  &:hover  {
    background-color: black;
    cursor: pointer;
  }
`;

export const LeaveRow = styled.div`
  width:90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RadioLabel = styled.label`
   padding-left: 10px;
`;

const RadioInput = styled.input`
  &:checked + ${RadioLabel}:before, &:not(:checked) + ${RadioLabel}:before{
    content: '';
    position: absolute;
    left: 13px;
    top: 4px;
    width: 18px;
    height: 18px;
    border: 1px solid rgba(198, 226, 247, 1);
    border-radius: 100%;
    background: #fff;
  }
  

  &:not(:checked):hover+ ${RadioLabel}:before{
      background: rgba(198, 226, 247, 1);
  }
  
  &:checked + ${RadioLabel}:after, &:not(:checked) + ${RadioLabel}:after{
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #00A6FF;
    top: 8px;
    left: 17px;
    border-radius: 100%;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
  }
   
  &:not(:checked) + ${RadioLabel}:after{
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
   
  &:checked + ${RadioLabel}:after{
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
   
`;

const Warning = styled.p`
  margin-bottom: 10px; 
  color:rgba(255, 97, 97, 1);
  font-style: italic;
  font-weight: 100;
  font-size:smaller;
`;


class RadioSelector extends Component {
    handleChange = (e) => {
        const {onChange, referName} = this.props;
        onChange(referName, e.target.value)
    };

    render() {
        const {header, v1, v2, v3, v4, curValue} = this.props;
        return (
            <div className='row' style={{marginBottom: '20px', color: '#607375'}}>
                <div className='col-12 col-md-2'
                     style={{display: 'inline-block'}}>{header}</div>

                <div className='col-12 col-md-10'>
                    <form className='row'>
                        <div className='col-5 col-md-3'>
                            <RadioInput id={v1} type="radio" name={header} value={v1} checked={curValue === v1}
                                        onChange={this.handleChange}/>
                            <RadioLabel htmlFor={v1} className="radio-inline">{v1}</RadioLabel>
                        </div>
                        <div className='col-5 col-md-3'>

                            <RadioInput id={v2} type="radio" name={header} value={v2} checked={curValue === v2}
                                        onChange={this.handleChange}/>
                            <RadioLabel htmlFor={v2} className="radio-inline">{v2}</RadioLabel>
                        </div>
                        <div className='col-5 col-md-3'>

                            <RadioInput id={v3} type="radio" name={header} value={v3} checked={curValue === v3}
                                        onChange={this.handleChange}/>
                            <RadioLabel htmlFor={v3} className="radio-inline">{v3}</RadioLabel>
                        </div>
                        <div className='col-5 col-md-3'>
                            <RadioInput id={v4} type="radio" name={header} value={v4} checked={curValue === v4}
                                        onChange={this.handleChange}/>
                            <RadioLabel htmlFor={v4} className="radio-inline">{v4}</RadioLabel>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


class NumberSelector extends Component {
    handleChange = (e) => {
        const {onChange} = this.props;
        onChange(e.target.name, e.target.value)
    };


    render() {
        const {labelName, referName, cur_value} = this.props;
        return (
            <div style={{margin: '5px 0'}}>
                <form>
                    <label>
                        <div style={{display: 'inline-block', color: '#607375', marginRight: '10px'}}>{labelName}</div>
                        <NumInput name={referName} type='number' min="0" value={cur_value}
                                  onChange={this.handleChange}/>
                    </label>
                </form>
            </div>
        )
    }
}

class Requirement extends Component {
    handleChange = (e) => {
        const {onChange} = this.props;
        onChange('requirement', e.target.value)
    };

    render() {
        const {curValue} = this.props;
        const placeHolderText = "e.g. ski in, ski out; close to the main lift";
        return (
            <div style={{color: '#607375'}}>
                <div style={{marginBottom: '15px'}}>Specific Requirements:</div>
                <TextInput value={curValue} onChange={this.handleChange} placeholder={placeHolderText}/>
            </div>

        )
    }
}

class BookingAccommodation extends Component {

    state = {
        acco_type: '',
        acco_cate: '',
        num_adult: '',
        num_child: '',
        num_toddler: '',
        num_bedroom: '',
        num_bathroom: '',
        requirement: '',
        warning_status: false,
    };

    // redirectPage = (url) => {
    //     const {history} = this.props;
    //     history.push(url);
    //     // window.location.replace(url);
    // };

    skipAccommodation = () => {
        const {place, history} = this.props;
        const url = `/booking/${place}/doing`;
        history.push(url);
    };

    goPrevious = () => {
        const {place, history} = this.props;
        const url = `/booking/${place}/who`;
        history.push(url);
    };

    goNext = () => {
        const {place, history} = this.props;
        const {acco_type, acco_cate, num_adult, num_child, num_toddler, num_bedroom, num_bathroom} = this.state;
        if (acco_type === '' || acco_cate === '' || num_adult === '' || num_child === '' || num_toddler === '' || num_bedroom === '' || num_bathroom === '') {
            this.setState({
                warning_status: true,
            })
        }
        else {
            //todo: connect to backend database (need master memberID)
            const url = `/booking/${place}/doing`;
            history.push(url);
        }
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    render() {
        const {acco_type, acco_cate, num_adult, num_child, num_toddler, num_bedroom, num_bathroom, requirement, warning_status} = this.state;
        return (
            <div className='container' style={{marginTop: '20px'}}>
                <HeaderLine>
                    <Title>
                        <strong>2. ACCOMMODATION NEEDS</strong>
                    </Title>
                    <UpperEllipseButton onClick={this.skipAccommodation}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Skip Accommodation
                        </div>
                    </UpperEllipseButton>
                </HeaderLine>
                <p style={{marginBottom: '10px'}}>Get a recommendation from the local folk at the resort</p>

                {warning_status ?
                    <Warning>Please fill all the fields (except "Specific Requirements") before
                        proceeding</Warning> : null}

                <RadioSelector header={'Type:'} v1={'Apartment'} v2={'Hotel'} v3={'Studio'} v4={'Lodge'}
                               onChange={this.handleChange} referName='acco_type' curValue={acco_type}/>
                <RadioSelector header={'Category:'} v1={'Economy'} v2={'Moderate'} v3={'Deluxe'} v4={'First Class'}
                               onChange={this.handleChange} referName={'acco_cate'} curValue={acco_cate}/>

                <div style={{height: '20px'}}/>

                <NumberSelector labelName="No. of Adults (18 yrs +):" referName='num_adult' cur_value={num_adult}
                                onChange={this.handleChange}/>
                <NumberSelector labelName="No. of Children (3-17 yrs):" referName='num_child' cur_value={num_child}
                                onChange={this.handleChange}/>
                <NumberSelector labelName="No. of Toddlers (0-2 yrs):" referName='num_toddler' cur_value={num_toddler}
                                onChange={this.handleChange}/>

                <div style={{height: '20px'}}/>

                <NumberSelector labelName="Bedroom:" referName='num_bedroom' cur_value={num_bedroom}
                                onChange={this.handleChange}/>
                <NumberSelector labelName="Bathroom:" referName='num_bathroom' cur_value={num_bathroom}
                                onChange={this.handleChange}/>

                <div style={{height: '20px'}}/>

                <Requirement curValue={requirement} onChange={this.handleChange}/>

                <div style={{height: '20px'}}/>

                <LeaveRow>
                    <BtmEllipseButton onClick={this.goPrevious}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Back
                        </div>
                    </BtmEllipseButton>
                    <BtmEllipseButton onClick={this.goNext}>
                        <div style={{
                            fontSize: '12px',
                            color: 'white',
                        }}>Save & Continue
                        </div>
                    </BtmEllipseButton>
                </LeaveRow>
            </div>
        )
    }

}

export default BookingAccommodation;