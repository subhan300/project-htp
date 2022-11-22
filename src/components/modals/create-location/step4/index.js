import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, message } from "antd";
import { EditableInput, Btn, TextAreaInput } from "../../../forms";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { Spinner } from "../../../../components";
import "../scss/index.scss";

import { locationService } from "../../../../services";
// import { useNavigate } from "react-router-dom";
function AllInformation(props) {
  let basicInfoFormArray = [props.basicInfoForm];
  let [load, setLoad] = useState(false);

  let [consentFormData, setConsentFormData] =
    useState(`I, _______ , Authorization and Consent for COVID-19 Diagnostic Testing: I voluntarily consent and authorize address test to conduct collection of my COVID-19 sample.
  `);
  let user_parse = JSON.parse(localStorage.getItem("auth"));
  let user = user_parse.user.type.type;

  const formdata = new FormData();
  const formik = useFormik({
    initialValues: {
      ...props.basicInfoForm,
      ...props.testDetailForm,
      ...props.personalData,
    },

    onSubmit: (values) => {
      setLoad(true);

      for (let i = 0; i < values.test.length; i++) {
        formdata.append(`test[${i}][name]`, values.test[i].name);
        for (let j = 0; j < values.test[i].types.length; j++) {
          // values.test[i].types.length <= 1 ? i : "types";

          if (values.test[i].types.length <= 1) {
            formdata.append(`test[${i}][types][${0}]`, values.test[i].types[j]);
          } else {
            formdata.append(`test[${i}][types]`, values.test[i].types[j]);
          }
        }
      }

      formdata.append("location_name", values.location_name);
      formdata.append("business_or_individual", values.business_or_individual);
      formdata.append("send_copy_to_email", values.send_copy_to_email);
      formdata.append("email", values.email);
      formdata.append("zip_code", values.zip_code);
      formdata.append("address", values.address);

      formdata.append("city", values.city);
      // console.log("props", props.logo);
      // console.log("values , which I shloud sue here ", values);

      if (values.location_logo === "default") {
        formdata.append("location_logo", values.location_logo);
      } else if (props.logo != null) {
        formdata.append("location_logo", props.logo);
      } else {
        formdata.append("location_logo", "default");
      }

      if (user === "Asins") {
        formdata.append("manager_id", props.managerId);
      }

      for (let u = 0; u < values.patient_required_fields.length; u++) {
        formdata.append(
          `patient_required_fields[${u}][required]`,
          values.patient_required_fields[u].required
        );
        formdata.append(
          `patient_required_fields[${u}][field]`,
          values.patient_required_fields[u].field
        );
      }

      formdata.append("consent", consentFormData);
      locationService
        .createLocation(formdata)
        .then((res) => {
          setLoad(false);
          if (res.status == 200) {
            props.done();
            // navigate("/htp/Manager/locations");
          } else {
            return message.error(
              `Form is not submitted ${res.response.data.message}`
            );
          }
        })
        .catch((err) => {
          return message.error(`Form is not submitted ${err}`);
        });
    },
  });

  return (
    <div className="mt-8 mx-auto w-10/12">
      <form onSubmit={formik.handleSubmit}>
        <div className="pl-3 pr-3 mt-12">
          <p className="step-form4-text">Confirm All Information</p>
          <Row
            justify=" mt-6"
            // style={{ border: "2px solid red" }}
          >
            {basicInfoFormArray.map((obj) => {
              return Object.keys(obj).map((key, i) => {
                return (
                  <Col
                    className={`mt-4  ${i % 2 == 0 ? "text-left" : "sm:pl-12"}`}
                    sm={12}
                    md={12}
                    xs={24}
                    key={key}
                    // style={{ border: "1px solid yellow" }}
                  >
                    <div className="user-information-modal-title flex flex-col">
                      <label className="pr-5 font-semibold ">
                        {key === "location_name"
                          ? "LOCATION NAME "
                          : key === "location_logo"
                          ? "LOCATION LOGO  "
                          : key === "zip_code"
                          ? "ZIP CODE"
                          : key === "business_or_individual"
                          ? "BUSINESS OR INDIVIDUAL"
                          : key === "send_copy_to_email"
                          ? "SEND EMAIL COPIES"
                          : key === "email"
                          ? "EMAIL"
                          : key === "city"
                          ? "CITY"
                          : key}
                      </label>

                      <EditableInput
                        name={key}
                        onChange={formik.handleChange}
                        text={
                          (key == "location_logo" &&
                          typeof obj?.location_logo?.name == "string"
                            ? obj.location_logo.name
                            : obj[key]) || key === "send_copy_to_email"
                            ? obj[key] == true
                              ? "TRUE"
                              : "FALSE"
                            : key
                        }
                      />
                    </div>
                  </Col>
                );
              });
            })}

            <FormikProvider value={formik}>
              <FieldArray name="testi">
                {() => {
                  return (
                    <div style={{ width: "100%" }}>
                      {formik.values.test.map((t, index) => {
                        return (
                          <Row key={Math.floor(Math.random() * 20)}>
                            <Col className="mt-3" sm={24} md={12} xs={24}>
                              <div className="user-information-modal-title flex flex-col">
                                <label className={`pr-5 font-medium `}>
                                  TEST NAME
                                </label>

                                <div>
                                  {" "}
                                  <EditableInput
                                    // name={`test[${index}].name`}
                                    value={t.name}
                                    text={t.name}
                                    // onChange={formik.handleChange}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col
                              className="mt-3 md:text-left "
                              sm={24}
                              md={12}
                              xs={24}
                              // style={{ border: "2px solid red" }}
                            >
                              <div
                                className="user-information-modal-title flex flex-col  font-medium"
                                // style={{ border: "1px solid yellow" }}
                              >
                                <label
                                  className={`sm:pl-12`}
                                  // style={{ border: "1px solid yellow" }}
                                >
                                  TYPE NAME
                                </label>
                              </div>
                              {t.types?.map((val, i) => {
                                return (
                                  <div
                                    key={Math.floor(Math.random() * 100)}
                                    className="user-information-modal-title sm:ml-12 flex "

                                    // key={`test[${index}].types[${i}]`}
                                  >
                                    <span
                                      className="pr-2 w-4   "
                                      // style={{ border: "2px solid blue" }}
                                    >{`${i + 1}.`}</span>
                                    <div
                                      className="md:text-left w-100"
                                      // style={{ border: "2px solid blue" }}
                                    >
                                      <EditableInput
                                        name={`test[${index}].types[${i}]`}
                                        value={val}
                                        text={val}
                                        onChange={formik.handleChange}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </Col>
                          </Row>
                        );
                        // });
                      })}
                    </div>
                  );
                }}
              </FieldArray>
              <Col className="mt-3" sm={24} md={24} xs={24}>
                <div
                  className="md:flex md:justify-between "
                  // style={{ border: "2px solid blue" }}
                >
                  <div
                    className="font-medium user-information-modal-title md:w-2/4"
                    // style={{ border: "2px solid blue" }}
                  >
                    <label className="pr-5 font-medium">Fields: </label>
                  </div>
                  <div
                    className="font-medium user-information-modal-title w-2/4 md:pl-12 "
                    // style={{ border: "2px solid green" }}
                  >
                    <label
                      className="font-medium"
                      // style={{ border: "2px solid blue" }}
                    >
                      Required:{" "}
                    </label>
                  </div>
                </div>
                <FieldArray name="required_fields">
                  {() =>
                    formik.values.patient_required_fields.map((r, index) => {
                      return (
                        <Row key={r?.field}>
                          <Col className="mt-3 " sm={24} md={12} xs={24}>
                            <div className="user-information-modal-title flex align-center">
                              {/* <EditableInput
                                name={`patient_required_fields[${index}].field`}
                                value={r?.field}
                                text={r?.field}
                                onChange={formik.handleChange}
                              /> */}
                              <p>{r?.field}</p>
                            </div>
                          </Col>
                          <Col
                            className="mt-3"
                            sm={12}
                            md={12}
                            xs={24}
                            // style={{ border: "2px solid yellow" }}
                          >
                            <div className="user-information-modal-title  flex md:pl-12  2xl:justify-start   2xl:pl-10">
                              {/* <label className="pr-5 font-medium">
                                Required :{" "}
                              </label> */}
                              <div>
                                <EditableInput
                                  name={`patient_required_fields[${index}].required`}
                                  value={r?.required}
                                  text={r?.required}
                                  onChange={formik.handleChange}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      );
                    })
                  }
                </FieldArray>
              </Col>
            </FormikProvider>

            <Col className="mt-8 mb-9" xs={24} sm={20}>
              <TextAreaInput
                rows={6}
                placeholder="Consent Form"
                name="consent"
                onChange={(e) => {
                  setConsentFormData(e.target.value);
                }}
                value={consentFormData}
              />
            </Col>
          </Row>
          <Row
            gutter={[10, 10]}
            className="w-full flex justify-end items-end mt-4"
          >
            <Col xs={24} sm={10} md={8} lg={6}>
              <Btn
                bgColor="#008ba4"
                color="white"
                value="Previous"
                onClick={() => props.previous()}
              />
            </Col>
            <Col xs={24} sm={10} md={8} lg={6}>
              <Btn
                bgColor="#008ba4"
                color="white"
                type="submit"
                value={
                  load ? (
                    <span>
                      Loading...
                      <Spinner className="btn-spinner mr-2" />
                    </span>
                  ) : (
                    "Done "
                  )
                }
              />
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}
AllInformation.propTypes = {
  previous: PropTypes.func,
  done: PropTypes.func,
  basicInfoForm: PropTypes.any,
  testDetailForm: PropTypes.any,
  personalData: PropTypes.any,
  key: PropTypes.any,
  logo: PropTypes.any,
  managerId: PropTypes.string,
};
export default AllInformation;
