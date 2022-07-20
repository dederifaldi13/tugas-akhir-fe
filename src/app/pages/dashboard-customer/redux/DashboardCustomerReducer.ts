import { Action } from "redux";
import {
  DataType,
  DATA_CUSTOMER_SUCCESS,
  HIDE_MODAL_BUKTI_BAYAR_CUSTOMER,
  PaymentDataType,
  PAYMENT_CUSTOMER_DATA_SUCCESS,
  SHOW_MODAL_BUKTI_BAYAR_CUSTOMER
} from "./actions/DashboardCustomerActionTypes";

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<DataType>;
  paymentData?: Array<PaymentDataType>;
  showModalBuktiBayar: boolean;
  noBayar?: String;
  image?: any;

}

const defaultState: DefaultStateI = {
  feedback: [],
  paymentData: [],
  showModalBuktiBayar: false,
  noBayar: '-',
  image: '-',
};

const dashboardcustomerreducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case DATA_CUSTOMER_SUCCESS:
      return { ...state, feedback: action.payload?.feedback };
    case PAYMENT_CUSTOMER_DATA_SUCCESS:
      return { ...state, paymentData: action.payload?.paymentData }
    case SHOW_MODAL_BUKTI_BAYAR_CUSTOMER:
      return { ...state, showModalBuktiBayar: true, noBayar: action.payload?.noBayar, image: action.payload?.image }
    case HIDE_MODAL_BUKTI_BAYAR_CUSTOMER:
      return { ...state, showModalBuktiBayar: false, noBayar: '-', image: '-' }
    default:
      return state;
  }
};

export default dashboardcustomerreducer;
