import React from "react";
import "antd/dist/antd.css";
import "../scss/index.scss";
import { Modal } from "antd";
import PropTypes from "prop-types";

export const DetailModal = (props) => {
  return (
    <Modal
      title={props.title}
      visible={props.isModalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={props.footer}
      closable={props.closable}
      confirmLoading={props.confirmLoading}
      afterClose={props.afterClose}
      mask={props.mask}
      maskStyle={props.maskStyle}
      centered={props.centered}
      destroyOnClose={props.destroyOnClose}
      okButtonProps={props.okButtonProps}
      className="modal flex justify-center items-center content-center sm:h-screen h-auto"
    >
      {props.content}
    </Modal>
  );
};

DetailModal.propTypes = {
  title: PropTypes.any,
  handleOk: PropTypes.any,
  handleCancel: PropTypes.any,
  isModalVisible: PropTypes.any,
  content: PropTypes.any,
  footer: PropTypes.any,
  closable: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  afterClose: PropTypes.func,
  mask: PropTypes.bool,
  maskStyle: PropTypes.any,
  centered: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  okButtonProps: PropTypes.any,
};
