import { modalConstants } from "../../constants";

const success = (data) => ({
  type: modalConstants.SUCCESS_MODAL,
  data,
});

const warning = (data) => ({
  type: modalConstants.WARNING_MODAL,
  data,
});

const error = (data) => ({
  type: modalConstants.ERROR_MODAL,
  data,
});

const close = () => ({
  type: modalConstants.CLOSE_MODAL,
});

export const modalAction = {
  success,
  warning,
  error,
  close,
};
