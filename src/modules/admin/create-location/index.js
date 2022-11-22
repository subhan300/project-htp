import React, { useState, useEffect, useMemo } from "react";
import {
  StepForm,
  Btn,
  DetailModal,
  SelectInput,
  Spinner,
  TextInput,
} from "../../../components";
import "./scss/index.scss";

import { useSelector, useDispatch } from "react-redux";
import { DynamicFieldSet } from "../../../components/dynamic-fields";
import { locationAction, testTypeAction } from "../../../store/actions";
import { Col, Form, message, Row } from "antd";

// import { Container } from './styles';

export function CreateLocation() {
  const [form] = Form.useForm();

  let [adminStatus, setAdminStatus] = useState(false);
  let [managerId, setManagerId] = useState(null);
  const searchLocation = (id) => {
    setManagerId(id);
    dispatch(locationAction.getManagerSearchLocation(id));
  };

  let managerNameId = useSelector((state) => state.location.managerId);
  let [
    selectInputValueForUpdateTestName,
    setSelectInputValueForUpdateTestName,
  ] = useState([]);
  let [selectInputValueForTypes, setSelectInputValueForTypes] = useState([]);
  let [selectInputValueForTestName, setSelectInputValueForTestName] = useState(
    []
  );
  let [
    selectInputValueForDeleteTestName,
    setSelectInputValueForDeleteTestName,
  ] = useState([]);
  const [testName, setTestName] = useState("");
  const [testNameForUpdate, setTestNameForUpdate] = useState("");
  const [addTestModal, setAddTestModal] = useState(false);

  const [updateTestTypeModal, setUpdateTestTypeModal] = useState(false);
  const [updateTestNameModal, setUpdateTestNameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateSelectedTest, setSelectedUpdateTest] = useState("");
  const [updateSelectedTestType, setSelectedUpdateTestType] = useState("");
  // const [deleteTestTypesModal, setDeleteTestTypesModal] = useState();
  const [selectedTest, setSelectedTest] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [updateTestTypeLoader, setUpdateTestTypeLoader] = useState(false);
  const [deleteTestLoader, setDeleteTestLoader] = useState(false);
  const [updateTestNameLoader, setUpdateTestNameLoader] = useState(false);
  const [testLoader, setTestLoader] = useState(false);

  let arr = [];

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(testTypeAction.getAdminTestTypes());
  }, [dispatch]);
  const onFinish = async (values) => {
    setTestLoader(true);
    form.resetFields();

    let testObject = {
      id: managerId,
      name: testName,
      types: values.testTypes,
    };
    if (
      testObject.id != null &&
      testObject?.name?.length != 0 &&
      testObject?.types?.length > 0
    ) {
      dispatch(
        testTypeAction.adminAddTestTypes(
          testObject,
          setAddTestModal,
          message,
          setTestLoader,
          managerId,
          setTestLoader
        )
      );
    } else if (testObject.id == null) {
      setTestLoader(false);
      message.error("manager is not selected ");
    } else {
      setTestLoader(false);
      message.error("name or type is missing !");
    }

    setTestName("");
    setSelectInputValueForTestName([]);
  };

  const onFinishTestTypeUpdate = (values) => {
    setUpdateTestTypeLoader(true);
    let copyOfTypes = selectedTest;

    let deleteType = [...updateSelectedTestType];

    let b;
    if (deleteType.length != 0) {
      b = copyOfTypes[0].types.filter((val) => !deleteType.includes(val));
    }

    let addType =
      values.testTypes && testNameForUpdate
        ? [testNameForUpdate, ...values?.testTypes]
        : testNameForUpdate
        ? [testNameForUpdate]
        : values.testTypes
        ? [...values.testTypes]
        : [];
    let modifyTypes;
    let testObject;

    if (addType.length != 0 && deleteType.length != 0) {
      modifyTypes = [...addType, ...b];
      testObject = {
        id: managerId,
        name: copyOfTypes[0].name,
        types: modifyTypes,
      };
      dispatch(
        testTypeAction.adminUpdateTestTypes(
          testObject,

          setUpdateTestTypeModal,
          message,
          setUpdateTestTypeLoader,
          managerId
        )
      );
    } else if (addType.length != 0) {
      modifyTypes = [...addType, ...copyOfTypes[0].types];
      testObject = {
        id: managerId,
        name: copyOfTypes[0].name,
        types: modifyTypes,
      };
      dispatch(
        testTypeAction.adminUpdateTestTypes(
          testObject,

          setUpdateTestTypeModal,
          message,
          setUpdateTestTypeLoader,
          managerId
        )
      );
    } else if (deleteType.length != 0) {
      testObject = {
        id: managerId,
        name: copyOfTypes[0].name,
        types: [...b],
      };
      dispatch(
        testTypeAction.adminUpdateTestTypes(
          testObject,

          setUpdateTestTypeModal,
          message,
          setUpdateTestTypeLoader,
          managerId
        )
      );
    } else if (testObject?.id === null) {
      setUpdateTestTypeLoader(false);
      message.error("Manager is not selected ");
    } else {
      setUpdateTestTypeLoader(false);

      message.error("delete or update or add test type ! ");
    }

    copyOfTypes = [];
    testObject = {};
    addType = [];
    modifyTypes = [];
    b = [];
    form.resetFields();
    setTestNameForUpdate("");
    setSelectedUpdateTestType("");
    setSelectedTest([]);
    setSelectInputValueForTestName([]);
    setSelectInputValueForTypes([]);
  };

  let testTypes = useSelector((state) => state.tests.testTypes);

  let testTypeArray = useMemo(() => {
    if (managerId != null) {
      let filterTestTypes = testTypes.filter((val) => {
        return val._id === managerId;
      });
      return filterTestTypes[0]?.user_test_type;
    } else {
      return [];
    }
  }, [testTypes, managerId]);
  // console.log(" testTypes : ", testTypeArray);
  const deleteTest = (id) => {
    setDeleteTestLoader(true);
    if (managerId != null && id != null) {
      dispatch(
        testTypeAction.adminDeleteTest(
          id,
          setDeleteModal,
          message,
          setDeleteTestLoader,
          managerId
        )
      );
    } else if (managerId === null) {
      setDeleteTestLoader(false);
      message.error("Manager is not selected");
    } else if (id === null) {
      setDeleteTestLoader(false);
      message.error("No Test is selected to Delete");
    } else {
      setDeleteTestLoader(false);
      message.error("Try Again ");
    }

    setSelectInputValueForDeleteTestName([]);
    setDeleteId(null);
    setSelectInputValueForDeleteTestName([]);
  };

  const updateTestName = () => {
    setUpdateTestNameLoader(true);

    let testObject = {
      id: managerId,
      name: testNameForUpdate,
    };

    if (testObject.id == null) {
      setUpdateTestNameLoader(false);
      message.error("Manager is not selected ");
    } else if (testObject.name.length === 0) {
      message.error("select Test and then enter  Name !");
      setUpdateTestNameLoader(false);
    } else {
      Object.assign(testObject, { preName: updateSelectedTest });
      dispatch(
        testTypeAction.adminUpdateTestTypes(
          testObject,

          setUpdateTestNameModal,
          message,
          setUpdateTestNameLoader,
          managerId
        )
      );
    }

    setTestNameForUpdate("");
    setSelectInputValueForUpdateTestName([]);
  };

  useEffect(() => {
    dispatch(locationAction.getAllManagersNameIdL());
  }, [dispatch]);
  return (
    <div>
      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading mb-2">Add Test </h1>
          </div>
        }
        content={
          <div className="bd_red">
            <DynamicFieldSet
              testName={testName}
              setTestName={setTestName}
              onFinish={onFinish}
              form={form}
              loader={testLoader}
              setLoader={setTestLoader}
              title={"Update Test"}
              rules={[]}
              formItemRules={[]}
            />
          </div>
        }
        closable={true}
        handleCancel={() => setAddTestModal(false)}
        isModalVisible={addTestModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setAddTestModal(false)}
      />

      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading ">Update Test Type</h1>
          </div>
        }
        content={
          <div className="bd_red">
            <Col sm={24} xs={24}>
              <label className=" text-lg font-medium">
                Select Test To Update <br />
              </label>
              <div className="w-100 mt-3">
                <SelectInput
                  // mode="multiple"
                  name="test"
                  setData={(e) => {
                    setSelectedUpdateTest(e);

                    let filterArray = testTypeArray?.filter((selected) => {
                      return e === selected.name;
                    });

                    setSelectedTest(filterArray);
                  }}
                  value={testTypeArray?.map((testName) => testName.name)}
                  selectValue={selectInputValueForTestName}
                  setValue={setSelectInputValueForTestName}
                  placeholder="Add Test"
                />
              </div>
            </Col>

            <Col sm={24} xs={24} className="mt-6  text-lg font-medium">
              <label className="text-font-size ">Add Test Type</label>
              <div className="w-100 mt-2">
                <SelectInput
                  mode="multiple"
                  name="types"
                  setData={(e) => {
                    setSelectedUpdateTestType(e);
                  }}
                  value={arr}
                  placeholder={"Add Test Type"}
                  selectValue={selectInputValueForTypes}
                  setValue={setSelectInputValueForTypes}
                />
              </div>
            </Col>
            {selectedTest?.map((v) => {
              testTypeArray.map((value) => {
                if (value?.name === v.name) {
                  value?.types?.map((value2) => {
                    arr.push(value2);
                  });
                }
              });
            })}
            <div className="mt-5">
              <DynamicFieldSet
                testName={testNameForUpdate}
                setTestName={setTestNameForUpdate}
                onFinish={onFinishTestTypeUpdate}
                form={form}
                loader={updateTestTypeLoader}
                setLoader={setUpdateTestTypeLoader}
                title={"Add test"}
                selectInputText="Add Type"
                rules={[]}
                formItemRules={[]}
              />
            </div>
          </div>
        }
        closable={true}
        handleCancel={() => setUpdateTestTypeModal(false)}
        isModalVisible={updateTestTypeModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setUpdateTestTypeModal(false)}
      />

      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading mb-2">Delete Test </h1>
          </div>
        }
        content={
          <Col sm={24} xs={24} className="mt-5">
            <label className="font-size text-lg font-medium ">
              <Col sm={6} xs={12}>
                Select Test
              </Col>
              <br />
            </label>
            <div className="w-100">
              <SelectInput
                // mode="multiple"
                name="test"
                setData={(e) => {
                  let filterArray = testTypeArray?.filter((selected) => {
                    return e === selected.name;
                  });

                  setDeleteId(filterArray[0].name);
                }}
                value={testTypeArray?.map((testName) => testName.name)}
                placeholder="Add Test"
                selectValue={selectInputValueForDeleteTestName}
                setValue={setSelectInputValueForDeleteTestName}
              />
            </div>
            <div className="w-4/12 mt-2">
              <Btn
                value={
                  deleteTestLoader ? (
                    <span>
                      Loading... <Spinner className="btn-spinner ml-3" />
                    </span>
                  ) : (
                    "Submit"
                  )
                }
                bgColor="#008ba4"
                color="white"
                border="1px solid #c3c3c7"
                btnClass="btnDarkHover"
                onClick={() => deleteTest(deleteId)}
              ></Btn>
            </div>
          </Col>
        }
        closable={true}
        handleCancel={() => setDeleteModal(false)}
        isModalVisible={deleteModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setDeleteModal(false)}
      />

      {/* update test NAMe modal */}

      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading mb-2">Update Test Name </h1>
          </div>
        }
        content={
          <Col sm={24} xs={24} className="mt-1">
            <label className="font-size text-lg font-medium ">
              <Col sm={6} xs={12}>
                Select Test
              </Col>
              <br />
            </label>
            <div className="w-100 ">
              <SelectInput
                // mode="multiple"
                name="test"
                setData={(e) => {
                  let filterArray = testTypeArray?.filter((selected) => {
                    return e === selected.name;
                  });

                  setSelectedUpdateTest(filterArray[0].name);
                }}
                value={testTypeArray?.map((testName) => testName.name)}
                placeholder="Add Test"
                selectValue={selectInputValueForUpdateTestName}
                setValue={setSelectInputValueForUpdateTestName}
              />
            </div>
            <div className="mt-3">
              <TextInput
                placeholder="update name "
                color="#717171"
                onChange={(e) => {
                  setTestNameForUpdate(e.target.value);
                }}
                value={testNameForUpdate}
              ></TextInput>
            </div>
            <div className="w-4/12 mt-2">
              <Btn
                value={
                  updateTestNameLoader ? (
                    <span>
                      Loading... <Spinner className="btn-spinner ml-3" />
                    </span>
                  ) : (
                    "Submit"
                  )
                }
                bgColor="#008ba4"
                color="white"
                border="1px solid #c3c3c7"
                btnClass="btnDarkHover"
                onClick={() => updateTestName()}
              ></Btn>
            </div>
          </Col>
        }
        closable={true}
        handleCancel={() => setUpdateTestNameModal(false)}
        isModalVisible={updateTestNameModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setUpdateTestNameModal(false)}
      />

      <div className="create-location w-100  flex justify-center  ">
        <div className="step-form container mt-3 sm:w-10/12 xs:w-10/12">
          <div className="manager-panel-header flex xs:flex-col xs:justify-center xs:items-center sm:justify-between sm:pl-4 sm:pr-10 2xl:pr-12 items-center ">
            <div className="manager-panel-title-div xs:text-center">
              <h1 className="panel-title ">Create Location</h1>
            </div>
            <div>
              <Row
                gutter={[16, 16]}
                className="location flex flex-wrap 2xl:pr-4  justify-center items-center mt-5  "
              >
                <Col xs={24} className="flex justify-center ">
                  <SelectInput
                    // mode="multiple"
                    setData={(e) => {
                      searchLocation(
                        managerNameId.filter(
                          (val) => val.full_name + "-" + val.mid === e
                        )[0]._id
                      );
                    }}
                    placeholder="Select Manager "
                    value={managerNameId.map(
                      (val) => val.full_name + "-" + val.mid
                    )}
                  />
                </Col>
              </Row>
            </div>
          </div>

          <div className="mt-6">
            <StepForm
              managerId={managerId}
              adminStatus={adminStatus}
              setAdminStatus={setAdminStatus}
            />
          </div>
        </div>

        {/* <div
          className="location-sidebar 
         sm:fixed
         sm:right-0
         sm:top-0
         sm:h-full
         sm:flex  bd_blue  xs:p-6 md:pt-8 xs:mt-8 md:mt-0  md:w-1/12 sm:mx-auto xs:w-10/12 "
        >
          <div
            className="flex  flex-col md:mt-14  mx-auto space-y-4 w-11/12"
            style={{ border: "2px solid blue" }}
          >
            <label
              className="bd_red test-title-modal p-1  md:text-center     test-field-title"
              onClick={() => setAddTestModal(true)}
              style={{ border: "2px solid blue", fontSize: "12px" }}
            >
              <p style={{ border: "2px solid red" }}> Add Test</p>
            </label>
            <label
              className="bd_red test-title-modal p-1  md:text-center test-field-title"
              onClick={() => setUpdateTestTypeModal(true)}
              style={{ border: "2px solid blue", fontSize: "12px" }}
            >
              Update Test Type
            </label>
            <label
              className="bd_red test-title-modal p-1  md:text-center  test-field-title"
              onClick={() => setUpdateTestNameModal(true)}
              style={{ border: "2px solid blue", fontSize: "12px" }}
            >
              Update Test Name
            </label>
            <label
              className="bd_red test-title-modal p-1  md:text-center  test-field-title"
              onClick={() => setDeleteModal(true)}
              style={{ border: "2px solid blue", fontSize: "12px" }}
            >
              Delete Test
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
}
