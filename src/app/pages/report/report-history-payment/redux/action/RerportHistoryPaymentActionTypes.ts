export const GET_HISTORY_PAYMENT_SUCCESS = 'GET_HISTORY_PAYMENT_SUCCESS'
export const SHOW_MODAL_BUKTI_BAYAR_SUCCESS = 'SHOW_MODAL_BUKTI_BAYAR_SUCCESS'
export const HIDE_MODAL_BUKTI_BAYAR_SUCCESS = 'HIDE_MODAL_BUKTI_BAYAR_SUCCESS'
export const SET_NO_BAYAR = 'SET_NO_BAYAR'
export const SET_INVOICE_BY_TOKO = 'SET_INVOICE_BY_TOKO'

export type GetHistoryPaymentReportType = {
  bulan: String
  created_at: String
  harga: Number
  kode_cabang: String
  kode_toko: String
  no_bayar: String
  product: String
  qty: Number
  status: String
  tanggal_bayar: String
  tipe_pembayaran: String
  toko: String
  total_harga: Number
  __v: Number
  _id: String
}

export type TableHistoryPaymentReportType = {
  key: Number
  bulan: String
  created_at: String
  harga: Number
  kode_cabang: String
  kode_toko: String
  no_bayar: String
  no_invoice: String
  product: String
  qty: Number
  status: String
  tanggal_bayar: String
  tipe_pembayaran: String
  toko: String
  total_harga: Number
  __v: Number
  _id: String
}
