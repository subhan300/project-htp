import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Btn, SelectInput } from "../../../forms";
import "../scss/index.scss";
import { useFormik, FormikProvider, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { testTypeAction } from "../../../../store/actions";

import * as yup from "yup";
const PersonalDataForm = (props) => {
  let [data, setData] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(testTypeAction.getRequiredFields());
  }, [dispatch]);
  let requiredFields = useSelector((state) => state.tests.requiredFields);

  let formatedRequiredFields = requiredFields.map((v) => {
    return v === "first_name"
      ? "First Name"
      : v === "last_name"
      ? "Last Name"
      : v === "date_of_birth"
      ? "Birth Date"
      : v === "sex_assign_at_birth"
      ? "Sex"
      : v === "marital_status"
      ? "Marital Status"
      : v === "postal_code"
      ? "Postal Code"
      : v === "insurance_name"
      ? "Insurance Name"
      : v === "insurance_policy_number"
      ? "Insurance Policy"
      : v === "insurance_image"
      ? "Insurance Image"
      : v === "us_id"
      ? "US ID"
      : v;
  });
  let fieldObject = yup.object().shape({
    required: yup.string(),
  });
  const requiredFieldValidationSchema = yup.object({
    patient_required_fields: yup
      .array()
      .of(fieldObject)
      .required("Atleast 1 Field Required")
      .min(1, "select atleast 1 field "),
  });
  const formik = useFormik({
    validationSchema: requiredFieldValidationSchema,

    initialValues: {
      patient_required_fields: [],
    },
    onSubmit: (val) => {
      props.setPersonalData(val);
      props.next();
    },
  });

  // const renderError = (message) => <p className="error">{message}</p>;
  return (
    <div className="mt-5 mx-auto w-10/12">
      <form onSubmit={formik.handleSubmit}>
        <Row className="my-4 justify-start">
          <Col sm={24} xs={24}>
            <SelectInput
              mode="multiple"
              setData={(e) => {
                setData(e);
              }}
              placeholder="Select Field Fot Patient's Information"
              value={formatedRequiredFields}
            />
          </Col>
        </Row>
        <Row className="my-4 justify-start">
          <Col xs={24}>
            <FormikProvider value={formik}>
              <FieldArray name="patient_required_fields">
                {() => (
                  <Col xs={24}>
                    {formik.touched.patient_required_fields &&
                    formik.errors.patient_required_fields ? (
                      <span className="error">
                        {formik.errors.patient_required_fields}
                      </span>
                    ) : null}
                    {data?.map((val, index) => {
                      return (
                        <Row key={index}>
                          <Col xs={24} md={4} sm={5}>
                            <label className="mr-3 font-medium text-base">
                              {val}
                            </label>
                          </Col>

                          <Col xs={24} sm={14}>
                            <input
                              type="radio"
                              className="pl-1"
                              id={`val+${index + 2}`}
                              name={`patient_required_fields[${index}].required`}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  `patient_required_fields[${index}].field`,
                                  val
                                );
                              }}
                              value="true"
                            ></input>
                            <label
                              htmlFor={`val+${index + 2}`}
                              className="pl-3 text-sm font-medium"
                            >
                              required
                            </label>

                            <input
                              type="radio"
                              name={`patient_required_fields[${index}].required`}
                              value="false"
                              className="ml-3 "
                              id={`val+${index + 60}`}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue(
                                  `patient_required_fields[${index}].field`,
                                  val
                                );
                              }}
                            ></input>
                            <label
                              htmlFor={`val+${index + 60}`}
                              className="pl-3 text-sm  font-medium"
                            >
                              optional
                            </label>
                          </Col>

                          {/* <ErrorMessage
                            className="error"
                            name="patient_required_fields"
                            render={renderError}
                          /> */}
                        </Row>
                      );
                    })}
                  </Col>
                )}
              </FieldArray>
            </FormikProvider>
          </Col>
        </Row>
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
    </div>
  );
};
PersonalDataForm.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  setData: PropTypes.func,
  setPersonalData: PropTypes.any,
};

export default PersonalDataForm;
