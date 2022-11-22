import React, { useRef, useState, useEffect } from "react";
import BackIcon from "../../../assets/images/icons/back.svg";
import {
  TextInput,
  Btn,
  PhoneInput,
  PasswordInput,
  SelectInput,
  FileInput,
} from "../../../components";
import { Spinner } from "../../../components";
import SignatureInput from "../../../components/forms/signature-input";
import { useNavigate } from "react-router-dom";
import { Row, Col, message, Divider } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { authActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./scss/index.scss";
import { employeeAction } from "../../../store/actions";
import { managerAction } from "../../../store/actions";

const SignUp = () => {
  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [imageError, setImageError] = useState(false);
  const signRef = useRef(null);
  const [signImageError, setSignImageError] = useState(null);
  const url = global.location.href;
  const managerpanel_boolean = new URL(url).searchParams?.get("managerpanel");
  const formdata = new FormData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  let [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(managerAction.getManagersMidLocations());
    dispatch(employeeAction.getEmployeeType());
  }, [dispatch]);
  let managersMidLocations = useSelector(
    (state) => state.manager?.managersMidAndLocation
  );
  let allEmployees = useSelector((state) => state.employees?.employeesList);

  const clear = () => {
    signRef.current.clear();
  };
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
  function onSubmitFunction(values) {
    setLoad(true);
    if (managerpanel_boolean) {
      if (image !== null) {
        if (!signRef.current.isEmpty()) {
          formdata.append("full_name", values.fullname);
          formdata.append("email", values.email);
          formdata.append("mid", values.mid);
          formdata.append("telephone", values.telephone);
          formdata.append("password", values.password);
          formdata.append("lab_name", values.labName);

          formdata.append("lab_address", values.labAddress);
          formdata.append("type", "Manager");
          formdata.append("manager_logo", image);
          formdata.append(
            "manager_signature",
            signRef.current.getTrimmedCanvas().toDataURL("image/png")
          );
          dispatch(
            authActions.signup(formdata, navigate, setDisabled, setLoad)
          );
        } else {
          setSignImageError("Signature here.");
        }
      } else {
        setImageError(true);
        return false;
      }
    } else {
      formdata.append("first_name", values.fname);
      formdata.append("last_name", values.lname);
      formdata.append(
        "date_of_birth",
        `${values.year}-${values.month}-${values.day}`
      );
      formdata.append("telephone", values.telephone);
      formdata.append("address", values.address);
      formdata.append("city", values.city);
      formdata.append("state", values.state);
      formdata.append("zip_code", values.zipCode);
      formdata.append("email", values.email);
      formdata.append("type", values.type);
      formdata.append("mid", values.mid);
      formdata.append("employee_location", values.location);
      formdata.append("password", values.password);
      dispatch(authActions.signup(formdata, navigate, setDisabled, setLoad));
    }
  }
  const managerValidationSchema = yup.object({
    fullname: yup
      .string("* Enter your Full name")
      .max(50, "* Full Name can be at most 50 characters long")
      .required("* Full Name is required"),
    email: yup
      .string("* Enter your email")
      .max(40, "* Email can be at most 40 characters long")
      .email("* Enter a valid email")
      .trim("* There should not be a single space")
      .required("* Email is required"),
    mid: yup
      .string("* Enter your Manager Id")
      .matches(/^\d+$/, "Manager Id should only contain numbers")
      .min(3, "* Manager Id should be 3 characters long.")
      .max(3, "* Manager Id can not be more than 3 characters")
      .trim("* There should not be a single space")
      .required("* Manager Id is required"),
    telephone: yup
      .string("* Enter your Telephone")
      .min(17, "* Telephone number must be contain 17 characters")
      .max(17, "* Telephone number must be contain 17 characters")
      .required("* Telephone number is required"),
    password: yup
      .string("* Enter your password")
      .min(6, "* Password should be 6 characters long")
      .max(30, "* Password can not be more then 30 characters")
      .trim("* There should not be a single space")
      .required("* Password is required"),
    confirmPassword: yup
      .string("* Enter your confirm password")
      .oneOf([yup.ref("password"), null], "* Passwords must match")
      .required("* Password is required"),
    labName: yup
      .string("* Enter Lab name")
      .max(50, "* Lab name can be at most 50 characters long")
      .required("* Lab name is required"),
    labAddress: yup
      .string("* Enter Lab Address")
      .max(50, "* Lab Address can be at most 50 characters long")
      .required("* Lab Address is required"),
  });
  const employeeValidationSchema = yup.object({
    fname: yup
      .string("* Enter your First name")
      .max(50, "* First Name can be at most 50 characters long")
      .required("* First Name is required"),
    lname: yup
      .string("* Enter your last name")
      .max(50, "* Last Name can be at most 50 characters long")
      .required("* Last Name is required"),
    month: yup
      .string("* Enter your birth month")
      .required("* Birth month is required"),
    day: yup
      .string("* Enter your birth day")
      .required("* Birth day is required"),
    year: yup
      .number()
      .test(
        "len",
        "* Must be exactly 4 characters",
        (val) => val && val.toString().length === 4
      )
      .max(new Date().getFullYear())
      .required("* Birth year is required"),
    telephone: yup
      .string("* Enter your Manager Id")
      .min(17, "* telephone number must be contain 17 characters")
      .max(17, "* telephone number must be contain 17 characters")
      .required("* telephone number is required"),
    address: yup
      .string("* Enter Address")
      .max(50, "* Address can be at most 50 characters long")
      .required("* Address is required"),
    city: yup.string("* Enter your City").required("* City is required"),
    state: yup.string("* Enter your State").required("* State is required"),
    zipCode: yup
      .string("* Enter Postal Code")
      .required("* Postal code is required"),
    email: yup
      .string("* Enter your email")
      .max(40, "* Email can be at most 40 characters long")
      .email("* Enter a valid email")
      .trim("* There should not be a single space")
      .required("* Email is required"),
    type: yup.string("* Enter Job type").required("* Job type is required"),
    mid: yup
      .string()
      .matches(/^\d+$/, "Manager Id should only contain numbers")
      .min(3, "* Manager Id should be 3 characters long.")
      .max(3, "* Manager Id can not be more than 3 characters")
      .required("* Manager Id is required"),
    location: yup.string().required("* Location is required"),
    password: yup
      .string("* Enter your password")
      .min(6, "* Password should be 6 characters long")
      .max(30, "* Password can not be more then 30 characters")
      .trim("* There should not be a single space")
      .required("* Password is required"),
    confirmPassword: yup
      .string("* Enter confirm password")
      .oneOf([yup.ref("password"), null], "* Passwords must match")
      .required("* Password is required"),
  });
  const formik = useFormik({
    validationSchema: managerpanel_boolean
      ? managerValidationSchema
      : employeeValidationSchema,
    initialValues: managerpanel_boolean
      ? {
          fullname: "",
          email: "",
          mid: "",
          telephone: "",
          password: "",
          confirmPassword: "",
          labName: "",
          labAddress: "",
        }
      : {
          fname: "",
          lname: "",
          month: "",
          day: "",
          year: "",
          telephone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          email: "",
          type: "",
          mid: "",
          location: "",
          password: "",
          confirmPassword: "",
        },
    onSubmit: onSubmitFunction,
  });

  useEffect(() => {
    dispatch(managerAction.locations(formik.values.mid));
  }, [formik.values.mid, dispatch]);

  let Locations = useSelector((state) => state.manager?.locations);

  return (
    <div className="container mx-auto">
      <Row id="parent_container_signup">
        <Col className="xs:p-4" xs={24}>
          {managerpanel_boolean ? (
            <>
              <Row className="flex justify-center items-center">
                <Col sm={24} xs={24} md={22} xxl={6}>
                  <form
                    className="xs:px-2 py-6 sm:px-9"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row className="text-center">
                      <Col xs={24}>
                        <h1>Manager Signup</h1>
                        <p>
                          Please fill out your Information in order to get
                          started with health titan Pro.
                        </p>
                      </Col>
                    </Row>
                    <Divider />
                    <Row
                      gutter={[20, 20]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col sm={12} xs={24}>
                        <h3>Personal Details</h3>
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="full_name" className="signup-label">
                          Full Name
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <TextInput
                          type="text"
                          name="fullname"
                          id="full_name"
                          value={formik.values.fullname}
                          onChange={formik.handleChange}
                          placeholder="Write your full name here"
                        />
                        {submit && formik.errors.fullname && (
                          <span className="error">
                            {formik.errors.fullname}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="telephone" className="signup-label">
                          Phone Number
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <PhoneInput
                          type={["number"]}
                          placeholder={["+1 (702) 123-4567"]}
                          name="telephone"
                          value={formik.values.telephone}
                          onChange={(e) => {
                            formik.setFieldValue("telephone", e.formattedValue);
                          }}
                        />
                        {submit && formik.errors.telephone && (
                          <span className="error">
                            {formik.errors.telephone}
                          </span>
                        )}
                      </Col>
                    </Row>

                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="lab_name" className="signup-label">
                          Lab Name
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <TextInput
                          type="text"
                          id={"lab_name"}
                          name="labName"
                          value={formik.values.labName}
                          onChange={formik.handleChange}
                          placeholder="Lab Name"
                        />
                        {submit && formik.errors.labName && (
                          <span className="error">{formik.errors.labName}</span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="lab_address" className="signup-label">
                          Lab Address
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <TextInput
                          type="text"
                          id={"lab_address"}
                          name="labAddress"
                          value={formik.values.labAddress}
                          onChange={formik.handleChange}
                          placeholder="Lab Address"
                        />
                        {submit && formik.errors.labAddress && (
                          <span className="error">
                            {formik.errors.labAddress}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row gutter={[20, 5]} className="input_row mt-5">
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="signature" className="signup-label">
                          Signature
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <SignatureInput
                          id="signature"
                          placeholder="Draw your signature here"
                          ref={signRef}
                        />
                        <button
                          type="button"
                          onClick={clear}
                          className="absolute right-4 bottom-1 w-12 h-8 clear-btn"
                        >
                          Clear
                        </button>
                        {submit && signImageError && (
                          <span className="error">{signImageError}</span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={8} sm={4} className="flex items-center">
                        <label htmlFor="logo" className="signup-label">
                          Logo
                        </label>
                      </Col>
                      <Col sm={20} xs={16}>
                        <FileInput {...fileInputProps} />
                        {submit && imageError && (
                          <span className="error">Please Select Logo</span>
                        )}
                      </Col>
                    </Row>
                    <Row gutter={[20, 20]} className="input_row mt-5">
                      <Col sm={12} xs={24}>
                        <h3>For Login</h3>
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="email" className="signup-label">
                          Email Address
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <TextInput
                          type="text"
                          name="email"
                          id={"email"}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          placeholder="Email"
                        />
                        {submit && formik.errors.email && (
                          <span className="error">{formik.errors.email}</span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="mid" className="signup-label">
                          Manager Id
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <TextInput
                          type="text"
                          name="mid"
                          id="mid"
                          value={formik.values.mid}
                          onChange={formik.handleChange}
                          placeholder="Manager ID"
                        />
                        {submit && formik.errors.mid && (
                          <span className="error">{formik.errors.mid}</span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label htmlFor="password" className="signup-label">
                          Password
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <PasswordInput
                          placeholder={["Password"]}
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.password && (
                          <span className="error">
                            {formik.errors.password}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 5]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24} sm={4} className="flex items-center">
                        <label
                          htmlFor="confirm_password"
                          className="signup-label"
                        >
                          Confirm Password
                        </label>
                      </Col>
                      <Col sm={20} xs={24}>
                        <PasswordInput
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          placeholder={["Confirm Password"]}
                        />
                        {submit && formik.errors.confirmPassword && (
                          <span className="error">
                            {formik.errors.confirmPassword}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row gutter={[20, 20]} className="mt-5">
                      <Col md={4} sm={8} xs={24}>
                        <Btn
                          value={
                            load ? (
                              <span>
                                <Spinner className="btn-spinner mr-2" />{" "}
                                Loading...
                              </span>
                            ) : (
                              "Sign Up"
                            )
                          }
                          ty
                          bgColor={disabled ? "#008ba480" : "#008ba4"}
                          color="#fff"
                          type="submit"
                          onClick={() => setSubmit(true)}
                          disabled={disabled}
                        />
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row className="mt-5 mb-5" justify="center">
                <Col sm={24} xs={24} md={22} xxl={6}>
                  <form
                    className="xs:px-2 py-6 sm:px-9"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row className="text-center">
                      <Col xs={2}>
                        <Btn onClick={() => navigate(-1)} icon={BackIcon} />
                      </Col>
                      <Col xs={20}>
                        <h3>Employee Signup</h3>
                        <p className="m-0 p-0">
                          Please fill out your Information in order to get
                          started with health titan Pro.
                        </p>
                      </Col>
                    </Row>
                    <Divider />
                    <Row className="heading_row">
                      <Col xs={24}>
                        <h3>PERSONAL INFO</h3>
                      </Col>
                    </Row>

                    <Row
                      gutter={[30, 20]}
                      className="input_row"
                      justify="space-between"
                    >
                      <Col sm={12} xs={24}>
                        <TextInput
                          type="text"
                          name="fname"
                          placeholder="First Name"
                          value={formik.values.fname}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.fname && (
                          <span className="error">{formik.errors.fname}</span>
                        )}
                      </Col>
                      <Col sm={12} xs={24}>
                        <TextInput
                          type="text"
                          name="lname"
                          placeholder="Last Name"
                          value={formik.values.lname}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.lname && (
                          <span className="error">{formik.errors.lname}</span>
                        )}
                      </Col>
                    </Row>
                    <Row className="dob_row mt-5">
                      <Col xs={24}>
                        <h3>Date Of Birth</h3>
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 20]}
                      className="input_row"
                      justify="space-between"
                    >
                      <Col sm={12} xs={24}>
                        <SelectInput
                          placeholder="MM"
                          value={[
                            "01",
                            "02",
                            "03",
                            "04",
                            "05",
                            "06",
                            "07",
                            "08",
                            "09",
                            "10",
                            "11",
                            "12",
                          ]}
                          setData={(e) => formik.setFieldValue("month", e)}
                        />
                        {submit && formik.errors.month && (
                          <span className="error">{formik.errors.month}</span>
                        )}
                      </Col>
                      <Col sm={12} xs={24}>
                        <SelectInput
                          placeholder="DD"
                          value={[
                            "01",
                            "02",
                            "03",
                            "04",
                            "05",
                            "06",
                            "07",
                            "08",
                            "09",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "19",
                            "20",
                            "21",
                            "22",
                            "23",
                            "24",
                            "25",
                            "26",
                            "27",
                            "28",
                            "29",
                            "30",
                            "31",
                          ]}
                          setData={(e) => formik.setFieldValue("day", e)}
                        />
                        {submit && formik.errors.day && (
                          <span className="error">{formik.errors.day}</span>
                        )}
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 20]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col xs={24}>
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

                    <Row className="heading_row mt-5">
                      <Col xs={24}>
                        <h3>CONTACT INFO</h3>
                      </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="input_row">
                      <Col xs={24}>
                        <PhoneInput
                          type="number"
                          placeholder="+1 (702) 123-4567"
                          name="telephone"
                          value={formik.values.telephone}
                          onChange={(e) => {
                            formik.setFieldValue("telephone", e.formattedValue);
                          }}
                        />
                        {submit && formik.errors.telephone && (
                          <span className="error">
                            {formik.errors.telephone}
                          </span>
                        )}
                      </Col>
                    </Row>

                    <Row
                      gutter={[20, 20]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col sm={12} xs={24}>
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
                      <Col sm={12} xs={24}>
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
                      </Col>
                    </Row>
                    <Row
                      gutter={[20, 20]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col sm={12} xs={24}>
                        <TextInput
                          type="text"
                          placeholder="State/province"
                          name="state"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.state && (
                          <span className="error">{formik.errors.state}</span>
                        )}
                      </Col>
                      <Col sm={12} xs={24}>
                        <TextInput
                          type="text"
                          placeholder="Postal Code"
                          name="zipCode"
                          value={formik.values.zipCode}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.zipCode && (
                          <span className="error">{formik.errors.zipCode}</span>
                        )}
                      </Col>
                    </Row>
                    <Row className="heading_row mt-5">
                      <Col xs={24}>
                        <h3>FOR LOGIN</h3>
                      </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="input_row">
                      <Col sm={12} xs={24}>
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
                      <Col sm={12} xs={24}>
                        <SelectInput
                          placeholder="Job Type"
                          value={allEmployees.map((val) => val.type)}
                          setData={(e) => formik.setFieldValue("type", e)}
                        />
                        {submit && formik.errors.type && (
                          <span className="error">{formik.errors.type}</span>
                        )}
                      </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="input_row mt-5">
                      <Col sm={12} xs={24}>
                        <SelectInput
                          placeholder="Manager Id"
                          value={managersMidLocations.map((val) => val.mid)}
                          setData={(e) => formik.setFieldValue("mid", e)}
                        />
                        {submit && formik.errors.mid && (
                          <span className="error">{formik.errors.mid}</span>
                        )}
                      </Col>
                      <Col sm={12} xs={24}>
                        <SelectInput
                          placeholder="Job Location"
                          value={Locations?.map((val) => val.location_name)}
                          setData={(e) =>
                            Locations.map((val) =>
                              val.location_name === e
                                ? formik.setFieldValue("location", val._id)
                                : null
                            )
                          }
                        />
                        {/* formik.setFieldValue("location", e) */}
                        {submit && formik.errors.location && (
                          <span className="error">
                            {formik.errors.location}
                          </span>
                        )}
                      </Col>
                    </Row>

                    <Row
                      gutter={[20, 20]}
                      className="input_row mt-5"
                      justify="space-between"
                    >
                      <Col sm={12} xs={24}>
                        <PasswordInput
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.password && (
                          <span className="error">
                            {formik.errors.password}
                          </span>
                        )}
                      </Col>
                      <Col sm={12} xs={24}>
                        <PasswordInput
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                        />
                        {submit && formik.errors.confirmPassword && (
                          <span className="error">
                            {formik.errors.confirmPassword}
                          </span>
                        )}
                      </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="mt-5 ml-2">
                      <Col md={4} sm={8} xs={24}>
                        <Btn
                          value="Sign Up"
                          bgColor={disabled ? "#008ba480" : "#008ba4"}
                          color="#fff"
                          disabled={disabled}
                          onClick={() => setSubmit(true)}
                          type="submit"
                        />
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export { SignUp };
