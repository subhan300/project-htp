import React from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import {
  History,
  Duplicates,
  Analytics,
  AllPatients,
} from "../../modules/lab-technician";
import {
  SidebarDataForLabTechnician,
  SubMenu,
} from "../sidebar-data/sidebar-data";

export const LabTechnicianMenuItems = () => (
  <div className="mt-5">
    <SubMenu data={SidebarDataForLabTechnician} path={"lab-technician"} />
  </div>
);
export const LabTechnicianRouting = (path) => {
  return (
    <div>
      <Routes>
        <Route path={`${path.path}/`} element={<Duplicates />} />
        <Route path={`${path.path}/duplicates`} element={<Duplicates />} />
        <Route path={`${path.path}/upload-history`} element={<History />} />
        <Route path={`${path.path}/analytics`} element={<Analytics />} />
        <Route path={`${path.path}/all-patients`} element={<AllPatients />} />
      </Routes>
    </div>
  );
};

LabTechnicianRouting.propTypes = {
  path: PropTypes.string.isRequired,
};
