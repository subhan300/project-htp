import React from "react";
import NumberFormat from "react-number-format";
import "./scss/index.scss";
import PropTypes from "prop-types";

export const PhoneInput = (props) => (
  <div className="flex space-x-1">
    <NumberFormat
      format="+1 (###) ###-####"
      mask="_"
      placeholder="Enter your phone number"
      allowEmptyFormatting
      className="input"
      name={props.name}
      value={props.value}
      onValueChange={props.onChange}
    />
  </div>
);

PhoneInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
