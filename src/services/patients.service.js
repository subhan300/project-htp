import { API, Headers } from "../config/api";

const getUncollectedPatients = (length) =>
  API.get(
    `/api/employee/patient/get-uncollected-patient?page=${
      length ? length : "0"
    }`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);
const getCollectedPatients = (length) =>
  API.get(
    `/api/employee/patient/get-collected-patient?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);
const getRapidPatients = (length) =>
  API.get(
    `/api/employee/patient/get-rapid-patient?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);
const getAllTestedPatients = (length) =>
  API.get(
    `/api/employee/patient/get-tested-patient?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);
const addPatient = (data) =>
  API.post("/api/employee/patient/add-patient", data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const sendResult = (data) =>
  API.post("/api/employee/patient/fire-rapid-patient", data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const deletePatient = (data) =>
  API.delete("/api/employee/patient/delete-patient", {
    headers: Headers(localStorage.getItem("token")),
    data: data,
  })
    .then((res) => res)
    .catch((err) => err);
const updatePateint = (data, id) =>
  API.put(`/api/employee/patient/update-patient/${id}`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const managerPatientUpdate = (data, id) =>
  API.put(`/api/manager/patient/update-location-patient/${id}`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const requiredField = () =>
  API.get("/api/employee/patient/get-required-fields", {
    headers: Headers(localStorage.getItem("token")),
  });
const getAllPatients = (length) => {
  return API.get(
    `/api/manager/patient/get-location-patient?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);
};
const getFilteredPatients = (path) =>
  API.get(`/api/manager/patient/search-patient?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const getFilteredCollectedPatients = (path) =>
  API.get(`/api/employee/patient/search-collected?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const getFilteredUncollectedPatients = (path) =>
  API.get(`/api/employee/patient/search-uncollected?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const getFilteredRapidPatients = (path) =>
  API.get(`/api/employee/patient/search-rapid?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const getFilteredTestedPatients = (path) =>
  API.get(`/api/employee/patient/search-tested?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const recreatePatient = (data) =>
  API.post(`/api/employee/patient/re-test-patient`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const managerDeletePatient = (data) =>
  API.delete("/api/manager/patient/delete-location-patient", {
    headers: Headers(localStorage.getItem("token")),
    data: data,
  })
    .then((res) => res)
    .catch((err) => err);
const deleteAdminPatient = (data) =>
  API.delete("/api/admin/patient/delete-location-patient", {
    headers: Headers(localStorage.getItem("token")),
    data: data,
  })
    .then((res) => res)
    .catch((err) => err);
const updateAdminPateint = (data, id) =>
  API.put(`/api/admin/patient/update-location-patient/${id}`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const getAdminAllPatients = (length) => {
  return API.get(
    `api/admin/patient/get-all-location-patients?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )

    .then((res) => res)
    .catch((err) => err);
};
const getManagerAllPatientsForCharts = () =>
  API.get(`api/manager/chart/circular`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getManagerPatientsComparisionCharts = () =>
  API.get(`/api/manager/chart/patient-by-months`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getAdminFilteredPatients = (path) =>
  API.get(`/api/admin/patient/search?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
const sendEmail = (data) =>
  API.post(`/api/employee/patient/send-email`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

export const patientService = {
  getUncollectedPatients,
  getCollectedPatients,
  getRapidPatients,
  getAllTestedPatients,
  addPatient,
  sendResult,
  getAllPatients,
  deletePatient,
  getAdminFilteredPatients,
  updatePateint,
  requiredField,
  getFilteredPatients,
  getFilteredCollectedPatients,
  getFilteredUncollectedPatients,
  getFilteredRapidPatients,
  getFilteredTestedPatients,
  managerPatientUpdate,
  recreatePatient,
  managerDeletePatient,
  deleteAdminPatient,
  updateAdminPateint,
  getAdminAllPatients,
  getManagerAllPatientsForCharts,
  getManagerPatientsComparisionCharts,
  sendEmail,
};
