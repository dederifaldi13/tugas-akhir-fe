export const DATA_CUSTOMER_SUCCESS = "DATA_CUSTOMER_SUCCESS";
export const PAYMENT_CUSTOMER_DATA_SUCCESS = "PAYMENT_CUSTOMER_DATA_SUCCESS"
export const SHOW_MODAL_BUKTI_BAYAR_CUSTOMER = "SHOW_MODAL_BUKTI_BAYAR_CUSTOMER"
export const HIDE_MODAL_BUKTI_BAYAR_CUSTOMER = "HIDE_MODAL_BUKTI_BAYAR_CUSTOMER"

export type DataType = {
  _id: String;
  created_at: String;
  kode_toko: String;
  toko: String;
  alamat: String;
  telepon: String;
  email: String;
  product: String;
  qty: Number;
  harga: Number;
  bulan: String;
  total_harga: Number;
  tgl_jatuh_tempo: String;
  status: String;
  kode_cabang: String;
  tipe_program: String;
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

export type TableDataType = {
  key: number
  _id: String;
  created_at: String;
  kode_toko: String;
  toko: String;
  alamat: String;
  telepon: String;
  email: String;
  product: String;
  qty: Number;
  harga: Number;
  bulan: String;
  total_harga: Number;
  tgl_jatuh_tempo: String;
  status: String;
  kode_cabang: String;
  tipe_program: String;
}
