import { Modal } from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
export const PromiseModal = (props) => {
  const openModal = useCallback(() => {
    Modal[props.modalType]({
      title: props.title,
      content: props.content,
      onOk: props.onOk,
      onCancel: props.onCancel,
      okText: props.okText,
      cancelText: props.cancelText,
      okType: props.okType,
      cancelButtonProps: props.cancelButtonProps,
      okButtonProps: props.okButtonProps,
      centered: props.centered,
      visible: props.visible,
      icon: props.icon,
      closable: props.closable,
    });
  }, [props]);
  useEffect(
    () => (props.visible ? openModal() : null),
    [props.visible, openModal]
  );
  return <div></div>;
};
PromiseModal.propTypes = {
  modalType: PropTypes.string,
  title: PropTypes.any,
  content: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okType: PropTypes.string,
  okText: PropTypes.any,
  cancelText: PropTypes.any,
  centered: PropTypes.any,
  visible: PropTypes.bool,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  icon: PropTypes.object,
  closable: PropTypes.bool,
};
