import { chartsConstant } from "../../constants";

const initialState = {
  charts: [{ firstChart: [], secondChart: [], thirdChart: [] }],
  patientChart: [],
  managerCharts: [{ firstChart: [], secondChart: [], thirdChart: [] }],
  circularChart: [],
  patientsByMonthChart: [],
  testTypeChart: [],
};

export const charts = (state = initialState, action) => {
  switch (action.type) {
    case chartsConstant.GET_MANAGER_CHARTS:
      return {
        ...state,
        charts: [
          {
            firstChart: [...action.managerCharts.firstChart],
            secondChart: [...action.managerCharts.secondChart],
            thirdChart: [...action.managerCharts.thirdChart],
          },
        ],
      };
    case chartsConstant.GET_MANAGER_PATIENT_CHARTS:
      return {
        ...state,
        patientChart: action.patientCharts.patientArr,
      };
    case chartsConstant.GET_ADMIN_CHARTS:
      return {
        ...state,
        charts: [
          //   ...state.managerCharts,
          {
            firstChart: [...action.adminCharts.firstChart],
            secondChart: [...action.adminCharts.secondChart],
            thirdChart: [...action.adminCharts.thirdChart],
          },
        ],
      };
    case chartsConstant.GET_ADMIN_PATIENT_CHARTS:
      return {
        ...state,
        patientChart: action.patientCharts.patientArr,
      };
    case chartsConstant.GET_MEDICAL_PROFESSIONAL_CHARTS:
      return {
        ...state,
        circularChart: action.data?.graph1,
        testTypeChart: action.data?.graph2,
      };
    case chartsConstant.GET_PATIENTS_BY_MONTH_CHART:
      return { ...state, patientsByMonthChart: action.patients.patients };
    default:
      return state;
  }
};
