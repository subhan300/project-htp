import { testConstant } from "../../constants";
import { testTypeService } from "../../../services";

import { modalAction } from "../modal";

const getTestTypes = () => {
  const success = (testTypes) => ({
    type: testConstant.GET_TEST_TYPES,
    testTypes,
  });

  return (dispatch) => {
    testTypeService
      .getTestTypes()
      .then((res) => {
        res.status === 200
          ? dispatch(success(res?.data))
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res?.response?.data?.message,
              })
            );
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};

const getAdminTestTypes = () => {
  const success = (testTypes) => ({
    type: testConstant.GET_ADMIN_TEST_TYPES,
    testTypes,
  });

  return (dispatch) => {
    testTypeService
      .getAdminTestTypes()
      .then((res) => {
        res.status === 200
          ? dispatch(success(res?.data.allUserTypes))
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res?.response?.data?.message,
              })
            );
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};
const getTestTypesChart = () => {
  const success = (testTypesChart) => ({
    type: testConstant.GET_TEST_TYPES_CHART,
    testTypesChart,
  });

  return (dispatch) => {
    testTypeService
      .getTestTypesChart()
      .then((res) => {
        res.status === 200
          ? dispatch(success(res?.data))
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res?.response?.data?.message,
              })
            );
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};
const addTestTypes = (testTypeData, setAddTestModal, message, setLoad) => {
  const success = (testType) => ({
    type: testConstant.ADD_TEST_TYPES,
    testType,
  });

  return (dispatch) => {
    testTypeService
      .addTestTypes(testTypeData)
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          message.success("Test Added");
          dispatch(success(testTypeData));
          dispatch(getTestTypes());
          setAddTestModal(false);
        } else {
          message.error(`Test Not  Added ${res.response.data.message}`);
        }
      })
      .catch((error) => {
        setLoad(false);
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};
const updateTestTypes = (testTypeData, setModal, message, setLoad) => {
  return (dispatch) => {
    testTypeService
      .updateTestTypes(testTypeData)
      .then((res) => {
        setLoad(false);
        if (res.status == 200) {
          setModal(false);
          message.success("Test Updated Successfully");
          dispatch(getTestTypes());
        } else {
          message.error("Failed To Update ");
        }
      })
      .catch(() => {
        message.error("Failed To Update ");
      });
  };
};
const deleteTest = (name, setModal, message, setLoad) => {
  const success = (name) => ({
    type: testConstant.DELETE_TEST,
    name,
  });

  return (dispatch) => {
    testTypeService
      .deleteTest(name)
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          setModal(false);
          message.success("Test Deleted Successfully");
          dispatch(success(name));
        } else {
          message.error("Failed To Delete Test");
        }
      })
      .catch((error) => {
        message.error(`Failed To Delete Test ${error}`);
      });
  };
};
const deleteTestTypes = (id, testTypes) => {
  const success = (id) => ({
    type: testConstant.DELETE_TEST_TYPES,
    id,
    testTypes,
  });

  return (dispatch) => {
    testTypeService
      .deleteTestType(id)
      .then((res) => {
        res.status === 200
          ? dispatch(success(id, testTypes))
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res?.response?.data?.message,
              })
            );
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};

// admin test types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const adminAddTestTypes = (
  testTypeData,
  setAddTestModal,
  message,
  setLoad,
  id,
  form
) => {
  const success = (testType) => ({
    type: testConstant.ADD_TEST_TYPES,
    testType,
  });

  return (dispatch) => {
    console.log(form);
    testTypeService
      .addTestTypes(testTypeData, id)
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          form();
          message.success("Test Added");
          dispatch(success(testTypeData));
          dispatch(getAdminTestTypes());
          setAddTestModal(false);
        } else {
          message.error(`Test Not  Added ${res.response.data.message}`);
        }
      })
      .catch((error) => {
        setLoad(false);
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};
const adminUpdateTestTypes = (testTypeData, setModal, message, setLoad, id) => {
  return (dispatch) => {
    testTypeService
      .updateTestTypes(testTypeData, id)
      .then((res) => {
        setLoad(false);
        if (res.status == 200) {
          setModal(false);
          message.success("Test Updated Successfully");
          dispatch(getAdminTestTypes());
        } else {
          message.error("Failed To Update ");
        }
      })
      .catch(() => {
        message.error("Failed To Update ");
      });
  };
};
const adminDeleteTest = (name, setModal, message, setLoad, id) => {
  const success = (name) => ({
    type: testConstant.DELETE_TEST,
    name,
  });

  return (dispatch) => {
    testTypeService
      .adminDeleteTest(name, id)
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          setModal(false);
          message.success("Test Deleted Successfully");
          dispatch(success(name));
        } else {
          message.error("Failed To Delete Test");
        }
      })
      .catch((error) => {
        message.error(`Failed To Delete Test ${error}`);
      });
  };
};
const adminDeleteTestTypes = (id, testTypes, managerId) => {
  const success = (id) => ({
    type: testConstant.DELETE_TEST_TYPES,
    id,
    testTypes,
  });

  return (dispatch) => {
    testTypeService
      .deleteTestType(id, managerId)
      .then((res) => {
        res.status === 200
          ? dispatch(success(id, testTypes))
          : dispatch(
              modalAction.error({
                title: "Error",
                content: res?.response?.data?.message,
              })
            );
      })
      .catch((error) => {
        dispatch(
          modalAction.error({
            title: "Error",
            content: error?.response?.data?.message,
          })
        );
      });
  };
};

// admin test types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const getRequiredFields = () => {
  const success = (fields) => ({
    type: testConstant.GET_FORM_FIELDS,
    fields,
  });

  return (dispatch) => {
    testTypeService
      .getFormFields()
      .then((res) => {
        res.status === 200
          ? dispatch(success(res?.data))
          : console.log(res?.response?.data?.message);
      })
      .catch((error) => {
        console.log("error => ", error?.response?.data);
      });
  };
};

const addTestForSpecificLocation = (
  testTypeData,
  setAddTestModal,
  message,
  setLoad,
  id
) => {
  return () => {
    testTypeService
      .addTestForSpecificLocation(testTypeData, id)
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          message.success("Test Added");
          setAddTestModal(false);
        } else {
          message.error(`Test Not  Added ! ${res.response.data.message}`);
        }
      })
      .catch((error) => {
        setLoad(false);
        message.error(`Test Not  Added ${error.response}`);
      });
  };
};
const deleteTestForSpecificLocation = (
  id,
  setModal,
  message,
  setLoad,
  name
) => {
  return () => {
    testTypeService
      .deleteTestForSpecificLocation(id, name)
      .then((res) => {
        setLoad(false);
        if (res.status === 200) {
          setModal(false);

          message.success("Test Deleted Successfully");
        } else {
          message.error("Failed To Delete Test");
          console.log(res.response.data.message);
        }
      })
      .catch((error) => {
        message.error(`Failed To Delete Test ${error}`);
        console.log("error => ", error);
      });
  };
};

const updateTestTypesForSpecificLocation = (
  testTypeData,
  setModal,
  message,
  setLoad
) => {
  return () => {
    testTypeService
      .updateTestTypesForSpecificLocation(testTypeData)
      .then((res) => {
        setLoad(false);
        if (res.status == 200) {
          setModal(false);

          message.success("Test Updated Successfully");
        } else {
          message.error(`Failed To Update ,  ${res.response.data.message} `);
        }
      })
      .catch((error) => {
        message.error("Failed To Update ");
        console.log("error => ", error);
      });
  };
};
export const testTypeAction = {
  getAdminTestTypes,
  getTestTypes,
  getTestTypesChart,
  addTestTypes,
  updateTestTypes,
  deleteTest,
  deleteTestTypes,
  getRequiredFields,
  addTestForSpecificLocation,
  deleteTestForSpecificLocation,
  updateTestTypesForSpecificLocation,
  adminDeleteTestTypes,
  adminDeleteTest,
  adminUpdateTestTypes,
  adminAddTestTypes,

  // getTestTypesChart,
};
