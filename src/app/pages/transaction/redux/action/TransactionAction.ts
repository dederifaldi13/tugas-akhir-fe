import { Dispatch } from "redux";
import { AxiosGet, AxiosPost, PopUpAlert, postImage } from "../../../../../setup";
import { dataURLtoFile } from "../../../../../setup/helper/function";
import { setLoading, stopLoading } from "../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../setup/redux/Store";
import { FormPayType, GET_TRANSACTION_SUCCESS, ParamsGetTransactionType, PostPayType, SET_CAMERA_SUCCESS } from "./TransactionActionTypes";

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

export const setCameraAction = (data: string) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch({ type: SET_CAMERA_SUCCESS, payload: { setCameraVal: data } })
    };
};

export const ConfirmPaymentAction = (data: FormPayType) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch(setLoading());
        const sendData: PostPayType = {
            kode_toko: data.kode_toko,
            toko: data.toko,
            product: data.product,
            qty: data.qty,
            harga: data.harga,
            bulan: data.bulan,
            total_harga: data.total_harga
        }
        AxiosPost('payment/pay', sendData).then((res: any) => {
            const file = dataURLtoFile(data.foto)
            postImage(file, res.no_bayar).then(() => {
            }).catch((error: any) => {
                console.log(error);
                PopUpAlert.default.AlertError('Gagal Menyimpan Gambar !')
            }).finally(() => {
                dispatch(stopLoading());
                PopUpAlert.default.AlertSuccessPayment('Berhasil Melakukan Pembayaran')
            })
        }).catch((error: any) => {
            console.log(error);
            dispatch(stopLoading());
            PopUpAlert.default.AlertError('Gagal Melakukan Pembayaran !')
        })
    };
};

