export const GET_DATA_CUSTOMER_REPORT_SUCCESS = "GET_DATA_CUSTOMER_REPORT_SUCCESS";

export type GetCustomerReportType = {
    _id: String;
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
    __v: Number;
}


export type TableCustomerReportType = {
    key: number
    _id: String;
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
    __v: Number;
}