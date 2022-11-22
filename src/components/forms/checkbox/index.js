import React from "react";
import { Checkbox } from "antd";
import PropTypes from "prop-types";
import "./scss/index.scss";

export const CheckboxInput = (props) => {
  const onChange = (e) => {
    props.selectCard(e.target.checked, props.value);
  };
  return (
    <Checkbox checked={props.value} onChange={onChange}>
      {props.checkboxLabel}
    </Checkbox>
  );
};

CheckboxInput.propTypes = {
  checkboxLabel: PropTypes.any,
  selectCard: PropTypes.any,
  value: PropTypes.any,
};
