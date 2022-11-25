export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export type PostProductType = {
    product: String;
    tipe_program: { value: String, label: String };
};

export type EditProductType = {
    id: String;
    old_product: String;
    product: String;
    tipe_program: { value: String, label: String };
};

export type DeleteProductType = {
    id: String;
};

export type GetProductType = {
    _id: String;
    created_at: String;
    product: String;
    __v: Number;
    tipe_program: String;
}

export type TableProductType = {
    key: String;
    _id: String;
    created_at: String;
    product: String;
    __v: Number;
    tipe_program: String;
}