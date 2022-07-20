export const GET_DATA_CUSTOMER_REPORT_SUCCESS = "GET_DATA_CUSTOMER_REPORT_SUCCESS";
export const SET_ALL_CHECKBOX = "SET_ALL_CHECKBOX"

export type GetCustomerReportType = {
    alamat: String;
    bulan: String;
    created_at: String;
    email: String;
    harga: Number;
    kode_cabang: String;
    kode_toko: String;
    product: String;
    qty: Number;
    status: String;
    telepon: String;
    tgl_jatuh_tempo: String;
    tipe_program: String;
    toko: String;
    total_harga: Number;
    __v: Number;
    _id: String;
}


export type TableCustomerReportType = {
    key: number
    alamat: String;
    bulan: String;
    created_at: String;
    email: String;
    harga: Number;
    kode_cabang: String;
    kode_toko: String;
    product: String;
    qty: Number;
    status: String;
    telepon: String;
    tgl_jatuh_tempo: String;
    tipe_program: String;
    toko: String;
    total_harga: Number;
    __v: Number;
    _id: String;
}