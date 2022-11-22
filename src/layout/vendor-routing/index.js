import React from "react";
import { Routes, Route } from "react-router-dom";
import { AllPatients, Home } from "../../modules/vendors";
import PropTypes from "prop-types";
import { SidebarDataForVendor, SubMenu } from "../sidebar-data/sidebar-data";

export const VendorMenuItems = () => (
  <div className="mt-5">
    <div>
      <SubMenu data={SidebarDataForVendor} path={"Vendor"} />
    </div>
  </div>
);
export const VendorRouting = (path) => (
  <div>
    <Routes>
      <Route path={`${path.path}/`} element={<Home />} />
      <Route path={`${path.path}/all-patients`} element={<AllPatients />} />
    </Routes>
  </div>
);

VendorRouting.propTypes = {
  path: PropTypes.string.isRequired,
};
