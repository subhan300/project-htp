import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Btn, TextInput } from "../forms";
import PropTypes from "prop-types";

import { Spinner } from "../spinner";
import { MinusCircleOutlined } from "@ant-design/icons";
export const DynamicField = (props) => {
  return (
    <div>
      <Formik
        initialValues={{ testTypes: [] }}
        onSubmit={(values, { resetForm }) =>
          props.onFinish(values, { resetForm })
        }
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="mt-6  text-lg font-medium mb-3">
              <label className="text-font-size ">{props.title}</label>
            </div>

            <TextInput
              placeholder={
                props.selectInputText ? props.selectInputText : "Test"
              }
              value={props.testName}
              onChange={(e) => props.setTestName(e.target.value)}
            ></TextInput>
            <FieldArray
              name="testTypes"
              render={(arrayHelpers) => (
                <div>
                  {values.testTypes.map((friend, index) => {
                    return (
                      <div key={index} className="mt-2 ">
                        <TextInput
                          placeholder={"Test Types"}
                          // value={props.testName}
                          name={`testTypes.${index}`}
                          onChange={(e) =>
                            setFieldValue(`testTypes.${index}`, e.target.value)
                          }
                        ></TextInput>
                        {/* <Field name={`friends.${index + 1}`} /> */}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          className="ml-1"
                        >
                          <MinusCircleOutlined />
                        </button>
                      </div>
                    );
                  })}
                  <div className="mt-4">
                    <Btn
                      bgColor="#008ba4"
                      color="white"
                      type="button"
                      value={"Add Types"}
                      onClick={() => arrayHelpers.push("")}
                    ></Btn>
                  </div>

                  {errors.testTypes && touched.testTypes ? (
                    <div className="error">{errors.testTypes}</div>
                  ) : null}
                  <div className="mt-4">
                    <Btn
                      bgColor="#008ba4"
                      color="white"
                      type="submit"
                      value={
                        props.loader ? (
                          <span>
                            <Spinner className="btn-spinner mr-2" /> Loading...
                          </span>
                        ) : (
                          "Submit"
                        )
                      }
                    ></Btn>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

DynamicField.propTypes = {
  setFormValues: PropTypes.any,
  testName: PropTypes.string,
  setTestName: PropTypes.func,
  onFinish: PropTypes.func,
  loader: PropTypes.bool,
  selectInputText: PropTypes.string,
  title: PropTypes.string,
};
