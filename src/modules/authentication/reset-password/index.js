import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/actions";
import { Row, Col, Divider } from "antd";
import { PasswordInput, Spinner, Btn } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import "./scss/index.scss";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.data || {};
  const [loading, setLoading] = useState(false);
  const onSubmitFunction = (values) => {
    let obj = {
      ...data,
      password: values.password,
      confirm_password: values.confirmPassword,
    };
    dispatch(authActions.resetPassword(obj, navigate, setLoading));
  };
  const validationSchema = yup.object({
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
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: onSubmitFunction,
  });

  return (
    <Row id="parent_container_forget_password" align="middle" justify="center">
      <Col className="pb-8 xs:p-1 " xs={24}>
        <Row justify="center">
          <Col
            className="centralize_card xs:px-3 py-6 sm:px-9"
            sm={24}
            xs={24}
            md={21}
            xl={11}
            xxl={6}
          >
            <Row>
              <Col xs={24}>
                <div>
                  <h1 className="text-center p-3">Reset Password</h1>
                </div>
              </Col>
            </Row>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              <Row justify="center">
                <Col xs={22}>
                  <label className="reset-label">
                    New Password
                    <PasswordInput
                      placeholder={["New Password"]}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik.errors.password && (
                    <span className="error">{formik.errors.password}</span>
                  )}
                </Col>
              </Row>
              <Row className="mt-5" justify="center">
                <Col xs={22}>
                  <label className="reset-label">
                    Confirm Password
                    <PasswordInput
                      placeholder={["Password"]}
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik.errors.confirmPassword && (
                    <span className="error">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
                </Col>
              </Row>
              <Row className="mt-5" justify="center">
                <Col xs={22}>
                  <Btn
                    disabled={loading}
                    value={
                      loading ? (
                        <>
                          <Spinner /> Loading
                        </>
                      ) : (
                        "Reset Password"
                      )
                    }
                    bgColor={loading ? "#008ba480" : "#008ba4"}
                    color="#fff"
                    type={"submit"}
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { ResetPassword };
