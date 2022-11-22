import { adminConstant } from "../../constants";
import { adminService } from "../../../services";

const getAllAdmins = () => {
  const success = (admins) => ({ type: adminConstant.ALL_ADMINS, admins });
  const failure = (error) => ({ type: adminConstant.LOGIN_FAILURE, error });
  return (dispatch) =>
    adminService
      .getAllAdmins()
      .then((res) =>
        res && res.status === 200 ? dispatch(success(res.data.user)) : null
      )
      .catch((error) => dispatch(failure(error.toString())));
};

export const adminAction = {
  getAllAdmins,
};
