import { adminConstant } from "../../constants";
import { utils } from "../../../helpers";
const userData = JSON.parse(localStorage.getItem("auth") || "{}");
const initialState = {
  loggedIn: utils.isAuth(),
  loading: false,
  isError: false,
  failure: "",
  loggedInUser: {
    name: userData.user?.firstname || userData.user?.fullname || "",
    role: userData.user?.type || "",
  },
};

export const admin = (state = initialState, action) => {
  switch (action.type) {
    case adminConstant.DATA_FETCHED:
      return {
        ...state,
        tested: action.tested,
      };
    case adminConstant.DATA_FETCHED_PATIENT_BY_MONTH_DATE:
      return {
        ...state,
        testedMonthDate: action.tested,
      };
    case adminConstant.DATA_FETCHED_PATIENT_BY_DATE_RANGE_OF_ALL_LOCATION:
      return {
        ...state,
        testedbyDateRange: action.tested,
      };

    case adminConstant.ALL_ADMINS:
      return {
        ...state,
        admins: action.admins,
      };

    default:
      return state;
  }
};
