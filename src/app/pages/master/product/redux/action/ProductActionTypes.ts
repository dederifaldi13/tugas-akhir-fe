export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";

export type PostProductType = {
    product: String;
};

export type EditProductType = {
    id: String;
    product: String;
};

export type DeleteProductType = {
    id: String;
};

export type GetProductType = {
    _id: String;
    created_at: String;
    product: String;
    __v: Number;
}

export type TableProductType = {
    key: String;
    _id: String;
    created_at: String;
    product: String;
    __v: Number;
}