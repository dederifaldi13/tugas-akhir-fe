export const GET_HISTORY_PAYMENT_SUCCESS = "GET_HISTORY_PAYMENT_SUCCESS";
export const SHOW_MODAL_BUKTI_BAYAR_SUCCESS = "SHOW_MODAL_BUKTI_BAYAR_SUCCESS";
export const HIDE_MODAL_BUKTI_BAYAR_SUCCESS = "HIDE_MODAL_BUKTI_BAYAR_SUCCESS";
export const SET_NO_BAYAR = "SET_NO_BAYAR";

export type GetHistoryPaymentReportType = {
    _id: String;
    no_bayar: String;
    tanggal_bayar: String;
    kode_toko: String;
    toko: String;
    product: String;
    qty: Number;
    harga: Number;
    bulan: String;
    total_harga: Number;
    __v: Number;
}


export type TableHistoryPaymentReportType = {
    key: number
    _id: String;
    no_bayar: String;
    tanggal_bayar: String;
    kode_toko: String;
    toko: String;
    product: String;
    qty: Number;
    harga: Number;
    bulan: String;
    total_harga: Number;
    __v: Number;
}