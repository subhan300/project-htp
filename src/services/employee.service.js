import { API, Headers } from "../config/api";

const getEmployeeType = () =>
  API.get("api/auth/get-employees")
    .then((res) => res)
    .catch((err) => err);
const getFilteredEmployees = (path) =>
  API.get(`/api/manager/search-employee/query?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const getAllEmployees = (length) => {
  console.log("length", length);
  return API.get(
    `/api/manager/employee/get-employees?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);
};
const employeeStatus = (id) =>
  API.put(
    `api/manager/employee/approve-employees/${id}`,
    {},
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

const getManagerChartEmployees = () =>
  API.get("/api/manager/chart/employee", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

export const employeeService = {
  getEmployeeType,
  getAllEmployees,
  employeeStatus,
  getFilteredEmployees,
  getManagerChartEmployees,
};
