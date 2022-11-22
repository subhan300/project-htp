import React from "react";
import { MedicalProfessionalMenuItems } from "../medical-profession-routing";
import { AdminMenuItems } from "../admin-routing";
import { LabTechnicianMenuItems } from "../lab-technician-routing";
import PropTypes from "prop-types";
import { ManagerMenuItems } from "../manager-routing";
import { VendorMenuItems } from "../vendor-routing";

export const MenuItems = (props) => {
  return (
    <>
      {props.path == "Asins" ? (
        <AdminMenuItems />
      ) : props.path == "MedicalProfession" ? (
        <MedicalProfessionalMenuItems path={props.path} />
      ) : props.path == "LabTechnician" ? (
        <LabTechnicianMenuItems />
      ) : props.path == "Manager" ? (
        <ManagerMenuItems path={props.path} />
      ) : props.path == "Vendor" ? (
        <VendorMenuItems />
      ) : (
        " "
      )}
    </>
  );
};

MenuItems.propTypes = {
  path: PropTypes.string,
};
