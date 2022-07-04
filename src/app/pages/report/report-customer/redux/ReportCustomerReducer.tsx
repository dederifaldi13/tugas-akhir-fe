import {Action} from 'redux'
import {
  GetCustomerReportType,
  GET_DATA_CUSTOMER_REPORT_SUCCESS,
} from './action/RerportCustomerActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<GetCustomerReportType>
}

const defaultState: DefaultStateI = {
  feedback: [],
}

const reportCustomerReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case GET_DATA_CUSTOMER_REPORT_SUCCESS:
      const data = action.payload?.feedback
      return {...state, feedback: data}
    default:
      return state
  }
}

export default reportCustomerReducer
