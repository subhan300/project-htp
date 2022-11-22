import { combineReducers } from "redux";
import { authentication } from "./auth";
import { modal } from "./modal";
import { admin } from "./admin";
import { manager } from "./manager";
import { employees } from "./employee";
import { patients } from "./patients";
import { location } from "./location";
import { tests } from "./test";
import { charts } from "./charts";

export const rootReducer = combineReducers({
  authentication,
  tests,
  modal,
  admin,
  manager,
  employees,
  patients,
  location,
  charts,
});
export const RootState = rootReducer;
