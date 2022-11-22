import React, { useState, useEffect, useRef } from "react";
import {
  TableComponent,
  InformationDrawer,
  PatientDetails,
  SelectInput,
  DetailModal,
} from "../../../components";
import { Space, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionView, actionDelete, actionSend } from "../../../assets/images";
import { patientAction, testTypeAction } from "../../../store/actions";
import "../../../app.scss";

export const RapidPatients = () => {
  let dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [patientData, setPatientData] = useState({ pid: "", oid: "" });
  const [current, setCurrent] = useState(1);
  const [openResultModal, setOpenResultModal] = useState({
    result: false,
    confirm: false,
  });
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  let searchInput = useRef();
  const handleSearch = (dataIndex) => {
    if (searchText) {
      dispatch(
        patientAction.getfilteredRapidPatients(
          `${dataIndex}=${searchText}`,
          patients
        )
      );
    }
  };

  const handleReset = () => {
    if (patientsCopy.length) {
      dispatch(patientAction.resetRapidSearch());
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
  const openInformationDrawer = (content) => {
    setOpenDrawer(true);
    setContent(content);
  };
  useEffect(() => {
    dispatch(patientAction.getRapidPatients());
    dispatch(testTypeAction.getTestTypes());
  }, [dispatch]);
  let patients = useSelector((state) => state.patients?.rapid);
  let patientsCopy = useSelector((state) => state.patients?.patientCopy);
  let patientLength = useSelector(
    (state) => state.patients?.rapidPatientsLength
  );
  const deletePatient = (data) => {
    dispatch(
      patientAction.deletePatient(
        {
          _id: data.id,
        },
        {},
        setOpenDeleteModal
      )
    );
  };
  const sendResult = () => {
    setLoading(true);
    let resultObject = {
      order_no: patientData.oid,
      pid: patientData.pid,
      patient_result: result,
    };
    dispatch(
      patientAction.sendResult(resultObject, setOpenResultModal, setLoading)
    );
  };
  const getPatients = (page) => {
    dispatch(patientAction.getAllTestedPatients(page * 6 - 6));
  };
  const data = patients?.map((val, i) => ({
    ...val,
    key: i,
    id: val._id,
    pid: val.pid,
    barCode: val.bar_code,
    createdAt: val.createdAt,
    firstName: val.first_name,
    lastName: val.last_name,
    phone: val.telephone,
    dateOfBirth: val.date_of_birth,
    testDetail: val.test_type.name + " - " + val.test_type.type,
    location_name: val.location_id?.location_name,
  }));
  let columnsTitles = [
    {
      title: `Patient ID`,
      dataIndex: "pid",
      key: "pid",
      serachProps: "name",
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
      title: "Bar Code",
      align: "right",
      dataIndex: "barCode",
      key: "barCode",
      searchProps: "barCode",
      responsive: ["xs"],
      search: getColumnSearchProps("bar_code"),
    },
    {
      title: "First Name",
      align: "right",
      dataIndex: "firstName",
      key: "firstname",
      searchProps: "firstName",
      responsive: ["xs"],
      search: getColumnSearchProps("first_name"),
    },
    {
      title: "Last Name",
      align: "right",
      dataIndex: "lastName",
      key: "lastname",
      searchProps: "lastName",
      responsive: ["xs"],
      search: getColumnSearchProps("last_name"),
    },
    {
      title: "Date Of Birth",
      align: "right",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      searchProps: "dateOfBirth",
      responsive: ["xs"],
    },
    {
      title: "Phone",
      align: "right",
      dataIndex: "phone",
      key: "phone",
      searchProps: "phone",
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
              className="flex h-7 w-7 justify-center cursor-pointer mr-2"
              size="middle"
              onClick={() => {
                setPatientData({ pid: record.pid, oid: record.order_no });
                setOpenResultModal({ result: true, confirm: false });
              }}
            >
              <img src={actionSend} alt="Send Result" />
            </Space>
            <Space
              className="flex h-7 w-7 justify-center action-eye-span cursor-pointer mr-2"
              size="middle"
              onClick={() => openInformationDrawer(record)}
            >
              <img src={actionView} alt="Eye" />
            </Space>
            <Space
              className="flex h-7 w-7 justify-center action-eye-span cursor-pointer"
              size="middle"
              onClick={() => {
                setOpenDeleteModal(true);
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
  return (
    <>
      <InformationDrawer
        content={<PatientDetails data={content} type={"collected"} />}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <DetailModal
        centered={true}
        isModalVisible={openDeleteModal}
        handleOk={() => deletePatient(patientData)}
        handleCancel={() => setOpenDeleteModal(false)}
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
        modalType={"confirm"}
        closable={true}
        mask={true}
        destroyOnClose={true}
        isModalVisible={openResultModal.result}
        title="Test Result"
        confirmLoading={loading}
        content={
          <div>
            <label className="text-font-size">Select Result</label>
            <SelectInput
              placeholder="Select result"
              value={["Positive", "Negative", "Inclusive"]}
              setData={(e) => setResult(e)}
            />
          </div>
        }
        handleOk={() => {
          setOpenResultModal({ result: false, confirm: true });
        }}
        handleCancel={() =>
          setOpenResultModal({ result: false, confirm: false })
        }
      />
      <DetailModal
        centered={true}
        title="Upload Result"
        isModalVisible={openResultModal.confirm}
        content={
          <p className="text-font-size">
            Are you sure to send <b>{result}</b> result of patient Pid:{" "}
            <b>{patientData.pid}</b> and Order Id: <b>{patientData.oid}</b>
          </p>
        }
        handleOk={() => sendResult()}
        handleCancel={() =>
          setOpenResultModal({ result: false, confirm: false })
        }
      />
      <div className="flex items-center xs:flex-col justify-between p-5">
        <h1 className="panel-title">Rapid Patients</h1>
      </div>
      <div className="mt-6">
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
    </>
  );
};
