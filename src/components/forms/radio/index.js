import React from "react";
import "./scss/index.scss";
import PropTypes from "prop-types";
import { Radio } from "antd";

export const RadioComponent = (props) => (
  <Radio
    name="radio"
    size="large"
    className="radiobtn"
    onClick={props.onClick}
    checked={props.checked}
  >
    {props.radioText ? props.radioText : "Radio"}
  </Radio>
);
RadioComponent.propTypes = {
  radioText: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};
