import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AllEmployees,
  AllPatientsInfo,
  Home,
  Locations,
  CreateLocation,
} from "../../modules/manager";
import { SidebarDataForManager, SubMenu } from "../sidebar-data/sidebar-data";
import PropTypes from "prop-types";

export const ManagerMenuItems = () => (
  <div className="mt-5">
    <SubMenu data={SidebarDataForManager} path={"manager"} />
  </div>
);

export const ManagerRouting = (path) => {
  return (
    <div>
      <Routes>
        <Route path={`${path.path}/`} element={<Home />} />
        <Route path={`${path.path}/all-employees`} element={<AllEmployees />} />
        <Route
          path={`${path.path}/all-patients`}
          element={<AllPatientsInfo />}
        />
        <Route path={`${path.path}/locations`} element={<Locations />} />
        <Route
          path={`${path.path}/locations/create-location`}
          element={<CreateLocation />}
        />

        {/* <Route
          path={`${path.path}/add-new-patient`}
          element={<AddNewPatient />}
        /> */}
      </Routes>
    </div>
  );
};

ManagerRouting.propTypes = {
  path: PropTypes.string.isRequired,
};
