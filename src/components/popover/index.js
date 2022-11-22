import React, { useState } from "react";
import { Popover, Space, Avatar, Row, Col } from "antd";
import {
  DownOutlined,
  SafetyOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./scss/index.scss";
import { EditableInput, InformationDrawer } from "../index";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/actions";
import { useDispatch } from "react-redux";

export const PopoverComponent = () => {
  let dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  let navigate = useNavigate();
  let auth = JSON.parse(localStorage.getItem("auth"));
  const signout = () => {
    localStorage.removeItem("auth");
    dispatch(authActions.signout());
    navigate("/");
  };
  const menu = (
    <>
      <div className="w-full p-2">
        <div className="drop-down-content pb-1 pl-5 pr-5 ">
          <p className="drop-down-content-title text-center ">My Information</p>
          <hr className="drop-down-hr"></hr>
          <div className="avatar-email-div flex justify-start items-center">
            <Avatar size="large" />
            <div className="avatar-email-div-content p-3">
              <p className="avatar-email-div-title">
                {auth?.user?.first_name} {auth?.user?.last_name}
              </p>
              <p className="avatar-email-div-email">{auth?.user.type.type}</p>
            </div>
          </div>
          <hr className="drop-down-hr"></hr>
          <p
            className="user-information-items flex items-center py-2"
            onClick={() => setOpenDrawer(true)}
          >
            <span className="user-information-icons">
              <UserOutlined className="profile-icon" />
            </span>
            <span className="pl-1">My Profile</span>
          </p>
          <p className="user-information-items flex items-center py-2">
            <span className="user-information-icons">
              <SafetyOutlined className="profile-icon" />
            </span>
            <span className="pl-1">Help</span>
          </p>
          <hr className="drop-down-hr"></hr>
          <p className="user-information-items flex items-center py-2 pl-0.5">
            <span className="user-information-icons">
              <LogoutOutlined className="popover-icon" />
            </span>
            <span className="pl-1" onClick={() => signout()}>
              Log out
            </span>
          </p>
        </div>
      </div>
    </>
  );
  return (
    <div>
      <InformationDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        content={
          <div className="pl-3 pr-3">
            <h2 className="title">Personal information</h2>
            <Row className="mt-5" justify="space-between">
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex align-center">
                  <label className="pr-5 font-semibold">First Name :</label>
                  <EditableInput text={auth?.user?.first_name} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex align-center">
                  <label className="pr-5 font-semibold">Last Name :</label>
                  <EditableInput text={auth?.user?.last_name} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Date Of Birth :</label>
                  <EditableInput text={auth?.user?.date_of_birth} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Email :</label>
                  <EditableInput text={auth?.user?.email} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Phone# :</label>
                  <EditableInput text={auth?.user?.telephone} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Manager Id</label>
                  <span>{auth?.user?.mid}</span>
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Location Id</label>
                  <span>{auth?.user?.employee_location}</span>
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Address :</label>
                  <EditableInput text={auth?.user?.address} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">City :</label>
                  <EditableInput text={auth?.user?.city} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">State</label>
                  <EditableInput text={auth?.user?.state} />
                </div>
              </Col>
              <Col sm={24} md={24} xs={24} lg={11} className="mx-1 mt-5">
                <div className="user-information-modal-title flex flex-col align-center">
                  <label className="pr-5 font-semibold">Zip Code</label>
                  <EditableInput text={auth?.user?.zip_code} />
                </div>
              </Col>
            </Row>
          </div>
        }
      />
      <Popover placement="bottomRight" content={menu} trigger="click">
        <div
          className="ant-dropdown-link flex items-center cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          <Space size="small">
            <Avatar
              className="navbar-avatar"
              src={
                <img
                  src="https://joeschmoe.io/api/v1/random"
                  style={{ width: 32 }}
                />
              }
            />
            <DownOutlined size="large" />
          </Space>
        </div>
      </Popover>
    </div>
  );
};

PopoverComponent.propTypes = {
  children: PropTypes.element,
};
