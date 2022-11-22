import { Steps } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "./scss/index.scss";
import { scanCodeIcon, patientDetailIcon } from "../../assets/images";
import { PatientDetails } from "./patient-details";
import { TestTube } from "./code-scanner";
export const PatientDrawer = (props) => {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const previous = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Patient Details",
      content: (
        <PatientDetails
          data={props.data}
          next={next}
          testTypes={props.testTypes}
        />
      ),
    },
    {
      title: "Scan Code",
      content: (
        <TestTube
          previous={previous}
          setOpenDrawer={props.setOpenDrawer}
          id={props.data.id}
        />
      ),
    },
  ];
  return (
    <div className="patient-step-form">
      <Steps current={current} className="mb-5">
        <Step
          title={steps[0].title}
          icon={
            <div className="w-7 h-7 absolute left-1 mt-px top-1">
              <img src={patientDetailIcon} alt="Patient Details" />
            </div>
          }
        />
        <Step
          title={steps[1].title}
          icon={
            <div className="">
              <img src={scanCodeIcon} alt="Scan" />
            </div>
          }
        />
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </div>
  );
};

PatientDrawer.propTypes = {
  data: PropTypes.any,
  testTypes: PropTypes.any,
  setOpenDrawer: PropTypes.func,
};
