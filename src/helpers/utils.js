// import jwtDecode from "jwt-decode";
const isAuth = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  //   const decoded = auth?.token && jwtDecode(auth.token);
  //   const now = new Date();
  //   if (decoded && now.getTime() < decoded.exp * 1000) {
  //     return true;
  //   }
  if (auth?.token) {
    return true;
  }
  return false;
};
export const utils = {
  isAuth,
};
