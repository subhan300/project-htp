import { API, Headers } from "../config/api";

const signUp = (data) =>
  API.post("/api/auth/register", data, { headers: Headers() })
    .then((res) => res)
    .catch((err) => err);

const login = (data) =>
  API.post("/api/auth/login", data)
    .then((res) => res)
    .catch((err) => err);

const verify = (data) =>
  API.post("/api/auth/get-verify", data, { headers: Headers() })
    .then((res) => res)
    .catch((err) => err);

const forgetPassword = (data) =>
  API.post("/api/auth/forgetpassword", data, { headers: Headers() })
    .then((res) => res)
    .catch((err) => err);

const confirmOtp = (data) =>
  API.post("/api/auth/confirm-otp", data, { headers: Headers() })
    .then((res) => res)
    .catch((err) => err);

const resetPassword = (data) =>
  API.post("/api/auth/checkpassword", data, { headers: Headers() })
    .then((res) => res)
    .catch((err) => err);

export const authService = {
  signUp,
  login,
  verify,
  forgetPassword,
  confirmOtp,
  resetPassword,
};
