import { API, Headers } from "../config";

const getManager = (length) =>
  API.get(`/api/admin/manager/get-managers?page=${length ? length : "0"}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const searchManagers = (path) =>
  API.get(`/api/admin/search-manager/query?${path}`, {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

const managerStatus = (id) =>
  API.put(
    `/api/admin/manager/approve-manager/${id}`,
    {},
    {
      headers: Headers(localStorage.getItem("token")),
    }
  )
    .then((res) => res)
    .catch((err) => err);

const getManagerLocation = () =>
  API.get("/api/auth/get-manager-mid")
    .then((res) => res)
    .catch((err) => err);

const getAdminManagerNameId = () =>
  API.get("/api/admin/manager/name", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);

export const managerService = {
  getManager,
  managerStatus,
  getManagerLocation,
  searchManagers,
  getAdminManagerNameId,
};
