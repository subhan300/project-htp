import React, { useEffect, useState, useRef } from "react";
import { TableComponent, Spinner } from "../../../components";
import { Space, Switch, Badge, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { employeeAction } from "../../../store/actions";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import "../scss/index.scss";

export const AllEmployees = () => {
  let dispatch = useDispatch();
  let [load, setLoad] = useState(false);

  let [disabled, setDisabled] = useState(false);
  const employeesData = useSelector((state) => state.employees?.allEmployees);
  // console.log("as", employeesData);
  const employeesCopyData = useSelector(
    (state) => state.employees?.employeesCopy
  );
  let [current, setCurrent] = useState(1);
  const [searchText, setSearchText] = useState("");
  let searchInput = useRef();
  const handleSearch = (dataIndex) => {
    setLoad(true);
    if (searchText) {
      dispatch(
        employeeAction.GetFilteredEmployees(
          `${dataIndex}=${searchText}`,
          employeesData,
          setLoad
        )
      );
    }
  };

  const handleReset = () => {
    if (employeesCopyData.length) {
      dispatch(employeeAction.RESET_SEARCH());
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
          {load ? (
            <Button
              type="primary"
              onClick={() => handleSearch(dataIndex)}
              size="small"
              className="w-24"
            >
              <span className="text-center">
                <Spinner className="btn-spinner mr-2" />
              </span>
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleSearch(dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              className="w-24"
            >
              Search
            </Button>
          )}
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

  const onChange = (checked, record, i) => {
    setDisabled(true);
    dispatch(employeeAction.employeeStatus(record.id, setDisabled, i));
  };
  useEffect(() => dispatch(employeeAction.getAllEmployees()), [dispatch]);
  let employee = useSelector((state) => state.employees?.allEmployees);
  let employeeLength = useSelector(
    (state) => state.employees?.collectedEmpoyeeLength
  );
  console.log("employee", employeeLength);
  const getEmployees = (page) => {
    dispatch(employeeAction.getAllEmployees(page * 6 - 6));
    // dispatch(patientAction.getAllTestedPatients(patients?.length));
  };
  // console.log(employee);
  const data = employee?.map((val, i) => ({
    key: i,
    pid: val.mid,
    id: val._id,
    email: val.email,
    firstName: val.first_name,
    lastName: val.last_name,
    status: val.status,
    labAddress: val.lab_address,
    telephone: val.telephone,
    labName: val.lab_name,
  }));
  // console.log("data", data);
  let statusArr = [];

  for (var i = 0; i < employee?.length; i++) {
    if (statusArr.findIndex((v) => v.text === employee[i].status) === -1) {
      statusArr.push({
        text: employee[i].status,
        value: employee[i].status,
      });
    }
  }

  let columnsTitles = [
    {
      title: `Manager ID`,
      dataIndex: "pid",
      key: "pid",
      align: "center",
      width: "4%",
      serachProps: "name",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "fullname",
      align: "center",
      width: "8%",
      searchProps: "fullName",
      search: getColumnSearchProps("first_name"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "fullname",
      align: "center",
      width: "8%",
      searchProps: "fullName",
      search: getColumnSearchProps("last_name"),
    },

    {
      title: "Lab Number",
      dataIndex: "telephone",
      align: "center",
      key: "telephone",
      width: "12%",
      searchProps: "telephone",
      search: getColumnSearchProps("telephone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      key: "email",
      width: "12%",
      searchProps: "email",
      search: getColumnSearchProps("email"),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "6%",
      serachProps: "status",

      render: (text, record) => {
        return (
          <Space className="flex justify-center w-full" size="middle">
            {typeof record.status == "string" ? (
              <Badge
                style={
                  record.status == "Active"
                    ? { backgroundColor: "#5CC41C" }
                    : { backgroundColor: "#F84B4E" }
                }
                count={record.status}
              />
            ) : record.status == undefined ? (
              ""
            ) : (
              <Spinner />
            )}
          </Space>
        );
      },
      filters: statusArr,
      filterIcon: <FilterOutlined style={{ fontSize: "12px" }} />,
      filterSearch: true,
      onFilter: (value, record) => {
        return record.status == value;
      },
    },
    {
      title: "Action",
      dataIndex: "address",
      align: "center",
      key: "address",
      width: "10%",
      render: (text, record, i) => {
        return (
          <Space className="flex justify-center w-full" size="middle">
            <Switch
              // className="switch"
              disabled={disabled}
              checked={
                record.status === "Active"
                  ? true
                  : record.status === "Disabled"
                  ? false
                  : ""
              }
              className={
                record.status === "Active"
                  ? "bg-active-switch"
                  : "bg-disabled-switch"
              }
              onChange={(e) => onChange(e, record, i)}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div className="manager-panel-header flex justify-between items-center pl-4 pr-4 mt-3 mb-6">
        <div className="manager-panel-title-div">
          <h1 className="panel-title">Employees</h1>
        </div>
      </div>

      <TableComponent
        columnsTitles={columnsTitles}
        data={data}
        current={current}
        total={18}
        onChange={(page) => {
          setCurrent(page);

          getEmployees(page);
        }}
      />
    </>
  );
};
