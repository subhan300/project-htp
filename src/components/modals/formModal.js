import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DynamicFieldSet } from "../dynamic-fields";
import PropTypes from "prop-types";

export const FormModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DynamicFieldSet
          testName={props.testName}
          setTestName={props.setTestName}
          onFinish={props.onFinish}
        />
      </Modal>
    </>
  );
};

FormModal.propTypes = {
  testName: PropTypes.string,
  setTestName: PropTypes.func,
  onFinish: PropTypes.func,
};
