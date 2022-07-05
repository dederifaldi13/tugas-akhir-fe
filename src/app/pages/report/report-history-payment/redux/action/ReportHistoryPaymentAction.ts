import moment from "moment";
import { Dispatch } from "redux";
import { AxiosGet, getImage, PopUpAlert } from "../../../../../../setup";
import { saveLocal } from "../../../../../../setup/encrypt";
import { setLoading, setLoadingApprove, stopLoading, stopLoadingApprove } from "../../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../../setup/redux/Store";
import { GET_HISTORY_PAYMENT_SUCCESS, HIDE_MODAL_BUKTI_BAYAR_SUCCESS, SET_NO_BAYAR, SHOW_MODAL_BUKTI_BAYAR_SUCCESS, TableHistoryPaymentReportType } from "./RerportHistoryPaymentActionTypes";


export const REPORT_HISTORY_PAYMENT_API = `payment/report?`

export const GetHistoryPaymentReport = (data: { kode_toko: { value: string, label: string }, product: { value: string, label: string }, tgl_akhir: string, tgl_awal: string }) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        let newarrdata: TableHistoryPaymentReportType[] = []
        dispatch(setLoading())
        const tgl_awal = moment(data.tgl_awal).format('YYYY-MM-DD')
        const tgl_akhir = moment(data.tgl_akhir).format('YYYY-MM-DD')
        const kode_toko = data.kode_toko.value
        const prod = data.product.value
        AxiosGet(`${REPORT_HISTORY_PAYMENT_API}startDate=${tgl_awal}&endDate=${tgl_akhir}&kode_toko=${kode_toko}&product=${prod}`).then(async (res: any) => {
            if (res.data.length === 0) {
                PopUpAlert.default.AlertError('Data Laporan Kosong !')
                dispatch({ type: GET_HISTORY_PAYMENT_SUCCESS, payload: { feedback: [] } });
                dispatch(stopLoading())
            } else {
                for (let index = 0; index < res.data.length; index++) {
                    const obj: TableHistoryPaymentReportType = {
                        key: index,
                        kode_toko: res.data[index].kode_toko,
                        toko: res.data[index].toko,
                        qty: res.data[index].qty,
                        bulan: res.data[index].bulan,
                        harga: res.data[index].harga,
                        product: res.data[index].product,
                        total_harga: res.data[index].total_harga,
                        __v: res.data[index].__v,
                        _id: res.data[index]._id,
                        no_bayar: res.data[index].no_bayar,
                        tanggal_bayar: res.data[index].tanggal_bayar
                    }
                    newarrdata.push(obj)
                }
                dispatch({ type: GET_HISTORY_PAYMENT_SUCCESS, payload: { feedback: newarrdata } });
                PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Melihat Laporan !')
                dispatch(stopLoading())
            }
            await saveLocal('headLaporan', { tgl_awal: tgl_awal, tgl_akhir: tgl_akhir })
        }).catch((error: any) => {
            console.log(error);
            PopUpAlert.default.AlertError('Gagal Melihat Laporan !')
            dispatch(stopLoading())
        })
    };
};

export const GetGambarByNoBayar = (no_bayar: string) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch(setLoadingApprove())
        dispatch({ type: SET_NO_BAYAR, payload: { noBayar: no_bayar } })
        getImage(no_bayar).then((res: any) => {
            dispatch({ type: SHOW_MODAL_BUKTI_BAYAR_SUCCESS, payload: { noBayar: no_bayar, image: res } })
            dispatch(stopLoadingApprove())
        }).catch((error: any) => {
            dispatch({ type: SHOW_MODAL_BUKTI_BAYAR_SUCCESS, payload: { noBayar: no_bayar, image: '/media/notfound/image-not-found.png' } })
            dispatch(stopLoadingApprove())
        })
    };
};

export const CloseModalBuktiBayar = () => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch({ type: HIDE_MODAL_BUKTI_BAYAR_SUCCESS })
    };
};


