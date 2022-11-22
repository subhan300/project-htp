import React from "react";
import "./scss/index.scss";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import { Select } from "antd";

export const SelectInput = (props) => {
  const { Option } = Select;

  return (
    <div>
      <div id="antd_select_input">
        <Select
          style={{ backgroundColor: props?.bgColor, color: props?.color }}
          mode={props.mode}
          defaultValue={props.defaultValue}
          onChange={(e) => {
            props.setData(e);
            props.setValue ? props.setValue(e) : null;
          }}
          value={props.selectValue}
          placeholder={props.placeholder}
        >
          {props.value?.map((val, i) => (
            <Option key={i} value={val}>
              {val}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
SelectInput.propTypes = {
  defaultValue: PropTypes.any,
  value: PropTypes.array,
  setData: PropTypes.any,
  mode: PropTypes.string,
  placeholder: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  setValue: PropTypes.any,
  selectValue: PropTypes.any,
};
