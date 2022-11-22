import { API, Headers } from "../config";

const getAllLocations = () =>
  API.get("/api/manager/location/get-all-location", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => {
      err;
    });
const getLocation = (locationId) =>
  API.get(`/api/public/get-location?location_id=${locationId}`)
    .then((res) => res)
    .catch((err) => err);
// /api/manager/location/create
const createLocation = (data) =>
  API.post(`/api/manager/location/create`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

const updateLocation = (data, id) => {
  return API.put(`/api/manager/location/update/${id}`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
};

const deleteLocation = (id) => {
  return API.delete(`/api/manager/location/delete-location`, {
    headers: Headers(localStorage.getItem("token")),
    data: { _id: id },
  })
    .then((res) => res)
    .catch((err) => err);
};

const getAllAdminLocations = (length) =>
  API.get(
    `/api/admin/manager/get-managers-locations?page=${length ? length : "0"}`,
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => {
      err;
    });

const deleteAdminLocation = (id) => {
  return API.delete(`/api/manager/location/delete-location`, {
    headers: Headers(localStorage.getItem("token")),
    data: { _id: id },
  })
    .then((res) => res)
    .catch((err) => err);
};

const updateAdminLocation = (data, id) => {
  return API.put(`/api/manager/location/update/${id}`, data, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
};

const getManagerSearchLocation = (id) =>
  API.get(`/api/admin/manager/get-location?manager_id=${id}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
export const locationService = {
  getAllLocations,
  createLocation,
  getLocation,
  updateLocation,
  deleteLocation,
  deleteAdminLocation,
  updateAdminLocation,
  getAllAdminLocations,
  getManagerSearchLocation,
};
