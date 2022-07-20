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
import reportHistoryPaymentReducer from "../../../app/pages/report/report-history-payment/redux/ReportHistoryPaymentReducer";
import PaymentMethodReducer from "../../../app/pages/payment-method/redux/PaymentMethodReducer";
import IPaymuReducer from "../../../app/pages/iPaymuTransactionPage/redux/iPaymuReducer";
import reportHistoryPaymentiPaymuReducer from "../../../app/pages/report/report-history-payment-ipaymu/redux/ReportHistoryPaymentiPaymuReducer";
import dashboardcustomerreducer from "../../../app/pages/dashboard-customer/redux/DashboardCustomerReducer";

const RootReducer = combineReducers({
  auth: loginReducer,
  dashboard: postReducer,
  dashboardcustomer: dashboardcustomerreducer,
  loader: loadingState,
  masteruser: masterUserReducer,
  masterproduct: masterProductReducer,
  masterstore: masterStoreReducer,
  transactionconfirmpayment: TransactionReducer,
  paymentmethod: PaymentMethodReducer,
  paymentqr: IPaymuReducer,
  serviceAdjustment: serviceAdjustmentReducer,
  reportCustomer: reportCustomerReducer,
  reportHistoryPayment: reportHistoryPaymentReducer,
  reportHistoryPaymentiPaymu: reportHistoryPaymentiPaymuReducer,
  form: reducerForm,
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
