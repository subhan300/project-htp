import React, { useState } from "react";
import "./scss/index.scss";
import emailIcon from "../../../assets/images/icons/email.svg";
import phoneIcon from "../../../assets/images/test-types/rapid.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/actions";
import { Row, Col, Alert, Divider } from "antd";
import {
  DetailModal,
  TextInput,
  PhoneInput,
  Spinner,
  Btn,
} from "../../../components";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [forgetModal, setForgetModal] = useState(false);
  const [methodError, setMethodError] = useState("");
  const [textError, setTextError] = useState("");
  const [loading, setLoading] = useState(false);
  let text = "";
  const selectMethod = (method) => {
    setMethodError("");
    setSelectedMethod(method);
  };
  const openModal = () => {
    selectedMethod !== ""
      ? setForgetModal(true)
      : setMethodError("Please select method type!");
  };
  const submit = () => {
    let data;
    setLoading(true);
    if (text !== null && text !== "") {
      selectedMethod === "Email"
        ? (data = {
            preferred_method: "Email",
            email: text,
          })
        : (data = {
            preferred_method: "Telephone",
            telephone: text,
          });
      dispatch(authActions.forgetPassword(data, navigate, setLoading));
    } else {
      setTextError(
        `Please Enter your ${
          selectedMethod === "Email" ? "email address." : "phone number."
        }`
      );
    }
  };
  const modalContent = (
    <div className="text-center">
      <div className="mb-5 text-left">
        {selectedMethod === "Email" ? (
          <TextInput
            placeholder={"Enter your Registered Email Address"}
            onChange={(e) => (text = e.target.value)}
          />
        ) : (
          <PhoneInput
            placeholder={["Enter your Registered Phone Number"]}
            type={["number"]}
            onChange={(e) => (text = e.formattedValue)}
          />
        )}
        {textError && <span className="error">{textError}</span>}
      </div>
      <Btn
        disabled={loading}
        bgColor={"#008ba4"}
        color={"#fff"}
        onClick={submit}
        value={
          loading ? (
            <>
              {" "}
              <Spinner /> loading...
            </>
          ) : (
            "Send Link"
          )
        }
      />
    </div>
  );
  return (
    <Row id="parent_container_forget_password" align="middle" justify="center">
      {methodError && (
        <Alert
          message={methodError}
          type="error"
          banner
          className="w-full h-14 self-start alert-banner"
        />
      )}
      <DetailModal
        title={
          <div>
            <h1 className="forget-modal-heading mb-2">Forget Password</h1>
            <p className="forget-modal-text">
              You will get a Confirmation
              {selectedMethod === "Email" ? " Email " : " Message "}
              Shortly!
            </p>
          </div>
        }
        content={modalContent}
        closable={true}
        handleCancel={() => setForgetModal(false)}
        isModalVisible={forgetModal}
        footer={null}
        mask={true}
        centered={true}
        afterClose={() => setForgetModal(false)}
      />
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
                  <h1 className="text-center p-3">Forget Password</h1>
                  <p className="text_styling text-center m-0 p-0">
                    Oops!! Looks like you forgot your password, <br /> Please
                    select an option to send link to Join the party again.
                  </p>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row justify="center">
              <Col xs={22}>
                <label htmlFor="email">
                  <div
                    id="email"
                    onClick={() => selectMethod("Email")}
                    className={`${
                      selectedMethod === "Email" ? "selected_class" : null
                    } card cursor-pointer flex justify-between align-middle`}
                  >
                    <div className="flex ">
                      <img src={emailIcon} alt="EmailIcon" />
                      <div className="ml-3">
                        <h2 className="card_heading mb-0">Reset via email</h2>
                        <h3 className="card_text mb-0">
                          Link will be sent to your registered email
                        </h3>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="text"
                      id="email"
                      className="radio-btn"
                      checked={selectedMethod === "Email"}
                      readOnly
                    />
                  </div>
                </label>
              </Col>
            </Row>
            <Row className="mt-5" justify="center">
              <Col xs={22}>
                <label>
                  <div
                    onClick={() => selectMethod("Telephone")}
                    className={`${
                      selectedMethod === "Telephone" ? "selected_class" : ""
                    } card cursor-pointer flex justify-between align-middle`}
                  >
                    <div className="flex ">
                      <img src={phoneIcon} alt="PhoneIcon" />
                      <div className="ml-3">
                        <h2 className="card_heading mb-0">Reset via phone</h2>
                        <h3 className="card_text mb-0">
                          Link will be sent to your registered email
                        </h3>
                      </div>
                    </div>
                    <input
                      type="radio"
                      className="radio-btn"
                      name="text"
                      checked={selectedMethod === "Telephone"}
                      readOnly
                    />
                  </div>
                </label>
              </Col>
            </Row>
            <Row className="mt-5" justify="center">
              <Col xs={22}>
                <Btn
                  value="Select Method"
                  bgColor="#008ba4"
                  color="#fff"
                  onClick={openModal}
                />
              </Col>
            </Row>
            <Row className="mt-5" justify="center">
              <Col className="xs:text-center" xs={22}>
                <Link to="/signup">
                  <span className="text_styling ">{"Go Back To Signin"}</span>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { ForgetPassword };
