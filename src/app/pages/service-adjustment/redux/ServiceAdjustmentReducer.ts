import {Action} from 'redux'
import {
  COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT_EDIT,
  COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN_EDIT,
  COUNT_TOTAL_HARGA_EDIT,
  COUNT_TOTAL_QTY_EDIT,
  GetActiveCustomerType,
  GET_ACTIVE_CUSTOMER,
  GET_ACTIVE_CUSTOMER_BY_ID,
  HIDE_MODAL,
  SET_DATA_PRODUCT,
  SET_ID_FOR_DELETE,
  SET_ONE_DATA_PRODUCT_CUSTOMER,
  SET_PRODUCT_EDIT,
  SET_TOTAL_HARGA,
  SHOW_MODAL,
  SHOW_MODAL_EDIT,
} from './action/ServiceAdjustmentActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  feedback?: Array<GetActiveCustomerType>
  feedbackID?: GetActiveCustomerType
  ID?: String
  isShow?: boolean
  totalHarga?: Number
  qty?: Number
  harga?: Number
  diskon_produk?: Number
  product?: String
  tipe_program?: String
  dataProduct?: Array<any>
  modal?: Boolean
  productID?: any
  diskon_tambahan?: number
  total_harga_jual?: number
}

const defaultState: DefaultStateI = {
  feedback: [],
  feedbackID: undefined,
  ID: '-',
  isShow: false,
  totalHarga: 0,
  qty: 6,
  harga: 0,
  diskon_produk: 0,
  product: '',
  tipe_program: 'ONLINE',
  dataProduct: [],
  modal: false,
  productID: undefined,
  diskon_tambahan: 0,
  total_harga_jual: 0,
}

const serviceAdjustmentReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case GET_ACTIVE_CUSTOMER:
      const data = action.payload?.feedback
      return {...state, feedback: data}
    case SET_ID_FOR_DELETE:
      return {...state, ID: action.payload?.ID}
    case SHOW_MODAL_EDIT:
      return {...state, isShow: action.payload?.isShow}
    case SET_TOTAL_HARGA:
      return {...state, totalHarga: action.payload?.totalHarga}
    case COUNT_TOTAL_QTY_EDIT:
      return {...state, totalHarga: action.payload?.totalHarga, qty: action.payload?.qty}
    case COUNT_TOTAL_HARGA_EDIT:
      return {
        ...state,
        totalHarga: action.payload?.totalHarga,
        harga: action.payload?.harga,
        diskon_produk: action.payload?.diskon_produk,
      }
    case COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT_EDIT:
      return {
        ...state,
        totalHarga: action.payload?.totalHarga,
        harga: action.payload?.harga,
        diskon_produk: action.payload?.diskon_produk,
      }
    case SET_PRODUCT_EDIT:
      return {
        ...state,
        product: action.payload?.product,
        tipe_program: action.payload?.tipe_program,
      }
    case GET_ACTIVE_CUSTOMER_BY_ID:
      return {...state, feedbackID: action.payload?.feedbackID}
    case SET_DATA_PRODUCT:
      return {...state, dataProduct: action.payload?.dataProduct}
    case SHOW_MODAL:
      return {...state, modal: true}
    case HIDE_MODAL:
      return {...state, modal: false}
    case SET_ONE_DATA_PRODUCT_CUSTOMER:
      return {...state, productID: action.payload?.productID}
    case COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN_EDIT:
      return {
        ...state,
        diskon_tambahan: action.payload?.diskon_tambahan,
        total_harga_jual: action.payload?.total_harga_jual,
      }
    default:
      return state
  }
}

export default serviceAdjustmentReducer
