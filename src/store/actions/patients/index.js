import { patientConstant } from "../../constants";
import { patientService } from "../../../services";
import { modalAction } from "..";

const getPatientForm = () => {
  const success = (requiredFields) => ({
    type: patientConstant.GET_REQUIRED_FIELD,
    requiredFields,
  });

  return (dispatch) => {
    patientService
      .requiredField()
      .then((res) => {
        res.status === 200
          ? dispatch(success(res.data.employee_location))
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res.response.data.message,
              })
            );
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Something went Wrong!",
            content: error,
          })
        );
      });
  };
};
const createPatient = (data, setLoading, navigate) => {
  setLoading(true);
  return (dispatch) =>
    patientService
      .addPatient(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            modalAction.success({
              title: "Patient Created Successfully",
              content: `Patient Id : ${res.data.patient_created.pid}`,
            })
          );
          navigate("/htp/MedicalProfession/uncollected");
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res.response.data.message,
            })
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Error",
            content: error,
          })
        );
        setLoading(false);
      });
};
const getUncollectedPatients = (data) => {
  const success = (patients) => {
    return { type: patientConstant.UNCOLLECTED_PATIENTS, patients };
  };
  return (dispatch) => {
    patientService
      .getUncollectedPatients(data)
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Get Uncollected Patient Failed",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        )
      );
  };
};
const getCollectedPatients = (data) => {
  const success = (patients) => {
    return { type: patientConstant.COLLECTED_PATIENTS, patients };
  };
  return (dispatch) => {
    patientService
      .getCollectedPatients(data)
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Get Collected Patient Failed",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        )
      );
  };
};
const getRapidPatients = (data) => {
  const success = (patients) => {
    return { type: patientConstant.RAPID_PATIENTS, patients };
  };
  return (dispatch) => {
    patientService
      .getRapidPatients(data)
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Get Rapid Patient Failed",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        )
      );
  };
};
const getAllTestedPatients = (data) => {
  const success = (patients) => {
    return { type: patientConstant.ALL_TESTED_PATIENTS, patients };
  };
  return (dispatch) => {
    patientService
      .getAllTestedPatients(data)
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Get All Tested Patient Failed",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        )
      );
  };
};
const sendResult = (data, setModal, setLoad) => {
  return (dispatch) => {
    patientService
      .sendResult(data)
      .then((res) => {
        setLoad(false);
        setModal({ result: false, confirm: false });
        if (res.status == "200") {
          dispatch(
            modalAction.success({
              title: "Result Send",
              content: res.data.message,
            })
          );
        } else {
          dispatch(
            modalAction.error({
              title: "Send Result Failed",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err,
          })
        )
      );
  };
};
const deletePatient = (data, openModal, closeModal) => {
  return (dispatch) => {
    patientService
      .deletePatient(data)
      .then((res) => {
        closeModal && closeModal({ ...openModal, deletePatient: false });
        if (res.status == "200") {
          dispatch(
            modalAction.success({
              title: "Patient Deleted Successfully",
              content: `Patient Id : ${data._id}`,
            })
          );
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: `Patient Id : ${res?.response?.data?.message}`,
            })
          );
        }
      })
      .catch((err) => {
        closeModal && closeModal({ ...openModal, deletePatient: false });
        dispatch(
          modalAction.error({
            title: "Error",
            content: `Patient Id : ${err?.response}`,
          })
        );
      });
  };
};
const getFilteredPatients = (path, data, setLoad) => {
  return (dispatch) => {
    patientService
      .getFilteredPatients(path)
      .then((res) => {
        setLoad(false);
        if (res.status == 200) {
          dispatch({
            type: patientConstant.GET_FILTERED_PATIENTS,
            payload: res?.data.queryArr,
            data: data ? data : [],
          });
        } else {
          modalAction.warning({ title: "Error in response" });
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        )
      );
  };
};

const getFilteredAdminPatients = (path, data, setLoad) => {
  return (dispatch) => {
    patientService
      .getAdminFilteredPatients(path)
      .then((res) => {
        setLoad(false);
        if (res.status == 200) {
          dispatch({
            type: patientConstant.GET_FILTERED_PATIENTS,
            payload: res?.data.searchPatient,
            data: data ? data : [],
          });
        } else {
          modalAction.warning({ title: "Error in response" });
        }
      })
      .catch((err) => console.log(err.message));
  };
};
const updatePatient = (data, id, setLoading, setOpenDrawer, response) => {
  return (dispatch) => {
    patientService
      .updatePateint(data, id)
      .then((res) => {
        setOpenDrawer(false);
        setLoading(false);
        if (res.status == "200") {
          dispatch(
            modalAction.success({
              title: response,
            })
          );
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) => {
        setOpenDrawer(false);
        setLoading(false);
        dispatch(
          modalAction.error({
            title: "Error",
            content: err.response,
          })
        );
      });
  };
};
const getAllPatients = (data) => {
  const success = (patients) => {
    return { type: patientConstant.ALL_PATIENTS_INFO, patients };
  };
  return (dispatch) => {
    patientService
      .getAllPatients(data)
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
const RESET_SEARCH = () => {
  return (dispatch) => {
    dispatch({ type: patientConstant.RESET_SEARCH });
  };
};
const resetCollectedSearch = () => {
  return (dispatch) => {
    dispatch({ type: patientConstant.RESET_COLLECTED_SEARCH });
  };
};
const resetUncollectedSearch = () => {
  return (dispatch) => {
    dispatch({ type: patientConstant.RESET_UNCOLLECTED_SEARCH });
  };
};
const resetRapidSearch = () => {
  return (dispatch) => {
    dispatch({ type: patientConstant.RESET_RAPID_SEARCH });
  };
};
const resetTestedSearch = () => {
  return (dispatch) => {
    dispatch({ type: patientConstant.RESET_TESTED_SEARCH });
  };
};
const managerPatientUpdate = (data, id, setLoading) => {
  return (dispatch) => {
    patientService
      .managerPatientUpdate(data, id)
      .then((res) => {
        setLoading(false);
        if (res.status == "200") {
          dispatch(modalAction.success({ title: "Patient Details Updated " }));
          dispatch(getAllPatients());
        } else {
          dispatch(modalAction.error({ title: "Failed To Update Details " }));
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        );
      });
  };
};
const managerDeletePatient = (data) => {
  return (dispatch) => {
    patientService
      .managerDeletePatient(data)

      .then((res) => {
        if (res.status == "200") {
          dispatch(modalAction.success({ title: "Patient Deleted " }));
          dispatch(getAllPatients());
        } else {
          dispatch(modalAction.error({ title: "Failed To Delete Patient " }));
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({ title: `Failed To Delete Patient ${err}` })
        )
      );
  };
};
const adminDeletePatient = (data) => {
  return (dispatch) => {
    patientService
      .managerDeletePatient(data)

      .then((res) => {
        if (res.status == "200") {
          dispatch(modalAction.success({ title: "Patient Deleted " }));
          dispatch(getAdminAllPatients());
        } else {
          dispatch(modalAction.error({ title: "Failed To Delete Patient " }));
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({ title: `Failed To Delete Patient ${err}` })
        )
      );
  };
};
const adminPatientUpdate = (data, id, setLoading) => {
  return (dispatch) => {
    patientService
      .managerPatientUpdate(data, id)
      .then((res) => {
        setLoading(false);
        if (res.status == "200") {
          dispatch(modalAction.success({ title: "Patient Details Updated " }));

          dispatch(getAdminAllPatients());
        } else {
          dispatch(modalAction.error({ title: "Failed To Update Details " }));
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        );
      });
  };
};
const getAdminAllPatients = (data) => {
  const success = (patients) => {
    return { type: patientConstant.ALL_ADMIN_PATIENTS_INFO, patients };
  };
  return (dispatch) => {
    patientService
      .getAdminAllPatients(data)
      .then((res) => {
        if (res.status == "200") {
          dispatch(success(res.data));
        } else {
          dispatch(
            modalAction.error({
              title: "Error",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        )
      );
  };
};
const recreatePatient = (data, clear, setLoading) => {
  return (dispatch) => {
    patientService
      .recreatePatient(data)
      .then((res) => {
        setLoading(false);
        if (res.status == "200") {
          dispatch(
            modalAction.success({
              title: res.data.message,
              content: `Patient is created with pid: ${res?.data?.reCreatePatient?.pid} and Order ID : ${res?.data?.reCreatePatient?.order_no}`,
            })
          );
          clear();
        } else {
          dispatch(
            modalAction.error({
              title: "Patient Not Found!",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(modalAction.error({ title: "Error", content: err }));
      });
  };
};
const sendEmail = (data) => {
  return (dispatch) => {
    patientService
      .sendEmail(data)
      .then((res) => {
        if (res.status == "200") {
          dispatch(
            modalAction.success({
              title: "Result send via mail",
              content: res.data.message,
            })
          );
        } else {
          dispatch(
            modalAction.error({
              title: "Email Not Send!",
              content: res?.response?.data?.message,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(modalAction.error({ title: "Error", content: err }));
      });
  };
};

const getAllManagerPatientsCharts = () => {
  const success = (patients) => {
    return { type: patientConstant.GET_ALL_MANAGER_PATIENTS, patients };
  };
  return (dispatch) => {
    patientService.getManagerAllPatientsForCharts().then((res) => {
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
    });
  };
};
const getfilteredCollectedPatients = (path, data) => {
  return (dispatch) => {
    patientService
      .getFilteredCollectedPatients(path)
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: patientConstant.GET_FILTERED_COLLECTED_PATIENTS,
            payload: res?.data.searchPatient,
            data: data ? data : [],
          });
        } else {
          modalAction.warning({ title: "Error in response" });
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        )
      );
  };
};
const getfilteredUncollectedPatients = (path, data) => {
  return (dispatch) => {
    patientService
      .getFilteredUncollectedPatients(path)
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: patientConstant.GET_FILTERED_UNCOLLECTED_PATIENTS,
            payload: res?.data.searchPatient,
            data: data ? data : [],
          });
        } else {
          modalAction.warning({ title: "Error in response" });
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        )
      );
  };
};

const getAllManagerPatientsComparisionCharts = () => {
  const success = (patients) => {
    return {
      type: patientConstant.GET_ALL_MANAGER_PATIENTS_COMPARASION,
      patients,
    };
  };
  return (dispatch) => {
    patientService.getManagerPatientsComparisionCharts().then((res) => {
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
    });
  };
};
const getfilteredRapidPatients = (path, data) => {
  return (dispatch) => {
    patientService
      .getFilteredRapidPatients(path)
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: patientConstant.GET_FILTERED_RAPID_PATIENTS,
            payload: res?.data.searchPatient,
            data: data ? data : [],
          });
        } else {
          modalAction.warning({ title: "Error in response" });
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        )
      );
  };
};
const getfilteredTestedPatients = (path, data) => {
  return (dispatch) => {
    patientService
      .getFilteredTestedPatients(path)
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: patientConstant.GET_FILTERED_TESTED_PATIENTS,
            payload: res?.data.searchPatient,
            data: data ? data : [],
          });
        } else {
          modalAction.warning({ title: "Error in response" });
        }
      })
      .catch((err) =>
        dispatch(
          modalAction.error({
            title: "Error",
            content: err?.response?.data?.message,
          })
        )
      );
  };
};
export const patientAction = {
  getPatientForm,
  createPatient,
  getAllPatients,
  getUncollectedPatients,
  getCollectedPatients,
  getRapidPatients,
  getAllTestedPatients,
  sendResult,
  deletePatient,
  updatePatient,
  getFilteredPatients,
  RESET_SEARCH,
  managerPatientUpdate,
  managerDeletePatient,
  recreatePatient,
  adminDeletePatient,
  adminPatientUpdate,
  getAdminAllPatients,
  getAllManagerPatientsCharts,
  getAllManagerPatientsComparisionCharts,
  getFilteredAdminPatients,
  sendEmail,
  resetCollectedSearch,
  resetRapidSearch,
  resetTestedSearch,
  resetUncollectedSearch,
  getfilteredUncollectedPatients,
  getfilteredCollectedPatients,
  getfilteredRapidPatients,
  getfilteredTestedPatients,
};
