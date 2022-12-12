import {Action} from 'redux'
import {
  GetCustomerReportType,
  GET_DATA_CUSTOMER_REPORT_SUCCESS,
  SET_ALL_CHECKBOX,
  SET_INVOICE_BY_TOKO,
} from './action/RerportCustomerActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<GetCustomerReportType>
  feedbackNoInvoice?: Array<any>
  all: boolean
}

const defaultState: DefaultStateI = {
  feedback: [],
  feedbackNoInvoice: [],
  all: false,
}

const reportCustomerReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case GET_DATA_CUSTOMER_REPORT_SUCCESS:
      const data = action.payload?.feedback
      return {...state, feedback: data}
    case SET_INVOICE_BY_TOKO:
      const dataInvoice = action.payload?.feedbackNoInvoice
      return {...state, feedbackNoInvoice: dataInvoice}
    case SET_ALL_CHECKBOX:
      const val = action.payload?.all || false
      return {...state, all: val}
    default:
      return state
  }
}

export default reportCustomerReducer
