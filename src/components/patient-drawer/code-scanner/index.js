import { qrCodeIcon, barCodeIcon, penIcon } from "../../../assets/images";
import { useState } from "react";
import { PropTypes } from "prop-types";
import { QrCodeScanner, Spinner, Btn, TextInput } from "../..";
import { Row, Col } from "antd";
import { useFormik } from "formik";
import { patientAction } from "../../../store/actions";
import { useDispatch } from "react-redux";
import Scanner from "../../bar-code-scanner";
export const TestTube = (props) => {
  const formdata = new FormData();
  const dispatch = useDispatch();
  const onSubmitFunction = (values) => {
    setLoading(true);
    for (let key in values) {
      if (key === "test_type") {
        formdata.append("test_type[name]", values[key].name);
        formdata.append("test_type[type]", values[key].type);
      } else if (key === "location_id") {
        formdata.append("location_id[_id]", values[key]._id);
        formdata.append(
          "location_id[location_name]",
          values[key].location_name
        );
      } else {
        formdata.append(key, values[key]);
      }
    }
    dispatch(
      patientAction.updatePatient(
        formdata,
        props.id,
        setLoading,
        props.setOpenDrawer,
        "Patient Tested Successfully"
      )
    );
  };
  const formik = useFormik({
    initialValues: {
      is_tested: "Yes",
      bar_code: "",
    },
    onSubmit: onSubmitFunction,
  });
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const onDetected = (result) => {
    formik.setFieldValue("bar_code", mode(result));
  };
  let disabled = !(formik.values.bar_code.length >= 10) || loading;
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-24">
          <div className="flex justify-center items-center">
            <img
              src={qrCodeIcon}
              alt="Qr Code"
              width={50}
              height={50}
              className="mx-2"
              onClick={() => setSelectedMethod("Qr Code")}
            />
            <img
              src={barCodeIcon}
              alt="Bar Code"
              width={80}
              className="mx-2"
              onClick={() => setSelectedMethod("Bar Code")}
            />
            <img
              src={penIcon}
              alt="Camera"
              width={50}
              height={50}
              className="mx-2"
              onClick={() => setSelectedMethod("Input")}
            />
          </div>
          <div className="mt-3">
            <Row justify="center">
              <Col xs={24} sm={24} md={18} lg={12}>
                {selectedMethod === "Qr Code" ? (
                  <div>
                    <p>Code found: {formik.values.bar_code}</p>
                    <QrCodeScanner
                      data={formik.values.bar_code}
                      setData={(code) => formik.setFieldValue("bar_code", code)}
                    />
                  </div>
                ) : selectedMethod === "Bar Code" ? (
                  <div>
                    <p>Code found: {formik.values.bar_code}</p>
                    <Scanner onDetected={onDetected} />
                  </div>
                ) : selectedMethod === "Input" ? (
                  <TextInput
                    name="bar_code"
                    value={formik.values.bar_code}
                    onChange={formik.handleChange}
                  />
                ) : null}
              </Col>
            </Row>
          </div>
        </div>
        <div
          className={`steps-action mt-5 btn-div absolute bottom-0 pb-3 bg-white`}
        >
          <Row justify="space-between">
            <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
              <Btn
                disabled={loading}
                bgColor={loading ? "#008ba480 " : "#008ba4"}
                color={"#fff"}
                onClick={() => props.previous()}
                value="Previous"
              />
            </Col>
            <Col sm={11} md={11} xs={24} lg={6} className="mx-1 mt-2">
              <Btn
                disabled={disabled}
                type="submit"
                bgColor={disabled ? "#008ba450 " : "#008ba4"}
                color={"#fff"}
                value={
                  loading ? (
                    <>
                      <Spinner className="button-spinner" /> Loading...
                    </>
                  ) : (
                    "Is Tested"
                  )
                }
              />
            </Col>
          </Row>
        </div>
      </form>
    </div>
  );
};

TestTube.propTypes = {
  previous: PropTypes.func,
  id: PropTypes.any,
  setOpenDrawer: PropTypes.func,
};
