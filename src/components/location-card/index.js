import React, { useState } from "react";

import PropTypes from "prop-types";
import { Card, Col, Row } from "antd";
import { DeleteOutlined, ScanOutlined } from "@ant-design/icons";
import "./scss/index.scss";

import { DetailModal } from "../modals";
import QRCode from "react-qr-code";
import { InformationDrawer } from "../information-drawer";
import { LocationDetails } from "./drawerInformation";
import { locationAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { PromiseModal } from "..";
export function LocationCard(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [load, setLoad] = useState(false);
  let [drawerOpen, setOpenDrawer] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  let dispatch = useDispatch();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteLocation = (id) => {
    dispatch(locationAction.deleteLocation(id));
  };
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [id, setId] = useState("");

  return (
    <>
      <PromiseModal
        modalType="confirm"
        content="Are you sure you want to delete this production?"
        title="Alert"
        visible={delModalVisible}
        onOk={() => {
          deleteLocation(id);
          setDelModalVisible(false);
          setId("");
        }}
        onCancel={() => {
          setDelModalVisible(false);
          setId("");
        }}
        centered={true}
      />
      <InformationDrawer
        content={
          <LocationDetails
            load={load}
            setLoad={setLoad}
            setOpenDrawer={setOpenDrawer}
            details={props.all_details}
          />
        }
        openDrawer={drawerOpen}
        onClose={drawerOpen}
        setOpenDrawer={setOpenDrawer}
      />
      <DetailModal
        title={"Bar Code Scanner "}
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        footer={true}
        content={
          <div className="text-center flex items-start flex-col justify-start ">
            <Row className="text-center flex justify-center h-80 overflow-y-auto">
              {props.barCodeScanner?.map((val, i) => {
                return (
                  <Col key={i} xs={14} className="text-center ">
                    <p key={i} className=" text-xl font-black p-4 ">
                      <span className="font-medium"> {val.name}</span>
                    </p>
                    <div>
                      <QRCode
                        value={`${window.location.origin}/add_patient?test=${val?.name}&location=${props.location_id}`}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        }
      />
      <div className="location-card-icon-div  w-5/12 flex justify-end relative z-30 ml-auto top-12 pr-2 ">
        <DeleteOutlined
          style={{ fontSize: "24px", color: "gray" }}
          onClick={() => {
            setDelModalVisible(true);
            setId(props.location_id);
          }}
        />
        <ScanOutlined
          className="location-card-icon"
          style={{ fontSize: "24px", color: "gray" }}
          onClick={() => showModal()}
        />
      </div>
      <Card className="cards pb-8 " onClick={() => setOpenDrawer(true)}>
        <div className="flex items-center">
          <p className="location-card-title mb-1 w-4/5 ">{props.title}</p>
        </div>
        <hr></hr>
        <p className="patient-number mt-3 leading-10">{props.patientNumber}</p>
        <p className="text-base  location-text ">{props.text}</p>
      </Card>
    </>
  );
}

LocationCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  patientNumber: PropTypes.any,
  barCodeScanner: PropTypes.array,
  location_id: PropTypes.string,
  testName: PropTypes.array,
  all_details: PropTypes.object,
};
