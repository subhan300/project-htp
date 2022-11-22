import React from "react";
import PropTypes from "prop-types";
import "./scss/index.scss";
import { Input } from "antd";

export const TextInput = (props) => (
  <div>
    <Input
      placeholder={props.placeholder}
      type={props.type}
      className="input"
      style={{ color: props.color }}
      id={props.id}
      required={props.required}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);
TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.array,
  required: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  id: PropTypes.any,
  color: PropTypes.string,
};
