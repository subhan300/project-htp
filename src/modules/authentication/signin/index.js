import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { TextInput, Btn, PasswordInput, Spinner } from "../../../components";
import BackIcon from "../../../assets/images/icons/back.svg";
import { Row, Col } from "antd";
import { useFormik } from "formik";
import { authActions } from "../../../store/actions";
import "./scss/index.scss";
import * as yup from "yup";
import { employeeAction } from "../../../store/actions";

const SignIn = () => {
  const dispatch = useDispatch();
  let [load, setLoad] = useState(false);
  let [submit, setSubmit] = useState(false);

  const url = global.location.href;
  const medicalProfessionalBoolean = new URL(url).searchParams?.get(
    "medical-professional"
  );
  const labTechnicianBoolean = new URL(url).searchParams?.get("lab-technician");
  const adminBoolean = new URL(url).searchParams?.get("admin");
  const vendorBoolean = new URL(url).searchParams?.get("vendor");
  const managerBoolean = new URL(url).searchParams?.get("manager");
  const signInType = adminBoolean
    ? "Asins"
    : managerBoolean
    ? "Manager"
    : medicalProfessionalBoolean
    ? "Medical Profession"
    : labTechnicianBoolean
    ? "Lab Technician"
    : vendorBoolean
    ? "Vendor"
    : "";

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .max(40, "Email can be at most 40 characters long")
      .email("Enter a valid email")
      .trim("There should not be a single space")
      .required("Email is required"),

    password: yup
      .string("Enter your password")
      .min(6, "Password should be 6 characters long")
      .max(30, "Password can not be more then 17 characters")
      .trim("There should not be a single space")
      .required("Password is required"),
  });
  function onSubmitFunction(values) {
    setLoad(true);
    const login_details = {
      email: values.email,
      password: values.password,
    };
    dispatch(authActions.login(login_details, setLoad, signInType, navigate));
  }

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmitFunction,
  });
  useEffect(() => {
    dispatch(employeeAction.getEmployeeType());
  }, [dispatch]);
  const navigate = useNavigate();
  return (
    <div className="parent_container_signin ">
      <Row className="w-full xs:p-4 ">
        <Col xs={24}>
          <Row justify="center">
            <Col sm={24} xs={24} md={21} xl={11} xxl={4}>
              <div className="signin-card">
                <Row>
                  <Col xs={2}>
                    <div className="flex align-middle h-full">
                      <Btn
                        onClick={() => navigate("/")}
                        icon={BackIcon}
                        color="#383f51"
                      />
                    </div>
                  </Col>
                  <Col xs={20}>
                    <div className="flex align-middle h-full w-full justify-center">
                      <h1 className="text-center mb-0">
                        Sign in for{" "}
                        {adminBoolean
                          ? "Admin"
                          : managerBoolean
                          ? "Manager"
                          : medicalProfessionalBoolean
                          ? "Medical Professional"
                          : labTechnicianBoolean
                          ? "Lab Technician"
                          : vendorBoolean
                          ? "Vendor"
                          : ""}
                      </h1>
                    </div>
                  </Col>
                </Row>
                <form onSubmit={formik.handleSubmit}>
                  <Row className="mt-5">
                    <Col xs={22}>
                      <TextInput
                        type="email"
                        placeholder="Email/Username"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {submit && (
                        <span className="error">{formik.errors.email}</span>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <Col xs={22}>
                      <PasswordInput
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {submit && (
                        <span className="error">{formik.errors.password}</span>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={22}>
                      <Btn
                        value={
                          load ? (
                            <span>
                              <Spinner className="btn-spinner mr-2" />{" "}
                              Loading...
                            </span>
                          ) : (
                            "Login"
                          )
                        }
                        type="submit"
                        bgColor={load ? "#008ba480" : "#008ba4"}
                        disabled={load}
                        color="#fff"
                        onClick={() => setSubmit(true)}
                      />
                    </Col>
                  </Row>
                </form>
                <Row className="mt-5">
                  <Col xs={24}>
                    <Link
                      to="/forget-password"
                      className="underline link_color"
                    >
                      Forget Password?
                    </Link>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs={24}>
                    <span className="textColor">Not registered yet?</span>{" "}
                    <Link to="/signup" className="underline link_color">
                      Create an Account
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { SignIn };
