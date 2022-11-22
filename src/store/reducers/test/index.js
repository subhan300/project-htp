import { testConstant } from "../../constants";
const intitalState = {
  testTypes: [],
  requiredFields: [],
};

export const tests = (state = intitalState, action) => {
  switch (action.type) {
    case testConstant.GET_TEST_TYPES:
      return { ...state, testTypes: action?.testTypes.user_test_type };
    case testConstant.GET_ADMIN_TEST_TYPES:
      return { ...state, testTypes: action?.testTypes };
    case testConstant.GET_TEST_TYPES_CHART:
      return { ...state, testTypesChart: action?.testTypesChart.totalPatient };
    case testConstant.ADD_TEST_TYPES:
      return {
        ...state,
        testTypes: [action.testType, ...state.testTypes],
        requiredFields: [...state.requiredFields],
      };
    // case testConstant.UPDATE_TEST_TYPES:
    //   return {
    //     ...state,
    //     testTypes: [action.testType, ...state.testTypes],
    //   };
    case testConstant.DELETE_TEST:
      return {
        ...state,
        testTypes: state.testTypes.filter((val) => val.name !== action.name),
      };
    case testConstant.DELETE_TEST_TYPES: {
      let filterTestTypes = state.testTypes.filter(
        (val) => val._id !== action.id
      )[0];

      filterTestTypes.types.map((type) => {
        action.testTypes.filter((actionType) => actionType != type);
      });

      return {
        ...state,
      };
    }
    case testConstant.GET_FORM_FIELDS:
      return {
        ...state,
        requiredFields: action.fields.patientForm,
        testTypes: [...state.testTypes],
      };
    default:
      return state;
  }
};
