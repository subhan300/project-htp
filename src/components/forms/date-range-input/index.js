import React from "react";
import { DatePicker } from "antd";
import { PropTypes } from "prop-types";
import "./scss/index.scss";
const { RangePicker } = DatePicker;

export const DateRangeInput = (props) => (
  <div>
    <RangePicker className="dateRangeInner" onChange={props.onChange} />
  </div>
);
DateRangeInput.propTypes = {
  onChange: PropTypes.func,
};
