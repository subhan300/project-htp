import { employeeConstant } from "../../constants";
import { Spinner } from "../../../components";

export const employees = (
  state = {
    employeesList: [],
    allEmployees: [],
    employeesCopy: [],
    allManagerEmployees: [],
    circularChart: [],
  },
  action
) => {
  switch (action.type) {
    case employeeConstant.GET_EMPLOYEE:
      return {
        ...state,
        employeesList: action.employees.data.employees,
      };
    case employeeConstant.GET_ALL_EMPLOYEE:
      return {
        allEmployees: action.employees.data.employeeArray,
        collectedEmpoyeeLength: action.employees.data.length,
      };
    case employeeConstant.EMPLOYEE_STATUS:
      state.allEmployees.filter((m) => {
        return m._id == action.status.data.employee._id;
      })[0].status = action.status.data.employee.status;

      return {
        ...state,

        allEmployees: [...state.allEmployees],
      };

    case employeeConstant.GET_FILTERED_EMPLOYEES:
      return {
        ...state,
        employeesCopy: action.data,
        allEmployees: action.payload,
      };
    case employeeConstant.RESET_SEARCH:
      return {
        ...state,
        allEmployees: state.employeesCopy,
        employeesCopy: [],
      };

    case employeeConstant.LOADER:
      state.allEmployees[action.index].status = (
        <div style={{ marginLeft: "1rem", backgroundColor: "#fff00" }}>
          <Spinner />
        </div>
      );
      return {
        ...state,

        allEmployees: [...state.allEmployees],
      };
    case employeeConstant.GET_ALL_MANAGER_EMPLOYEES:
      return {
        ...state,
        allManagerEmployees: [...action.employees?.data?.employeeChartArr],
        collectedEmpoyeeLength: action.employees.data.length,
      };
    default:
      return state;
  }
};
