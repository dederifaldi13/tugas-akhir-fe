export type IFormCabangStoreType = {
    cabang: String;
    alamat: String;
    telepon: String;
    email: String;
}

export interface IFormReportCustomer {
    tgl_awal: string
    tgl_akhir: string
    kode_toko: string
    product: string
    status: string
}

export interface IFormConfirmPayment {
    foto: string
}

export interface IFormAddNewUser {
    user_id: string
    user_name: string
    password: string
}

export interface IFormAddNewTransaction {
    kode_toko: string
    nama_toko: string
    alamat: string
    telepon: string
    email: string
    product: string
    qty: number
    harga: number
    bulan: string
    total_harga: number
    tgl_jatuh_tempo: Date
    tipe_program: string
}

export interface IFormAddNewProduct {
    product: string
}


export type IFormStoreType = {
    kode_toko: String;
    toko: String;
};


