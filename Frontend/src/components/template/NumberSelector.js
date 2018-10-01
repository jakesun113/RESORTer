import React, { Component } from "react";
import styled from "styled-components";

const NumInput = styled.input`
  width: 100px;
  border: 1px solid rgba(198, 226, 247, 1);
  padding-left: 12px;
  border-radius: 8px;
  color: #00a6ff;

  &:hover {
    background-color: rgba(234, 247, 255, 1);
  }
`;

class NumberSelector extends Component {
  render() {
    const { labelName, referName, cur_value, onChange, unit } = this.props;
    return (
      <div style={{ margin: "5px 0" }}>
        <form>
          <label>
            <div
              style={{
                display: "inline-block",
                color: "#607375",
                marginRight: "10px"
              }}
            >
              {labelName}
            </div>
            <NumInput
              style={{ marginLeft: "10px" }}
              name={referName}
              type="number"
              min="0"
              value={cur_value}
              onChange={e => onChange(e.target.name, e.target.value)}
            />
            {unit !== "" ? (
              <span style={{ marginLeft: "10px" }}>{unit}</span>
            ) : (
              ""
            )}
          </label>
        </form>
      </div>
    );
  }
}

export default NumberSelector;
