import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import {
  openNotification,
  FileInput,
  Btn,
  // TableComponent,
  PromiseModal,
  Spinner,
} from "../../../components";
import "../header/scss/index.scss";

export const AllPatients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [progress, setProgress] = useState(20);
  const [loading, setLoading] = useState(false);
  const ConfirmText = () => (
    <p className="confirm-text">Are you sure to upload 1000 entries?</p>
  );
  const pathname = window.location.pathname;
  let pathForSideMenu = pathname.replace("/all-patients", "/upload-history");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      setTimeout(() => setProgress(70), 2000);
      setTimeout(() => setProgress(100), 3000);
    }
  }, [loading]);
  const fileInputProps = {
    name: "file",
    dragger: true,
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      status !== "uploading"
        ? console.log(info.file, info.fileList)
        : status === "done"
        ? message.success(`${info.file.name} file uploaded successfully.`)
        : status === "error"
        ? message.error(`${info.file.name} file upload failed.`)
        : null;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div>
      <div className="parent_container_all_patients pl-3 pr-2">
        <PromiseModal
          modalType="confirm"
          content={<FileInput {...fileInputProps} />}
          title={<h3 className="py-4">Select the CSV file</h3>}
          visible={openModal}
          onOk={() => {
            setOpenModal(false);
            setOpenConfirmModal(true);
          }}
          onCancel={() => setOpenModal(false)}
          centered={true}
          icon={<ExclamationCircleOutlined />}
        />
        <PromiseModal
          modalType="confirm"
          content={<ConfirmText />}
          title="Confirm"
          visible={openConfirmModal}
          onOk={() => {
            setOpenConfirmModal(false);
            setLoading(true);
          }}
          onCancel={() => setOpenConfirmModal(false)}
          centered={true}
        />
        {loading ? (
          <>
            <LoadingBar
              color="#0095a2"
              progress={progress}
              onLoaderFinished={() => {
                setProgress(0);
                openNotification(
                  "success",
                  "Uploaded Successfully",
                  "100 entries uploaded sucessfully!",
                  "topRight"
                );
                openNotification(
                  "error",
                  "Uploading Failed",
                  "10 duplicate entries!",
                  "topRight"
                );
                navigate(pathForSideMenu, { replace: true });
              }}
            />
            <Row>
              <Col className="absolute right-7 mr-2 mt-1 upload-status">
                <p>1 out of 10</p>
              </Col>
              <Col className="absolute right-px m-1">
                <Spinner />
              </Col>
            </Row>
          </>
        ) : null}
        <Row className={loading ? "py-3 mt-6" : "py-3"}>
          <Col sm={13} xs={24}>
            <h1 className="">All Patients</h1>
          </Col>
          <Col sm={11} xs={24}>
            <Row justify="space-between" className="">
              <Col xs={11}>
                <Btn
                  btnType="hover"
                  bgColor="white"
                  btnClass="btn"
                  color="black"
                  value="Release Results"
                />
              </Col>
              <Col xs={11}>
                <Btn
                  onClick={() => setOpenModal(true)}
                  btnType="hover"
                  bgColor="white"
                  btnClass="btn"
                  color="black"
                  value="Upload CSV"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* <TableComponent /> */}
    </div>
  );
};
