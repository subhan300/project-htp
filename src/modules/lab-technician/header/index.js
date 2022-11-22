import React, { useState } from "react";
import { Row, Col } from "antd";
import { Btn } from "../../../components/forms/button";
import "./scss/index.scss";
import PropTypes from "prop-types";
import { ModalComponent } from "../../../components";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const LabTechnicianHeader = (props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="parent_container_all_patients pl-3 pr-2">
      <ModalComponent
        openModal={openModal}
        type="showSimpleModal"
        title="Select the CSV file "
        setOpenModal={setOpenModal}
        cancelText="Cancel"
        icon={<ExclamationCircleOutlined />}
      />

      <Row className="py-3">
        <Col sm={13} xs={24}>
          <h1 className="">{props.name}</h1>
        </Col>

        <Col sm={11} xs={24}>
          <Row justify="space-between" className="">
            <Col xs={11}>
              <Btn
                btnType="hover"
                bgColor="white"
                color="black"
                value="Release Results"
              />
            </Col>
            <Col xs={11}>
              <Btn
                onClick={() => setOpenModal(true)}
                btnType="hover"
                bgColor="white"
                color="black"
                value="Upload CSV"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

LabTechnicianHeader.propTypes = {
  name: PropTypes.string,
};
