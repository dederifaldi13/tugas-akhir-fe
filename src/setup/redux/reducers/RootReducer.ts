import { combineReducers } from "redux";
import postReducer from "../../../app/pages/dashboard/redux/PostReducer";
import loadingState from "./redux-loading/redux-loading.state";
import { reducer as reducerForm } from "redux-form";
import loginReducer from "../../../app/pages/auth/redux/LoginReducer";
import masterUserReducer from "../../../app/pages/master/user/redux/UserReducer";
import TransactionReducer from "../../../app/pages/transaction/redux/TransactionReducer";
import masterProductReducer from "../../../app/pages/master/product/redux/ProductReducer";
import masterStoreReducer from "../../../app/pages/master/store/redux/StoreReducer";
import serviceAdjustmentReducer from "../../../app/pages/service-adjustment/redux/ServiceAdjustmentReducer";
import reportCustomerReducer from "../../../app/pages/report/report-customer/redux/ReportCustomerReducer";

const RootReducer = combineReducers({
  auth: loginReducer,
  dashboard: postReducer,
  loader: loadingState,
  masteruser: masterUserReducer,
  masterproduct: masterProductReducer,
  masterstore: masterStoreReducer,
  transactionconfirmpayment: TransactionReducer,
  serviceAdjustment: serviceAdjustmentReducer,
  reportCustomer: reportCustomerReducer,
  form: reducerForm,
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
