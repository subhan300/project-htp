import { API, Headers } from "../config/api";

const getTypes = (data) =>
  API.get(
    "user/get-user-types",
    {
      headers: Headers(localStorage.getItem("token")),
    },
    data
  )
    .then((res) => res)
    .catch((err) => err);

export const typesService = {
  getTypes,
};
