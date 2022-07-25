import { Action } from "redux";
import {
    COUNT_TOTAL_HARGA_EDIT,
    COUNT_TOTAL_QTY_EDIT,
    GetActiveCustomerType,
    GET_ACTIVE_CUSTOMER,
    GET_ACTIVE_CUSTOMER_BY_ID,
    SET_ID_FOR_DELETE,
    SET_PRODUCT_EDIT,
    SET_TOTAL_HARGA,
    SHOW_MODAL_EDIT
} from "./action/ServiceAdjustmentActionTypes";


export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetActiveCustomerType>;
    feedbackID?: GetActiveCustomerType;
    ID?: String;
    isShow?: boolean;
    totalHarga?: Number;
    qty?: Number;
    harga?: Number;
    product?: String;
    tipe_program?: String;

}

const defaultState: DefaultStateI = {
    feedback: [],
    feedbackID: undefined,
    ID: '-',
    isShow: false,
    totalHarga: 0,
    qty: 6,
    harga: 0,
    product: '',
    tipe_program: 'ONLINE',
};

const serviceAdjustmentReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_ACTIVE_CUSTOMER:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        case SET_ID_FOR_DELETE:
            return { ...state, ID: action.payload?.ID }
        case SHOW_MODAL_EDIT:
            return { ...state, isShow: action.payload?.isShow }
        case SET_TOTAL_HARGA:
            return { ...state, totalHarga: action.payload?.totalHarga }
        case COUNT_TOTAL_QTY_EDIT:
            return { ...state, totalHarga: action.payload?.totalHarga, qty: action.payload?.qty }
        case COUNT_TOTAL_HARGA_EDIT:
            return { ...state, totalHarga: action.payload?.totalHarga, harga: action.payload?.harga }
        case SET_PRODUCT_EDIT:
            return { ...state, product: action.payload?.product, tipe_program: action.payload?.tipe_program }
        case GET_ACTIVE_CUSTOMER_BY_ID:
            return { ...state, feedbackID: action.payload?.feedbackID }
        default:
            return state;
    }
};

export default serviceAdjustmentReducer;
