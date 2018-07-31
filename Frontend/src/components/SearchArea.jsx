import React, { Component } from "react";
const TitleStyle = {
  fontSize: "2em"
};

const SubTitleStyle = {
  color: "cornflowerblue",
  marginLeft: "10px"
};

const BottonStyle = {
  background: "orangered",
  borderRadius: "20px",
  padding: "10px",
  paddingLeft: "60px",
  paddingRight: "60px",
  color: "white",
  fontWeight: "bold"
};

class SearchArea extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="container">
          <div>
            <p>
              <span style={TitleStyle}>Search Resorts</span>
            </p>
          </div>
          <div>
            <p>
              <span style={SubTitleStyle}>By Country / Resort</span>
            </p>
            <div class="container">
              <div class="row">
                <div class="col">
                  <select class="custom-select custom-select-lg mb-3">
                    <option selected>By Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col">
                  <select class="custom-select custom-select-lg mb-3">
                    <option selected>By Resort</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col">
                  <button style={BottonStyle}>
                    <span>Make a Plan to Get a Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p>
              <span style={SubTitleStyle}>By Resort Alliance Program</span>
            </p>
            <div class="container">
              <div class="row">
                <div class="col">
                  <select class="custom-select custom-select-lg mb-3">
                    <option selected>By Liftpass</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col">
                  <select class="custom-select custom-select-lg mb-3">
                    <option selected>By Resort</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col">
                  <button style={BottonStyle}>
                    <span>Make a Plan to Get a Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchArea;
