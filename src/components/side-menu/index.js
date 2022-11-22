// import { Menu } from "antd";
import { Popover } from "antd";
import {
  //   AppstoreOutlined,

  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  //   ContainerOutlined,
  //   MailOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./index.scss";
// const { SubMenu } = Menu;

// export const SideMenu = () => {
//   let [collapsed, setCollapsed] = useState(false);
//   let toggleCollapsed = () => {
//     setCollapsed(true);
//   };

//   return (
//     <div
//       className="md:ml-12 bd_red xs:flex xs:flex-row side-menu"
//       style={{
//         width: 83,
//         // border: "2px solid white",
//         backgroundColor: "white",
//       }}
//     >
{
  /* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */
}
{
  /* <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className="xs:flex xs:flex-row md:flex-col"
        // theme="dark"
        inlineCollapsed={true}
      >
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          className="text-center"
          style={{
            border: "2px solid blue",
          }}
        >
          Add Test
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Update Test Type
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Update Test Name
        </Menu.Item>
        <Menu.Item key="4" icon={<ContainerOutlined />}>
          Delete Test
        </Menu.Item>
      </Menu> */
}
{
  /* </div>
  );
}; */
}

import React from "react";

export function SideMenu() {
  let [key, setKey] = useState(0);
  console.log("key ", key);
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
  }, [windowWidth]);

  console.log("widnow wisth", windowWidth, "==", windowWidth > 587);

  return (
    <div>
      <ul className="side_menu-ul flex xs:flex-row md:flex-col  xs:w-100">
        <li
          className={`side_menu-item ${key === 0 ? "active" : null}`}
          onClick={() => {
            setKey(0);
          }}
        >
          {windowWidth >= 500 ? (
            <Popover
              title="Add Test"
              trigger="hover"
              content=""
              placement="topLeft"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <DesktopOutlined />
            </Popover>
          ) : (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <DesktopOutlined />
            </Popover>
          )}
        </li>
        <li
          className={` side_menu-item ${key === 1 ? "active" : null}`}
          onClick={() => {
            setKey(1);
          }}
        >
          {windowWidth >= 500 ? (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              placement="topLeft"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <PieChartOutlined />
            </Popover>
          ) : (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <PieChartOutlined />
            </Popover>
          )}
        </li>
        <li
          className={` side_menu-item ${key === 2 ? "active" : null}`}
          onClick={() => {
            setKey(2);
          }}
        >
          {windowWidth >= 500 ? (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              placement="topLeft"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <MenuFoldOutlined />
            </Popover>
          ) : (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <MenuFoldOutlined />
            </Popover>
          )}
        </li>
        <li
          className={`side_menu-item  ${key === 3 ? "active" : null}`}
          onClick={() => {
            setKey(3);
          }}
        >
          {windowWidth >= 500 ? (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              placement="topLeft"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <MenuFoldOutlined />
            </Popover>
          ) : (
            <Popover
              content={<h3>AddTest</h3>}
              title="Title"
              trigger="hover"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <MenuFoldOutlined />
            </Popover>
          )}
        </li>
      </ul>
    </div>
  );
}
