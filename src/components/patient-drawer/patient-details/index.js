import {
  EditableInput,
  SelectInput,
  Btn,
  Spinner,
  FileInput,
  DetailModal,
} from "../../index";
import { PropTypes } from "prop-types";
import { Row, Col, message } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { patientAction } from "../../../store/actions";
import { actionEdit, actionView } from "../../../assets/images";
export const PatientDetails = (props) => {
  const formdata = new FormData();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const onSubmitFunction = (values) => {
    setLoading(true);
    for (let key in values) {
      if (key === "test_type") {
        formdata.append("test_type[name]", values[key].name);
        formdata.append("test_type[type]", values[key].type);
      } else if (key === "location_id") {
        formdata.append("location_id[_id]", values[key]._id);
        formdata.append(
          "location_id[location_name]",
          values[key].location_name
        );
      } else {
        formdata.append(key, values[key]);
      }
    }
    dispatch(
      patientAction.updatePatient(
        formdata,
        props.data.id,
        setLoading,
        props.next,
        "Patient Updated Successfully"
      )
    );
  };
  const formik = useFormik({
    initialValues: {
      gender: props?.data?.gender,
    },
    onSubmit: onSubmitFunction,
  });
  const testTypes = props.testTypes;
  const testNames = [];
  const [selectedTest, setSelectedTest] = useState(null);
  testTypes?.map((value) => testNames.push(value.name));
  const types = testTypes?.filter((test) => test.name == selectedTest);
  const stateNames = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const gender = ["Male", "Female", "Other"];
  const sexAssignedAtBirth = ["Male", "Female", "Other"];
  const race = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Pacific Islander",
    "White",
    "Other",
    "Unknown",
  ];
  const primaryLanguage = ["English", "Spanish", "Other"];
  const ethnicity = ["Hispanic or Latino", "Not Hispanic or Latino", "Unknown"];
  const maritalStatus = ["Single", "Married", "Divorced", "Widowed", "Other"];
  const pregnant = ["Yes", "No", "Unknown"];
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const fileInputProps = {
    accept: "images/*",
    id: "logo",
    listType: "picture-card",
    beforeUpload: (file) => {
      const types = ["image/png", "image/jpg", "image/gif", "image/jpeg"];
      const isImage = types.includes(file.type);
      if (!isImage) {
        message.error(`${file.name} is not a image file`);
      } else {
        formik.setFieldValue("insurance_image", file);
      }
      return false;
    },
    fileList: fileList,
    onChange: onChange,
    onPreview: onPreview,
    content: fileList.length < 1 && "+ Upload",
    dragger: false,
    maxCount: 1,
    multiple: false,
  };
  return props.type === "collected" || props?.data?.is_review ? (
    <div className="pl-3 pr-3">
      <DetailModal
        isModalVisible={view}
        afterClose={() => setView(false)}
        centered={true}
        closable={true}
        mask={true}
        handleCancel={() => setView(false)}
        footer={null}
        title="Insurance Image"
        content={
          <div className="flex justify-center items-center h-64">
            <img src={props.data.insurance_image} className="h-full" />
          </div>
        }
      />
      <form onSubmit={formik.handleSubmit}>
        <h2 className="title">
          {props?.data?.first_name} {props?.data?.last_name}
        </h2>
        <Row justify="space-between">
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST NAME</label>
              <span>{props?.data?.test_type?.name}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST TYPE</label>
              <span>{props?.data?.test_type?.type}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TESTED</label>
              <span>{props?.data?.is_tested}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">PID#</label>
              <span>{props?.data?.pid}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">CREATED AT</label>
              <span>{props?.data?.createdAt}</span>
            </div>
          </Col>
          {props?.data?.first_name && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">First Name :</label>
                <span>{props?.data?.first_name}</span>
              </div>
            </Col>
          )}
          {props?.data?.last_name && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">Last Name :</label>
                <span>{props?.data?.last_name}</span>
              </div>
            </Col>
          )}
          {props?.data?.email && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">Email :</label>
                <span>{props?.data?.email}</span>
              </div>
            </Col>
          )}
          {props?.data?.telephone && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">Phone# :</label>
                <span>{props?.data?.telephone}</span>
              </div>
            </Col>
          )}

          {props?.data?.date_of_birth && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">DATE OF BIRTH : </label>
                <span>{props?.data?.date_of_birth}</span>
              </div>
            </Col>
          )}
          {props?.data?.city && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">CITY : </label>
                <span>{props?.data?.city}</span>
              </div>
            </Col>
          )}
          {props?.data?.state && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">STATE : </label>
                <span>{props?.data?.state}</span>
              </div>
            </Col>
          )}
          {props?.data?.postal_code && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">POSTAL CODE : </label>
                <span>{props?.data?.postal_code}</span>
              </div>
            </Col>
          )}
          {props?.data?.location_id?.location_name && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">TEST PLACE : </label>
                <span>{props?.data?.location_id?.location_name}</span>
              </div>
            </Col>
          )}
          {props?.data?.address && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">ADDRESS : </label>
                <span>{props?.data?.address}</span>
              </div>
            </Col>
          )}
          {props?.data?.insurance_name && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">INSURANCE NAME : </label>
                <span>{props?.data?.insurance_name}</span>
              </div>
            </Col>
          )}
          {props?.data?.insurance_policy_number && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  INSURANCE POLICY NUMBER :{" "}
                </label>
                <span>{props?.data?.insurance_policy_number}</span>
              </div>
            </Col>
          )}
          {props?.data?.insurance_image && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">INSURANCE IMAGE: </label>
                <img
                  src={actionView}
                  className="w-10 cursor-pointer"
                  onClick={() => setView(true)}
                />
              </div>
            </Col>
          )}
          {props?.data.us_id && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  US ID / PASSPORT :{" "}
                </label>
                <span>{props?.data.us_id}</span>
              </div>
            </Col>
          )}
          {props?.data.us_id_no && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  US ID / PASSPORT NUMBER :{" "}
                </label>
                <span>{props?.data.us_id_no}</span>
              </div>
            </Col>
          )}
          {props?.data.ssn && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">SSN NUMBER : </label>
                <span>{props?.data.ssn}</span>
              </div>
            </Col>
          )}
          {props?.data?.gender && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">GENDER : </label>
                <span>{props?.data?.gender}</span>
              </div>
            </Col>
          )}
          {props?.data?.sex_assign_at_birth && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  SEX ASSIGN AT BIRTH :{" "}
                </label>
                <span>{props?.data?.sex_assign_at_birth}</span>
              </div>
            </Col>
          )}
          {props?.data?.race && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">RACE : </label>
                <span>{props?.data?.race}</span>
              </div>
            </Col>
          )}
          {props?.data?.language && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  PRIMARY LANGUAGE :{" "}
                </label>
                <span>{props?.data?.language}</span>
              </div>
            </Col>
          )}
          {props?.data?.ethnicity && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">ETHNICITY : </label>
                <span>{props?.data?.ethnicity}</span>
              </div>
            </Col>
          )}
          {props?.data?.marital_status && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">MARITAL STATE: </label>
                <span>{props?.data?.marital_status}</span>
              </div>
            </Col>
          )}
          {props?.data?.pregnant && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  ARE YOU PREGNANT :{" "}
                </label>
                <span>{props?.data?.pregnant}</span>
              </div>
            </Col>
          )}
          {props?.data?.payment && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-titXle flex flex-col align-center">
                <label className="pr-5 font-semibold">PAYMENT OPTIONS : </label>
                <span>{props?.data?.payment}</span>
              </div>
            </Col>
          )}
        </Row>
        {props.type === "collected" ? null : (
          <div className="steps-action mt-5 w-full">
            <Row justify="space-between">
              <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2"></Col>
              <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
                <Btn
                  bgColor={"#008ba4"}
                  color={"#fff"}
                  value="Next"
                  type="button"
                  onClick={() => props.next()}
                />
              </Col>
            </Row>
          </div>
        )}
      </form>
    </div>
  ) : (
    <div className="pl-3 pr-3">
      <DetailModal
        isModalVisible={view}
        afterClose={() => setView(false)}
        centered={true}
        closable={true}
        mask={true}
        handleCancel={() => setView(false)}
        footer={null}
        title="Insurance Image"
        content={
          <div className="flex justify-center items-center h-64">
            <img src={props.data.insurance_image} className="h-full" />
          </div>
        }
      />
      <form onSubmit={formik.handleSubmit}>
        <h2 className="title">
          {props.data?.first_name} {props.data?.last_name}
        </h2>
        <Row justify="space-between">
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST NAME</label>
              <SelectInput
                defaultValue={props.data?.test_type?.name}
                value={testNames}
                setData={(name) => {
                  formik.setFieldValue("test_type", {
                    name,
                    type: "",
                  });
                  setSelectedTest(name);
                }}
              />
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST TYPE</label>
              <SelectInput
                defaultValue={props.data?.test_type?.type}
                value={types[0]?.types}
                setData={(type) =>
                  formik.setFieldValue("test_type", {
                    name:
                      formik?.values?.test_type?.name ||
                      props?.data?.test_type?.name,
                    type,
                  })
                }
              />
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TESTED</label>
              <span>{props.data?.is_tested}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">PID#</label>
              <span>{props.data?.pid}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Order ID#</label>
              <span>{props.data?.order_no}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">CREATED AT</label>
              <span>{props.data?.createdAt}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST PLACE : </label>
              <span>{props?.data?.location_name}</span>
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">First Name :</label>
              <EditableInput
                name="first_name"
                defaultValue={props?.data?.first_name}
                text={formik.values?.first_name}
                onChange={formik.handleChange}
              />
            </div>
          </Col>
          <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">Last Name :</label>
              <EditableInput
                name="last_name"
                defaultValue={props?.data?.last_name}
                text={formik.values?.last_name}
                onChange={formik.handleChange}
              />
            </div>
          </Col>
          {props?.data?.email && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">Email :</label>
                <EditableInput
                  name="email"
                  defaultValue={props?.data?.email}
                  text={formik.values?.email}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          )}
          {props?.data?.telephone && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">Phone# :</label>
                <EditableInput
                  name="telephone"
                  defaultValue={props?.data?.telephone}
                  text={formik.values?.telephone}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          )}
          {props?.data?.date_of_birth && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">DATE OF BIRTH : </label>
                <EditableInput
                  name="date_of_birth"
                  defaultValue={props?.data?.date_of_birth}
                  text={formik.values?.date_of_birth}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          )}
          {props?.data?.city && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">CITY : </label>
                <EditableInput
                  name="city"
                  defaultValue={props?.data?.city}
                  text={formik.values?.city}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          )}
          {props?.data?.state && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">STATE : </label>
                <SelectInput
                  defaultValue={props?.data?.state}
                  value={stateNames}
                  setData={(state) => formik.setFieldValue("state", state)}
                />
              </div>
            </Col>
          )}
          {props?.data?.postal_code && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">POSTAL CODE : </label>
                <EditableInput
                  name="postal_code"
                  defaultValue={props?.data?.postal_code}
                  text={formik.values?.postal_code}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          )}
          {props?.data?.address && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">ADDRESS : </label>
                <EditableInput
                  name="address"
                  defaultValue={props?.data?.address}
                  text={formik.values?.address}
                  onChange={formik.handleChange}
                />
              </div>
            </Col>
          )}
          {props?.data?.payment && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">PAYMENT OPTIONS : </label>
                <SelectInput
                  defaultValue={props?.data?.payment}
                  value={[
                    "Cash / Credit (Non U.S Residents)",
                    "Production",
                    "Employment",
                    "HRSA / CARESACT",
                    "Insurance",
                  ]}
                  setData={(payment) =>
                    formik.setFieldValue("payment", payment)
                  }
                />
              </div>
            </Col>
          )}
          {formik?.values?.payment === "Insurance" && (
            <>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">
                    INSURANCE NAME :{" "}
                  </label>
                  <EditableInput
                    name="insurance_name"
                    defaultValue={props?.data?.insurance_name}
                    text={formik.values?.insurance_name}
                    onChange={formik.handleChange}
                  />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">
                    INSURANCE POLICY NUMBER :{" "}
                  </label>
                  <EditableInput
                    name="insurance_policy_number"
                    defaultValue={props?.data?.insurance_policy_number}
                    text={formik.values?.insurance_policy_number}
                    onChange={formik.handleChange}
                  />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label
                    className="pr-5 font-semibold"
                    onClick={() => setEdit(true)}
                  >
                    INSURANCE IMAGE:{" "}
                  </label>
                  {edit ? (
                    <FileInput {...fileInputProps} />
                  ) : (
                    <Row>
                      <Col>
                        <img
                          src={actionView}
                          className="w-10 cursor-pointer"
                          onClick={() => setView(true)}
                        />
                      </Col>
                      <Col className="ml-2">
                        <img
                          src={actionEdit}
                          className="w-10 cursor-pointer"
                          onClick={() => setEdit(true)}
                        />
                      </Col>
                    </Row>
                  )}
                </div>
              </Col>
            </>
          )}
          {props?.data.us_id && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  US ID / PASSPORT :{" "}
                </label>
                <SelectInput
                  defaultValue={props?.data.us_id}
                  value={["Yes", "No"]}
                  setData={(us_id) => formik.setFieldValue("us_id", us_id)}
                />
              </div>
            </Col>
          )}
          {props?.data.us_id ? (
            formik?.values.us_id === "Yes" ? (
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">
                    US ID / PASSPORT NUMBER :{" "}
                  </label>
                  <EditableInput
                    name="us_id_no"
                    defaultValue={props?.data.us_id_no}
                    text={formik.values.us_id_no}
                    onChange={formik.handleChange}
                  />
                </div>
              </Col>
            ) : (
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">SSN NUMBER : </label>
                  <EditableInput
                    name="ssn"
                    defaultValue={props?.data.ssn}
                    text={formik.values.ssn}
                    onChange={formik.handleChange}
                  />
                </div>
              </Col>
            )
          ) : null}
          {props?.data?.gender && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">GENDER : </label>
                <SelectInput
                  defaultValue={props?.data?.gender}
                  setData={(gender) => formik.setFieldValue("gender", gender)}
                  value={gender}
                />
              </div>
            </Col>
          )}
          {formik?.values?.gender === "Female" && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  ARE YOU PREGNANT :{" "}
                </label>
                <SelectInput
                  defaultValue={props?.data?.pregnant}
                  value={pregnant}
                  setData={(pregnant) =>
                    formik.setFieldValue("pregnant", pregnant)
                  }
                />
              </div>
            </Col>
          )}
          {props?.data?.sex_assign_at_birth && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  SEX ASSIGN AT BIRTH :{" "}
                </label>
                <SelectInput
                  defaultValue={props?.data?.sex_assign_at_birth}
                  setData={(sex_assign_at_birth) =>
                    formik.setFieldValue(
                      "sex_assign_at_birth",
                      sex_assign_at_birth
                    )
                  }
                  value={sexAssignedAtBirth}
                />
              </div>
            </Col>
          )}
          {props?.data?.race && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">RACE : </label>
                <SelectInput
                  defaultValue={props?.data?.race}
                  value={race}
                  setData={(race) => formik.setFieldValue("race", race)}
                />
              </div>
            </Col>
          )}
          {props?.data?.language && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">
                  PRIMARY LANGUAGE :{" "}
                </label>
                <SelectInput
                  defaultValue={props?.data?.language}
                  setData={(language) =>
                    formik.setFieldValue("language", language)
                  }
                  value={primaryLanguage}
                />
              </div>
            </Col>
          )}
          {props?.data?.ethnicity && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">ETHNICITY : </label>
                <SelectInput
                  defaultValue={props?.data?.ethnicity}
                  value={ethnicity}
                  setData={(ethnicity) =>
                    formik.setFieldValue("ethnicity", ethnicity)
                  }
                />
              </div>
            </Col>
          )}
          {props?.data?.marital_status && (
            <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
              <div className="user-information-modal-title flex flex-col align-center">
                <label className="pr-5 font-semibold">MARITAL STATE: </label>
                <SelectInput
                  defaultValue={props?.data?.marital_status}
                  value={maritalStatus}
                  setData={(marital_status) =>
                    formik.setFieldValue("marital_status", marital_status)
                  }
                />
              </div>
            </Col>
          )}
        </Row>
        <Row justify="space-between">
          <Col sm={24} md={24} xs={24} lg={24} className="mx-1 mt-5">
            <p className="user-information-modal-title">
              Please verify the Patient&apos;s Information is accurate.
            </p>
          </Col>
        </Row>
        <div className="steps-action mt-5 w-full">
          <Row justify="space-between">
            <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2"></Col>
            <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
              <Btn
                disabled={loading}
                bgColor={loading ? "#008ba450" : "#008ba4"}
                color={"#fff"}
                value={
                  loading ? (
                    <>
                      <Spinner /> Loading...
                    </>
                  ) : (
                    "Confirmed"
                  )
                }
                type="submit"
              />
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
};

PatientDetails.propTypes = {
  next: PropTypes.func,
  data: PropTypes.any,
  type: PropTypes.any,
  setpatientDetails: PropTypes.func,
  testTypes: PropTypes.any,
  setTestTypes: PropTypes.func,
};
