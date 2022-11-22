import { API, Headers } from "../config";
const getTestTypes = () =>
  API.get("/api/test/get-user-test-type", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getAdminTestTypes = () =>
  API.get("/api/test/get-user-test-type", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const addTestTypes = (data) =>
  API.post(`/api/test/add-user-test-type`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const deleteTest = (name) => {
  return API.delete(`/api/test/delete-user-test-type?name=${name}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
};
const adminDeleteTest = (name, id) => {
  return API.delete(`/api/test/delete-user-test-type?name=${name}&id=${id}`, {
    headers: Headers(localStorage.getItem("token")),
    data: { _id: id },
  })
    .then((res) => res)
    .catch((err) => err);
};
const deleteTestType = (id, types) => {
  return API.delete(`/api/test/delete-test-type`, {
    headers: Headers(localStorage.getItem("token")),
    data: { _id: id, types },
  })
    .then((res) => res)
    .catch((err) => err);
};

const updateTestTypes = (data) => {
  return API.put(`/api/test/update-user-test-type`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
};

const getFormFields = () =>
  API.get("/api/manager/patient/get-form", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const getTestTypesChart = () =>
  API.get("/api/manager/chart/test-type-chart", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const addTestForSpecificLocation = (data, id) =>
  API.post(`/api/manager/location/add-new-test/${id}`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const deleteTestForSpecificLocation = (id, name) => {
  console.log("id", { id: id, name });
  return API.delete(`/api/manager/location/delete-test?id=${id}&name=${name}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
};

const updateTestTypesForSpecificLocation = (data) => {
  return API.put(`/api/manager/location/update-test`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
};

export const testTypeService = {
  getTestTypes,
  addTestTypes,
  updateTestTypes,
  deleteTest,
  updateTestTypesForSpecificLocation,
  deleteTestType,
  getFormFields,
  getTestTypesChart,
  addTestForSpecificLocation,
  deleteTestForSpecificLocation,
  getAdminTestTypes,
  adminDeleteTest,
};
