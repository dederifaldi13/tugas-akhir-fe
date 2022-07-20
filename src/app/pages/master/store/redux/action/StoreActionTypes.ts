export const GET_STORE_SUCCESS = "GET_STORE_SUCCESS";
export const ADD_CABANG_SUCCESS = "ADD_CABANG_SUCCESS";
export const ADD_CABANG_EDIT_SUCCESS = "ADD_CABANG_EDIT_SUCCESS";
export const SHOW_MODAL_CABANG = "SHOW_MODAL_CABANG";
export const HIDE_MODAL_CABANG = "HIDE_MODAL_CABANG";
export const SHOW_MODAL_CABANG_EDIT = "SHOW_MODAL_CABANG_EDIT";
export const HIDE_MODAL_CABANG_EDIT = "HIDE_MODAL_CABANG_EDIT";
export const SHOW_ADD_MODAL_CABANG_EDIT = "SHOW_ADD_MODAL_CABANG_EDIT";
export const HIDE_ADD_MODAL_CABANG_EDIT = "HIDE_ADD_MODAL_CABANG_EDIT";
export const EDIT_STORE_SUCCESS = "EDIT_STORE_SUCCESS";
export const DELETE_STORE_SUCCESS = "DELETE_STORE_SUCCESS";

export type PostStoreType = {
    kode_toko: String;
    toko: String;
    detail_cabang: [{
        alamat: String;
        telepon: String;
        email: String;
    }]
};

export type EditStoreType = {
    id: String;
    kode_toko: String;
    toko: String;
    alamat: String;
    telepon: String;
    email: String;
};

export type DeleteStoreType = {
    id: String;
};

export type GetStoreType = {
    _id: String;
    created_at: String;
    kode_toko: String;
    toko: String;
    cabang: Array<CabangStoreType>;
    __v: Number;
}

export type TableStoreType = {
    key: String;
    _id: String;
    created_at: String;
    kode_toko: String;
    toko: String;
    cabang: Array<CabangStoreType>;
    __v: Number;
}

export type CabangStoreType = {
    _id: String;
    alamat: String;
    telepon: String;
    email: String;
}

export type TableCabangStoreType = {
    key?: Number;
    _id: String;
    alamat: String;
    telepon: String;
    email: String;
}