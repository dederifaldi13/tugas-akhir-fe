export const GET_STORE_SUCCESS = "GET_STORE_SUCCESS";
export const ADD_STORE_SUCCESS = "ADD_STORE_SUCCESS";
export const EDIT_STORE_SUCCESS = "EDIT_STORE_SUCCESS";
export const DELETE_STORE_SUCCESS = "DELETE_STORE_SUCCESS";

export type PostStoreType = {
    kode_toko: String;
    toko: String;
    alamat: String;
    telepon: String;
    email: String;
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
    alamat: String;
    telepon: String;
    email: String;
    __v: Number;
}

export type TableStoreType = {
    key: String;
    _id: String;
    created_at: String;
    kode_toko: String;
    toko: String;
    alamat: String;
    telepon: String;
    email: String;
    __v: Number;
}