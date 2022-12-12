export const GET_DATA_CUSTOMER_REPORT_SUCCESS = 'GET_DATA_CUSTOMER_REPORT_SUCCESS'
export const SET_ALL_CHECKBOX = 'SET_ALL_CHECKBOX'
export const SET_INVOICE_BY_TOKO = 'SET_INVOICE_BY_TOKO'

export type GetCustomerReportType = {
  alamat: String
  bulan: String
  created_at: String
  email: String
  harga: Number
  kode_cabang: String
  kode_toko: String
  product: String
  qty: Number
  status: String
  telepon: String
  tgl_jatuh_tempo: String
  tipe_program: String
  toko: String
  total_harga: Number
  __v: Number
  _id: String
}

export type TableCustomerReportType = {
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
  toko: string
  alamat_cabang: string
  alamat_korespondensi: string
  grand_total: number
}
