import { Action } from "redux";
import { EDIT_STORE_SUCCESS, GetStoreType, GET_STORE_SUCCESS } from "./action/StoreActionTypes";

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetStoreType>;
    feedbackID?: GetStoreType
}

const defaultState: DefaultStateI = {
    feedback: [],
    feedbackID: undefined
};

const masterStoreReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_STORE_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case EDIT_STORE_SUCCESS:
            const data_id = action.payload?.feedbackID
            return { ...state, feedbackID: data_id }
        default:
            return state;
    }
};

export default masterStoreReducer;
