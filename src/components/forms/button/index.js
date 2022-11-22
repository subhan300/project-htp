import React from "react";
import PropTypes from "prop-types";
import "./scss/index.scss";

export const Btn = (props) => (
  <button
    onClick={props.onClick}
    type={props.type}
    className={props.btnClass ? props.btnClass : "btn"}
    disabled={props.disabled}
    style={{
      background: props.bgColor,
      color: props.color,
      border: props.border,
    }}
  >
    {props.icon ? (
      <span className="mr-2 ">{<img src={props.icon}></img>}</span>
    ) : (
      ""
    )}

    {props.value && props.value}
  </button>
);

Btn.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  icon: PropTypes.any,
  onClick: PropTypes.any,
  backBtn: PropTypes.string,
  btnType: PropTypes.string,
  bgColor: PropTypes.string,
  hover: PropTypes.string,
  btnClass: PropTypes.string,
  color: PropTypes.string,
  btn: PropTypes.string,
  border: PropTypes.string,
  disabled: PropTypes.bool,
};
