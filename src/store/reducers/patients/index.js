import { patientConstant } from "../../constants";
const intitalState = {
  allPatients: [],
  collected: [],
  uncollected: [],
  rapid: [],
  testedPatients: [],
  requiredFields: [],
  patientCopy: [],
  getAllManagerPatients: [],
  getAllAdminPatients: [],
  ManagerPatientComparasion: [],
  patientsByMonthChart: [],
};

export const patients = (state = intitalState, action) => {
  switch (action.type) {
    case patientConstant.ALL_PATIENTS_INFO:
      return {
        ...state,
        allPatients: action.patients.locationsPatients,
        collectedPatientsLength: action.patients?.locationsPatients.length,
      };
    case patientConstant.COLLECTED_PATIENTS:
      return {
        ...state,
        collected: [...action.patients?.patients],
        collectedPatientsLength: action.patients?.length,
      };
    case patientConstant.UNCOLLECTED_PATIENTS:
      return {
        ...state,
        uncollected: [...action.patients?.patients],
        uncollectedPatientsLength: action.patients?.length,
      };
    case patientConstant.RAPID_PATIENTS:
      return {
        ...state,
        rapid: [...action.patients?.patients],
        rapidPatientsLength: action.patients?.length,
      };
    case patientConstant.ALL_TESTED_PATIENTS:
      return {
        ...state,
        testedPatients: [...action.patients?.patients],
        testedPatientsLength: action.patients?.length,
      };
    case patientConstant.ADD_PATIENT:
      return { ...state, allPatients: [...state.allPatients, action.patient] };
    case patientConstant.UPDATE_PATIENT:
      return {
        ...state,
        allPatients: [...state.allPatients, action.updatePatient],
      };
    case patientConstant.DELETE_PATIENT:
      return {
        ...state,
        allPatients: state.allPatients.filter((p) => p._id !== action.id),
      };
    case patientConstant.GET_REQUIRED_FIELD:
      return {
        ...state,
        requiredFields: action.requiredFields,
      };
    case patientConstant.GET_FILTERED_PATIENTS:
      return {
        ...state,
        patientCopy: action.data,
        allPatients: action.payload,
      };
    case patientConstant.GET_FILTERED_COLLECTED_PATIENTS:
      return {
        ...state,
        patientCopy: action.data,
        collected: action.payload,
      };
    case patientConstant.GET_FILTERED_UNCOLLECTED_PATIENTS:
      return {
        ...state,
        patientCopy: action.data,
        uncollected: action.payload,
      };
    case patientConstant.GET_FILTERED_RAPID_PATIENTS:
      return {
        ...state,
        patientCopy: action.data,
        rapid: action.payload,
      };
    case patientConstant.GET_FILTERED_TESTED_PATIENTS:
      return {
        ...state,
        patientCopy: action.data,
        testedPatients: action.payload,
      };
    case patientConstant.RESET_SEARCH:
      return {
        ...state,
        allPatients: state.patientCopy,
        patientCopy: [],
      };
    case patientConstant.RESET_COLLECTED_SEARCH:
      return {
        ...state,
        collected: state.patientCopy,
        patientCopy: [],
      };
    case patientConstant.RESET_UNCOLLECTED_SEARCH:
      return {
        ...state,
        uncollected: state.patientCopy,
        patientCopy: [],
      };
    case patientConstant.RESET_RAPID_SEARCH:
      return {
        ...state,
        rapid: state.patientCopy,
        patientCopy: [],
      };
    case patientConstant.RESET_TESTED_SEARCH:
      return {
        ...state,
        testedPatients: state.patientCopy,
        patientCopy: [],
      };
    case patientConstant.ALL_ADMIN_PATIENTS_INFO:
      return {
        ...state,
        allPatients: action.patients.allLocationPatients,
        collectedPatientsLength: action.patients?.length,
      };

    case patientConstant.GET_ALL_MANAGER_PATIENTS:
      console.log("action", action.patients);
      return {
        ...state,
        getAllManagerPatients: action.patients.totalPatient,
        collectedPatientsLength: action.patients?.length,
      };
    case patientConstant.GET_ALL_MANAGER_PATIENTS_COMPARASION:
      return {
        ...state,
        ManagerPatientComparasion: action.patients.patientArr,
      };

    default:
      return state;
  }
};
