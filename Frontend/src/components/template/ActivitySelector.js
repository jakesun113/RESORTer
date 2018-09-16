import React, {Component} from "react";
import styled from "styled-components";


const IMG = styled.img`
    width: 35px;
    height:35px; 
`;

const IMG_Container = styled.div`
    
`;

const TEXT = styled.span`
    color: #676362;
`;

const CHECKBOX = styled.div`
    transform: translate(-20px,8px);
    //@media(max-width: 992px){
    //  transform: translate(15px,-9px);
    //}
    @media(max-width: 768px){
      transform:  translate(35px,8px);
    }
    //@media(max-width: 576px){
    //  transform: translate(60px,-9px);
    //}
`;



export const CheckBoxInput = styled.input`
  &:checked + label:before, &:not(:checked) + label:before{
    content: '';
    position: absolute;
    left: -2px;
    top: 2px;
    width: 19px;
    height: 19px;
    border: 1px solid rgba(198, 226, 247, 1);
    border-radius: 20%;
    background: #fff;
  }
  

  &:not(:checked):hover+ label:before{
      background: rgba(198, 226, 247, 1);
  }
  
  &:checked + label:after, &:not(:checked) + label:after{
    content: "\\f00c";
    font-family: "Font Awesome 5 Free",serif; 
    position: absolute;
    top: 1px;
    left: 1px;
    font-size: 0.9em;
    color:#00A6FF;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    font-weight: 100; 
  }
   
  &:not(:checked) + label:after{
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
   
  &:checked + label:after{
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

class ActivitySelector extends Component {

    handleChange = (e) => {
        const {onChange} = this.props;
        onChange(e.target.id, e.target.checked);
    };

    render() {
        const {pic, alt, text, checkStatus, id} = this.props;
        return (
            <div className='row'>
                <IMG_Container className='col-1'>
                    <IMG src={pic} alt={alt}/>
                </IMG_Container>
                <div className='col-8' style={{transform: 'translate(0,5px)'}}>
                    <TEXT><strong>{text}</strong></TEXT>
                </div>
                <CHECKBOX className='col-2 form-check'>
                    <CheckBoxInput className="form-check-input" type="checkbox" checked={checkStatus} id={id}
                                   onChange={this.handleChange}/>
                    <label className="form-check-label" htmlFor={id}/>
                </CHECKBOX>
            </div>
        )
    }
}

export default ActivitySelector;