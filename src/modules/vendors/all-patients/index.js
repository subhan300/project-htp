import React from "react";
import { TableComponent } from "../../../components";
import "../../../app.scss";

export const AllPatients = () => {
  let columnsTitles = [
    {
      title: `Patient ID`,
      dataIndex: "pid",
      key: "pid",
      serachProps: "name",
      align: "right",
      responsive: ["xs"],
    },
    {
      title: "First Name",
      align: "right",
      dataIndex: "firstName",
      key: "firstname",
      searchProps: "firstName",
      responsive: ["xs"],
    },
    {
      title: "Last Name",
      align: "right",
      dataIndex: "lastName",
      key: "lastname",
      searchProps: "lastName",
      responsive: ["xs"],
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      searchProps: "email",
      responsive: ["xs"],
    },
    {
      title: "Test Type",
      dataIndex: "testType",
      key: "testType",
      searchProps: "testType",
      responsive: ["xs"],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      searchProps: "location",
      responsive: ["xs"],
    },
  ];
  return (
    <>
      {/* <InformationDrawer
        content={<PatientDrawer data={content} />}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      /> */}
      <div className="flex items-center xs:flex-col justify-between p-5">
        <h1 className="title">All Patients</h1>

        {/* <div className="xs:mt-4">
          <Btn
            value="Create New Patient"
            bgColor="transparent"
            color="#707070"
            border="1px solid #707070"
            onClick={() =>
              navigate("/htp/Medical%20Profession/add-new-patient")
            }
          />
        </div> */}
      </div>
      <div className="mt-6">
        {" "}
        <TableComponent columnsTitles={columnsTitles} />
      </div>
    </>
  );
};
