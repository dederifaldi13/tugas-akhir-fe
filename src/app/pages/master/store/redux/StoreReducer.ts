import { Action } from "redux";
import { ADD_CABANG_EDIT_SUCCESS, ADD_CABANG_SUCCESS, CabangStoreType, EDIT_STORE_SUCCESS, GetStoreType, GET_STORE_SUCCESS, HIDE_ADD_MODAL_CABANG_EDIT, HIDE_MODAL_CABANG, HIDE_MODAL_CABANG_EDIT, SHOW_ADD_MODAL_CABANG_EDIT, SHOW_MODAL_CABANG, SHOW_MODAL_CABANG_EDIT } from "./action/StoreActionTypes";

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface DefaultStateI {
    feedback?: Array<GetStoreType>;
    feedbackID?: GetStoreType;
    modal: boolean;
    modalAddCabangEdit: boolean;
    modalEdit: boolean;
    feedbackCabang?: Array<CabangStoreType>;
    feedbackCabangEdit?: Array<CabangStoreType>
}

const defaultState: DefaultStateI = {
    feedback: [],
    feedbackID: undefined,
    modal: false,
    modalAddCabangEdit: false,
    modalEdit: false,
    feedbackCabang: [],
    feedbackCabangEdit: []
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
        case SHOW_MODAL_CABANG:
            return { ...state, modal: true }
        case HIDE_MODAL_CABANG:
            return { ...state, modal: false }
        case SHOW_MODAL_CABANG_EDIT:
            return { ...state, modalEdit: true }
        case HIDE_MODAL_CABANG_EDIT:
            return { ...state, modalEdit: false }
        case SHOW_ADD_MODAL_CABANG_EDIT:
            return { ...state, modalAddCabangEdit: true }
        case HIDE_ADD_MODAL_CABANG_EDIT:
            return { ...state, modalAddCabangEdit: false }
        case ADD_CABANG_SUCCESS:
            const datacab = action.payload?.feedbackCabang
            return { ...state, feedbackCabang: datacab }
        case ADD_CABANG_EDIT_SUCCESS:
            const datacabedit = action.payload?.feedbackCabangEdit
            return { ...state, feedbackCabangEdit: datacabedit }
        default:
            return state;
    }
};

export default masterStoreReducer;
