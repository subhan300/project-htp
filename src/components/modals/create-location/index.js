import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Steps, message, Card } from "antd";

import BasicInformationForm from "./step1";
import TestDetails from "./step2";
import PersonalDataForm from "./step3";
import AllInformation from "./step4";
import "./scss/index.scss";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const { Step } = Steps;
export const StepForm = (props) => {
  const [current, setCurrent] = React.useState(0);
  let [basicInfoForm, setBasicInfoForm] = useState();
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
  }, [windowWidth]);
  let [testDetailForm, setTestDetailForm] = useState({});
  let [personalData, setPersonalData] = useState({});
  let [logo, setUploadedLogo] = useState(null);
  let navigate = useNavigate();
  const next = () => setCurrent(current + 1);
  let user_parse = JSON.parse(localStorage.getItem("auth"));
  let user = user_parse.user.type.type;
  const done = () => {
    message.success("Processing complete!");

    user === "Manager"
      ? navigate("/htp/Manager/locations")
      : navigate("/htp/Asins/locations");
  };

  const prev = () => setCurrent(current - 1);
  const steps = [
    {
      title: "Basic Information",
      content: (
        <BasicInformationForm
          setBasicInfoForm={setBasicInfoForm}
          next={next}
          setUploadedLogo={setUploadedLogo}
        />
      ),
    },
    {
      title: "Test Details",
      content: (
        <TestDetails
          setTestDetailForm={setTestDetailForm}
          previous={prev}
          next={next}
          managerId={props.managerId}
        />
      ),
    },
    {
      title: "Select patient’s fields",
      content: (
        <PersonalDataForm
          setPersonalData={setPersonalData}
          previous={prev}
          next={next}
        />
      ),
    },
    {
      title: "All Information",
      content: (
        <AllInformation
          basicInfoForm={basicInfoForm}
          testDetailForm={testDetailForm}
          personalData={personalData}
          previous={prev}
          done={done}
          logo={logo}
          managerId={props.managerId}
        />
      ),
    },
  ];
  return (
    <Card className="mt-4   " style={{ width: "96%" }}>
      <Steps
        className={`steps  ${windowWidth <= "895" ? "ant-steps-vertical" : ""} 
          ${
            998 <= windowWidth && windowWidth <= 1115
              ? "ant-steps-vertical"
              : ""
          }
        
          mb-6`}
        current={current}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </Card>
  );
};

StepForm.propTypes = {
  managerId: PropTypes.string,
};
