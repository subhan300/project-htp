import React from "react";
import { Drawer } from "antd";
import "./scss/index.scss";
import PropTypes from "prop-types";

const DescriptionItem = (props) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      {props.title}:{props.content}
    </p>
  </div>
);

export const InformationDrawer = (props) => {
  const onClose = () => {
    props.setOpenDrawer(false);
  };

  return (
    <>
      <Drawer
        className="drawer"
        width={`60%`}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={props.openDrawer}
        title={props.title}
        destroyOnClose={props.destroyOnClose}
      >
        {props.content}
      </Drawer>
    </>
  );
};

DescriptionItem.propTypes = {
  content: PropTypes.any,
  title: PropTypes.any,
  openModal: PropTypes.boolean,
  setOpenModal: PropTypes.function,
};

InformationDrawer.propTypes = {
  openDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
  title: PropTypes.any,
  content: PropTypes.any,
  destroyOnClose: PropTypes.bool,
};
