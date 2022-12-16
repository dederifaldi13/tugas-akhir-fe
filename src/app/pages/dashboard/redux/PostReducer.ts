import {Action} from 'redux'
import {GetStoreType} from '../../master/store/redux/action/StoreActionTypes'
import {
  CabangType,
  COUNT_TOTAL_HARGA,
  COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT,
  COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN,
  COUNT_TOTAL_QTY,
  DataType,
  GET_TOKO_BY_KODE,
  HIDE_MODAL,
  HIDE_MODAL_BUKTI_BAYAR_SUCCESS,
  PaymentDataType,
  PAYMENT_DATA_SUCCESS,
  POST_SUCCESS,
  SET_CABANG,
  SET_CABANG_BY_ID,
  SET_DATA_PRODUCT,
  SET_DISKON_KHUSUS,
  SET_PRODUCT,
  SET_TANGGAL_JATUH_TEMPO,
  SHOW_MODAL,
  SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
} from './actions/PostActionTypes'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface DefaultStateI {
  post?: Array<DataType>
  paymentData?: Array<PaymentDataType>
  showModalBuktiBayar: boolean
  noBayar?: String
  image?: any
  dataTokoByKode?: GetStoreType
  totalHarga?: Number
  qty?: Number
  harga?: Number
  product?: String
  tipe_program?: String
  cabangToko?: any
  cabangTokoByID?: CabangType
  modal: Boolean
  dataProduct?: Array<any>
  diskon_produk?: Number
  diskon_tambahan?: Number
  total_harga_jual?: Number
  diskon_khusus?: Number
  tgl_jatuh_tempo?: String
}

const defaultState: DefaultStateI = {
  post: [],
  paymentData: [],
  showModalBuktiBayar: false,
  noBayar: '-',
  image: '-',
  dataTokoByKode: undefined,
  totalHarga: 0,
  qty: 6,
  harga: 0,
  product: '',
  tipe_program: 'ONLINE',
  cabangToko: [],
  cabangTokoByID: undefined,
  modal: false,
  dataProduct: [],
  diskon_produk: 0,
  diskon_tambahan: 0,
  total_harga_jual: 0,
  diskon_khusus: 0,
  tgl_jatuh_tempo: '',
}

const postReducer = (
  state: DefaultStateI = defaultState,
  action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
  switch (action.type) {
    case POST_SUCCESS:
      return {...state, post: action.payload?.post}
    case PAYMENT_DATA_SUCCESS:
      return {...state, paymentData: action.payload?.paymentData}
    case SHOW_MODAL_BUKTI_BAYAR_SUCCESS:
      return {
        ...state,
        showModalBuktiBayar: true,
        noBayar: action.payload?.noBayar,
        image: action.payload?.image,
      }
    case HIDE_MODAL_BUKTI_BAYAR_SUCCESS:
      return {...state, showModalBuktiBayar: false, noBayar: '-', image: '-'}
    case GET_TOKO_BY_KODE:
      return {...state, dataTokoByKode: action.payload?.dataTokoByKode}
    case COUNT_TOTAL_QTY:
      return {...state, totalHarga: action.payload?.totalHarga, qty: action.payload?.qty}
    case COUNT_TOTAL_HARGA:
      return {
        ...state,
        totalHarga: action.payload?.totalHarga,
        harga: action.payload?.harga,
        diskon_produk: action.payload?.diskon_produk,
      }
    case COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT:
      return {
        ...state,
        totalHarga: action.payload?.totalHarga,
        harga: action.payload?.harga,
        diskon_produk: action.payload?.diskon_produk,
      }
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload?.product,
        tipe_program: action.payload?.tipe_program,
      }
    case SET_CABANG:
      return {...state, cabangToko: action.payload?.cabangToko}
    case SET_CABANG_BY_ID:
      return {...state, cabangTokoByID: action.payload?.cabangTokoByID}
    case SHOW_MODAL:
      return {...state, modal: true}
    case HIDE_MODAL:
      return {...state, modal: false}
    case SET_DATA_PRODUCT:
      return {...state, dataProduct: action.payload?.dataProduct}
    case COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN:
      return {
        ...state,
        diskon_tambahan: action.payload?.diskon_tambahan,
        total_harga_jual: action.payload?.total_harga_jual,
      }
    case SET_DISKON_KHUSUS:
      return {
        ...state,
        diskon_khusus: action.payload?.diskon_khusus,
      }
    case SET_TANGGAL_JATUH_TEMPO:
      return {
        ...state,
        tgl_jatuh_tempo: action.payload?.tgl_jatuh_tempo,
      }
    default:
      return state
  }
}

export default postReducer
