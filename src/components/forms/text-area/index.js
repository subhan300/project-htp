import React from "react";
import PropTypes from "prop-types";
import "./scss/index.scss";
import { Input } from "antd";

export const TextAreaInput = (props) => {
  const { TextArea } = Input;
  return (
    <TextArea
      rows={props.rows}
      placeholder={props.placeholder}
      className="input"
      // disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

TextAreaInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  rows: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
