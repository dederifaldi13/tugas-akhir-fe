export const GET_ACTIVE_CUSTOMER = 'GET_ACTIVE_CUSTOMER'
export const GET_ACTIVE_CUSTOMER_BY_ID = 'GET_ACTIVE_CUSTOMER_BY_ID'
export const SET_ID_FOR_DELETE = 'SET_ID_FOR_DELETE'
export const SHOW_MODAL_EDIT = 'SHOW_MODAL_EDIT'
export const COUNT_TOTAL_QTY_EDIT = 'COUNT_TOTAL_QTY_EDIT'
export const COUNT_TOTAL_HARGA_EDIT = 'COUNT_TOTAL_HARGA_EDIT'
export const COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT_EDIT = 'COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT_EDIT'
export const SET_PRODUCT_EDIT = 'SET_PRODUCT_EDIT'
export const SET_TOTAL_HARGA = 'SET_TOTAL_HARGA'
export const SET_DATA_PRODUCT = 'SET_DATA_PRODUCT'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const COUNT_TOTAL_HARGA = 'COUNT_TOTAL_HARGA'
export const SET_ONE_DATA_PRODUCT_CUSTOMER = 'SET_ONE_DATA_PRODUCT_CUSTOMER'

export type GetActiveCustomerType = {
  _id: String
  no_invoice: String
  created_at: String
  kode_toko: String
  toko: String
  alamat_cabang: String
  alamat_korespondensi: String
  telepon: String
  email: String
  product: String
  qty: Number
  harga: Number
  bulan: String
  total_harga: Number
  tgl_jatuh_tempo: String
  status: String
  total_diskon: number
  kode_cabang: String
  tipe_program: String
}

export type TableActivateCustomerType = {
  key: number
  _id: string
  no_invoice: string
  tgl_jatuh_tempo: string
  kode_toko: string
  kode_cabang: string
  email: string
  telepon: string
  bulan: string
  total_harga: number
  total_diskon: number
  status: string
  input_date: string
  __v: number
  customer: Array<any>
  grand_total: number
}

export type EditFormCustomer = {
  tanggal_jatuh_tempo: string
  bulan: string
  total_diskon: number
}
