import { Action } from "redux";
import { EDIT_PRODUCT_SUCCESS, GetProductType, GET_PRODUCT_SUCCESS, HIDE_MODAL, SHOW_MODAL } from "./action/ProductActionTypes";

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetProductType>;
    feedbackID?: GetProductType;
    modal: boolean
}

const defaultState: DefaultStateI = {
    feedback: [],
    feedbackID: undefined,
    modal: false
};

const masterProductReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case EDIT_PRODUCT_SUCCESS:
            const data_id = action.payload?.feedbackID
            return { ...state, feedbackID: data_id }
        case SHOW_MODAL:
            return { ...state, modal: true }
        case HIDE_MODAL:
            return { ...state, modal: false }
        default:
            return state;
    }
};

export default masterProductReducer;
