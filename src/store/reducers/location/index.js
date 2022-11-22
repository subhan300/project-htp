import { locationConstant } from "../../constants";

const initalState = {
  getAllLocations: [],
  managerId: [],
  isLocationExist: undefined,
};
export const location = (state = initalState, action) => {
  switch (action.type) {
    case locationConstant.GET_ALL_LOCATIONS:
      return {
        ...state,
        getAllLocations: action.location.allLocations,
        locationLength: action.location.length,
      };
    case locationConstant.GET_LOCATION:
      return {
        ...state,
        getLocation: action.location.location,
      };
    case locationConstant.DELETE_LOCATION:
      return {
        ...state,
        getAllLocations: state.getAllLocations.filter(
          (val) => val._id != action.id
        ),
      };
    case locationConstant.GET_ALL_ADMIN_LOCATIONS:
      return {
        ...state,
        getAllLocations: action.location.locations,
        locationLength: action.location.length,
      };
    case locationConstant.DELETE_ADMIN_LOCATION:
      return {
        ...state,
        getAllLocations: state.getAllLocations.filter(
          (val) => val._id != action.id
        ),
      };
    case locationConstant.GET_MANAGER_SEARCH_LOACTION:
      return {
        ...state,
        getAllLocations: action.location.allLocations,
        // locationLength: action.location.allLocations.length,
      };
    case locationConstant.IS_LOCATION_EXIST:
      return {
        ...state,
        isLocationExist: action.locationExist,
      };
    case locationConstant.GET_MANAGER_ID:
      return {
        ...state,
        managerId: action.managers.data.managers,
      };
    default:
      return state;
  }
};
