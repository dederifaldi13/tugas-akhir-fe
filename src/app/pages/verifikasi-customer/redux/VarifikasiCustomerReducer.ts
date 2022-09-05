import { Action } from "redux";
import { GetTransactionType, GET_TRANSACTION_SUCCESS, VERIFIKASI_SUCCESS } from "./action/VerifikasiCustomerActionTypes";


export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: GetTransactionType;
    feedbackVerif?: any

}

const defaultState: DefaultStateI = {
    feedback: undefined,
    feedbackVerif: undefined
};

const VerifikasiCustomerReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_TRANSACTION_SUCCESS:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case VERIFIKASI_SUCCESS:
            const dataverif = action.payload?.feedbackVerif
            return { ...state, feedbackVerif: dataverif, };
        default:
            return state;
    }
};

export default VerifikasiCustomerReducer;
