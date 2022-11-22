import { API, Headers } from "../config/api";

const getManagerCharts = () =>
  API.get("/api/manager/chart/basic", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getManagerPatientCharts = () =>
  API.get("/api/manager/chart/patient-by-months", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getAdminCharts = () =>
  API.get(
    "/api/admin/chart/basic",

    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);

const getAdminPatientCharts = () =>
  API.get("/api/admin/chart/patient-by-month", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getManagerChartsByDate = (data) =>
  API.get(`/api/manager/chart/date?from=${data.from}&to=${data.to}`)
    .then((res) => res)
    .catch((err) => err);

const getAdminChartsByDate = (data) =>
  API.get(`/api/admin/chart/date?from=${data.from}&to=${data.to}`)
    .then((res) => res)
    .catch((err) => err);

export const chartsService = {
  getManagerCharts,
  getManagerPatientCharts,
  getAdminCharts,
  getAdminPatientCharts,
  getManagerChartsByDate,
  getAdminChartsByDate,
};
