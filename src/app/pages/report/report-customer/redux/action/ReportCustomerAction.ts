import { Dispatch } from "redux";
import { AxiosGet, PopUpAlert } from "../../../../../../setup";
import { setLoading, stopLoading } from "../../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../../setup/redux/Store";
import { GET_DATA_CUSTOMER_REPORT_SUCCESS, TableCustomerReportType } from "./RerportCustomerActionTypes";


export const REPORT_CUSTOMER_API = `customer`

export const GetCustomerReportAction = (kodeCustomer: string) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        let newarrdata: TableCustomerReportType[] = []
        dispatch(setLoading())
        if (kodeCustomer === 'SEMUA') {
            AxiosGet(REPORT_CUSTOMER_API).then((res: any) => {
                if (res.data.length === 0) {
                    PopUpAlert.default.AlertError('Data Laporan Kosong !')
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

        } else {
            AxiosGet(`${REPORT_CUSTOMER_API}/by-kode/${kodeCustomer}`).then((res: any) => {
                if (res.data.length === 0) {
                    PopUpAlert.default.AlertError('Data Laporan Kosong !')
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
        }
    };
};


