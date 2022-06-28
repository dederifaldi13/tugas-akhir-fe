export const POST_SUCCESS = "POST_SUCCESS";
export const DELETE_POST = "DELETE_POST";

export type PostType = {
  userId: Number;
  id: Number;
  title: String;
  body: String;
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