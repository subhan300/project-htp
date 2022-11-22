import { API, Headers } from "../config/api";
const getManager = () =>
  API.get("/api/admin/manager/get-managers", {
    headers: Headers(localStorage.getItem("token")),
  })
    .then((res) => res)
    .catch((err) => err);
export const adminService = { getManager };
