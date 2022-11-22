import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { Row, Col } from "antd";
import { useFormik } from "formik";
import { EditableInput } from "../../components/forms/editable-input";
import { Btn } from "../../components/forms/button";
import { patientAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Spinner } from "../../components";
export const AllPatientAdminInfoDrawer = (props) => {
  delete props.details.test_type;
  delete props.details.created_by;
  delete props.details.__v;
  delete props.details.production;
  let [load, setLoad] = useState(false);
  let dispatch = useDispatch();
  const onSubmitFunction = (values) => {
    setLoad(true);
    delete values.key;
    delete values._id;
    dispatch(
      patientAction.adminPatientUpdate(values, props.details._id, setLoad)
    );
  };

  let detailObject = { ...props.details };
  delete detailObject._id;
  delete detailObject.pid;
  delete detailObject.key;
  delete detailObject.pid_link;

  delete detailObject.createdAt;
  delete detailObject.updatedAt;
  delete detailObject.__v;
  delete detailObject.created_by;
  delete detailObject.signature;
  delete detailObject.patient_signature;
  delete detailObject.location_id;
  delete detailObject.consent_link;
  delete detailObject.order_no;
  delete detailObject.is_review;
  delete detailObject.created_date;
  delete detailObject.test;
  delete detailObject.test_types;
  delete detailObject.patient_result;
  delete detailObject.tested_date;
  delete detailObject.patient_result_date;
  delete detailObject.patient_test_result_sign_off;
  const formik = useFormik({
    initialValues: detailObject,

    onSubmit: onSubmitFunction,
  });

  return (
    <div className="pl-3 pr-3">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="title">Detail</h2>
        <Row justify="space-between">
          {Object.keys(props.details).map((val, i) => {
            return (
              <Col
                key={i}
                sm={24}
                md={11}
                xs={24}
                lg={11}
                className="mx-1 mt-5"
              >
                <div className="user-information-modal-title flex justify-between align-center">
                  <label className="pr-5 font-semibold">
                    {" "}
                    {val === "first_name"
                      ? "First Name"
                      : val === "last_name"
                      ? "Last Name"
                      : val === "test_types"
                      ? "Test Types"
                      : val === "marital_status"
                      ? "Marital Status"
                      : val === "_id"
                      ? "ID"
                      : val === "location_id"
                      ? "Location ID"
                      : val === "is_review"
                      ? "Is Review"
                      : val === "order_no"
                      ? "Order No"
                      : val === "date_of_birth"
                      ? "Date Of Birth"
                      : val === "pid_link"
                      ? "Pid Link"
                      : val === "consent_link"
                      ? "Consent Link"
                      : val === "created_date"
                      ? "Created Date"
                      : val === "is_tested"
                      ? "Is Tested"
                      : val === "patient_signature"
                      ? "Patient Signature"
                      : val === "created_by"
                      ? "Created By"
                      : val === "patient_result"
                      ? "Patient Result"
                      : val === "tested_date"
                      ? "Test Date"
                      : val === "bar_code"
                      ? "Bar Code"
                      : val === "patient_result_date"
                      ? "Patient Result Date"
                      : val === "patient_test_result_sign_off"
                      ? "Patient Result Sign Off"
                      : val}
                  </label>
                </div>

                {val === "test_types" ||
                val === "first_name" ||
                val === "last_name" ||
                val === "gender" ||
                val === "email" ||
                val === "marital_status" ||
                val === "telephone" ||
                val === "test" ||
                val === "patient_result" ||
                val === "is_tested" ||
                val === "race" ||
                val === "pregnant" ? (
                  <EditableInput
                    name={val}
                    value={props.details[val]}
                    text={props.details[val]}
                    onChange={formik.handleChange}
                  />
                ) : (
                  <div
                    className="user-information-modal-title flex justify-between align-center"
                    style={{ wordBreak: "break-all" }}
                  >
                    <label className="pr-5 ">
                      {val === "is_review"
                        ? `${props.details[val]}`
                        : props.details[val]}
                    </label>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>

        <Row>
          <Col xs={24} sm={10} md={8} lg={6} className="w-1/4 mt-10">
            <div>
              <Btn
                value={
                  load ? (
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
        </Row>
      </form>
    </div>
  );
};

AllPatientAdminInfoDrawer.propTypes = {
  details: PropTypes.any,
};
