import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { notification, Space, Badge } from "antd";
import PropTypes from "prop-types";
import { BellOutlined } from "@ant-design/icons";
export const openNotification = (type, message, description, placement) => {
  type === "success" &&
    notification.success({
      message,
      description,
      placement,
    });
  type === "warning" &&
    notification.warning({
      message,
      description,
      placement,
    });
  type === "error" &&
    notification.error({
      message,
      description,
      placement,
    });
};
export const Notification = (props) => {
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setMessage(props.message);
    setDescription(props.description);
  }, [props]);
  const openNotification = (placement) => {
    props.Type === "success" &&
      notification.success({
        message,
        description,
        placement,
      });
    props.Type === "warning" &&
      notification.warning({
        message,
        description,
        placement,
      });
  };
  return (
    <div>
      <Space>
        <Badge size={"small"} count={99}>
          <BellOutlined
            onClick={() => openNotification("topRight")}
            size={"large"}
            style={{ fontSize: "18px", marginTop: "3px" }}
          />
        </Badge>
      </Space>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
  Type: PropTypes.string,
};
