import { locationConstant } from "../../constants";
import { locationService, managerService } from "../../../services";
import { modalAction } from "..";
// import { managerAction } from "../manager";

const createLocation = (data) => {
  return (dispatch) => {
    locationService
      .createLocation(data)
      .then(() => {
        dispatch(getAllLocations());
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

const getAllLocations = (setLoad) => {
  const success = (location) => ({
    type: locationConstant.GET_ALL_LOCATIONS,
    location,
  });
  return (dispatch) => {
    locationService
      .getAllLocations()
      .then((res) => {
        setLoad(false);
        if (res.status == "200") {
          dispatch(success(res.data));
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.allLocations.length === 0 ? false : true,
          });
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        )
      );
  };
};

const getLocation = (locationId) => {
  const success = (location) => ({
    type: locationConstant.GET_LOCATION,
    location,
  });
  return (dispatch) => {
    locationService
      .getLocation(locationId)
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
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

const updateLocation = (data, id, setLoad, message) => {
  return (dispatch) => {
    locationService
      .updateLocation(data, id)

      .then((res) => {
        setLoad(false);
        if (res.status == "200") {
          message.success("updated successfully");
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.locations.length === 0 ? false : true,
          });
        } else {
          message.error("not updated !");
        }
      })
      .catch((err) => err);
  };
};

const deleteLocation = (id, message) => {
  const success = (id) => {
    return { type: locationConstant.DELETE_LOCATION, id };
  };
  return (dispatch) => {
    locationService
      .deleteLocation(id)

      .then((res) => {
        if (res.status == "200") {
          dispatch(success(id));
          dispatch(
            modalAction.success({
              title: "Location Deleted",
              content: `Location Id : ${id}  `,
            })
          );
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.locations.length === 0 ? false : true,
          });
        } else {
          message.error("not Deleted !");
          dispatch(modalAction.error({ title: "Error in Delete Loctaion" }));
        }
      })
      .catch((err) => err);
  };
};

const getAllAdminLocations = (data, setLoad) => {
  const success = (location) => ({
    type: locationConstant.GET_ALL_ADMIN_LOCATIONS,
    location,
  });

  return (dispatch) => {
    locationService
      .getAllAdminLocations(data)

      .then((res) => {
        if (setLoad) {
          setLoad(false);
        }
        if (res.status == "200") {
          dispatch(success(res.data));
          dispatch({ type: locationConstant.IS_LOADER, isLoader: false });
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.locations.length === 0 ? false : true,
          });
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        );
      });
  };
};

const deleteAdminLocation = (id, message) => {
  const success = (id) => {
    return { type: locationConstant.DELETE_ADMIN_LOCATION, id };
  };
  return (dispatch) => {
    locationService
      .deleteAdminLocation(id)

      .then((res) => {
        if (res.status == "200") {
          dispatch(success(id));
          dispatch(
            modalAction.success({
              title: "Location Deleted",
              content: `Location Id : ${id}  `,
            })
          );
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.locations.length === 0 ? false : true,
          });
        } else {
          message.error("not Deleted !");
          dispatch(modalAction.error({ title: "Error in Delete Loctaion" }));
        }
      })
      .catch((err) => err);
  };
};

const updateAdminLocation = (data, id, setLoad, message) => {
  return (dispatch) => {
    locationService
      .updateAdminLocation(data, id)

      .then((res) => {
        setLoad(false);
        if (res.status == "200") {
          message.success("updated successfully");
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.locations.length === 0 ? false : true,
          });
        } else {
          message.error("not updated !");
        }
      })
      .catch((err) => err);
  };
};

const getManagerSearchLocation = (id, setLoad) => {
  const success = (location) => ({
    type: locationConstant.GET_MANAGER_SEARCH_LOACTION,
    location,
  });

  return (dispatch) => {
    locationService
      .getManagerSearchLocation(id)

      .then((res) => {
        setLoad(false);
        console.log("res", res);
        if (res.status == "200") {
          dispatch(success(res.data));
          dispatch({
            type: locationConstant.IS_LOCATION_EXIST,
            locationExist: res.data.allLocations.length === 0 ? false : true,
          });
          // managerAction.getAllManagersNameId();
        } else {
          console.log("error");
        }
      })
      .catch((err) => err);
  };
};

const getAllManagersNameIdL = () => {
  const success = (managers) => ({
    type: locationConstant.GET_MANAGER_ID,
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

export const locationAction = {
  getAllLocations,
  deleteLocation,
  createLocation,
  updateLocation,
  getLocation,
  getAllAdminLocations,
  updateAdminLocation,
  deleteAdminLocation,
  getManagerSearchLocation,
  getAllManagersNameIdL,
};
