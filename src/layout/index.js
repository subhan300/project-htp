import React from "react";
import { Logo, Popup, PopoverComponent } from "../components";
import { Layout, Space } from "antd";
import { AdminRouting } from "./admin-routing";
import { ManagerRouting } from "./manager-routing";
import { LabTechnicianRouting } from "./lab-technician-routing";
import { MedicalProfessioalRouting } from "./medical-profession-routing";
import { VendorRouting } from "./vendor-routing";
import { MenuItems } from "./sidebar-data/menu-items";
import "./scss/index.scss";

export const ApplicationLayout = () => {
  let getRole = JSON.parse(`${localStorage.getItem("auth")}`);

  let role = getRole?.user.type.type;
  if (role === "Medical Profession") {
    role = "MedicalProfession";
  }
  if (role === "Lab Technician") {
    role = "LabTechnician";
  }

  const drawer = (
    <div>
      <MenuItems path={role} />
    </div>
  );
  return (
    <div>
      <nav className="navbar p-1 pr-5 z-40">
        <div className="flex justify-between items-center">
          <Space size={"small"}>
            <Logo />
          </Space>
          <Space size={"large"}>
            <Popup />
            <PopoverComponent />
          </Space>
        </div>
      </nav>
      <Layout
        className="mt-10 main-layout"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <Layout.Sider
          className="sidebar"
          breakpoint={"lg"}
          theme="dark"
          collapsedWidth={0}
          trigger={null}
        >
          {drawer}
        </Layout.Sider>
        <Layout.Content className="content">
          <div className="flex flex-col justify-between lg:mb-0 mb-32">
            <AdminRouting path="/Asins" />
            <MedicalProfessioalRouting path="/MedicalProfession" />
            <LabTechnicianRouting path="/LabTechnician" />
            <ManagerRouting path="/Manager" />
            <VendorRouting path="/Vendor" />
          </div>
          <div className="fixed bottom-0 z-40 w-full lg:hidden block">
            {drawer}
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
};
