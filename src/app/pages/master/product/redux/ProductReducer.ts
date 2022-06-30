import { Action } from "redux";
import { EDIT_PRODUCT_SUCCESS, GetProductType, GET_PRODUCT_SUCCESS } from "./action/ProductActionTypes";

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetProductType>;
    feedbackID?: GetProductType
}

const defaultState: DefaultStateI = {
    feedback: [],
    feedbackID: undefined
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
        default:
            return state;
    }
};

export default masterProductReducer;
