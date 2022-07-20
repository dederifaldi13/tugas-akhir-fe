import { Action } from "redux";
import { GetTransactionType, GET_TRANSACTION_SUCCESS, TRX_QRIS_SUCCESS } from "./action/PaymentMethodActionTypes";


export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: GetTransactionType;
    feedbackQR?: any

}

const defaultState: DefaultStateI = {
    feedback: undefined,
    feedbackQR: undefined
};

const PaymentMethodReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_TRANSACTION_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case TRX_QRIS_SUCCESS:
            const dataqr = action.payload?.feedbackQR
            return { ...state, feedbackQR: dataqr, };
        default:
            return state;
    }
};

export default PaymentMethodReducer;
