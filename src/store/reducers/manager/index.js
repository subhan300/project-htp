import { managerConstant } from "../../constants";
import { Spinner } from "../../../components";

const initialState = {
  status: "pending",
  managers: [],
  managersMidAndLocation: [],
  locations: [],
  managersCopy: [],
  managerNameId: [],
};

export const manager = (state = initialState, action) => {
  switch (action.type) {
    case managerConstant.ALL_MANAGERS:
      return {
        ...state,
        managers: action.managers.data.managersArray,
        collectedManagersLength: action.managers.data.length,
      };
    case managerConstant.GET_FILTERED_MANAGERS:
      return {
        ...state,
        managersCopy: action.data,
        managers: action.payload,
      };
    case managerConstant.RESET_SEARCH:
      return {
        ...state,
        managers: state.managersCopy,
        managersCopy: [],
      };
    case managerConstant.MANAGER_STATUS:
      state.managers.filter((m) => {
        return m._id == action.status.data.manager._id;
      })[0].status = action.status.data.manager.status;

      return {
        ...state,

        managers: [...state.managers],
      };

    case managerConstant.MANAGER_MID_LOCATION:
      return {
        ...state,
        managersMidAndLocation:
          action.managerMidLocations.data.managersMidAndLocation,
      };

    case managerConstant.LOADER:
      state.managers[action.index].status = (
        <div style={{ marginLeft: "1rem", backgroundColor: "#fff00" }}>
          {" "}
          <Spinner />
        </div>
      );
      return {
        ...state,

        managers: [...state.managers],
      };
    case managerConstant.LOCATIONS:
      return {
        ...state,
        locations: state.managersMidAndLocation?.filter(
          (m) => m.mid == action.Mid
        )[0]?.manager_location,
      };

    case managerConstant.GET_MANAGER_NAME_ID:
      return {
        ...state,
        managerNameId: action.managers.data.managers,
      };
    default:
      return initialState;
  }
};
