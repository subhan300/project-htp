import { authConstants } from "../../constants";
import { authService } from "../../../services";
import { modalAction } from "../../actions";

const signup = (data, navigate, disable, setLoad) => {
  const request = () => ({ type: authConstants.SIGNUP_REQUEST });
  const success = (loggedInUser) => ({
    type: authConstants.SIGNUP_SUCCESS,
    loggedInUser,
  });

  const failure = (error) => ({ type: authConstants.SIGNUP_FAILURE, error });
  return (dispatch) => {
    dispatch(request());
    authService
      .signUp(data)
      .then((res) => {
        disable(false);
        if (res.status === 200) {
          setLoad(false);
          localStorage.setItem("auth", JSON.stringify(res.data));
          dispatch(success({ role: res.data }));
          dispatch(
            modalAction.success({
              title: "Signup Success!",
              content:
                "Thank you for signing up.\n An admin will review your information and send you a confirmation approval email shortly.",
            })
          );
          navigate("/");
        } else {
          setLoad(false);
          dispatch(failure(res?.response?.data?.message));
          dispatch(
            modalAction.warning({
              title: "Signup failed",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((error) => {
        setLoad(false);
        disable(false);
        dispatch(failure(error.toString()));
        dispatch(
          modalAction.error({
            title: error.toString(),
          })
        );
      });
  };
};

const login = (login_details, setLoad, signInType, navigate) => {
  const request = () => ({ type: authConstants.LOGIN_REQUEST });
  const success = (loggedInUser) => ({
    type: authConstants.LOGIN_SUCCESS,
    loggedInUser,
  });
  const failure = (error) => ({ type: authConstants.LOGIN_FAILURE, error });
  const saveData = (res, dispatch) => {
    localStorage.setItem("auth", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("uid", res.data.user._id);
    dispatch(success({ data: res.data }));
  };
  return (dispatch) => {
    dispatch(request());
    authService
      .login(login_details)
      .then((res) => {
        if (res && res.status === 200) {
          setLoad(false);
          if (signInType === "Asins") {
            navigate("/otp", {
              state: {
                type: "verification",
                userType: "admin",
                email: login_details.email,
              },
            });
          } else if (signInType === "Manager") {
            navigate("/otp", {
              state: {
                type: "verification",
                userType: "manager",
                email: login_details.email,
              },
            });
          } else if (signInType === res.data?.user?.type?.type) {
            saveData(res, dispatch);
            signInType === "Vendor"
              ? navigate("/htp/vendor")
              : signInType === "Medical Profession"
              ? navigate("/htp/MedicalProfession")
              : signInType === "Lab Technician"
              ? navigate("/htp/LabTechnician")
              : null;
          }
        } else {
          setLoad(false);
          dispatch(failure(res?.response?.data?.message));
          dispatch(
            modalAction.error({
              title: "Signin Failed 1",
              content: (
                <p className="text-lg">{res?.response?.data?.message}</p>
              ),
            })
          );
        }
      })
      .catch((err) => {
        setLoad(false);
        dispatch(failure(err));
        dispatch(
          modalAction.error({
            title: "Signin Failed",
            content: err,
          })
        );
      });
  };
};
const verification = (data, type, navigate, setLoading) => {
  const success = (loggedInUser) => ({
    type: authConstants.LOGIN_SUCCESS,
    loggedInUser,
  });
  return (dispatch) => {
    authService
      .verify(data)
      .then((res) => {
        setLoading(false);
        if (res && res?.data?.status === 200) {
          localStorage.setItem("auth", JSON.stringify(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.user._id);
          dispatch(success({ data: res.data }));

          dispatch(
            modalAction.success({
              title: "Verification code is sent",
            })
          );
          type === "admin" ? navigate("/htp/Asins") : navigate("/htp/manager");
        } else if (res?.response?.data?.message) {
          dispatch(
            modalAction.warning({
              title: res?.response?.data?.message,
            })
          );
          return;
        }
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          modalAction.error({ type: "error", title: "Something went wrong." })
        );
      });
  };
};
const forgetPassword = (data, navigate, setLoading) => {
  return (dispatch) => {
    authService
      .forgetPassword(data)
      .then((res) => {
        setLoading(false);
        if (res && res?.data?.status === 200) {
          dispatch(
            modalAction.success({
              title: "Verification code is sent",
            })
          );
          navigate("/otp", {
            state: { data: data, Otp: true, type: "forget" },
          });
        } else if (res?.response?.data?.message) {
          dispatch(
            modalAction.warning({
              title: res?.response?.data?.message,
            })
          );
          return;
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(modalAction.error({ title: err }));
      });
  };
};

const otpCheck = (data, navigate, setLoading) => {
  return (dispatch) => {
    authService
      .confirmOtp(data)
      .then((res) => {
        setLoading(false);
        if (res && res?.data?.status === 200) {
          // dispatch(
          //   modalAction.success({
          //     title: "OTP Verified",
          //   })
          // );
          navigate("/reset-password", { state: { data: data, otp: true } });
        } else if (res?.response?.data?.message) {
          dispatch(
            modalAction.warning({
              title: res?.response?.data?.message,
            })
          );
          return;
        }
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          modalAction.error({ type: "error", title: "Something went wrong." })
        );
      });
  };
};
const resetPassword = (data, navigate, setLoading) => {
  return (dispatch) => {
    authService
      .resetPassword(data)
      .then((res) => {
        setLoading(false);
        if (res && res?.data?.status === 200) {
          dispatch(
            modalAction.success({
              title: "Password reset successfully",
            })
          );
          navigate("/");
        } else if (res.data?.message) {
          dispatch(
            modalAction.error({
              type: "warning",
              title: res?.data?.message,
            })
          );
          return;
        }
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          modalAction.show({ type: "error", title: "Something went wrong." })
        );
      });
  };
};

const signout = () => ({ type: authConstants.LOGOUT });
export const authActions = {
  login,
  signup,
  verification,
  forgetPassword,
  otpCheck,
  resetPassword,
  signout,
};
