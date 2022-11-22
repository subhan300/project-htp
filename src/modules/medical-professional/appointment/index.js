import React, { useState } from "react";
import { TableComponent, Btn } from "../../../components";
import { Space, Switch, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { managerAction } from "../../../store/actions";
import "../../../app.scss";
import { FilterOutlined } from "@ant-design/icons";

export const Appointment = () => {
  let dispatch = useDispatch();
  let [disabled, setDisabled] = useState(false);

  const onChange = (checked, record, i) => {
    setDisabled(true);
    dispatch(managerAction.managerStatus(record.id, setDisabled, i));
  };
  // useEffect(() => dispatch(managerAction.getAllManagers()), [dispatch]);
  let managers = useSelector((state) => state.manager?.managers);
  const data = managers?.map((val, i) => ({
    key: i,
    pid: val.mid,
    id: val._id,
    email: val.email,
    fullName: val.full_name,
    status: (
      <Badge
        style={
          val.status == "Active"
            ? { backgroundColor: "#5CC41C" }
            : { backgroundColor: "#F84B4E" }
        }
        count={val.status}
      />
    ),
    labAddress: val.lab_address,
    telephone: val.telephone,
    labName: val.lab_name,
  }));

  let columnsTitles = [
    {
      title: `Manager ID`,
      dataIndex: "pid",
      key: "pid",
      // width: "12%",
      serachProps: "name",
      align: "right",
      responsive: ["xs"],
    },
    {
      title: "Full Name",
      align: "right",
      dataIndex: "fullName",
      key: "fullname",
      // width: "8%",
      searchProps: "fullName",
      responsive: ["xs"],
    },
    {
      title: "Lab Address",
      align: "right ",
      dataIndex: "labAddress",
      key: "labAddress",
      // width: "12%",
      searchProps: "age",
      responsive: ["xs"],
    },
    {
      title: "Lab Number",
      dataIndex: "telephone",
      key: "telephone",
      // width: "12%",
      searchProps: "telephone",
      responsive: ["xs"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // width: "12%",
      searchProps: "email",
      responsive: ["xs"],
    },
    {
      title: "Lab Name",
      key: "labName",
      dataIndex: "labName",
      align: "center",
      width: "15%",
      responsive: "sm",
      filters: [
        {
          text: "Asinlab",
          value: "Asinlab",
        },
      ],
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
      // width: "8%",
      serachProps: "status",
      responsive: ["xs"],
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      // width: "13%",
      responsive: ["xs"],

      render: (text, record, i) => {
        return (
          <Space className="flex justify-center w-full" size="middle">
            <Switch
              disabled={disabled}
              checked={record.status.props.count === "Active" ? true : false}
              onChange={(e) => onChange(e, record, i)}
              className="switch"
            />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex items-center xs:flex-col justify-between p-5">
        <h1 className="panel-title">All Patients</h1>

        <div className="xs:mt-4">
          <Btn
            value="Create New Patient"
            bgColor="transparent"
            color="#707070"
            border="1px solid #707070"
          />
        </div>
      </div>
      <div className="mt-6">
        {" "}
        <TableComponent columnsTitles={columnsTitles} data={data} />
      </div>
    </>
  );
};
