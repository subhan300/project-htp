import React, { useState, useEffect } from "react";
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
import { testTypeAction } from "../../../store/actions";
import { Col, Form, message } from "antd";
// import { SideMenu } from "../../../components/side-menu";

// import { Container } from './styles';

export function CreateLocation() {
  const [form] = Form.useForm();

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
  // const [updateSelectedTest, setSelectedUpdateTest] = useState("");
  const [selectedTestForUpdateTestName, setSelectedTestForUpdateTestName] =
    useState("");
  const [updateSelectedTestType, setSelectedUpdateTestType] = useState("");
  // const [deleteTestTypesModal, setDeleteTestTypesModal] = useState();
  const [selectedTest, setSelectedTest] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [addTestLoader, setAddTestLoader] = useState(false);
  const [updateTestTypeLoader, setUpdateTestTypeLoader] = useState(false);
  const [deleteTestLoader, setDeleteTestLoader] = useState(false);
  const [updateTestNameLoader, setUpdateTestNameLoader] = useState(false);

  let arr = [];

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(testTypeAction.getTestTypes());
  }, [dispatch]);
  const onFinish = (values) => {
    setAddTestLoader(true);
    form.resetFields();

    let testObject = {
      name: testName,
      types: values.testTypes,
    };
    if (testObject.name && `${testObject.types}` != "undefined") {
      dispatch(
        testTypeAction.addTestTypes(
          testObject,
          setAddTestModal,
          message,
          setAddTestLoader
        )
      );
    } else if (testObject?.name?.length === 0) {
      message.error("enter name");
      setAddTestLoader(false);
    } else {
      message.error("enter types ");
      setAddTestLoader(false);
    }

    setTestName("");
    testObject = {};
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
        name: copyOfTypes[0].name,
        types: modifyTypes,
      };
      dispatch(
        testTypeAction.updateTestTypes(
          testObject,

          setUpdateTestTypeModal,
          message,
          setUpdateTestTypeLoader
        )
      );
    } else if (addType.length != 0) {
      modifyTypes = [...addType, ...copyOfTypes[0].types];
      testObject = {
        name: copyOfTypes[0].name,
        types: modifyTypes,
      };
      dispatch(
        testTypeAction.updateTestTypes(
          testObject,

          setUpdateTestTypeModal,
          message,
          setUpdateTestTypeLoader
        )
      );
    } else if (deleteType.length != 0) {
      testObject = {
        name: copyOfTypes[0].name,
        types: [...b],
      };
      dispatch(
        testTypeAction.updateTestTypes(
          testObject,

          setUpdateTestTypeModal,
          message,
          setUpdateTestTypeLoader
        )
      );
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
  let testTypeArray = testTypes?.map((val) => {
    return val;
  });
  const deleteTest = (id) => {
    setDeleteTestLoader(true);
    if (id != null) {
      dispatch(
        testTypeAction.deleteTest(
          id,
          setDeleteModal,
          message,
          setDeleteTestLoader
        )
      );
    } else {
      message.error("select Test which you want to delete");
      setDeleteTestLoader(false);
    }
    setDeleteId(null);
    setSelectInputValueForDeleteTestName([]);
    setSelectInputValueForDeleteTestName([]);
  };

  const updateTestName = () => {
    setUpdateTestNameLoader(true);

    let testObject = {
      name: testNameForUpdate,
    };

    if (testObject.name.length === 0) {
      message.error("enter test Name !");
      setUpdateTestNameLoader(false);
    } else if (
      testObject.name.length > 0 &&
      selectedTestForUpdateTestName?.length != 0
    ) {
      Object.assign(testObject, { preName: selectedTestForUpdateTestName });
      dispatch(
        testTypeAction.updateTestTypes(
          testObject,

          setUpdateTestNameModal,
          message,
          setUpdateTestNameLoader
        )
      );
    } else if (selectedTestForUpdateTestName?.length == 0) {
      setUpdateTestNameLoader(false);
      message.error("select test to update");
    } else {
      setUpdateTestNameLoader(false);
      message.error("try again ");
    }

    setTestNameForUpdate("");

    setSelectedTestForUpdateTestName("");
    setSelectInputValueForUpdateTestName([]);
  };

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
              loader={addTestLoader}
              setLoader={setAddTestLoader}
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
                    // setSelectedUpdateTest(e);

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
                setLoader={setAddTestLoader}
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
                  let filterArray = testTypeArray.filter((selected) => {
                    return e === selected.name;
                  });

                  setDeleteId(filterArray[0].name);
                }}
                value={testTypeArray.map((testName) => testName.name)}
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

                  setSelectedTestForUpdateTestName(filterArray[0].name);
                }}
                value={testTypeArray?.map((testName) => testName.name)}
                placeholder="Add Test"
                selectValue={selectInputValueForUpdateTestName}
                setValue={setSelectInputValueForUpdateTestName}
              />
            </div>
            <div className="mt-3">
              {" "}
              <TextInput
                placeholder="Update Name "
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

      <div className="create-location w-100  flex justify-center ">
        <div className="step-form container mt-3 sm:w-10/12 xs:w-10/12">
          <div className="manager-panel-header flex justify-center items-center ">
            <div className="manager-panel-title-div ">
              <h1 className="panel-title ">Create Location</h1>
            </div>
          </div>
          <div className="mt-6  flex justify-center">
            <StepForm />
          </div>
        </div>

        {/* <div
          className="location-sidebar 
         sm:fixed
         sm:right-0
         sm:top-0
         sm:h-full
         sm:flex xs:mx-auto   xs:p-6 md:pt-8 xs:mt-8 md:mt-0  md:w-1/12 sm:mx-auto xs:w-100 "
        >
          <SideMenu />
          <div
            className="flex  flex-col md:mt-14  mx-auto space-y-4 w-11/12"
            // style={{ border: "2px solid green" }}
          >
            <div
              className="md:text-center xs:text-center "
              // style={{ border: "2px solid green" }}
            >
              <label
                className=" test-title-modal text-start p-1 test-field-title"
                onClick={() => setAddTestModal(true)}
              >
                Add Test
              </label>
            </div>
            <label
              className=" test-title-modal p-1 md:text-center xs:text-center test-field-title"
              onClick={() => setUpdateTestTypeModal(true)}
            >
              Update Test Type
            </label>
            <label
              className=" test-title-modal p-1 md:text-center xs:text-center test-field-title"
              onClick={() => setUpdateTestNameModal(true)}
            >
              Update Test Name
            </label>
            <label
              className=" test-title-modal p-1 md:text-center xs:text-center test-field-title"
              onClick={() => setDeleteModal(true)}
            >
              Delete Test
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
}
