import {Action} from 'redux'
import {
  DataTrxiPaymu,
  GET_HISTORY_PAYMENT_IPAYMU_SUCCESS,
  GET_TOKO_BY_KODE_SUCCESS,
} from './action/RerportHistoryPaymentiPaymuActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<DataTrxiPaymu>
  dataToko?: any
}

const defaultState: DefaultStateI = {
  feedback: [],
  dataToko: undefined,
}

const reportHistoryPaymentiPaymuReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case GET_HISTORY_PAYMENT_IPAYMU_SUCCESS:
      const data = action.payload?.feedback
      return {...state, feedback: data}
    case GET_TOKO_BY_KODE_SUCCESS:
      const toko = action.payload?.dataToko
      return {...state, dataToko: toko}
    default:
      return state
  }
}

export default reportHistoryPaymentiPaymuReducer
