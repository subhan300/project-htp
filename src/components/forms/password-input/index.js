import React from "react";
import { Input } from "antd";
import "./scss/index.scss";
import PropTypes from "prop-types";

export const PasswordInput = (props) => (
  <div>
    <Input.Password
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className="input"
    />
  </div>
);
PasswordInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};
