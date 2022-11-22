import React, { useEffect, useState, useRef } from "react";
import { TableComponent, Spinner } from "../../../components";
import { Space, Switch, Badge, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { managerAction } from "../../../store/actions";
import "../../../app.scss";
import { FilterOutlined } from "@ant-design/icons";

export const AllManagers = () => {
  let dispatch = useDispatch();
  let [disabled, setDisabled] = useState(false);
  const managersData = useSelector((state) => state.manager?.managers);
  const managersCopyData = useSelector((state) => state.manager?.managersCopy);
  let [load, setLoad] = useState(false);
  const [searchText, setSearchText] = useState("");

  let searchInput = useRef();
  const handleSearch = (dataIndex) => {
    setLoad(true);
    if (searchText) {
      dispatch(
        managerAction.GET_FILTERED_MANAGERS(
          `${dataIndex}=${searchText}`,
          managersData,
          setLoad
        )
      );
    }
  };

  const handleReset = () => {
    if (managersCopyData.length) {
      dispatch(managerAction.RESET_SEARCH());
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

          <Button
            onClick={() => handleReset()}
            type="primary"
            size="small"
            className="w-24"
          >
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

  const onChange = (e, record, i) => {
    setDisabled(true);

    dispatch(managerAction.managerStatus(record.id, setDisabled, i));
  };
  useEffect(() => dispatch(managerAction.getAllManagers()), [dispatch]);
  let managers = useSelector((state) => state.manager?.managers);
  const data = managers?.map((val, i) => ({
    key: i,
    pid: val.mid,
    id: val._id,
    email: val.email,
    full_name: val.full_name,
    status: val.status,
    labAddress: val.lab_address,
    telephone: val.telephone,
    labName: val.lab_name,
  }));

  let statusArr = [];
  let labArr = [];

  for (var i = 0; i < managers?.length; i++) {
    if (statusArr.findIndex((v) => v.text === managers[i].status) === -1) {
      statusArr.push({
        text: managers[i].status,
        value: managers[i].status,
      });
    }
    if (labArr.findIndex((v) => v.text === managers[i].lab_name) === -1) {
      labArr.push({
        text: managers[i].lab_name,
        value: managers[i].lab_name,
      });
    }
  }
  let columnsTitles = [
    {
      title: `Manager ID`,
      dataIndex: "pid",
      key: "pid",
      serachProps: "name",
      align: "right",
      responsive: ["xs"],
    },
    {
      title: "Full Name",
      align: "right",
      dataIndex: "full_name",
      key: "full_name",
      searchProps: "full_name",
      responsive: ["xs"],
      search: getColumnSearchProps("full_name"),
    },
    {
      title: "Lab Address",
      align: "right ",
      dataIndex: "labAddress",
      key: "labAddress",
      searchProps: "age",
      responsive: ["xs"],
      search: getColumnSearchProps("lab_address"),
    },
    {
      title: "Lab Number",
      dataIndex: "telephone",
      key: "telephone",
      searchProps: "telephone",
      responsive: ["xs"],
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
      title: "Lab Name",
      key: "labName",
      dataIndex: "labName",
      align: "center",
      width: "15%",
      responsive: "sm",
      filters: labArr,
      filterIcon: <FilterOutlined style={{ fontSize: "12px" }} />,
      filterSearch: true,
      onFilter: (value, record) => {
        return record.labName == value;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      serachProps: "status",
      responsive: ["xs"],
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
      key: "address",
      responsive: ["xs"],

      render: (text, record, i) => {
        return (
          <Space className="flex justify-center w-full" size="middle">
            <Switch
              disabled={disabled}
              checked={
                record.status === "Active"
                  ? true
                  : record.status === "Disabled"
                  ? false
                  : ""
              }
              onChange={(e) => onChange(e, record, i)}
              // className="switch"
              className={
                record.status === "Active"
                  ? "bg-active-switch"
                  : "bg-disabled-switch"
              }
            />
          </Space>
        );
      },
    },
  ];
  let managerLength = useSelector(
    (state) => state.manager?.collectedManagersLength
  );

  const [current, setCurrent] = useState(1);

  const getManagersPagination = (page) => {
    dispatch(managerAction.getAllManagers(page * 6 - 6));
  };
  return (
    <>
      <div className="flex justify-between w-9/12 items-center pl-4 pr-4 mt-3">
        <div className="manager-panel-title-div">
          <h1 className="panel-title">Managers Information</h1>
        </div>
      </div>
      <div className="mt-6">
        {" "}
        <TableComponent
          columnsTitles={columnsTitles}
          data={data}
          current={current}
          total={managerLength}
          onChange={(page) => {
            setCurrent(page);
            getManagersPagination(page);
          }}
        />
      </div>
    </>
  );
};
