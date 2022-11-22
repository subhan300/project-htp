import React from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
// import ImgCrop from "antd-img-crop";
import "./scss/index.scss";

export const FileInput = (props) => {
  const { Dragger } = Upload;

  return (
    <div>
      {props.dragger ? (
        <Dragger
          accept={props.accept}
          action={props.action}
          beforeUpload={props.beforeUpload}
          maxCount={props.maxCount}
          multiple={props.multiple}
          name={props.name}
          onChange={props.onChange}
          onDrop={props.onDrop}
          id={props.id}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or Drag the CSV file</p>
        </Dragger>
      ) : (
        <Upload
          accept={props.accept}
          action={props.action}
          beforeUpload={props.beforeUpload}
          maxCount={props.maxCount}
          multiple={props.multiple}
          listType={props.listType}
          name={props.name}
          onChange={props.onChange}
          onDrop={props.onDrop}
          id={props.id}
          fileList={props.fileList}
          onPreview={props.onPreview}
        >
          {props.content}
        </Upload>
      )}
    </div>
  );
};
FileInput.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.any,
  content: PropTypes.any,
  beforeUpload: PropTypes.func,
  dragger: PropTypes.bool,
  maxCount: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onDrop: PropTypes.func,
  id: PropTypes.any,
  listType: PropTypes.string,
  fileList: PropTypes.array,
  onPreview: PropTypes.func,
};
