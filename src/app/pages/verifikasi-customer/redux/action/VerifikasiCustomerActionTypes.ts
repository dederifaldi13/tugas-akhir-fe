export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS'
export const VERIFIKASI_SUCCESS = 'VERIFIKASI_SUCCESS'

export type GetTransactionType = {
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
  customer: Array<any>
  __v: Number
}

export type ParamsVerifType = {
  kode_toko: string
  no_invoice: string
  kode_cabang: string
  tipe_program: string
  kode_verif: string
}
