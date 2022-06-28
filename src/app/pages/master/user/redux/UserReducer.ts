import { Action } from "redux";
import { EDIT_USER_SUCCESS, GetUserType, GET_USER_SUCCESS } from "./action/UserActionTypes";

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetUserType>;
    feedbackID?: GetUserType
}

const defaultState: DefaultStateI = {
    feedback: [],
    feedbackID: undefined
};

const masterUserReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case EDIT_USER_SUCCESS:
            const data_id = action.payload?.feedbackID
            return { ...state, feedbackID: data_id }
        default:
            return state;
    }
};

export default masterUserReducer;
