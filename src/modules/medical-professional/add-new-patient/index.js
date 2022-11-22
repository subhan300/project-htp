import React, { useEffect, useState, useRef } from "react";
import { backIcon, eraserIcon, logoHIPPA } from "./../../../assets/images";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Divider, message } from "antd";
import SignatureInput from "../../../components/forms/signature-input";
import {
  TextInput,
  Btn,
  PhoneInput,
  TextAreaInput,
  SelectInput,
  Spinner,
  CheckboxInput,
  FileInput,
  RadioComponent,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { patientAction } from "../../../store/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import "./scss/index.scss";
import AutoCompleteLocation from "../../../components/auto-complete-location/auto-complete-location";

export const AddNewPatient = () => {
  // const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [image, setImage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [paymentValue, setPaymentValue] = useState(null);
  const [insuranceType, setInsuranceType] = useState(null);
  const [genderValue, setGenderValue] = useState(null);
  const [usIdValue, setUsIdValue] = useState(null);
  const [signImageError, setSignImageError] = useState(null);
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  let patientForm = useSelector((state) => state.patients?.requiredFields);
  const requiredFieldsArray = patientForm.patient_required_fields;
  const location = useLocation();
  const testData = location?.state;
  const signRef = useRef(null);
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const date = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const insurances = ["Medicaid", "Medicare", "Other"];

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
  let formdata;
  useEffect(() => {
    dispatch(patientAction.getPatientForm());
  }, [dispatch]);
  let names = [];
  let requiredFields = {};
  requiredFieldsArray?.forEach((element) => {
    names.push(element.field);
    requiredFields[element.field] = element.required;
  });
  const dynamicFormdata = (values) => {
    formdata.append("test_type[name]", testData.test);
    formdata.append("test_type[type]", testData.testType);
    formdata.append(
      "patient_signature",
      signRef.current.getTrimmedCanvas().toDataURL("image/png")
    );
    for (var requireKey in requiredFields) {
      if (requireKey == "us_id") {
        formdata.append("us_id", values.us_id);
        if (values.us_id == "Yes") {
          formdata.append("us_id_no", values.us_id_no);
        } else {
          formdata.append("ssn", values.ssn);
        }
      } else if (requireKey === "date_of_birth") {
        formdata.append(
          "date_of_birth",
          `${values.year}-${values.month}-${values.day}`
        );
      } else if (requireKey === "gender") {
        formdata.append("gender", values.gender);
        if (genderValue == "Female") {
          formdata.append("pregnant", values.pregnant);
        }
      } else {
        formdata.append(requireKey, values[requireKey]);
      }
    }
  };
  const onSubmitFunction = (values) => {
    formdata = new FormData();
    if (!signRef.current.isEmpty()) {
      setSignImageError(false);
      if (values.payment === "Employment") {
        formdata.append("employment", values.employement);
        dynamicFormdata(values);
        dispatch(patientAction.createPatient(formdata, setLoad, navigate));
      } else if (values.payment === "Insurance") {
        if (image !== null) {
          formdata.append("insurance_name", values.insurance_name);
          formdata.append(
            "insurance_policy_number",
            values.insurance_policy_number
          );
          formdata.append("insurance_image", image);
          dynamicFormdata(values);
          dispatch(patientAction.createPatient(formdata, setLoad, navigate));
        } else {
          setImageError("Please upload insurance image");
        }
      } else {
        dynamicFormdata(values);
        dispatch(patientAction.createPatient(formdata, setLoad, navigate));
      }
    } else {
      setSignImageError("Signature here.");
    }
  };
  let formik = useFormik({
    initialValues: {},
    validationSchema: yup.object({
      first_name: names.includes("first_name")
        ? requiredFields?.first_name === "true"
          ? yup
              .string("* Enter your First name")
              .max(50, "* First Name can be at most 50 characters long")
              .required("* First Name is required")
          : yup
              .string("* Enter your First name")
              .max(50, "* First Name can be at most 50 characters long")
        : null,
      last_name: names.includes("last_name")
        ? requiredFields?.last_name === "true"
          ? yup
              .string("* Enter your last name")
              .max(50, "* Last Name can be at most 50 characters long")
              .required("* Last Name is required")
          : yup
              .string("* Enter your last name")
              .max(50, "* Last Name can be at most 50 characters long")
        : null,
      month: names.includes("date_of_birth")
        ? requiredFields.date_of_birth === "true"
          ? yup
              .string("* Enter your birth month")
              .required("* Birth month is required")
          : yup.string("* Enter your birth month")
        : null,
      day: names.includes("date_of_birth")
        ? requiredFields.date_of_birth === "true"
          ? yup
              .string("* Enter your birth day")
              .required("* Birth day is required")
          : yup.string("* Enter your birth day")
        : null,
      year: names.includes("date_of_birth")
        ? requiredFields.date_of_birth === "true"
          ? yup
              .number()
              .test(
                "len",
                "* Must be exactly 4 characters",
                (val) => val && val.toString().length === 4
              )
              .max(new Date().getFullYear())
              .required("* Birth year is required")
          : yup.number().max(new Date().getFullYear())
        : null,
      gender: names.includes("gender")
        ? requiredFields?.gender === "true"
          ? yup.string("Please Select Gender").required("* Gender is required")
          : yup.string("Please Select Gender")
        : null,
      pregnant:
        names.includes("gender") && genderValue === "Female"
          ? yup
              .string("Please select pregnancy status")
              .required("* Pregnancy status is required")
          : null,
      sex_assign_at_birth: names.includes("sex_assign_at_birth")
        ? requiredFields?.sex_assign_at_birth === "true"
          ? yup
              .string("Please select assigned sex at birth")
              .required("* Sex at birth is required")
          : yup.string("Please select assigned sex at birth")
        : null,
      race: names.includes("race")
        ? requiredFields?.race === "true"
          ? yup.string("Please select your race").required("* Race is required")
          : yup.string("Please select your race")
        : null,
      language: names.includes("language")
        ? requiredFields.language === "true"
          ? yup
              .string("Please select primary language")
              .required("* Primary language is required")
          : yup.string("Please select primary language")
        : null,
      ethnicity: names.includes("ethnicity")
        ? requiredFields?.ethnicity === "true"
          ? yup
              .string("Please select ethnicity")
              .required("* Ethnicity is required")
          : yup.string("Please select ethnicity")
        : null,
      marital_status: names.includes("marital_status")
        ? requiredFields?.marital_status === "true"
          ? yup
              .string("Please select marital status")
              .required("* Marital status is required")
          : yup.string("Please select marital status")
        : null,
      email: names.includes("email")
        ? requiredFields?.email === "true"
          ? yup
              .string("* Enter your email")
              .max(40, "* Email can be at most 40 characters long")
              .email("* Enter a valid email")
              .trim("* There should not be a single space")
              .required("* Email is required")
          : yup
              .string("* Enter your email")
              .max(40, "* Email can be at most 40 characters long")
              .email("* Enter a valid email")
              .trim("* There should not be a single space")
        : null,
      telephone: names.includes("telephone")
        ? requiredFields?.telephone === "true"
          ? yup
              .string("* Enter your telephone number")
              .test(
                "len",
                "* Must be exactly 12 characters",
                (val) => val && val.toString().length === 17
              )
              .required("* Telephone number is required")
          : yup
              .string("* Enter your telephone number")
              .test(
                "len",
                "* Must be exactly 12 characters",
                (val) => val && val.toString().length === 17
              )
        : null,
      address: names.includes("address")
        ? requiredFields.address === "true"
          ? yup
              .string("* Enter Address")
              .max(50, "* Address can be at most 50 characters long")
              .required("* Address is required")
          : yup
              .string("* Enter Address")
              .max(50, "* Address can be at most 50 characters long")
        : null,
      state: names.includes("state")
        ? requiredFields?.state === "true"
          ? yup.string("* Enter your State").required("* State is required")
          : yup.string("* Enter your State")
        : null,
      city: names.includes("city")
        ? requiredFields?.city === "true"
          ? yup.string("* Enter your City").required("* City is required")
          : yup.string("* Enter your City")
        : null,
      postal_code: names.includes("postal_code")
        ? requiredFields?.postal_code === "true"
          ? yup
              .string("* Enter Postal Code")
              .required("* Postal code is required")
          : yup.string("* Enter Postal Code")
        : null,
      payment: names.includes("payment")
        ? requiredFields.payment === "true"
          ? yup
              .string("Please select payment method")
              .required("* Payment option is required")
          : yup.string("Please select payment method")
        : null,
      employement:
        paymentValue === "Employment"
          ? yup
              .string("Please enter Production / Employment")
              .required("* Production / Employment is required")
          : null,
      insurance_name:
        paymentValue === "Insurance" && insuranceType === "Other"
          ? yup
              .string("Please select insurance name")
              .required("* Insurance name is required")
          : null,
      insurance_policy_number:
        paymentValue === "Insurance"
          ? yup
              .string("Please select insurance policy")
              .required("* Insurance Policy number is required")
          : null,
      us_id: names.includes("us_id")
        ? requiredFields.us_id === "true"
          ? yup.string("Please enter US ID").required("* US ID is required")
          : yup.string("Please enter US ID")
        : null,
      us_id_no:
        names.includes("us_id") && usIdValue === "Yes"
          ? yup
              .string("Please enter US ID Number")
              .required("* US ID number is required")
          : null,
      ssn:
        names.includes("us_id") && usIdValue === "No"
          ? yup
              .string("Please enter ssn number")
              .required("* SSN number is required")
          : null,
      correctInformation: yup
        .boolean()
        .required("Please tick!")
        .oneOf([true], "Please tick!"),
    }),
    onSubmit: onSubmitFunction,
  });

  const consentForm =
    patientForm?.consent?.slice(0, 2) +
    ` ${formik?.values?.first_name || ""} ${formik?.values?.last_name || ""}` +
    patientForm?.consent?.slice(10, patientForm?.content?.length);
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
        setImage(file);
        setImageError(false);
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
  const selectedOption = (checked, value, type) => {
    if (checked) {
      if (type === "payment") {
        formik.setFieldValue("payment", value);
        setPaymentValue(value);
      } else {
        formik.setFieldValue("us_id", value);
        setUsIdValue(value);
      }
    }
  };

  const clear = () => {
    signRef.current.clear();
  };

  return (
    <Row id="parent_container_add_new_patient" align="middle" justify="center">
      <Col className="xs:p-4" xs={24}>
        <Row className="mt-5" justify="center">
          <Col
            sm={24}
            xs={24}
            md={22}
            xxl={6}
            className="form-card xs:px-2 py-6 sm:px-9"
          >
            <Row>
              <Col xs={2}>
                <Btn
                  onClick={() => navigate(-1)}
                  icon={backIcon}
                  // btnType="backBtn"
                />
              </Col>
              <Col xs={20} className="text-center">
                <h3>Add New Patient</h3>
              </Col>
            </Row>
            <Divider className="m-0 mb-2" />
            <form onSubmit={formik.handleSubmit}>
              <Row className="heading_row mb-3">
                <Col xs={24}>
                  <h3>PERSONAL INFO</h3>
                </Col>
              </Row>
              {names.includes("first_name") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="first_name" className="form-label">
                      First Name:
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <TextInput
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.first_name && (
                      <span className="error">{formik.errors.first_name}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("last_name") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="last_name" className="form-label">
                      Last Name:
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.last_name && (
                      <span className="error">{formik.errors.last_name}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("date_of_birth") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="date_of_birth" className="form-label">
                      Date Of Birth:
                    </label>
                  </Col>
                  <Col sm={6} xs={12}>
                    <SelectInput
                      placeholder="MM"
                      value={month}
                      setData={(e) => formik.setFieldValue("month", e)}
                    />
                    {submit && formik.errors.month && (
                      <span className="error">{formik.errors.month}</span>
                    )}
                  </Col>
                  <Col sm={6} xs={12}>
                    <SelectInput
                      placeholder="DD"
                      value={date}
                      setData={(e) => formik.setFieldValue("day", e)}
                    />
                    {submit && formik.errors.day && (
                      <span className="error">{formik.errors.day}</span>
                    )}
                  </Col>
                  <Col sm={8} xs={24}>
                    <TextInput
                      type="number"
                      placeholder="Year"
                      name="year"
                      value={formik.values.year}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.year && (
                      <span className="error">{formik.errors.year}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("gender") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      placeholder="Gender"
                      value={gender}
                      setData={(e) => {
                        formik.setFieldValue("gender", e);
                        setGenderValue(e);
                      }}
                    />
                    {submit && formik.errors.gender && (
                      <span className="error">{formik.errors.gender}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {formik.values?.gender === "Female" ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="pregnant" className="form-label">
                      Are You Pregnant?
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      placeholder="Are You Pregnant?"
                      value={pregnant}
                      setData={(e) => formik.setFieldValue("pregnant", e)}
                    />
                    {submit && formik.errors.pregnant && (
                      <span className="error">{formik.errors.pregnant}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("sex_assign_at_birth") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="sex_assign_at_birth" className="form-label">
                      Sex Assigned at Birth
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      placeholder="Sex Assigned at Birth"
                      value={sexAssignedAtBirth}
                      setData={(e) =>
                        formik.setFieldValue("sex_assign_at_birth", e)
                      }
                    />
                    {submit && formik.errors.sex_assign_at_birth && (
                      <span className="error">
                        {formik.errors.sex_assign_at_birth}
                      </span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("race") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="race" className="form-label">
                      Race
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      placeholder="Race"
                      value={race}
                      setData={(e) => formik.setFieldValue("race", e)}
                    />
                    {submit && formik.errors.race && (
                      <span className="error">{formik.errors.race}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("language") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="primary_language" className="form-label">
                      Primary Language
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      placeholder="Primary Language"
                      value={primaryLanguage}
                      setData={(e) => formik.setFieldValue("language", e)}
                    />
                    {submit && formik.errors.language && (
                      <span className="error">{formik.errors.language}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("ethnicity") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="ethnicity" className="form-label">
                      Ethnicity
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      value={ethnicity}
                      placeholder="Ethnicity"
                      setData={(e) => formik.setFieldValue("ethnicity", e)}
                    />
                    {submit && formik.errors.ethnicity && (
                      <span className="error">{formik.errors.ethnicity}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("marital_status") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="marital_status" className="form-label">
                      Marital Status
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <SelectInput
                      placeholder="Marital Status"
                      value={maritalStatus}
                      setData={(e) => formik.setFieldValue("marital_status", e)}
                    />
                    {submit && formik.errors.marital_status && (
                      <span className="error">
                        {formik.errors.marital_status}
                      </span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("email") || names.includes("telephone") ? (
                <Row className="heading_row mb-3">
                  <Col xs={24}>
                    <h3>CONTACT INFORMATION</h3>
                  </Col>
                </Row>
              ) : null}
              {names.includes("email") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <TextInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.email && (
                      <span className="error">{formik.errors.email}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("telephone") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <PhoneInput
                      type="number"
                      placeholder="+1 (702) 123-4567"
                      onChange={(e) =>
                        formik.setFieldValue("telephone", e.formattedValue)
                      }
                    />
                    {submit && formik.errors.telephone && (
                      <span className="error">{formik.errors.telephone}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {names.includes("address") ? (
                <>
                  <Row
                    gutter={[20, 5]}
                    className="input_row"
                    justify="space-between"
                  >
                    <Col xs={24} sm={4} className="flex items-center">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                    </Col>
                    <Col sm={24} xs={24}>
                      <TextInput
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      {submit && formik.errors.address && (
                        <span className="error">{formik.errors.address}</span>
                      )}
                    </Col>
                  </Row>
                </>
              ) : null}
              {names.includes("state") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center"></Col>
                  <Col sm={24} xs={24}>
                    <SelectInput
                      defaultValue="State/Province"
                      value={stateNames}
                      setData={(e) => formik.setFieldValue("state", e)}
                    />
                    {submit && formik.errors.state && (
                      <span className="error">{formik.errors.state}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {/* <Col sm={7} xs={24}>
                      <TextInput
                        type="text"
                        placeholder="City"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                      {submit && formik.errors.city && (
                        <span className="error">{formik.errors.city}</span>
                      )}
                    </Col> */}
              {names.includes("city") ? (
                <Col sm={24} xs={24}>
                  <AutoCompleteLocation
                    placeholder="City"
                    name="city"
                    address={address}
                    setData={(e) => {
                      return formik.setFieldValue(
                        "city",
                        e?.value?.description
                      );
                    }}
                    setAddress={setAddress}
                    addressObj={addressObj}
                    setAddressObj={setAddressObj}
                  />
                  {submit && formik.errors.city && (
                    <span className="error">{formik.errors.city}</span>
                  )}
                </Col>
              ) : null}
              {names.includes("postal_code") ? (
                <Col sm={24} xs={24} className="mt-5">
                  <TextInput
                    type="number"
                    placeholder="Postal Code"
                    name="postal_code"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                  />
                  {submit && formik.errors.postal_code && (
                    <span className="error">{formik.errors.postal_code}</span>
                  )}
                </Col>
              ) : null}
              {names.includes("payment") ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="payment" className="form-label">
                      Payment Options
                    </label>
                  </Col>
                  <Col xs={24} sm={20}>
                    <Row>
                      <Col sm={6} xs={24}>
                        <CheckboxInput
                          checkboxLabel={"Cash / Credit (Non U.S Residents)"}
                          value={
                            formik.values.payment ===
                            "Cash / Credit (Non U.S Residents)"
                          }
                          selectCard={(checked) =>
                            selectedOption(
                              checked,
                              "Cash / Credit (Non U.S Residents)",
                              "payment"
                            )
                          }
                        />
                      </Col>
                      <Col sm={6} xs={24}>
                        <CheckboxInput
                          checkboxLabel={"Production / Employment"}
                          value={formik.values.payment === "Employment"}
                          selectCard={(checked) =>
                            selectedOption(checked, "Employment", "payment")
                          }
                        />
                      </Col>
                      <Col sm={6} xs={24}>
                        <CheckboxInput
                          checkboxLabel={"HRSA / CARESACT"}
                          selectCard={(checked) =>
                            selectedOption(
                              checked,
                              "HRSA / CARESACT",
                              "payment"
                            )
                          }
                          value={formik.values.payment === "HRSA / CARESACT"}
                        />
                      </Col>
                      <Col sm={6} xs={24}>
                        <CheckboxInput
                          checkboxLabel={"Insurance"}
                          value={formik.values.payment === "Insurance"}
                          selectCard={(checked) =>
                            selectedOption(checked, "Insurance", "payment")
                          }
                        />
                      </Col>
                    </Row>
                    {submit && formik.errors.payment && (
                      <span className="error">{formik.errors.payment}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {formik.values.payment === "Employment" ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="employement" className="form-label">
                      Production / Employment
                    </label>
                  </Col>
                  <Col sm={20} xs={24} className="items-center">
                    <TextInput
                      placeholder="Production / Employement"
                      name="employement"
                      value={formik.values.employement}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.production && (
                      <span className="error">{formik.errors.production}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              {formik.values.payment === "Insurance" ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="insurance" className="form-label">
                      Insurance
                    </label>
                  </Col>
                  <Col sm={6} xs={24} className="flex flex-col items-center">
                    {formik.values.insurance === "Other" ? (
                      <>
                        <Row>
                          <TextInput
                            name="insurance_name"
                            value={formik.values.insurance_name}
                            onChange={formik.handleChange}
                          />
                        </Row>
                        <Row>
                          {submit && formik.errors.insurance_name && (
                            <span className="error">
                              {formik.errors.insurance_name}
                            </span>
                          )}
                        </Row>
                      </>
                    ) : (
                      <>
                        <Row>
                          <SelectInput
                            placeholder="Insurance"
                            value={insurances}
                            setData={(e) => {
                              formik.setFieldValue("insurance", e);
                              formik.setFieldValue("insurance_name", e);
                              setInsuranceType(e);
                            }}
                          />
                        </Row>
                        <Row>
                          {submit && formik.errors.insurance && (
                            <span className="error">
                              {formik.errors.insurance}
                            </span>
                          )}
                        </Row>
                      </>
                    )}
                  </Col>
                  <Col sm={8} xs={24} className="flex flex-col items-center">
                    <Row>
                      <TextInput
                        placeholder="Insurance Policy Number"
                        name="insurance_policy_number"
                        value={formik.values.insurance_policy_number}
                        onChange={formik.handleChange}
                      />
                    </Row>
                    <Row>
                      {submit && formik.errors.insurance_policy_number && (
                        <span className="error">
                          {formik.errors.insurance_policy_number}
                        </span>
                      )}
                    </Row>
                  </Col>
                  <Col sm={6} xs={24} className="flex flex-col items-center">
                    <Row>
                      <FileInput {...fileInputProps} />
                    </Row>
                    <Row>
                      {submit && imageError && (
                        <span className="error">{imageError}</span>
                      )}
                    </Row>
                  </Col>
                </Row>
              ) : null}
              {names.includes("us_id") ? (
                <Row gutter={[20, 5]} className="input_row" justify="start">
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="us_id" className="form-label">
                      US ID / Passport
                    </label>
                  </Col>
                  <Col xs={24} sm={20}>
                    <Row>
                      <Col sm={4} xs={24}>
                        <CheckboxInput
                          checkboxLabel={"Yes"}
                          value={formik.values.us_id === "Yes"}
                          selectCard={(checked) =>
                            selectedOption(checked, "Yes", "us_id")
                          }
                        />
                      </Col>
                      <Col sm={4} xs={24}>
                        <CheckboxInput
                          checkboxLabel={"No"}
                          value={formik.values.us_id === "No"}
                          selectCard={(checked) =>
                            selectedOption(checked, "No", "us_id")
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      {submit && formik.errors.us_id && (
                        <span className="error">{formik.errors.us_id}</span>
                      )}
                    </Row>
                  </Col>
                </Row>
              ) : null}
              {formik.values.us_id === "Yes" ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="us_id" className="form-label">
                      US ID / Passport
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <TextInput
                      name="us_id_no"
                      placeholder="Enter your US ID/DL number or Passport Number"
                      value={formik.values.us_id_no}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.us_id_no && (
                      <span className="error">{formik.errors.us_id_no}</span>
                    )}
                  </Col>
                </Row>
              ) : formik.values.us_id === "No" ? (
                <Row
                  gutter={[20, 5]}
                  className="input_row"
                  justify="space-between"
                >
                  <Col xs={24} sm={4} className="flex items-center">
                    <label htmlFor="us_id" className="form-label">
                      SSN
                    </label>
                  </Col>
                  <Col sm={20} xs={24}>
                    <TextInput
                      name="ssn"
                      placeholder="Enter your Social Security Number"
                      value={formik.values.ssn}
                      onChange={formik.handleChange}
                    />
                    {submit && formik.errors.ssn && (
                      <span className="error">{formik.errors.ssn}</span>
                    )}
                  </Col>
                </Row>
              ) : null}
              <Row className="heading_row mb-3">
                <Col xs={24}>
                  <h3>FOR CONFIRMATION</h3>
                </Col>
              </Row>
              <Row
                gutter={[20, 2]}
                className="input_row"
                // justify="space-between"
              >
                <Col xs={24} sm={4} className="flex items-center">
                  <label htmlFor="consent_form" className="form-label">
                    Consent Form
                  </label>
                </Col>
                <Col xs={24} sm={20}>
                  <Row xs={24} sm={24}>
                    <Col xs={24} sm={24}>
                      <TextAreaInput
                        rows={6}
                        placeholder="Consent Form"
                        value={consentForm}
                      />
                    </Col>
                  </Row>
                  <Row xs={24} sm={24}>
                    <Col xs={24} sm={24}>
                      <RadioComponent
                        radioText="I agree that all of the information above is accurate and correct."
                        checked={formik.values.correctInformation}
                        onClick={() =>
                          formik.setFieldValue("correctInformation", true)
                        }
                      />
                      {submit && formik.errors.correctInformation && (
                        <span className="error">
                          {formik.errors.correctInformation}
                        </span>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row
                gutter={[20, 5]}
                className="input_row"
                justify="space-between"
              >
                <Col xs={24} sm={4} className="flex items-center">
                  <label htmlFor="signature" className="form-label">
                    Signature
                  </label>
                </Col>
                <Col xs={24} sm={20}>
                  <Row>
                    <SignatureInput
                      id="signature"
                      placeholder="Draw your signature here"
                      ref={signRef}
                    />
                    <button
                      type="button"
                      onClick={clear}
                      className="absolute right-4 bottom-2 w-12 h-8"
                    >
                      <img
                        src={eraserIcon}
                        alt="eraser"
                        className="h-7 mx-auto"
                      />
                    </button>
                  </Row>

                  <Row>
                    {submit && signImageError && (
                      <span className="error">{signImageError}</span>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row className="mt-5 pl-2">
                <Col md={4} sm={8} xs={24}>
                  <Btn
                    value={
                      load ? (
                        <span className="flex">
                          <Spinner size="small" className="btn-spinner mr-2" />{" "}
                          Loading...
                        </span>
                      ) : (
                        "Create Now"
                      )
                    }
                    type={"submit"}
                    disabled={load}
                    bgColor={load ? "#008ba480" : "#008ba4"}
                    color="#fff"
                    onClick={() => setSubmit(true)}
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Row className="mt-5 justify-center items-center">
          <Col sm={20} xs={18} md={10} lg={8} xxl={2}>
            <img src={logoHIPPA} alt={"Hippa"} className="w-full" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
