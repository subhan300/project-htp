import { API, Headers } from "../config/api";

const vendorSignup = (data) =>
  API.post("/api/manager/vendor/create", data, { headers: Headers() })
    .then((res) => res)
    .catch((err) => err);

export const vendorService = {
  vendorSignup,
};
