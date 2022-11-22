import { Row, Col, Divider } from "antd";
import { useState } from "react";
import { Btn, OtpInput, Spinner } from "../../../components";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../../store/actions";
import { useDispatch } from "react-redux";
import "./scss/index.scss";
export const OTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state] = useState(location?.state);
  let data = state?.data;
  const [code, setCode] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(null);
  const submit = () => {
    if (code !== null) {
      if (state.type === "verification") {
        let dataObject = {
          email: state.email,
          verification_code: code,
        };
        dispatch(
          authActions.verification(
            dataObject,
            state.userType,
            navigate,
            setLoading
          )
        );
      } else {
        setCodeError("");
        let obj = {
          ...data,
          otp_key: code,
        };
        dispatch(authActions.otpCheck(obj, navigate, setLoading));
      }
    } else {
      setCodeError("Please enter OTP");
    }
  };
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
                  <h1 className="text-center otp-heading my-4">
                    Please enter the code
                  </h1>
                  <p className="text-center otp-text mt-4">
                    The code is send to
                    {` ${
                      state.type === "verification"
                        ? state.email
                        : data?.preferred_method === "Email"
                        ? data.email
                        : data.telephone
                    }`}
                  </p>
                </div>
              </Col>
            </Row>
            <Divider />

            <Row justify="center">
              <Col xs={22}>
                <div className="w-max mx-auto">
                  <OtpInput length={6} onComplete={setCode} loading={loading} />
                  {codeError && <span className="error">{codeError}</span>}
                </div>
              </Col>
            </Row>
            <Row className="mt-5" justify="center">
              <Col xs={22}>
                <div className="w-40 mx-auto my-8">
                  <Btn
                    value={
                      loading ? (
                        <span>
                          <Spinner className="btn-spinner mr-2" /> Loading...
                        </span>
                      ) : (
                        "Submit"
                      )
                    }
                    bgColor="#008ba4"
                    color="#fff"
                    onClick={submit}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
OTP.propTypes = {
  location: PropTypes.any,
};
