import React, { useState, useEffect, useRef } from "react";
import {
  TableComponent,
  InformationDrawer,
  PatientDetails,
  DetailModal,
} from "../../../components";
import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionView, actionDelete } from "../../../assets/images";
import { patientAction, testTypeAction } from "../../../store/actions";
import "../../../app.scss";

export const Collected = () => {
  let dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({ id: "", pid: "", oid: "" });
  const [content, setContent] = useState("");
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    dispatch(patientAction.getCollectedPatients());
    dispatch(testTypeAction.getTestTypes());
  }, [dispatch]);
  let patients = useSelector((state) => state.patients?.collected);
  let patientsCopy = useSelector((state) => state.patients?.patientCopy);
  let patientLength = useSelector(
    (state) => state.patients?.collectedPatientsLength
  );
  const openInformationDrawer = (content) => {
    setOpenDrawer(true);
    setContent(content);
  };
  const [searchText, setSearchText] = useState("");
  let searchInput = useRef();
  const handleSearch = (dataIndex) => {
    if (searchText) {
      dispatch(
        patientAction.getfilteredCollectedPatients(
          `${dataIndex}=${searchText}`,
          patients
        )
      );
    }
  };

  const handleReset = () => {
    if (patientsCopy.length) {
      dispatch(patientAction.RESET_COLLECTED_SEARCH());
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
    dispatch(patientAction.getCollectedPatients(page * 6 - 6));
  };
  const deletePatient = (data) => {
    setLoading(true);
    dispatch(
      patientAction.deletePatient(
        {
          _id: data.id,
        },
        {},
        setOpenConfirmModal
      )
    );
  };
  let data = patients?.map((val, i) => {
    return {
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
      testType: val.test_type.type,
    };
  });
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
                setOpenConfirmModal(true);
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
        isModalVisible={openConfirmModal}
        handleOk={() => deletePatient(patientData)}
        handleCancel={() => setOpenConfirmModal(false)}
        title="Delete"
        confirmLoading={loading}
        content={
          <p className="delete-modal-content">
            Are you sure you want to delete this patient pid:{" "}
            <b>{patientData.pid}</b> and order id: <b>{patientData.oid}</b>{" "}
            permanently?
          </p>
        }
        okButtonProps={{ type: "primary", danger: true }}
      />
      <div className="flex items-center xs:flex-col justify-between p-5">
        <h1 className="panel-title">Collected</h1>
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
