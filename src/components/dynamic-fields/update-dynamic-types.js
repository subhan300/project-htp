import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import { Button, Form } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { TextInput } from "../../components/forms/text-input";
import { Spinner } from "../";
import { Btn } from "../forms";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

export const DynamicUpdateFieldSet = (props) => {
  return (
    <Form
      className="flex justify-center flex-col"
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={props.onFinish}
      form={props.form}
    >
      {/* rules=[] */}
      <Form.List name="testTypes">
        {(fields, { add, remove }, { errors }) => (
          <>
            <div className="text-center ">
              <TextInput
                placeholder="Test"
                value={props.testName}
                onChange={(e) => props.setTestName(e.target.value)}
              />
            </div>

            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Types :" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[]}
                  noStyle
                >
                  <div>
                    <TextInput placeholder="Test Types" />
                  </div>
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}

            <Form.Item className="mt-5">
              <Button
                onClick={() => add()}
                style={{ width: "100%" }}
                className="dynamic-btn"

                // bgColor="#008BA4"
                // color="white"
                // border="1px solid #c3c3c7"
                // btnClass="btnDarkHover"
              >
                <div
                  className="flex justify-center items-center dynamic-text "
                  // style={{ color: "white", padding: "1rem" }}
                >
                  <PlusOutlined />
                  <p className="pl-1 ">Add Test Type</p>
                </div>
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};

DynamicUpdateFieldSet.propTypes = {
  testName: PropTypes.string,
  setTestName: PropTypes.func,
  onFinish: PropTypes.func,
  form: PropTypes.any,
  title: PropTypes.string,
  rules: PropTypes.array,
  loader: PropTypes.bool,
  formItemRules: PropTypes.array,
};
