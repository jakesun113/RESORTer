import React, { Component } from 'react';
import '../../css/Homepage/search.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
DropDown default name: this.props.defaultName - String
Options: this.props.options - Array
Acquire Value: this.props.dropDownValue - function
*/
class Dropdown extends Component{

    handleChange(e) {
        this.props.dropDownValue(e.target.value);
      }
    render(){

        return(
        <div>
            <select className="custom-select" onChange={this.handleChange.bind(this)}>
            <option selected="" value="" default="" disabled="" id="hiddenSearch">{this.props.defaultName}</option>
            {
                this.props.options.length === 0 ? null : this.props.options.map((option) =>{
                    return <option  key={option}>{option}</option>
                })
            }
            </select>
        </div>
        );
    }
}
export default Dropdown;