import { chartsConstant } from "../../constants";
import { chartsService } from "../../../services";
import { modalAction } from "../modal";

const managerCharts = (setManagerChartsLoader) => {
  const success = (managerCharts) => ({
    type: chartsConstant.GET_MANAGER_CHARTS,
    managerCharts,
  });
  return (dispatch) =>
    chartsService
      .getManagerCharts()
      .then((res) => {
        setManagerChartsLoader(false);

        if (res.status === 200) {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((error) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: error.response.data.message,
          })
        )
      );
};

const managerPatientCharts = (setLoader) => {
  const success = (patientCharts) => ({
    type: chartsConstant.GET_MANAGER_PATIENT_CHARTS,
    patientCharts,
  });
  //   const failure = (error) => ({ type: chartsConstant.LOGIN_FAILURE, error });
  return (dispatch) =>
    chartsService
      .getManagerPatientCharts()
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((error) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: error.response.data.message,
          })
        )
      );
};

const adminCharts = (setLoader, abortController) => {
  console.log(abortController);
  const success = (adminCharts) => ({
    type: chartsConstant.GET_ADMIN_CHARTS,
    adminCharts,
  });
  //   const failure = (error) => ({ type: chartsConstant.LOGIN_FAILURE, error });
  return (dispatch) =>
    chartsService
      .getAdminCharts()
      .then((res) => {
        if (res.status === 200) {
          // console.log("abort", abortController, "object", abortController);
          setLoader(false);
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((error) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: error,
          })
        )
      );
};

const adminPatientCharts = (setLoader) => {
  const success = (patientCharts) => ({
    type: chartsConstant.GET_ADMIN_PATIENT_CHARTS,
    patientCharts,
  });
  //   const failure = (error) => ({ type: chartsConstant.LOGIN_FAILURE, error });
  return (dispatch) =>
    chartsService
      .getAdminPatientCharts()
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((error) =>
        dispatch(modalAction.error({ title: "Error", content: error }))
      );
};
const getMedicalProfeesionalCharts = () => {
  return (dispatch) => {
    chartsService
      .getMedicalProfeesionalCharts()
      .then((res) =>
        res?.status === 200
          ? dispatch({
              type: chartsConstant.GET_MEDICAL_PROFESSIONAL_CHARTS,
              data: res?.data,
            })
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res.response.data.message,
              })
            )
      )
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err.response.data.message,
          })
        )
      );
  };
};

const getManagerChartsByDate = (data, setManagerChartsLoader, setLoader) => {
  return (dispatch) => {
    chartsService.getManagerChartsByDate(data).then((res) => {
      setManagerChartsLoader(false);
      setLoader(false);
      if (res.status === 200) {
        dispatch({
          type: chartsConstant.GET_MANAGER_CHARTS,
          managerCharts: res?.data,
        });
      } else {
        dispatch(
          modalAction.error({
            title: "Error",
            content: res.response.data.message,
          })
        );
      }
    });
  };
};
const getMedicalProfeesionalChartsByDate = (data) => {
  return (dispatch) => {
    chartsService
      .getMedicalProfeesionalChartsByDate(data)
      .then((res) =>
        res?.status === 200
          ? dispatch({
              type: chartsConstant.GET_MEDICAL_PROFESSIONAL_CHARTS,
              data: res?.data,
            })
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res.response.data.message,
              })
            )
      )
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err.response.message,
          })
        )
      );
  };
};

const getAdminChartsByDate = (data, setAdminChartsLoader, setLoader) => {
  return (dispatch) => {
    chartsService
      .getAdminChartsByDate(data)
      .then((res) => {
        setAdminChartsLoader(false);
        setLoader(false);
        if (res.status === 200) {
          dispatch({
            type: chartsConstant.GET_ADMIN_CHARTS,
            adminCharts: res?.data,
          });
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((error) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: error,
          })
        )
      );
  };
};
const getPatientsByMonthChart = () => {
  const success = (patients) => {
    return { type: chartsConstant.GET_PATIENTS_BY_MONTH_CHART, patients };
  };
  return (dispatch) => {
    chartsService
      .getPatientsByMonthChart()
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Failed to get patient",
              content: res.response.data.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err.response,
          })
        )
      );
  };
};
export const chartsAction = {
  managerCharts,
  managerPatientCharts,
  adminCharts,
  adminPatientCharts,
  getManagerChartsByDate,
  getAdminChartsByDate,
  getMedicalProfeesionalCharts,
  getMedicalProfeesionalChartsByDate,
  getPatientsByMonthChart,
};
