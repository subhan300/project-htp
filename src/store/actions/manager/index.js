import { managerConstant } from "../../constants";
import { managerService } from "../../../services";
import { modalAction } from "../modal";
// import { useSelector } from "react-redux";

const getAllManagers = (data) => {
  const success = (managers) => ({
    type: managerConstant.ALL_MANAGERS,
    managers,
  });
  const failure = (error) => ({ type: managerConstant.LOGIN_FAILURE, error });

  return (dispatch) => {
    managerService
      .getManager(data)
      .then((res) =>
        res && res.status === 200
          ? dispatch(success({ data: res.data }))
          : dispatch(failure(res.response.data.message))
      )
      .catch((error) => dispatch(failure(error.toString())));
  };
};

const GET_FILTERED_MANAGERS = (path, data, setLoad) => {
  return (dispatch) => {
    managerService
      .searchManagers(path)
      .then((res) => {
        setLoad(false);
        dispatch({
          type: managerConstant.GET_FILTERED_MANAGERS,
          payload: res?.data?.managers,
          data: data ? data : [],
        });
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err.response.data.message,
          })
        )
      );
  };
};

const RESET_SEARCH = () => {
  return (dispatch) => {
    dispatch({ type: managerConstant.RESET_SEARCH });
  };
};

const managerStatus = (id, setDisabled, i) => {
  const success = (status, i) => ({
    type: managerConstant.MANAGER_STATUS,
    status,
    index: i,
  });
  const loader = (i) => ({
    type: managerConstant.LOADER,
    index: i,
  });
  return (dispatch) => {
    dispatch(loader(i));
    managerService
      .managerStatus(id)
      .then((res) => {
        setDisabled(false);
        res.status === 200 ? dispatch(success({ data: res.data })) : null;
      })
      .catch((err) => {
        setDisabled(false);
        return err;
      });
  };
};

const getManagersMidLocations = () => {
  const success = (managerMidLocations) => ({
    type: managerConstant.MANAGER_MID_LOCATION,
    managerMidLocations,
  });
  return (dispatch) => {
    managerService
      .getManagerLocation()
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(success({ data: res.data }));
        }
      })
      .catch((error) => {
        return error;
      });
  };
};

const locations = (mid) => {
  return { type: managerConstant.LOCATIONS, Mid: mid };
};

const getAllManagersNameId = () => {
  const success = (managers) => ({
    type: managerConstant.GET_MANAGER_NAME_ID,
    managers,
  });
  // const failure = (error) => ({ type: managerConstant.LOGIN_FAILURE, error });

  return (dispatch) => {
    managerService
      .getAdminManagerNameId()
      .then((res) => {
        if (res.status === 200) {
          dispatch(success({ data: res.data }));
        } else {
          // dispatch(failure(res.response.data));
          console.log("failure >", res.response.data.message);
        }
      })
      .catch(
        (error) => console.log("error ", error)
        // dispatch(failure(error.toString()))
      );
  };
};

export const managerAction = {
  getAllManagers,
  managerStatus,
  getManagersMidLocations,
  locations,
  GET_FILTERED_MANAGERS,
  RESET_SEARCH,
  getAllManagersNameId,
};
