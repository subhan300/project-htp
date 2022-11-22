import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AllManagers,
  Home,
  AllPatientInformation,
  Locations,
  CreateLocation,
} from "../../modules/admin";

import PropTypes from "prop-types";
import { SidebarDataForAdmin, SubMenu } from "../sidebar-data/sidebar-data";

export const AdminMenuItems = () => (
  <div className="mt-5">
    <div>
      <SubMenu data={SidebarDataForAdmin} path={"Asins"} />
    </div>
  </div>
);
export const AdminRouting = (path) => (
  <div>
    <Routes>
      <Route path={`${path.path}/`} element={<Home />} />
      <Route path={`${path.path}/all-managers`} element={<AllManagers />} />
      <Route
        path={`${path.path}/all-patient-information`}
        element={<AllPatientInformation />}
      />
      <Route path={`${path.path}/locations`} element={<Locations />}></Route>
      <Route
        path={`${path.path}/locations/create-location`}
        element={<CreateLocation />}
      />
    </Routes>
  </div>
);

AdminRouting.propTypes = {
  path: PropTypes.string.isRequired,
};
