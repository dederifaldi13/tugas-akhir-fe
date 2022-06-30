import { Action } from "redux";
import { GetTransactionType, GET_TRANSACTION_SUCCESS, SET_CAMERA_SUCCESS } from "./action/TransactionActionTypes";


export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: GetTransactionType;
    setCameraVal?: string;

}

const defaultState: DefaultStateI = {
    feedback: undefined,
    setCameraVal: '-'
};

const TransactionReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_TRANSACTION_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case SET_CAMERA_SUCCESS:
            const camera = action.payload?.setCameraVal
            return { ...state, setCameraVal: camera, };
        default:
            return state;
    }
};

export default TransactionReducer;
