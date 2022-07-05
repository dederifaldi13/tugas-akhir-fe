import moment from "moment";
import { Dispatch } from "redux";
import { AxiosGet, PopUpAlert } from "../../../../../../setup";
import { setLoading, stopLoading } from "../../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../../setup/redux/Store";
import { GET_DATA_CUSTOMER_REPORT_SUCCESS, TableCustomerReportType } from "./RerportCustomerActionTypes";


export const REPORT_CUSTOMER_API = `customer/report?`

export const GetCustomerReportAction = (data: { kode_toko: { value: string, label: string }, product: { value: string, label: string }, tgl_akhir: string, tgl_awal: string }) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        let newarrdata: TableCustomerReportType[] = []
        dispatch(setLoading())
        AxiosGet(`${REPORT_CUSTOMER_API}startDate=${moment(data.tgl_awal).format('YYYY-MM-DD')}&endDate=${moment(data.tgl_akhir).format('YYYY-MM-DD')}&kode_toko=${data.kode_toko.value}&product=${data.product.value}`).then((res: any) => {
            if (res.data.length === 0) {
                PopUpAlert.default.AlertError('Data Laporan Kosong !')
                dispatch({ type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: { feedback: [] } });
                dispatch(stopLoading())
            } else {
                for (let index = 0; index < res.data.length; index++) {
                    const obj: TableCustomerReportType = {
                        key: index,
                        kode_toko: res.data[index].kode_toko,
                        toko: res.data[index].toko,
                        qty: res.data[index].qty,
                        alamat: res.data[index].alamat,
                        status: res.data[index].status,
                        bulan: res.data[index].bulan,
                        email: res.data[index].email,
                        harga: res.data[index].harga,
                        product: res.data[index].product,
                        telepon: res.data[index].telepon,
                        tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
                        total_harga: res.data[index].total_harga,
                        __v: res.data[index].__v,
                        _id: res.data[index]._id
                    }
                    newarrdata.push(obj)
                }
                dispatch({ type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: { feedback: newarrdata } });
                PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Melihat Laporan !')
                dispatch(stopLoading())
            }
        }).catch((error: any) => {
            console.log(error);
            PopUpAlert.default.AlertError('Gagal Melihat Laporan !')
            dispatch(stopLoading())
        })
    };
};


