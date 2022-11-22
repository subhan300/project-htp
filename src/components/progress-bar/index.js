import React from "react";
import { Progress } from "antd";
import "./scss/index.scss";

export const ProgressBar = () => (
  <Progress percent={50} status="active" showInfo={false} />
);
