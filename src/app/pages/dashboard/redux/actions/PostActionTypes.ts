export const POST_SUCCESS = "POST_SUCCESS";
export const DELETE_POST = "DELETE_POST";
export const PAYMENT_DATA_SUCCESS = "PAYMENT_DATA_SUCCESS"
export const SHOW_MODAL_BUKTI_BAYAR_SUCCESS = "SHOW_MODAL_BUKTI_BAYAR_SUCCESS"
export const HIDE_MODAL_BUKTI_BAYAR_SUCCESS = "HIDE_MODAL_BUKTI_BAYAR_SUCCESS"
export const GET_TOKO_BY_KODE = "GET_TOKO_BY_KODE"
export const COUNT_TOTAL_QTY = "COUNT_TOTAL_QTY"
export const COUNT_TOTAL_HARGA = "COUNT_TOTAL_HARGA"
export const SET_PRODUCT = "SET_PRODUCT"
export const SET_CABANG = "SET_CABANG"
export const SET_CABANG_BY_ID = "SET_CABANG_BY_ID"

export type PostType = {
  kode_toko: String;
  toko: String;
  product: String;
  email: String;
  telepon: String;
  qty: Number;
  harga: Number;
  bulan: String;
  total_harga: Number;
  tgl_jatuh_tempo: String;
  kode_cabang: String;
  tipe_program: String;
};

export type FormPostType = {
  kode_toko: { value: String; label: String; };
  kode_cabang: { value: String; label: String; };
  toko: String;
  alamat: String;
  telepon: String;
  email: String;
  product: { value: String; label: String; };
  tipe_program: String;
  qty: Number;
  harga: Number;
  bulan: String;
  total_harga: Number;
  tgl_jatuh_tempo: String;
};

export type DeletePostType = {
  id: Number;
};

export type EditPostType = {
  userId: Number;
  title: String;
  body: String;
};

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

export type RequestValidationType = {
  kode_toko: string
  product: string
}

export type CabangType = {
  _id: string
  alamat: string
  email: string
  telepon: string
}