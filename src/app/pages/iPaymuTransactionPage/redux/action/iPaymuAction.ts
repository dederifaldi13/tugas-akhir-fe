import { Dispatch } from "redux";
import { AxiosGet } from "../../../../../setup";
import { getLocal } from "../../../../../setup/encrypt";
import { IAppState } from "../../../../../setup/redux/Store";
import { FormPayType, GET_QR_LOCAL, GET_TRANSACTION_SUCCESS, ParamsGetTransactionType } from "./iPaymuActionTypes";

export const TRANSACTION_URL_FILTER = `customer`

export const GetTransactionFilter = (params: ParamsGetTransactionType) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        AxiosGet(TRANSACTION_URL_FILTER + '/by-kode-product/?kode_toko=' + params.kode_toko + '&product=' + params.product).then((res: any) => {
            dispatch({ type: GET_TRANSACTION_SUCCESS, payload: { feedback: res.data[0] } });
        }).catch((error: any) => {
            console.log(error);

        })
    };
};

export const GetDataQR = () => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        getLocal('QRTrx').then((res: any) => dispatch({ type: GET_QR_LOCAL, payload: { feedbackQRLocal: res } }))
    };
};

export const ConfirmPaymentAction = (data: FormPayType) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {

    };
};

