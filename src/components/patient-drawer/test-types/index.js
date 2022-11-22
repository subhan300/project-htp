import { Row, Col } from "antd";
import { SelectInput, Btn } from "../..";
import { PropTypes } from "prop-types";
import { useFormik } from "formik";
import { useState } from "react";
export const TestTypes = (props) => {
  const onSubmitFunction = (values) => {
    props.setTestType(values);
    props.next();
  };
  const formik = useFormik({
    initialValues: { ...props.data },
    onSubmit: onSubmitFunction,
  });
  const testTypes = props.testTypes;
  const testNames = [];
  const [selectedTest, setSelectedTest] = useState(null);
  testTypes?.map((value) => testNames.push(value.name));
  const types = testTypes.filter((test) => test.name == selectedTest);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="title">Confirm Test Type</h2>
        <Row justify="start" className="items-center mb-5 mt-2">
          <Col sm={24} md={6} xs={24} lg={6} xl={4} className="mx-1">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST</label>
            </div>
          </Col>
          <Col sm={24} md={12} xs={24} lg={12} className="mx-1">
            <div className="user-information-modal-title flex flex-col align-center">
              <SelectInput
                defaultValue={formik.values.name}
                value={testNames}
                setData={(name) => {
                  formik.setFieldValue("name", name);
                  setSelectedTest(name);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row justify="start" className="items-center mb-5">
          <Col sm={24} md={6} xs={24} lg={6} xl={4} className="mx-1">
            <div className="user-information-modal-title flex flex-col align-center">
              <label className="pr-5 font-semibold">TEST TYPE</label>
            </div>
          </Col>
          <Col sm={24} md={12} xs={24} lg={12} className="mx-1">
            <div className="user-information-modal-title flex flex-col align-center">
              <SelectInput
                defaultValue={formik.values.type}
                value={types[0]?.types}
                setData={(type) => formik.setFieldValue("type", type)}
              />
            </div>
          </Col>
        </Row>
        <div className="steps-action mt-5 btn-div absolute bottom-2 left-1">
          <Row justify="space-between">
            <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
              <Btn
                bgColor={"#008ba4"}
                color={"#fff"}
                onClick={() => props.previous()}
                value="Previous"
              />
            </Col>
            <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
              <Btn
                bgColor={"#008ba4"}
                color={"#fff"}
                type="submit"
                // onClick={() => props.next()}
                value="Next"
              />
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
};

TestTypes.propTypes = {
  testTypes: PropTypes.any,
  previous: PropTypes.func,
  next: PropTypes.func,
  setTestType: PropTypes.func,
  data: PropTypes.any,
};
