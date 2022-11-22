import { modalConstants } from "../../constants";

export const modal = (state = { show: false, type: "", data: "" }, action) => {
  switch (action.type) {
    case modalConstants.CLOSE_MODAL:
      return { ...state, type: "", show: false, data: "" };
    case modalConstants.SUCCESS_MODAL:
      return {
        ...state,
        type: "success",
        show: true,
        data: action.data,
      };
    case modalConstants.ERROR_MODAL:
      return {
        ...state,
        type: "error",
        show: true,
        data: action.data,
      };
    case modalConstants.WARNING_MODAL:
      return {
        ...state,
        type: "warning",
        show: true,
        data: action.data,
      };
    default:
      return state;
  }
};
