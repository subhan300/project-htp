import { authConstants } from "../../constants";
import { utils } from "../../../helpers";

const userData = JSON.parse(localStorage.getItem("auth") || "{}");
const initialState = {
  loggedIn: utils.isAuth(),
  loading: false,
  isError: false,
  failure: "",
  loggedInUser: {
    name: userData.user?.firstname || "",
    role: userData.user?.type || "",
  },
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return { ...state, loading: true, failure: "" };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        loggedInUser: action.loggedInUser,
        failure: "",
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isError: true,
        failure: action.error,
      };
    case authConstants.LOGOUT:
      localStorage.removeItem("uid");
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isError: false,
        failure: "",
      };
    case authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isError: true,
        failure: action.error,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isError: false,
        loggedInUser: action.loggedInUser,
        failure: "",
      };
    default:
      return state;
  }
};
