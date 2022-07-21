export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";

export type PostUserType = {
    user_id: String;
    user_name: String;
    password: String;
    level: { value: String, label: String };
};

export type EditUserType = {
    id: String;
    user_id: String;
    level: { value: String, label: String };
    user_name: String;
};

export type DeleteUserType = {
    id: String;
};

export type EditPostType = {
    userId: Number;
    title: String;
    body: String;
};

export type GetUserType = {
    key: string
    _id: string
    user_id: string
    user_name: string
    level: string
}