export const POST_SUCCESS = "POST_SUCCESS";
export const DELETE_POST = "DELETE_POST";
export const PAYMENT_DATA_SUCCESS = "PAYMENT_DATA_SUCCESS"
export const SHOW_MODAL_BUKTI_BAYAR_SUCCESS = "SHOW_MODAL_BUKTI_BAYAR_SUCCESS"
export const HIDE_MODAL_BUKTI_BAYAR_SUCCESS = "HIDE_MODAL_BUKTI_BAYAR_SUCCESS"
export const GET_TOKO_BY_KODE = "GET_TOKO_BY_KODE"
export const COUNT_TOTAL_QTY = "COUNT_TOTAL_QTY"
export const COUNT_TOTAL_HARGA = "COUNT_TOTAL_HARGA"
export const SET_PRODUCT = "SET_PRODUCT"

export type PostType = {
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
};

export type FormPostType = {
  kode_toko: { value: String; label: String; };
  toko: String;
  alamat: String;
  telepon: String;
  email: String;
  product: { value: String; label: String; };
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
  _id: string
  kode_toko: string
  toko: string
  alamat: string
  telepon: string
  email: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  tgl_jatuh_tempo: string
  status: string
  __v: number
}


export type PaymentDataType = {
  _id: string
  no_bayar: string
  tanggal_bayar: string
  kode_toko: string
  toko: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  __v: number
}

export type TablePaymentDataType = {
  key: number
  _id: string
  no_bayar: string
  tanggal_bayar: string
  kode_toko: string
  toko: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  __v: number
}

export type TableDataType = {
  key: number
  _id: string
  kode_toko: string
  toko: string
  alamat: string
  telepon: string
  email: string
  product: string
  qty: number
  harga: number
  bulan: string
  total_harga: number
  tgl_jatuh_tempo: string
  status: string
  __v: number
}

export type RequestValidationType = {
  kode_toko: string
  product: string
}