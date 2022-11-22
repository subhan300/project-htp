import React, { useEffect, useState, useRef } from "react";
import { TableComponent } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { patientAction, testTypeAction } from "../../../store/actions";
import { iconDownload, actionSend } from "../../../assets/images";
import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../../app.scss";
import "./scss/index.scss";

export const AllPatient = () => {
  let dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const sendEmail = (pid, oid) => {
    let data = {
      order_no: oid,
      pid: pid,
    };
    dispatch(patientAction.sendEmail(data));
  };
  useEffect(() => {
    dispatch(patientAction.getAllTestedPatients());
    dispatch(testTypeAction.getTestTypes());
  }, [dispatch]);
  let patients = useSelector((state) => state.patients?.testedPatients);
  let patientsCopy = useSelector((state) => state.patients?.patientCopy);
  let patientLength = useSelector(
    (state) => state.patients?.testedPatientsLength
  );
  const [searchText, setSearchText] = useState("");
  let searchInput = useRef();
  const handleSearch = (dataIndex) => {
    if (searchText) {
      dispatch(
        patientAction.getfilteredTestedPatients(
          `${dataIndex}=${searchText}`,
          patients
        )
      );
    }
  };

  const handleReset = () => {
    if (patientsCopy.length) {
      dispatch(patientAction.resetTestedSearch());
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
  const getColumnDateSearchProps = (dataIndex) => ({
    filterDropdown: () => (
      <div className="p-3">
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          // placeholder={`Search ${dataIndex}`}
          placeholder={`yyyy-mm-dd`}
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
    testDetail: val.test_type?.name + " - " + val.test_type?.type,
    location_name: val.location_id?.location_name,
    patient_result_date: val.patient_result_date || "Pending",
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
      search: getColumnSearchProps("type"),
    },
    {
      title: "Result",
      dataIndex: "patient_result",
      key: "patient_result",
      searchProps: "patient_result",
      responsive: ["xs"],
      search: getColumnSearchProps("patient_result"),
    },
    {
      title: "Result Date",
      dataIndex: "patient_result_date",
      key: "patient_result_date",
      searchProps: "patient_result_date",
      responsive: ["xs"],
      search: getColumnDateSearchProps("patient_result_date"),
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
            <a
              href={record?.patient_test_result_sign_off}
              target="_blank"
              rel="noreferrer"
            >
              <Space
                className="flex h-7 w-7 justify-center p-1 cursor-pointer mr-2"
                size="middle"
              >
                <img src={iconDownload} alt="Download" />
              </Space>
            </a>
            <Space
              className="flex h-7 w-7 justify-center cursor-pointer"
              size="middle"
              onClick={() => sendEmail(record.pid, record.order_no)}
            >
              <img src={actionSend} alt="Send" />
            </Space>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex items-center xs:flex-col justify-between p-5">
        <h1 className="panel-title">All Patients</h1>
      </div>
      <div className="mt-6">
        {" "}
        <TableComponent
          columnsTitles={columnsTitles}
          data={data}
          rowClassName={(record) =>
            (!record.patient_result || record.patient_result === "Pending") &&
            "disabled-row opacity-70"
          }
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
