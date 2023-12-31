export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS'
export const SET_CAMERA_SUCCESS = 'SET_CAMERA_SUCCESS'

export type ParamsGetTransactionType = {
  kode_toko: string
  no_invoice: string
  kode_cabang: string
  tipe_program: string
}

export type GetTransactionType = {
  _id: string
  kode_toko: string
  no_invoice: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  total_diskon: number
  status: string
  tgl_jatuh_tempo: string
}

export type PostPayType = {
  no_invoice: string
  kode_cabang: string
  kode_toko: string
  total_harga: number
}

export type FormPayType = {
  bulan: string
  foto: string
  harga: number
  id: string
  kode_toko: string
  product: string
  qty: number
  tgl_jatuh_tempo: string
  toko: string
  total_harga: number
}
