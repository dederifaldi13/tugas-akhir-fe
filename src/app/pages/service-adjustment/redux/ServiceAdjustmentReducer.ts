import { Action } from "redux";
import { GetActiveCustomerType, GET_ACTIVE_CUSTOMER } from "./action/ServiceAdjustmentActionTypes";


export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetActiveCustomerType>;

}

const defaultState: DefaultStateI = {
    feedback: [],
};

const serviceAdjustmentReducer = (
    state: DefaultStateI = defaultState,
    action: ActionWithPayload<DefaultStateI>
): DefaultStateI => {
    switch (action.type) {
        case GET_ACTIVE_CUSTOMER:
            const data = action.payload?.feedback
            return { ...state, feedback: data, };
        default:
            return state;
    }
};

export default serviceAdjustmentReducer;
