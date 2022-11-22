import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Col, Row, Tooltip, message } from "antd";
import {
  LoginOutlined,
  MenuFoldOutlined,
  RedoOutlined,
  UpSquareFilled,
} from "@ant-design/icons";
import "./index.scss";
import * as yup from "yup";

import {
  Btn,
  DetailModal,
  SelectInput,
  Spinner,
  TextInput,
} from "../../../../components";

import { useSelector, useDispatch } from "react-redux";

import { testTypeAction } from "../../../../store/actions";
import { DynamicField } from "../../../dynamic-fields/dynamic-field";

const TestDetails = (props) => {
  const [selectedTestDropDown, setSelectedTestDropDown] = useState([]);
  const testValidationSchema = yup.object({
    test: yup
      .array()
      .required("Atleast 1 test Required")
      .min(1, "Atleast 1 test Required"),
    types: yup
      .array()
      .required("Atleast 1 type Required")
      .min(1, "Atleast 1 type Required"),
  });
  let arrDropDown = [];

  let testTypes = useSelector((state) => state.tests.testTypes);
  let getRole = JSON.parse(`${localStorage.getItem("auth")}`);
  let role = getRole?.user.type.type;
  let testTypeArray;

  testTypeArray = useMemo(() => {
    if (role === "Asins") {
      if (props?.managerId != null) {
        let filterTestTypes = testTypes.filter((val) => {
          return val._id === props.managerId;
        });
        return filterTestTypes[0]?.user_test_type;
      } else {
        return [];
      }
    } else {
      return testTypes;
    }
  }, [testTypes, props.managerId, role]);

  const formik = useFormik({
    validationSchema: testValidationSchema,
    initialValues: {
      test: [],
      types: [],
    },
    onSubmit: (obj) => {
      const setTestTypeArray = {
        test: obj.test.map((val) => {
          let mewObjectFind = testTypeArray.find((obj) => obj.name == val);

          let typeArr = [];
          obj.types.map((val) => {
            return mewObjectFind.types.filter((i) => {
              i === val ? typeArr.push(val) : "";
            });
          });

          return {
            name: val,
            types: typeArr,
          };
        }),
      };

      props.setTestDetailForm(setTestTypeArray);

      props.next();
    },
  });
  // test
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
  // useEffect(() => {
  //   dispatch(testTypeAction.getAdminTestTypes());
  // }, [dispatch]);

  const onFinish = (values, { resetForm }) => {
    setTestLoader(true);

    if (role === "Asins") {
      let testObject = {
        id: props.managerId,
        name: testName,
        types: values.testTypes,
      };
      if (
        testObject.types.includes("") === true ||
        testObject.types?.length === 0
      ) {
        message.error("Add Test Type");
        setTestLoader(false);
      } else if (testObject.id != null && testObject?.name?.length != 0) {
        dispatch(
          testTypeAction.adminAddTestTypes(
            testObject,
            setAddTestModal,
            message,
            setTestLoader,
            props.managerId,
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
    } else {
      let testObject = {
        name: testName,
        types: values.testTypes,
      };
      if (
        testObject.types.includes("") === true ||
        testObject.types?.length === 0
      ) {
        message.error("Enter Type");
        setTestLoader(false);
      } else if (testObject.name.length > 0) {
        dispatch(
          testTypeAction.addTestTypes(
            testObject,
            setAddTestModal,
            message,
            setTestLoader
          )
        );
      } else {
        message.error("Enter Test Name ");
        setTestLoader(false);
      }
      testObject = {};
    }
    setTestName("");

    resetForm();
    setSelectInputValueForTestName([]);
  };

  const onFinishTestTypeUpdate = (values, { resetForm }) => {
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
    if (role === "Asins") {
      if (copyOfTypes.length <= 0) {
        message.error("Select Test Name of which Type To Update");
        setUpdateTestTypeLoader(false);
      } else if (addType.length != 0 && deleteType.length != 0) {
        modifyTypes = [...addType, ...b];
        testObject = {
          id: props.managerId,
          name: copyOfTypes[0].name,
          types: modifyTypes,
        };
        dispatch(
          testTypeAction.adminUpdateTestTypes(
            testObject,

            setUpdateTestTypeModal,
            message,
            setUpdateTestTypeLoader,
            props.managerId
          )
        );
      } else if (addType.length != 0 && props.managerId != null) {
        modifyTypes = [...addType, ...copyOfTypes[0].types];
        testObject = {
          id: props.managerId,
          name: copyOfTypes[0].name,
          types: modifyTypes,
        };
        dispatch(
          testTypeAction.adminUpdateTestTypes(
            testObject,

            setUpdateTestTypeModal,
            message,
            setUpdateTestTypeLoader,
            props.managerId
          )
        );
      } else if (deleteType.length != 0) {
        testObject = {
          id: props.managerId,
          name: copyOfTypes[0].name,
          types: [...b],
        };
        dispatch(
          testTypeAction.adminUpdateTestTypes(
            testObject,

            setUpdateTestTypeModal,
            message,
            setUpdateTestTypeLoader,
            props.managerId
          )
        );
      } else if (props.managerId === null) {
        setUpdateTestTypeLoader(false);
        message.error("Manager is not selected ");
      } else {
        setUpdateTestTypeLoader(false);

        message.error("delete or update or add test type ! ");
      }
    } else {
      if (copyOfTypes.length <= 0) {
        message.error("Select Test Name of which Type To Update");
        setUpdateTestTypeLoader(false);
      } else if (addType.length != 0 && deleteType.length != 0) {
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
    }

    copyOfTypes = [];
    testObject = {};
    addType = [];
    modifyTypes = [];
    b = [];
    resetForm();
    setTestNameForUpdate("");
    setSelectedUpdateTestType("");
    setSelectedTest([]);
    setSelectInputValueForTestName([]);
    setSelectInputValueForTypes([]);
  };

  // console.log(" testTypes : ", testTypeArray);
  const deleteTest = (id) => {
    setDeleteTestLoader(true);
    if (role === "Asins") {
      if (props.managerId != null && id != null) {
        dispatch(
          testTypeAction.adminDeleteTest(
            id,
            setDeleteModal,
            message,
            setDeleteTestLoader,
            props.managerId
          )
        );
      } else if (props.managerId === null) {
        setDeleteTestLoader(false);
        message.error("Manager is not selected");
      } else if (id === null) {
        setDeleteTestLoader(false);
        message.error("No Test is selected to Delete");
      } else {
        setDeleteTestLoader(false);
        message.error("Try Again ");
      }
    } else {
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
    }

    setSelectInputValueForDeleteTestName([]);
    setDeleteId(null);
    setSelectInputValueForDeleteTestName([]);
  };

  const updateTestName = () => {
    setUpdateTestNameLoader(true);

    let testObject = {
      id: props.managerId,
      name: testNameForUpdate,
    };

    if (role === "Asins") {
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
            props.managerId
          )
        );
      }
    } else {
      if (testObject.name.length === 0) {
        message.error("enter test Name !");
        setUpdateTestNameLoader(false);
      } else if (
        testObject.name.length > 0 &&
        updateSelectedTest?.length != 0
      ) {
        Object.assign(testObject, { preName: updateSelectedTest });
        dispatch(
          testTypeAction.updateTestTypes(
            testObject,

            setUpdateTestNameModal,
            message,
            setUpdateTestNameLoader
          )
        );
      } else if (updateSelectedTest?.length == 0) {
        setUpdateTestNameLoader(false);
        message.error("select test to update");
      } else {
        setUpdateTestNameLoader(false);
        message.error("try again ");
      }
    }

    setTestNameForUpdate("");
    setSelectInputValueForUpdateTestName([]);
  };

  return (
    <div className="mt-5 mx-auto w-10/12">
      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading mb-2">Add Test </h1>
          </div>
        }
        content={
          <div className="bd_red">
            <DynamicField
              testName={testName}
              setTestName={setTestName}
              onFinish={onFinish}
              loader={testLoader}
              selectInputText="Test Name"
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
              <label className="text-font-size ">Delete Test Type</label>
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
              <DynamicField
                testName={testNameForUpdate}
                setTestName={setTestNameForUpdate}
                onFinish={onFinishTestTypeUpdate}
                loader={updateTestTypeLoader}
                selectInputText="Add Type"
                title={"Add Test Type"}
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
          <Col sm={24} xs={24}>
            <label className="font-size text-lg font-medium ">
              <Col sm={6} xs={12}>
                Select Test
              </Col>
              <br />
            </label>
            <div className="w-100" style={{ marginTop: "-12px" }}>
              <SelectInput
                // mode="multiple"
                name="test"
                setData={(e) => {
                  let filterArray = testTypeArray.filter((selected) => {
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
            <div className="w-4/12 mt-3">
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
            <div className="w-100 " style={{ marginTop: "-12px" }}>
              <SelectInput
                // mode="multiple"
                name="test"
                setData={(e) => {
                  let filterArray = testTypeArray.filter((selected) => {
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
            <div className="w-4/12 mt-3">
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

      <form className="mt-5" onSubmit={formik.handleSubmit}>
        <Row gutter={[10, 10]}>
          <Col sm={24} xs={24}>
            <label className="text-font-size ">
              Select Test
              <Col sm={6} xs={12}></Col>
              <br />
            </label>
            <SelectInput
              mode="multiple"
              name="test"
              setData={(e) => {
                setSelectedTestDropDown(e);
                formik.setFieldValue("test", e);
              }}
              value={testTypeArray?.map((testName) => testName.name)}
              placeholder="Add Test"
            />
          </Col>
          {formik.touched.test && formik.errors.test ? (
            <span className="error">{formik.errors.test}</span>
          ) : null}
          <Col sm={24} xs={24}>
            <label className="text-font-size ">Add Test Type</label>
            <SelectInput
              mode="multiple"
              name="types"
              setData={(e) => {
                formik.setFieldValue("types", e);
              }}
              value={arrDropDown}
              placeholder={"Add Test Type"}
            />
          </Col>
          {formik.touched.types && formik.errors.types ? (
            <span className="error">{formik.errors.types}</span>
          ) : null}
        </Row>
        {selectedTestDropDown?.map((v) => {
          testTypeArray.map((value) => {
            if (value?.name === v) {
              value?.types?.map((value2) => {
                arrDropDown.push(value2);
              });
            }
          });
        })}
        <Row
          gutter={[10, 0]}
          className="w-full flex justify-end items-end mt-4"
        >
          <Col sm={6} xs={12}>
            <Btn
              bgColor="#008ba4"
              color="white"
              value="Previous"
              onClick={() => props.previous()}
            />
          </Col>
          <Col sm={6} xs={12}>
            <Btn bgColor="#008ba4" color="white" type="submit" value="Next" />
          </Col>
        </Row>
      </form>
      <br />
      {/* use space instead of br tag ,  */}
      <div className="bottom-bar flex mt-10 xs:justify-center sm:justify-end items-center   ">
        <Tooltip placement="topLeft" title="Add Test" color={"#008ba4"}>
          <LoginOutlined
            className="bottom-bar-item"
            style={{
              fontSize: "22px",
              padding: ".7rem 1.4rem",
            }}
            onClick={() => setAddTestModal(true)}
          />
        </Tooltip>
        <Tooltip placement="topLeft" title="Update Test Type" color={"#008ba4"}>
          <MenuFoldOutlined
            className="bottom-bar-item"
            style={{
              fontSize: "22px",
              padding: ".7rem 1.4rem",
            }}
            onClick={() => setUpdateTestTypeModal(true)}
          />
        </Tooltip>
        <Tooltip placement="topLeft" title="Update Test Name" color={"#008ba4"}>
          <RedoOutlined
            className="bottom-bar-item"
            style={{
              fontSize: "22px",
              padding: ".7rem 1.4rem",
            }}
            onClick={() => setUpdateTestNameModal(true)}
          />
        </Tooltip>
        <Tooltip placement="topLeft" title="Delete Test" color={"#008ba4"}>
          <UpSquareFilled
            className="bottom-bar-item"
            style={{
              fontSize: "22px",
              padding: ".7rem 1.4rem",
            }}
            onClick={() => setDeleteModal(true)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
TestDetails.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  setData: PropTypes.func,
  setTestDetailForm: PropTypes.any,
  managerId: PropTypes.string,
};
export default TestDetails;
