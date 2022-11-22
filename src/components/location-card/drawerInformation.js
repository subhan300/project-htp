import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { Row, Col, message, Button } from "antd";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { EditableInput } from "../../components/forms/editable-input";
import { DynamicField } from "../../components/dynamic-fields/dynamic-field";
import { Btn } from "../../components/forms/button";
import { locationAction, testTypeAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Spinner } from "../../components";
import { DetailModal } from "../modals";

import { SelectInput } from "../forms";
import { locationConstant } from "../../store/constants";

export const LocationDetails = (props) => {
  delete props?.details?.noOfEmployees;
  delete props?.details?.noOfTested;
  delete props.details.user_type;

  let location_id = props.details._id;
  let dispatch = useDispatch();

  let [
    selectInputValueTestNameForDeleteType,
    setSelectInputValueTestNameForDeleteType,
  ] = useState("");
  let [
    selectInputValueTestTypeForDeleteType,
    setSelectInputValueTestTypeForDeleteType,
  ] = useState();
  let [
    selectInputValueTestNameForDeleteTest,
    setSelectInputValueTestNameForDeleteTest,
  ] = useState();
  let [
    selectInputValueTestNameForAddType,
    setSelectInputValueTestNameForAddType,
  ] = useState();

  const [testName, setTestName] = useState("");
  const [addTestModal, setAddTestModal] = useState(false);
  const [addTestLoader, setAddTestLoader] = useState(false);
  const [deleteTestLoader, setDeleteTestLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteName, setDeleteName] = useState(null);

  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedTestNameForAddType, setSelectedTestNameForAddType] = useState(
    []
  );
  const [updateTestTypeLoader, setUpdateTestTypeLoader] = useState(false);
  const [updateTestModal, setUpdateTestModal] = useState(false);
  const [updateSelectedTest, setSelectedUpdateTest] = useState("");
  const [updateSelectedTestType, setSelectedUpdateTestType] = useState("");

  const onSubmitFunction = (values) => {
    props.setLoad(true);
    dispatch(
      locationAction.updateLocation(values, location_id, props.setLoad, message)
    );
  };

  const onFinish = (values, { resetForm }) => {
    setAddTestLoader(true);

    let testObject = {
      name: testName,

      types: values.testTypes,
    };
    if (testObject.name.length === 0) {
      message.error("Enter Test Name ");
      setAddTestLoader(false);
    } else if (
      testObject.name.length > 0 &&
      !testObject.types.includes("") &&
      testObject.types.length > 0
    ) {
      dispatch(
        testTypeAction.addTestForSpecificLocation(
          testObject,
          setAddTestModal,
          message,
          setAddTestLoader,
          location_id
        )
      );
    } else {
      message.error("enter types ");
      setAddTestLoader(false);
    }
    setTestName("");
    resetForm();
  };
  // let testTypes = useSelector((state) => state.tests.testTypes);
  let testTypeArray = props?.details?.test?.map((val) => {
    return val;
  });

  const deleteTest = (name) => {
    console.log("name>>>", name);
    setDeleteTestLoader(true);
    if (name) {
      dispatch(
        testTypeAction.deleteTestForSpecificLocation(
          location_id,
          setDeleteModal,
          message,
          setDeleteTestLoader,
          name
        )
      );
    } else {
      message.error("select Test which you want to delete");
      setDeleteTestLoader(false);
    }
    setDeleteName("");
    setSelectInputValueTestNameForDeleteTest("");
  };

  let typeArr = [];
  const onFinishTestTypeDelete = () => {
    setUpdateTestTypeLoader(true);
    let copyOfTypes = typeArr;
    let deleteType = [...updateSelectedTestType];

    let b = [];

    if (deleteType.length > 0) {
      b = copyOfTypes.filter((val) => !deleteType.includes(val));
      let testObject = {
        id: location_id,
        name: updateSelectedTest,
        types: [...b],
      };

      dispatch(
        testTypeAction.updateTestTypesForSpecificLocation(
          testObject,
          setUpdateTestModal,
          message,
          setUpdateTestTypeLoader
        )
      );
    } else {
      message.error("select test type , which you want to delete ");
      setUpdateTestTypeLoader(false);
    }

    setSelectedUpdateTestType("");
    setSelectInputValueTestNameForDeleteType("");
    setSelectInputValueTestTypeForDeleteType([]);
    typeArr = [];
  };

  const [testTypeForAdd, setTestTypeForAdd] = useState("");

  const [addTestTypeModal, setAddTestTypeModal] = useState(false);

  const [updateSelectedTestForAddType, setSelectedUpdateTestForAddType] =
    useState("");

  const [addTestTypeLoader, setAddTestTypeLoader] = useState(false);
  // let [updateIdForType, setUpdateIdForType] = useState();
  let typeArrForAddTestType = [];
  const onFinishAddTestType = (values, { resetForm }) => {
    setAddTestTypeLoader(true);

    let testObject = {
      id: location_id,
      name: updateSelectedTestForAddType,

      types:
        values.testTypes && testTypeForAdd
          ? [testTypeForAdd, ...values?.testTypes]
          : testTypeForAdd
          ? [testTypeForAdd]
          : values.testTypes
          ? [...values.testTypes]
          : [],
    };

    if (
      !testObject.types.includes("") &&
      testObject.types.length > 0 &&
      testObject.name.length > 0
    ) {
      testObject.types.push(...typeArrForAddTestType);

      dispatch(
        testTypeAction.updateTestTypesForSpecificLocation(
          testObject,
          setAddTestTypeModal,
          message,
          setAddTestTypeLoader
        )
      );
      setSelectedUpdateTestForAddType("");
    } else if (testObject.name.length === 0) {
      setAddTestTypeLoader(false);
      message.error("name is empty");
    } else if (
      testObject.types.length === 0 ||
      testObject.types.includes("") === true
    ) {
      setAddTestTypeLoader(false);
      message.error("enter atleast 1 Test Type");
    } else {
      message.error("Try again");
      setAddTestTypeLoader(false);
    }

    dispatch({ type: locationConstant.IS_LOADER, isLoader: true });

    setSelectedUpdateTestForAddType("");
    typeArrForAddTestType = [];
    setTestTypeForAdd("");
    setSelectInputValueTestNameForAddType("");
    testObject = {};
    resetForm();
  };

  let detailObject = { ...props.details };
  delete detailObject._id;
  delete detailObject.createdAt;
  delete detailObject.updatedAt;
  delete detailObject.__v;
  delete detailObject.noOfPatient;
  delete detailObject.noOfPatients;
  delete detailObject.created_by;
  // delete detailObject.noOfEmployees;
  delete detailObject.noOfTested;
  delete detailObject.noOfNotTested;
  delete detailObject.noOfMedicalProfession;
  delete detailObject.noOfNotTested;
  delete detailObject.noOfOmicronPatient;
  delete detailObject.noOfPatient;
  // delete detailObject.noOfTested;
  delete detailObject.noOfLabTechnician;
  delete detailObject.noOfCovidPatient;

  const formik = useFormik({
    initialValues: { ...detailObject },

    onSubmit: onSubmitFunction,
  });

  return (
    <div className="pl-3 pr-3">
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
              loader={addTestLoader}
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
                    // console.log(selected.name === e);
                    return e === selected.name;
                  });
                  setDeleteName(filterArray[0].name);
                }}
                value={testTypeArray.map((testName) => testName.name)}
                placeholder="Add Test"
                selectValue={selectInputValueTestNameForDeleteTest}
                setValue={setSelectInputValueTestNameForDeleteTest}
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
                onClick={() => deleteTest(deleteName)}
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

      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading ">Delete Test Type</h1>
          </div>
        }
        content={
          <div className="bd_red">
            <Col sm={24} xs={24}>
              <label className=" text-lg font-medium">
                Select Test which type to add <br />
              </label>
              <div className="w-100 mt-3">
                <SelectInput
                  // mode="multiple"
                  name="test"
                  setData={(e) => {
                    setSelectedUpdateTest(e);
                    // console.log("e>>>", e);

                    let filterArray = testTypeArray.filter((selected) => {
                      return e === selected.name;
                    });
                    // setUpdateId(filterArray[0]._id);

                    setSelectedTest(filterArray);
                  }}
                  value={testTypeArray.map((testName) => testName.name)}
                  placeholder="Add Test"
                  selectValue={selectInputValueTestNameForDeleteType}
                  setValue={setSelectInputValueTestNameForDeleteType}
                />
                {selectedTest?.map((v) => {
                  testTypeArray.map((value) => {
                    if (value?.name === v.name) {
                      value?.types?.map((value2) => {
                        typeArr.push(value2);
                      });
                    }
                  });
                })}
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

                    // setUpdateId(filterArray[0]._id);
                  }}
                  value={typeArr}
                  placeholder={"Add Test Type"}
                  selectValue={selectInputValueTestTypeForDeleteType}
                  setValue={setSelectInputValueTestTypeForDeleteType}
                />
              </div>
            </Col>

            <Button
              className="mt-6 ml-2"
              onClick={() => onFinishTestTypeDelete()}
            >
              {updateTestTypeLoader ? "..loading" : "Delete types"}
            </Button>
          </div>
        }
        closable={true}
        handleCancel={() => setUpdateTestModal(false)}
        isModalVisible={updateTestModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setUpdateTestModal(false)}
      />

      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading ">Update Test </h1>
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
                    setSelectedUpdateTestForAddType(e);

                    let filterArray = testTypeArray.filter((selected) => {
                      return e === selected.name;
                    });
                    // setUpdateIdForType(filterArray[0]._id);

                    setSelectedTestNameForAddType(filterArray);
                  }}
                  value={testTypeArray.map((testName) => testName.name)}
                  placeholder="Add Test"
                  selectValue={selectInputValueTestNameForAddType}
                  setValue={setSelectInputValueTestNameForAddType}
                />
              </div>
            </Col>
            {selectedTestNameForAddType?.map((v) => {
              testTypeArray.map((value) => {
                if (value?.name === v.name) {
                  value?.types?.map((value2) => {
                    typeArrForAddTestType.push(value2);
                  });
                }
              });
            })}

            <div className="mt-5">
              <DynamicField
                testName={testTypeForAdd}
                setTestName={setTestTypeForAdd}
                onFinish={onFinishAddTestType}
                loader={addTestTypeLoader}
                selectInputText="Add Type"
              />
            </div>
          </div>
        }
        closable={true}
        handleCancel={() => setAddTestTypeModal(false)}
        isModalVisible={addTestTypeModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setAddTestTypeModal(false)}
      />

      <form onSubmit={formik.handleSubmit}>
        <h2 className="title">Detail</h2>
        <Row justify="space-between">
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex justify-between align-center">
              <label className="pr-5 font-semibold">Location Name </label>
            </div>
            <div></div>
            <EditableInput
              name={`location_name`}
              value={props.details.location_name}
              text={props.details.location_name}
              onChange={formik.handleChange}
            />
          </Col>

          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Address</label>
              {/* <span>{props.details.address}</span> */}
              <EditableInput
                name={`address`}
                value={props.details.address}
                text={props.details.address}
                onChange={formik.handleChange}
              />
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Location Id</label>
              <span>{props.details._id}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">City</label>
              <EditableInput
                name={`city`}
                value={props.details.city}
                text={props.details.city}
                onChange={formik.handleChange}
              />
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">No Of Patients</label>
              <p>{props.details.noOfPatient}</p>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">State</label>
              <EditableInput
                name={`state`}
                value={"sindh"}
                text={"sindh"}
                onChange={formik.handleChange}
              />
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Zip Code</label>
              <EditableInput
                name={`zip_code`}
                value={props.details.zip_code}
                text={props.details.zip_code}
                onChange={formik.handleChange}
              />
            </div>
          </Col>
          {/* <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Created At</label>
              <p>{props.details.createdAt}</p>
            </div>
          </Col> */}
          {/* <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Number Of Employees</label>
              <p>{props.details.noOfEmployees}</p>
            </div>
          </Col> */}
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">
                Number Of Medical Profession
              </label>
              <p>{props.details.noOfMedicalProfession}</p>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">
                Number Of Lab Technician
              </label>
              <p>{props.details.noOfLabTechnician}</p>
            </div>
          </Col>
          {/* <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">
                Number Of Tested Pateint
              </label>
              <p>{props.details.noOfTested}</p>
            </div>
          </Col> */}
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Total Patients</label>
              <p>{props.details.noOfPatient}</p>
            </div>
          </Col>

          <Col sm={24} className="bd_red">
            <FormikProvider className="bd_blue" value={formik}>
              <FieldArray name="patient_required_fields bd_yellow">
                {() => (
                  <div className="user-information-modal-title mt-1 align-center bd_green">
                    {props?.details?.patient_required_fields?.map(
                      (val, index) => {
                        return (
                          <Row className="mt-1" key={index}>
                            <Col sm={24} md={24} xs={24} lg={11}>
                              <div className="mt-5">
                                <label className="pr-5 font-semibold ">
                                  Field
                                </label>
                              </div>
                              <div className="mb-2 ">
                                <EditableInput
                                  name={`patient_required_fields[${index}].name`}
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                  }}
                                  value={val.field}
                                  text={val.field}
                                />
                              </div>
                            </Col>

                            <Col
                              sm={24}
                              md={24}
                              xs={24}
                              lg={11}
                              className="bd_red ml-auto mr-2"
                            >
                              <div className="mt-5">
                                <label className="pr-5 font-semibold ">
                                  Required
                                </label>
                              </div>
                              <div className="mb-2 ">
                                <EditableInput
                                  name={`patient_required_fields[${index}].required`}
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                  }}
                                  value={val.required}
                                  text={val.required}
                                />
                              </div>
                            </Col>
                          </Row>
                        );
                      }
                    )}
                  </div>
                )}
              </FieldArray>
            </FormikProvider>
          </Col>
          <Col sm={24} md={24} xs={24} lg={24} className="mx-1 mt-2">
            <FormikProvider value={formik}>
              <FieldArray name="test">
                {() => (
                  <div className="user-information-modal-title flex flex-col align-center">
                    <Col sm={24} md={24} xs={24} lg={24} className="mx-1 mt-2">
                      {props?.details?.test?.map((val, index) => {
                        return (
                          <Row key={index}>
                            <Col xs={11} md={11}>
                              <div className="mt-5">
                                {" "}
                                <label className="pr-5 font-semibold ">
                                  Test Name
                                </label>
                              </div>
                              <div className="mb-2 ">
                                <EditableInput
                                  name={`test[${index}].name`}
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                  }}
                                  value={val.name}
                                  text={val.name}
                                />
                              </div>
                            </Col>
                            <Col xs={24} md={11} className="mt-5  ml-auto mr-2">
                              <div>
                                {" "}
                                <label className="pr-5 font-semibold">
                                  Types
                                </label>
                              </div>
                              {val?.types?.map((t, i) => (
                                <Col
                                  key={i}
                                  sm={24}
                                  md={24}
                                  xs={24}
                                  lg={24}
                                  className="mx-1 mt-2"
                                >
                                  <span className="font-semibold pr-5">
                                    ({i + 1})
                                  </span>
                                  <EditableInput
                                    name={`test[${index}].types[${i}]`}
                                    onChange={(e) => {
                                      formik.handleChange(e);
                                    }}
                                    value={t}
                                    text={t}
                                  />
                                </Col>
                              ))}
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  </div>
                )}
              </FieldArray>
            </FormikProvider>
          </Col>
          <Col
            xs={24}
            sm={11}
            md={11}
            lg={11}
            className="mt-4  mt-10 text-medium xs:mx-auto"
          >
            <div>
              <Button onClick={() => setAddTestModal(true)}>ADD TEST</Button>
            </div>
          </Col>
          <Col
            xs={24}
            sm={11}
            md={11}
            lg={11}
            className="mt-4 w-1/4 mt-10 xs:mx-auto"
          >
            <div>
              <Button onClick={() => setUpdateTestModal(true)}>
                Delete Type
              </Button>
            </div>
          </Col>
          <Col
            xs={24}
            sm={11}
            md={11}
            lg={11}
            className="mt-4 w-1/4 mt-10 xs:mx-auto"
          >
            <div>
              <Button onClick={() => setAddTestTypeModal(true)}>
                Add Test Type
              </Button>
            </div>
          </Col>
          <Col
            xs={24}
            sm={11}
            md={11}
            lg={11}
            className="mt-4   mt-10 xs:mx-auto lg:ml-0 lg:mr-0"
          >
            <div>
              <Button onClick={() => setDeleteModal(true)}>Delete Test</Button>
            </div>
          </Col>

          <Col
            xs={24}
            sm={11}
            md={11}
            lg={11}
            className="mt-4 w-1/4 mt-10 xs:mx-auto lg:ml-0 lg:mr-0"
          >
            <div>
              <Btn
                value={
                  props.load ? (
                    <span>
                      <Spinner className="btn-spinner mr-2" /> Loading...
                    </span>
                  ) : (
                    "Submit"
                  )
                }
                bgColor="#008ba4"
                color="white"
                border="1px solid #c3c3c7"
                btnClass="btnDarkHover"
                type="submit"
              ></Btn>
            </div>
          </Col>
          {/* submit btn  */}
        </Row>
      </form>
    </div>
  );
};

LocationDetails.propTypes = {
  details: PropTypes.any,
  setLoad: PropTypes.func,
  load: PropTypes.bool,
};
