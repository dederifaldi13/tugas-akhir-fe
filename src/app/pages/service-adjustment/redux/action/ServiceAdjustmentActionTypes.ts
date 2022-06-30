export const GET_ACTIVE_CUSTOMER = "GET_ACTIVE_CUSTOMER";

export type GetActiveCustomerType = {
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


export type TableActivateCustomerType = {
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