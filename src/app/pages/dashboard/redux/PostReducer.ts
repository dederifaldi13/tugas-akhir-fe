import {Action} from 'redux'
import {GetStoreType} from '../../master/store/redux/action/StoreActionTypes'
import {
  CabangType,
  COUNT_TOTAL_HARGA,
  COUNT_TOTAL_QTY,
  DataType,
  GET_TOKO_BY_KODE,
  HIDE_MODAL_BUKTI_BAYAR_SUCCESS,
  PaymentDataType,
  PAYMENT_DATA_SUCCESS,
  POST_SUCCESS,
  SET_CABANG,
  SET_CABANG_BY_ID,
  SET_PRODUCT,
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
      return {...state, totalHarga: action.payload?.totalHarga, harga: action.payload?.harga}
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
    default:
      return state
  }
}

export default postReducer
