import { Dispatch } from "redux";
import { AxiosGet, AxiosPost, PopUpAlert } from "../../../../../setup";
import { setLoading, setLoadingApprove, stopLoading, stopLoadingApprove } from "../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../setup/redux/Store";
import { GET_ACTIVE_CUSTOMER, TableActivateCustomerType } from "./ServiceAdjustmentActionTypes";

export const ACTIVE_CUSTOMER_API = `customer`

export const GetActiveCustomerAction = () => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        let newarrdata: TableActivateCustomerType[] = []
        AxiosGet(ACTIVE_CUSTOMER_API).then((res: any) => {
            for (let index = 0; index < res.data.length; index++) {
                const obj: TableActivateCustomerType = {
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
            dispatch({ type: GET_ACTIVE_CUSTOMER, payload: { feedback: newarrdata } });
        }).catch((error: any) => {
            console.log(error);

        })
    };
};


export const PostDeactivateData = (kode: string, namaproduct: string) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch(setLoading())
        const senddata = {
            kode_toko: kode,
            product: namaproduct
        }
        AxiosPost(`${ACTIVE_CUSTOMER_API}/deactivate`, senddata).then(() => {
            dispatch(stopLoading())
            PopUpAlert.default.AlertSuccess('Berhasil Menonaktifkan Data Customer')
        }).catch((error: any) => {
            console.log(error);
            dispatch(stopLoading())
            PopUpAlert.default.AlertError('Gagal Menonaktifkan Data !')
        })
    };
};

export const PostActivateData = (kode: string, namaproduct: string) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch(setLoadingApprove())
        const senddata = {
            kode_toko: kode,
            product: namaproduct
        }
        AxiosPost(`${ACTIVE_CUSTOMER_API}/activate`, senddata).then(() => {
            dispatch(stopLoadingApprove())
            PopUpAlert.default.AlertSuccess('Berhasil Mengaktifkan Data Customer')
        }).catch((error: any) => {
            console.log(error);
            dispatch(stopLoadingApprove())
            PopUpAlert.default.AlertError('Gagal Mengaktifkan Data !')
        })
    };
};

