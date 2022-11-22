import React, { useState, useEffect, useRef } from "react";
import {
  TableComponent,
  Btn,
  InformationDrawer,
  PatientDrawer,
  DetailModal,
  SelectInput,
  TextInput,
} from "../../../components";
import { existingPatientIcon, newPatientIcon } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patientAction } from "../../../store/actions";
import { actionDelete, actionView, actionAccept } from "../../../assets/images";
import { Space, Row, Col, Alert, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../../app.scss";
import "./scss/index.scss";

export const Uncollected = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [modalError, setModalError] = useState("");
  const [current, setCurrent] = useState(1);
  const [openModal, setOpenModal] = useState({
    testType: false,
    patientType: false,
    findPatient: false,
    deletePatient: false,
  });
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({ id: "", pid: "", oid: "" });
  const [pid, setPid] = useState(null);
  const [testType, setTestType] = useState(null);
  const [content, setContent] = useState("");
  const openInformationDrawer = (content) => {
    setOpenDrawer(true);
    setContent(content);
  };
  const findPatient = () => {
    setLoading(true);
    let data = {
      test_type: { name: test, type: testType },
      pid: pid,
    };
    dispatch(patientAction.recreatePatient(data, clear, setLoading));
  };
  const clear = () => {
    setPid("");
    setOpenModal({
      testType: false,
      patientType: false,
      findPatient: false,
      deletePatient: false,
    });
    setTest(null);
    setTestType(null);
  };
  useEffect(() => {
    dispatch(patientAction.getUncollectedPatients());
    dispatch(patientAction.getPatientForm());
  }, [dispatch]);
  let patients = useSelector((state) => state.patients?.uncollected);
  let patientsCopy = useSelector((state) => state.patients?.patientCopy);
  let patientLength = useSelector(
    (state) => state.patients?.uncollectedPatientsLength
  );
  let testTypes = useSelector((state) => state.patients?.requiredFields?.test);
  const [searchText, setSearchText] = useState("");
  let searchInput = useRef();
  const handleSearch = (dataIndex) => {
    if (searchText) {
      dispatch(
        patientAction.getfilteredUncollectedPatients(
          `${dataIndex}=${searchText}`,
          patients
        )
      );
    }
  };

  const handleReset = () => {
    if (patientsCopy.length) {
      dispatch(patientAction.resetUncollectedSearch());
    }
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: () => (
      <div className="p-3">
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onPressEnter={() => handleSearch(dataIndex)}
          className="mb-3 block"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="w-24"
          >
            Search
          </Button>
          <Button onClick={() => handleReset()} size="small" className="w-24">
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });
  const getPatients = (page) => {
    dispatch(patientAction.getUncollectedPatients(page * 6 - 6));
  };
  const deletePatient = (data) => {
    dispatch(
      patientAction.deletePatient(
        {
          _id: data.id,
        },
        openModal,
        setOpenModal
      )
    );
  };
  const data = patients?.map((val, i) => ({
    ...val,
    key: i,
    id: val._id,
    pid: val.pid,
    order_no: val.order_no,
    createdAt: val.createdAt,
    first_name: val.first_name,
    last_name: val.last_name,
    telephone: val.telephone,
    date_of_birth: val.date_of_birth,
    location_name: val.location_id.location_name,
    testDetail: val.test_type.name + " - " + val.test_type.type,
  }));
  let columnsTitles = [
    {
      title: `Patient ID`,
      dataIndex: "pid",
      key: "pid",
      serachProps: "pid",
      align: "right",
      responsive: ["xs"],
      search: getColumnSearchProps("pid"),
    },
    {
      title: `Order ID`,
      dataIndex: "order_no",
      key: "order_no",
      serachProps: "order_no",
      align: "right",
      responsive: ["xs"],
      search: getColumnSearchProps("order_no"),
    },
    {
      title: "First Name",
      align: "right",
      dataIndex: "first_name",
      key: "firstname",
      searchProps: "first_name",
      responsive: ["xs"],
      search: getColumnSearchProps("first_name"),
    },
    {
      title: "Last Name",
      align: "right",
      dataIndex: "last_name",
      key: "lastname",
      searchProps: "last_name",
      responsive: ["xs"],
      search: getColumnSearchProps("last_name"),
    },
    {
      title: "Date Of Birth",
      align: "right",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      searchProps: "date_of_birth",
      responsive: ["xs"],
    },
    {
      title: "Phone",
      align: "right",
      dataIndex: "telephone",
      key: "telephone",
      searchProps: "telephone",
      responsive: ["xs"],
      search: getColumnSearchProps("telephone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      searchProps: "email",
      responsive: ["xs"],
      search: getColumnSearchProps("email"),
    },
    {
      title: "Test Type",
      dataIndex: "testDetail",
      key: "testDetail",
      searchProps: "testDetail",
      responsive: ["xs"],
      search: getColumnSearchProps("type"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      searchProps: "action",
      responsive: ["xs"],
      render: (text, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Space
              className="flex h-7 w-7 justify-center action-eye-span cursor-pointer"
              size="middle"
              onClick={() => openInformationDrawer(record)}
            >
              {record.is_review ? (
                <img src={actionAccept} alt="View" />
              ) : (
                <img src={actionView} alt="Edit" />
              )}
            </Space>
            <Space
              className="flex h-7 w-7 justify-center action-eye-span cursor-pointer"
              size="middle"
              onClick={() => {
                setOpenModal({ ...openModal, deletePatient: true });
                setPatientData({
                  id: record._id,
                  pid: record.pid,
                  oid: record.order_no,
                });
              }}
            >
              <img src={actionDelete} alt="Delete" />
            </Space>
          </div>
        );
      },
    },
  ];
  let types = testTypes?.filter((data) => {
    if (data.name === test) {
      return data.types;
    }
  });
  return (
    <div className="">
      <InformationDrawer
        content={
          <PatientDrawer
            data={content}
            testTypes={testTypes}
            setOpenDrawer={setOpenDrawer}
            type={"uncollected"}
          />
        }
        destroyOnClose={true}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <DetailModal
        centered={true}
        isModalVisible={openModal.deletePatient}
        handleOk={() => deletePatient(patientData)}
        handleCancel={() =>
          setOpenModal({ ...openModal, deletePatient: false })
        }
        title="Delete"
        content={
          <p className="delete-modal-content">
            Are you sure you want to delete this patient pid:{" "}
            <b>{patientData.pid}</b> and order id: <b>{patientData.oid}</b>{" "}
            permanently?
          </p>
        }
        okButtonProps={{ type: "primary", danger: true }}
      />
      <DetailModal
        centered={true}
        isModalVisible={openModal.testType}
        handleCancel={() => {
          setOpenModal({ ...openModal, testType: false });
          setModalError("");
        }}
        handleOk={() => {
          if (test && testType) {
            setOpenModal({ ...openModal, testType: false, patientType: true });
          } else {
            setModalError("Please select test and test type");
          }
        }}
        title={"Create Patient"}
        content={
          <div>
            {modalError && (
              <Alert
                banner
                type="error"
                closable={false}
                message={modalError}
              />
            )}
            <Row gutter={[20, 20]}>
              <Col sm={24} xs={24}>
                <label className="text-font-size ">Select Test</label>
                <SelectInput
                  name="test"
                  setData={(test) => setTest(test)}
                  value={testTypes?.map((testName) => testName.name)}
                  placeholder="Select Test"
                />
              </Col>
              <Col sm={24} xs={24}>
                <label className="text-font-size ">Select Test Type</label>
                <SelectInput
                  name="testType"
                  setData={(testType) => {
                    setTestType(testType);
                  }}
                  value={types && types[0] ? types[0].types : null}
                  placeholder={"Select Test Type"}
                />
              </Col>
            </Row>
          </div>
        }
      />
      <DetailModal
        centered={true}
        isModalVisible={openModal.patientType}
        title={"Patient Type"}
        content={
          <Row justify="center">
            <Col
              className="centralize_card "
              sm={24}
              xs={24}
              md={24}
              xl={24}
              xxl={24}
            >
              <Row justify="center">
                <Col xs={22}>
                  <label htmlFor="existingPatient">
                    <div
                      id="existingPatient"
                      onClick={() =>
                        setOpenModal({
                          ...openModal,
                          patientType: false,
                          findPatient: true,
                        })
                      }
                      className={`card cursor-pointer flex justify-between align-middle`}
                    >
                      <div className="flex ">
                        <img
                          src={existingPatientIcon}
                          alt="EmailIcon"
                          className="w-20"
                        />
                        <div className="ml-3 flex items-center">
                          <h2 className="card_heading mb-0">
                            Existing Patient
                          </h2>
                        </div>
                      </div>
                    </div>
                  </label>
                </Col>
              </Row>
              <Row className="mt-5" justify="center">
                <Col xs={22}>
                  <label>
                    <div
                      onClick={() =>
                        navigate("/htp/MedicalProfession/add-new-patient", {
                          state: { test, testType },
                        })
                      }
                      className={
                        "card cursor-pointer flex justify-between align-middle"
                      }
                    >
                      <div className="flex ">
                        <img
                          src={newPatientIcon}
                          alt="newPatient"
                          className="w-20"
                        />
                        <div className="ml-3 flex items-center">
                          <h2 className="card_heading mb-0">New Patient</h2>
                        </div>
                      </div>
                    </div>
                  </label>
                </Col>
              </Row>
            </Col>
          </Row>
        }
        footer={null}
        mask={true}
        handleCancel={() => setOpenModal({ ...openModal, patientType: false })}
        afterClose={() => setOpenModal({ ...openModal, patientType: false })}
      />
      <DetailModal
        centered={true}
        isModalVisible={openModal.findPatient}
        handleCancel={() => {
          setOpenModal({ ...openModal, findPatient: false });
        }}
        confirmLoading={loading}
        handleOk={findPatient}
        title={"Find Patient"}
        content={
          <div>
            <Row gutter={[20, 20]}>
              <Col sm={24} xs={24}>
                <label className="text-font-size ">Enter PID</label>
                <TextInput
                  onChange={(input) => setPid(input.target.value)}
                  placeholder={"Enter PID"}
                />
              </Col>
              <Col sm={24} xs={24}>
                <label className="text-font-size ">Enter Patient Name</label>
                <TextInput placeholder={"Enter Patient Name"} />
              </Col>
            </Row>
          </div>
        }
      />
      <div className="flex items-center xs:flex-col justify-between p-5">
        <h1 className="panel-title">Uncollected</h1>

        <div className="xs:mt-4">
          <Btn
            value="Create New Patient"
            bgColor="transparent"
            color="#707070"
            border="1px solid #707070"
            onClick={() => {
              setOpenModal({
                ...openModal,
                testType: true,
              });
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        {" "}
        <TableComponent
          columnsTitles={columnsTitles}
          data={data}
          current={current}
          total={patientLength}
          onChange={(page) => {
            setCurrent(page);
            getPatients(page);
          }}
        />
      </div>
    </div>
  );
};
