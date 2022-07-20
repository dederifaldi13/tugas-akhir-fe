import moment from "moment";
import { Dispatch } from "redux";
import { AxiosGet, AxiosPostiPayMu, PopUpAlert } from "../../../../../../setup";
import { saveLocal } from "../../../../../../setup/encrypt";
import { setLoading, stopLoading } from "../../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../../setup/redux/Store";
import { DataTrxiPaymu, GET_HISTORY_PAYMENT_IPAYMU_SUCCESS, GET_TOKO_BY_KODE_SUCCESS, TableHistoryPaymentiPaymuReportType } from "./RerportHistoryPaymentiPaymuActionTypes";


export const REPORT_HISTORY_PAYMENT_API = `history`

export const GetHistoryPaymentReportiPaymu = (data: { tgl_akhir: string, tgl_awal: string, kode_toko: any }) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        let newarrdata: TableHistoryPaymentiPaymuReportType[] = []
        dispatch(setLoading())
        const tgl_awal = moment(data.tgl_awal).format('YYYY-MM-DD')
        const tgl_akhir = moment(data.tgl_akhir).format('YYYY-MM-DD')
        const dataKirim = {
            startdate: tgl_awal,
            enddate: tgl_akhir
        }

        AxiosPostiPayMu(REPORT_HISTORY_PAYMENT_API, dataKirim).then(async (res: any) => {
            const resdata: DataTrxiPaymu[] = res.Data.Transaction
            const kodetoko = data.kode_toko.label || data.kode_toko
            if (kodetoko.toUpperCase() !== 'SEMUA') {
                const filterdata = resdata.filter((item: DataTrxiPaymu) => item.BuyerName === data.kode_toko)
                for (let index = 0; index < filterdata.length; index++) {
                    const obj: TableHistoryPaymentiPaymuReportType = {
                        key: index,
                        Amount: filterdata[index].Amount,
                        BuyerEmail: filterdata[index].BuyerEmail,
                        BuyerPhone: filterdata[index].BuyerPhone,
                        BuyerName: filterdata[index].BuyerName,
                        CreatedDate: filterdata[index].CreatedDate,
                        ExpiredDate: filterdata[index].ExpiredDate,
                        Fee: filterdata[index].Fee,
                        IsEscrow: filterdata[index].IsEscrow,
                        Notes: filterdata[index].Notes,
                        PaymentChannel: filterdata[index].PaymentChannel,
                        PaymentCode: filterdata[index].PaymentCode,
                        Receiver: filterdata[index].Receiver,
                        ReferenceId: filterdata[index].ReferenceId,
                        RelatedId: filterdata[index].RelatedId,
                        Sender: filterdata[index].Sender,
                        SessionId: filterdata[index].SessionId,
                        SettlementDate: filterdata[index].SettlementDate,
                        Status: filterdata[index].Status,
                        StatusDesc: filterdata[index].StatusDesc,
                        SuccessDate: filterdata[index].SuccessDate,
                        TransactionId: filterdata[index].TransactionId,
                        Type: filterdata[index].Type,
                        TypeDesc: filterdata[index].TypeDesc,

                    }
                    newarrdata.push(obj)
                }
            } else {
                for (let index = 0; index < resdata.length; index++) {
                    const obj: TableHistoryPaymentiPaymuReportType = {
                        key: index,
                        Amount: resdata[index].Amount,
                        BuyerEmail: resdata[index].BuyerEmail,
                        BuyerPhone: resdata[index].BuyerPhone,
                        BuyerName: resdata[index].BuyerName,
                        CreatedDate: resdata[index].CreatedDate,
                        ExpiredDate: resdata[index].ExpiredDate,
                        Fee: resdata[index].Fee,
                        IsEscrow: resdata[index].IsEscrow,
                        Notes: resdata[index].Notes,
                        PaymentChannel: resdata[index].PaymentChannel,
                        PaymentCode: resdata[index].PaymentCode,
                        Receiver: resdata[index].Receiver,
                        ReferenceId: resdata[index].ReferenceId,
                        RelatedId: resdata[index].RelatedId,
                        Sender: resdata[index].Sender,
                        SessionId: resdata[index].SessionId,
                        SettlementDate: resdata[index].SettlementDate,
                        Status: resdata[index].Status,
                        StatusDesc: resdata[index].StatusDesc,
                        SuccessDate: resdata[index].SuccessDate,
                        TransactionId: resdata[index].TransactionId,
                        Type: resdata[index].Type,
                        TypeDesc: resdata[index].TypeDesc,

                    }
                    newarrdata.push(obj)
                }
            }
            if (newarrdata.length === 0) {
                PopUpAlert.default.AlertError('transaction not found')
                dispatch({ type: GET_HISTORY_PAYMENT_IPAYMU_SUCCESS, payload: { feedback: [] } });
                dispatch(stopLoading())
            } else {
                dispatch({ type: GET_HISTORY_PAYMENT_IPAYMU_SUCCESS, payload: { feedback: newarrdata } });
                dispatch(stopLoading())
                PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Melihat Laporan !')
                await saveLocal('headLaporan', { tgl_awal: tgl_awal, tgl_akhir: tgl_akhir })
            }
        }).catch((error: any) => {
            console.log(error.response.data);
            PopUpAlert.default.AlertError(error.response.data.Message)
            dispatch({ type: GET_HISTORY_PAYMENT_IPAYMU_SUCCESS, payload: { feedback: [] } });
            dispatch(stopLoading())
        })
    };
};


export const GetTokoByKodeToko = (kode: String) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        AxiosGet('store/by-kode/' + kode).then((res: any) => {
            dispatch({ type: GET_TOKO_BY_KODE_SUCCESS, payload: { dataToko: res.data[0] } });
        }).catch((error: any) => {
            console.log(error);
        })
    };
};
