import {Action} from 'redux'
import {
  GetHistoryPaymentReportType,
  GET_HISTORY_PAYMENT_SUCCESS,
  HIDE_MODAL_BUKTI_BAYAR_SUCCESS,
  SET_INVOICE_BY_TOKO,
  SET_NO_BAYAR,
  SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
} from './action/RerportHistoryPaymentActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<GetHistoryPaymentReportType>
  noBayar?: String
  image?: any
  showModalBuktiBayar: boolean
  feedbackNoInvoice?: Array<any>
}

const defaultState: DefaultStateI = {
  feedback: [],
  noBayar: '-',
  image: '-',
  showModalBuktiBayar: false,
  feedbackNoInvoice: [],
}

const reportHistoryPaymentReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case GET_HISTORY_PAYMENT_SUCCESS:
      const data = action.payload?.feedback
      return {...state, feedback: data}
    case SET_NO_BAYAR:
      return {...state, noBayar: action.payload?.noBayar}
    case SHOW_MODAL_BUKTI_BAYAR_SUCCESS:
      return {
        ...state,
        showModalBuktiBayar: true,
        image: action.payload?.image,
      }
    case HIDE_MODAL_BUKTI_BAYAR_SUCCESS:
      return {...state, showModalBuktiBayar: false, noBayar: '-', image: '-'}
    case SET_INVOICE_BY_TOKO:
      const dataInvoice = action.payload?.feedbackNoInvoice
      return {...state, feedbackNoInvoice: dataInvoice}
    default:
      return state
  }
}

export default reportHistoryPaymentReducer
