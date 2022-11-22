import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const PrivateRoute = (props) => {
  const auth = localStorage.getItem("token");
  return auth ? props.children : <Navigate to="/" />;
};
PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
