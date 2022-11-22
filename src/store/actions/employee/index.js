import { employeeConstant } from "../../constants";
import { employeeService } from "../../../services";
import { modalAction } from "../modal";

const getEmployeeType = () => {
  const success = (employees) => ({
    type: employeeConstant.GET_EMPLOYEE,
    employees,
  });

  return (dispatch) => {
    employeeService
      .getEmployeeType()
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(success({ data: res.data }));
        }
      })
      .catch((err) => {
        dispatch(
          modalAction.error({ title: "Error", content: err.response.data })
        );
      });
  };
};
const getAllEmployees = (data) => {
  const success = (employees) => ({
    type: employeeConstant.GET_ALL_EMPLOYEE,
    employees,
  });

  return (dispatch) => {
    employeeService
      .getAllEmployees(data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(success({ data: res.data }));
        }
      })
      .catch((error) =>
        dispatch(
          modalAction.error({ title: "Error", content: error.response.data })
        )
      );
  };
};
const employeeStatus = (id, setDisabled, i) => {
  const success = (status, i) => ({
    type: employeeConstant.EMPLOYEE_STATUS,
    status,
    index: i,
  });
  const loader = (i) => ({
    type: employeeConstant.LOADER,
    index: i,
  });
  return (dispatch) => {
    dispatch(loader(i));
    employeeService
      .employeeStatus(id)
      .then((res) => {
        setDisabled(false);

        dispatch(success({ data: res.data }, i));
      })
      .catch((err) => {
        setDisabled(false);

        return err;
      });
  };
};

const GetFilteredEmployees = (path, data, setLoad) => {
  return (dispatch) => {
    employeeService
      .getFilteredEmployees(path)
      .then((res) => {
        setLoad(false);
        dispatch({
          type: employeeConstant.GET_FILTERED_EMPLOYEES,
          payload: res?.data?.employees,
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
    dispatch({ type: employeeConstant.RESET_SEARCH });
  };
};

// const getManagerChartEmployees = () => {
//   const success = (employees) => ({
//     type: employeeConstant.GET_ALL_MANAGER_EMPLOYEES,
//     employees,
//   });

//   return (dispatch) => {
//     employeeService
//       .getManagerChartEmployees()
//       .then((res) => {
//         if (res.status === 200) {
//           console.log("res", res.data);
//           dispatch(success({ data: res.data }));
//         } else {
//           console.log("dont know");
//         }
//       })
//       .catch((error) => console.log(error.response.data));
//   };
// };
const getManagerChartEmployees = () => {
  const success = (employees) => ({
    type: employeeConstant.GET_ALL_MANAGER_EMPLOYEES,
    employees,
  });

  return (dispatch) => {
    employeeService
      .getManagerChartEmployees()
      .then((res) => {
        if (res.status === 200) {
          dispatch(success({ data: res.data }));
        }
      })
      .catch((error) => console.log(error.response.data));
  };
};

export const employeeAction = {
  getEmployeeType,
  getAllEmployees,
  employeeStatus,
  GetFilteredEmployees,
  RESET_SEARCH,
  getManagerChartEmployees,
};
