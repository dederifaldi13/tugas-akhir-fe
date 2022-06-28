import { combineReducers } from "redux";
import postReducer from "../../../app/pages/dashboard/redux/PostReducer";
import loadingState from "./redux-loading/redux-loading.state";
import { reducer as reducerForm } from "redux-form";
import loginReducer from "../../../app/pages/auth/redux/LoginReducer";
import masterUserReducer from "../../../app/pages/master/user/redux/UserReducer";

const RootReducer = combineReducers({
  auth: loginReducer,
  dashboard: postReducer,
  loader: loadingState,
  masteruser: masterUserReducer,
  form: reducerForm,
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
