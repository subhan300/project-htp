import React, { useEffect, useRef, useState } from "react";
import {
  AllPatientAdminInfoDrawer,
  DetailModal,
  Spinner,
  TableComponent,
} from "../../../components";
import { Button, Input, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { patientAction } from "../../../store/actions";
import { InformationDrawer } from "../../../components";
import { actionDelete, actionEye } from "../../../assets/images";

import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
export const AllPatientInformation = () => {
  let dispatch = useDispatch();
  let [load, setLoad] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [content, setContent] = useState("");

  const openInformationDrawer = (content) => {
    setOpenDrawer(true);

    setContent(content);
  };

  useEffect(() => dispatch(patientAction.getAdminAllPatients()), [dispatch]);
  let allPateints = useSelector((state) => state.patients?.allPatients);

  let [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const getPatients = (page) => {
    dispatch(patientAction.getAdminAllPatients(page * 6 - 6));
  };
  const [current, setCurrent] = useState(1);
  let patientLength = useSelector(
    (state) => state.patients?.collectedPatientsLength
  );

  const [searchText, setSearchText] = useState("");
  let [deleteId, setDeleteId] = useState("");
  const deletePatient = () => {
    dispatch(
      patientAction.adminDeletePatient({
        _id: deleteId,
      })
    );
  };

  const showDeletesModal = () => {
    setConfirmDeleteModal(true);
  };
  const handleOkModal = () => {
    deletePatient();
    setConfirmDeleteModal(false);
  };
  const handleCancelModal = () => {
    setConfirmDeleteModal(false);
  };
  let searchInput = useRef();

  const patientCopyData = useSelector((state) => state.patients?.patientCopy);
  const handleSearch = (dataIndex) => {
    setLoad(true);
    if (searchText) {
      dispatch(
        patientAction.getFilteredAdminPatients(
          `${dataIndex}=${searchText}`,
          allPateints,
          setLoad
        )
      );
    }
    setSearchText("");
  };

  const handleReset = () => {
    if (patientCopyData.length) {
      dispatch(patientAction.RESET_SEARCH());
      setSearchText("");
    }
  };
  let testtypeArr = [];
  let locationArr = [];

  for (var i = 0; i < allPateints?.length; i++) {
    let testType = allPateints[i].test_type.type;
    if (testtypeArr.findIndex((v) => v.text === testType) === -1) {
      testtypeArr.push({
        text: testType,
        value: testType,
      });
    }
    if (
      locationArr.findIndex(
        (v) => v.text === allPateints[i].location_id?.location_name
      ) === -1
    ) {
      locationArr.push({
        text: allPateints[i].location_id?.location_name,
        value: allPateints[i].location_id?.location_name,
      });
    }
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: () => (
      <div className="p-3">
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={` ${
            dataIndex === "tested_date"
              ? "YYYY-MM-DD"
              : dataIndex === "patient_result"
              ? "Patient Restult"
              : `Search ${dataIndex}`
          }`}
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

  const data = allPateints?.map((val, i) => {
    return {
      ...val,
      key: i,
      test: val.test_type.name,
      test_types: val?.test_type?.type,
      location_id: val.location_id?.location_name,
      tested_date: val?.tested_date.slice(0, 10),
    };
  });

  let columnsTitless = [];
  if (data.length > 0) {
    columnsTitless = Object.keys(data ? data[0] : []).map((keys) => {
      if (
        keys === "first_name" ||
        keys === "last_name" ||
        keys === "email" ||
        keys === "telephone" ||
        keys === "patient_result" ||
        keys === "tested_date" ||
        keys === "order_no"
      ) {
        return {
          title: `${
            keys === "first_name"
              ? "First Name"
              : keys === "sex_assign_at_birth"
              ? "Sex"
              : keys === "last_name"
              ? "Last Name"
              : keys === "patient_result"
              ? "Patient Result"
              : keys === "tested_date"
              ? "Test Date"
              : keys === "order_no"
              ? "Order No"
              : keys
          }`,
          dataIndex: keys,
          key: keys,
          align: "center",
          width: "14%",

          serachProps: "mm-yy-dd",
          search: getColumnSearchProps(keys),
        };
      } else if (keys === "test_types") {
        return {
          filters: testtypeArr,
          title: `${
            keys === "test_types"
              ? "Test Types "
              : keys === "test"
              ? "Test"
              : keys
          }`,
          dataIndex: keys,
          key: keys,
          align: "center",
          width: "14%",

          ...(keys === "first_name" && {
            filterIcon: <FilterOutlined style={{ fontSize: "12px" }} />,
          }),
          filterSearch: true,

          onFilter: (value, record) => {
            return record.test_types == value;
          },
        };
      } else if (keys === "location_id") {
        return {
          title: `${keys === "location_id" ? "Location" : keys}`,
          dataIndex: keys,
          key: keys,
          align: "center",
          width: "17%",
          responsive: ["xs"],
        };
      }
    });
    columnsTitless.push({
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "4%",
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
              className="flex h-7 w-7  justify-center action-eye-span cursor-pointer"
              size="middle"
              onClick={() => openInformationDrawer(record)}
            >
              <img src={actionEye} alt="Eye" />
            </Space>
            <Space
              className="flex h-7 w-7 ml-6 justify-center action-eye-span cursor-pointer"
              size="middle"
              // onClick={() => deletePatient(record._id)
              // }
              onClick={() => {
                setConfirmDeleteModal(true);

                setDeleteId(record._id);
              }}
            >
              <img src={actionDelete} alt="Delete" />
            </Space>
          </div>
        );
      },
    });
  } else {
    columnsTitless = [];
  }

  let column = columnsTitless.filter((val) => val != undefined);
  return (
    <>
      <DetailModal
        title={"Delete Patient"}
        isModalVisible={confirmDeleteModal}
        showModal={showDeletesModal}
        handleOk={handleOkModal}
        handleCancel={handleCancelModal}
        content={
          <div>
            <h1 className="font-medium text-sm">
              Are You Confirm To Delete This Patient ?
            </h1>
          </div>
        }
      />
      <InformationDrawer
        content={<AllPatientAdminInfoDrawer details={content} />}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <div className="manager-panel-header flex justify-between items-center pl-4 pr-4 mt-3 mb-6">
        <div className="manager-panel-title-div">
          <h1 className="panel-title">Patients Information</h1>
        </div>
      </div>

      <TableComponent
        width="2100px"
        columnsTitles={column}
        data={data}
        current={current}
        total={patientLength}
        onChange={(page) => {
          setCurrent(page);
          getPatients(page);
        }}
      />
    </>
  );
};
