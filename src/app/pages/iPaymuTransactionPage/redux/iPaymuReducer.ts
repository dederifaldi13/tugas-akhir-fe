import { Action } from "redux";
import { GetTransactionType, GET_QR_LOCAL, GET_TRANSACTION_SUCCESS } from "./action/iPaymuActionTypes";


export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: GetTransactionType;
    feedbackQRLocal?: any;
    qr?: any

}

const defaultState: DefaultStateI = {
    feedback: undefined,
    feedbackQRLocal: undefined,
    qr: undefined
};

const IPaymuReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_TRANSACTION_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case GET_QR_LOCAL:
            const dataQR = action.payload?.feedbackQRLocal
            const qr = action.payload?.qr
            return { ...state, feedbackQRLocal: dataQR, qr: qr };
        default:
            return state;
    }
};

export default IPaymuReducer;
