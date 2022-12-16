export const POST_SUCCESS = 'POST_SUCCESS'
export const DELETE_POST = 'DELETE_POST'
export const PAYMENT_DATA_SUCCESS = 'PAYMENT_DATA_SUCCESS'
export const SHOW_MODAL_BUKTI_BAYAR_SUCCESS = 'SHOW_MODAL_BUKTI_BAYAR_SUCCESS'
export const HIDE_MODAL_BUKTI_BAYAR_SUCCESS = 'HIDE_MODAL_BUKTI_BAYAR_SUCCESS'
export const GET_TOKO_BY_KODE = 'GET_TOKO_BY_KODE'
export const COUNT_TOTAL_QTY = 'COUNT_TOTAL_QTY'
export const COUNT_TOTAL_HARGA = 'COUNT_TOTAL_HARGA'
export const COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT = 'COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT'
export const COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN = 'COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN'
export const SET_PRODUCT = 'SET_PRODUCT'
export const SET_CABANG = 'SET_CABANG'
export const SET_CABANG_BY_ID = 'SET_CABANG_BY_ID'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_DATA_PRODUCT = 'SET_DATA_PRODUCT'
export const SET_DISKON_KHUSUS = 'SET_DISKON_KHUSUS'
export const SET_TANGGAL_JATUH_TEMPO = 'SET_TANGGAL_JATUH_TEMPO'

export type PostType = {
  kode_toko?: String
  toko?: String
  kode_cabang?: String
  email?: String
  telepon?: String
  tgl_jatuh_tempo?: String
  bulan?: String
  total_harga?: Number
  total_diskon?: Number
  diskon_tambahan?: any
  product_detail?: Array<any>
}

export type FormPostType = {
  kode_toko: {value: String; label: String}
  kode_cabang: {value: String; label: String}
  toko: String
  alamat: String
  telepon: String
  email: String
  product: {value: String; label: String}
  tipe_program: String
  qty: Number
  harga: Number
  bulan: String
  total_harga: Number
  total_diskon: Number
  diskon_tambahan: any
  tgl_jatuh_tempo: String
}

export type DeletePostType = {
  id: Number
}

export type EditPostType = {
  userId: Number
  title: String
  body: String
}

export type DataType = {
  _id: String
  created_at: String
  kode_toko: String
  toko: String
  alamat: String
  telepon: String
  email: String
  product: String
  qty: Number
  harga: Number
  bulan: String
  total_harga: Number
  tgl_jatuh_tempo: String
  status: String
  kode_cabang: String
  tipe_program: String
}

export type PaymentDataType = {
  _id: string
  created_at: string
  no_bayar: string
  tanggal_bayar: string
  kode_toko: string
  toko: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  status: string
  tipe_pembayaran: string
  __v: number
}

export type TablePaymentDataType = {
  key: number
  _id: string
  created_at: string
  no_bayar: string
  no_invoice: string
  tanggal_bayar: string
  kode_toko: string
  kode_cabang: string
  toko: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  status: string
  tipe_pembayaran: string
  __v: number
}

export type TableDataType = {
  key: number
  _id: String
  no_invoice: String
  tgl_jatuh_tempo: String
  kode_toko: String
  kode_cabang: String
  email: String
  telepon: String
  bulan: String
  total_harga: number
  total_diskon: number
  diskon_tambahan: number
  status: String
  input_date: String
  __v: number
  customer: Array<any>
  grand_total: number
}

export type RequestValidationType = {
  no_invoice: string
  kode_toko: string
  kode_cabang: string
}

export type CabangType = {
  _id: String
  kode_cabang: String
  nama_cabang: String
  kode_toko: String
  email: String
  telepon: String
  alamat_cabang: String
  alamat_korespondensi: String
  status: String
  input_date: String
  __v: Number
  edit_by: null
  edit_date: String
}
