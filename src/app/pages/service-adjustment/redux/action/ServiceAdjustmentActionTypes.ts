export const GET_ACTIVE_CUSTOMER = "GET_ACTIVE_CUSTOMER";
export const GET_ACTIVE_CUSTOMER_BY_ID = "GET_ACTIVE_CUSTOMER_BY_ID";
export const SET_ID_FOR_DELETE = "SET_ID_FOR_DELETE";
export const SHOW_MODAL_EDIT = "SHOW_MODAL_EDIT";
export const COUNT_TOTAL_QTY_EDIT = "COUNT_TOTAL_QTY_EDIT";
export const COUNT_TOTAL_HARGA_EDIT = "COUNT_TOTAL_HARGA_EDIT";
export const SET_PRODUCT_EDIT = "SET_PRODUCT_EDIT";
export const SET_TOTAL_HARGA = "SET_TOTAL_HARGA";

export type GetActiveCustomerType = {
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

export type TableActivateCustomerType = {
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

export type EditFormCustomer = {
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
    status: String;
}