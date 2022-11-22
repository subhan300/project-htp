import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export const Spinner = (props) => (
  <Spin
    indicator={
      props.icon ? (
        props.icon
      ) : (
        <LoadingOutlined spin className={props.className} />
      )
    }
    size={props.size}
    style={props.style}
  />
);

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.any,
};
