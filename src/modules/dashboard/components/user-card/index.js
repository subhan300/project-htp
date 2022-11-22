import React from "react";

import PropTypes from "prop-types";
import "./scss/index.scss";
export const UserCard = (props) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 box w-full cursor-pointer">
      <img src={props.logo} alt={props.alt} width="200px" />
      <h2 className="title p-2 text-center">{props.title}</h2>
    </div>
  );
};

UserCard.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
