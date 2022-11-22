import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Appointment,
  Collected,
  AllPatient,
  RapidPatients,
  Uncollected,
  AddNewPatient,
  Dashboard,
} from "../../modules/medical-professional";
import PropTypes from "prop-types";
import { SidebarDataForMedical, SubMenu } from "../sidebar-data/sidebar-data";

export const MedicalProfessionalMenuItems = () => (
  <div className="mt-5">
    <SubMenu data={SidebarDataForMedical} path={"MedicalProfession"} />
  </div>
);
export const MedicalProfessioalRouting = (path) => (
  <div>
    <Routes>
      <Route path={`${path.path}/`} element={<Dashboard />} />
      <Route path={`${path.path}/uncollected`} element={<Uncollected />} />
      <Route path={`${path.path}/collected`} element={<Collected />} />
      <Route
        exact
        path={`${path.path}/appointment`}
        element={<Appointment />}
      />
      <Route path={`${path.path}/rapid-patients`} element={<RapidPatients />} />
      <Route path={`${path.path}/all-patient`} element={<AllPatient />} />
      <Route
        path={`${path.path}/add-new-patient`}
        element={<AddNewPatient />}
      />
    </Routes>
  </div>
);

MedicalProfessioalRouting.propTypes = {
  path: PropTypes.any,
};
