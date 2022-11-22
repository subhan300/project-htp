import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.scss";
import {
  HomeOutlined,
  FileProtectOutlined,
  SyncOutlined,
  FunnelPlotFilled,
  FunnelPlotOutlined,
  MedicineBoxOutlined,
  CompassOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  RetweetOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

export const SidebarDataForMedical = [
  {
    title: "Dashboard",
    route: "",
    icon: <HomeOutlined />,
  },
  {
    title: "Uncollected",
    route: "uncollected",
    icon: <FunnelPlotOutlined />,
  },
  {
    title: "Collected",
    route: "collected",
    icon: <FunnelPlotFilled />,
  },
  {
    title: "Rapid Patients",
    route: "rapid-patients",
    icon: <SyncOutlined />,
  },
  {
    title: "Patient",
    route: "all-patient",
    icon: <FileProtectOutlined />,
  },
];

export const SidebarDataForAdmin = [
  {
    title: "Home",
    route: "",
    icon: <HomeOutlined />,
  },
  {
    title: "Managers",
    route: "all-managers",
    icon: <UserOutlined />,
  },
  {
    title: "Patient Info",
    route: "all-patient-information",
    icon: <UsergroupAddOutlined />,
  },
  {
    title: "Locations",
    route: "locations",
    icon: <CompassOutlined />,
  },
];

export const SidebarDataForManager = [
  {
    title: "Home",
    route: "",
    icon: <HomeOutlined />,
  },
  {
    title: "Employees",
    route: "all-employees",
    icon: <UserOutlined />,
  },
  {
    title: "Patients Info",
    route: "all-patients",
    icon: <MedicineBoxOutlined />,
  },
  {
    title: "Locations",
    route: "locations",
    icon: <CompassOutlined />,
  },
];

export const SidebarDataForLabTechnician = [
  {
    title: "All Patients",
    route: "all-patients",
    icon: <UsergroupAddOutlined />,
  },
  {
    title: "Analytics",
    route: "analytics",
    icon: <LineChartOutlined />,
  },
  {
    title: "Duplicates",
    route: "duplicates",
    icon: <RetweetOutlined />,
  },
  {
    title: "Upload History",
    route: "upload-history",
    icon: <HistoryOutlined />,
  },
];

export const SidebarDataForVendor = [
  {
    title: "Home",
    route: "",
    icon: <HomeOutlined />,
  },
  {
    title: "All Patients",
    route: "all-patients",
    icon: <UsergroupAddOutlined />,
  },
];
export const SubMenu = (props) => {
  let getRole = JSON.parse(`${localStorage.getItem("auth")}`);

  let role = getRole?.user.type.type;
  if (role === "Medical Profession") {
    role = "MedicalProfession";
  }
  if (role === "Lab Technician") {
    role = "LabTechnician";
  }

  let checkPath = window.location.pathname;

  let [currentKey, setCurrentKey] = useState(
    checkPath == `/htp/${role}`
      ? window.location.pathname.replace(`/htp/${role}`, "")
      : window.location.pathname.replace(`/htp/${role}/`, "")
  );

  return (
    <>
      <ul
        className={`menu-item text-left mt-5 flex flex-row justify-between p-3 lg:flex-col lg:p-0 lg:justify-start border-t-blue-900 border-t-2 border-solid lg:border-t-0 overflow-x-auto`}
      >
        {props.data.map((val, index) => {
          return (
            <Link key={val.route} to={`${role}/${val.route}`}>
              <li
                className={`menu-li flex  item-center p-2 
               ${val.route == currentKey ? "active-menu" : "null"}
                `}
                onClick={() => {
                  setCurrentKey(val.route);
                  localStorage.setItem("currentKey", index);
                }}
              >
                <div className="menu-icon">{val.icon}</div>
                <div className="menu-title pl-3">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

SubMenu.propTypes = {
  data: PropTypes.any.isRequired,
  path: PropTypes.any.isRequired,
  // keyI: PropTypes.any,
  // currentKey: PropTypes.any,
  // setCurrentKey: PropTypes.any,
};
