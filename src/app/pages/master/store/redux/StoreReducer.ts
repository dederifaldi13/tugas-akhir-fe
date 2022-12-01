import {Action} from 'redux'
import {
  ADD_CABANG_EDIT_SUCCESS,
  ADD_CABANG_SUCCESS,
  CabangStoreType,
  EDIT_STORE_SUCCESS,
  GetStoreType,
  GET_STORE_SUCCESS,
  HIDE_ADD_MODAL_CABANG_EDIT,
  HIDE_MODAL_CABANG,
  HIDE_MODAL_CABANG_DETAIL,
  HIDE_MODAL_CABANG_EDIT,
  IS_EDITED,
  SHOW_ADD_MODAL_CABANG_EDIT,
  SHOW_MODAL_CABANG,
  SHOW_MODAL_CABANG_DETAIL,
  SHOW_MODAL_CABANG_EDIT,
} from './action/StoreActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<GetStoreType>
  feedbackID?: GetStoreType
  modal: boolean
  modalAddCabangEdit: boolean
  modalCabangEditDetail: boolean
  modalEdit: boolean
  feedbackCabang?: Array<CabangStoreType>
  feedbackCabangDetail?: any
  feedbackCabangEdit?: Array<CabangStoreType>
  edited?: Boolean
}

const defaultState: DefaultStateI = {
  feedback: [],
  feedbackID: undefined,
  modal: false,
  modalAddCabangEdit: false,
  modalCabangEditDetail: false,
  modalEdit: false,
  feedbackCabang: [],
  feedbackCabangDetail: undefined,
  feedbackCabangEdit: [],
  edited: false,
}

const masterStoreReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case GET_STORE_SUCCESS:
      const data = action.payload?.feedback
      return {...state, feedback: data}
    case EDIT_STORE_SUCCESS:
      const data_id = action.payload?.feedbackID
      return {...state, feedbackID: data_id}
    case SHOW_MODAL_CABANG:
      return {...state, modal: true}
    case HIDE_MODAL_CABANG:
      return {...state, modal: false, modalCabangEditDetail: false, feedbackCabangDetail: undefined}
    case SHOW_MODAL_CABANG_EDIT:
      return {...state, modalEdit: true}
    case HIDE_MODAL_CABANG_EDIT:
      return {...state, modalEdit: false}
    case SHOW_ADD_MODAL_CABANG_EDIT:
      return {...state, modalAddCabangEdit: true}
    case HIDE_ADD_MODAL_CABANG_EDIT:
      return {
        ...state,
        modalAddCabangEdit: false,
        modalCabangEditDetail: false,
        feedbackCabangDetail: undefined,
      }
    case SHOW_MODAL_CABANG_DETAIL:
      const dataCabangEditNew = action.payload?.feedbackCabangDetail
      return {...state, modalCabangEditDetail: true, feedbackCabangDetail: dataCabangEditNew}
    case HIDE_MODAL_CABANG_DETAIL:
      return {...state, modalCabangEditDetail: false, feedbackCabangDetail: undefined}
    case ADD_CABANG_SUCCESS:
      const datacab = action.payload?.feedbackCabang
      return {...state, feedbackCabang: datacab}
    case ADD_CABANG_EDIT_SUCCESS:
      const datacabedit = action.payload?.feedbackCabangEdit
      return {...state, feedbackCabangEdit: datacabedit}
    case IS_EDITED:
      return {...state, edited: action.payload?.edited}
    default:
      return state
  }
}

export default masterStoreReducer
