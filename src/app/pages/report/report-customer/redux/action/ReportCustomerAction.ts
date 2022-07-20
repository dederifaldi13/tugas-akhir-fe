import moment from "moment";
import { Dispatch } from "redux";
import { AxiosGet, PopUpAlert } from "../../../../../../setup";
import { saveLocal } from "../../../../../../setup/encrypt";
import { setLoading, stopLoading } from "../../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../../setup/redux/Store";
import { GET_DATA_CUSTOMER_REPORT_SUCCESS, SET_ALL_CHECKBOX, TableCustomerReportType } from "./RerportCustomerActionTypes";


export const REPORT_CUSTOMER_API = `customer/report?`

export const GetCustomerReportAction = (data: {
    kode_toko: any,
    product: { value: string, label: string },
    status: { value: string, label: string },
    tgl_akhir: string,
    tgl_awal: string,
    all: boolean
}) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        let newarrdata: TableCustomerReportType[] = []
        dispatch(setLoading())
        if (data.all) {
            const tgl_awal = 'all'
            const tgl_akhir = 'all'
            AxiosGet(`${REPORT_CUSTOMER_API}startDate=${tgl_awal}&endDate=${tgl_akhir}&kode_toko=${data.kode_toko.value !== undefined ? data.kode_toko.value : data.kode_toko}&product=${data.product.value}&status=${data.status.value}`).then(async (res: any) => {
                if (res.data.length === 0) {
                    PopUpAlert.default.AlertError('Data Laporan Kosong !')
                    dispatch({ type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: { feedback: [] } });
                    dispatch(stopLoading())
                } else {
                    if (getState().auth.user?.level === 'CUSTOMER') {
                        for (let index = 0; index < res.data.length; index++) {
                            let obj: TableCustomerReportType = {
                                key: 0,
                                _id: '',
                                created_at: '',
                                kode_toko: '',
                                toko: '',
                                alamat: '',
                                telepon: '',
                                email: '',
                                product: '',
                                qty: 0,
                                harga: 0,
                                bulan: '',
                                total_harga: 0,
                                tgl_jatuh_tempo: '',
                                status: '',
                                kode_cabang: '',
                                tipe_program: '',
                                __v: 0
                            }
                            if (res.data[index].status === 'OPEN') {
                                obj = {
                                    key: index,
                                    kode_toko: res.data[index].kode_toko,
                                    toko: res.data[index].toko,
                                    qty: res.data[index].qty,
                                    alamat: res.data[index].alamat,
                                    status: "BELUM BAYAR",
                                    bulan: res.data[index].bulan,
                                    email: res.data[index].email,
                                    harga: res.data[index].harga,
                                    product: res.data[index].product,
                                    telepon: res.data[index].telepon,
                                    tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
                                    total_harga: res.data[index].total_harga,
                                    created_at: res.data[index].created_at,
                                    kode_cabang: res.data[index].kode_cabang,
                                    tipe_program: res.data[index].tipe_program,
                                    _id: res.data[index]._id,
                                    __v: res.data[index].__v
                                }
                            } else if (res.data[index].status === 'PAID') {
                                obj = {
                                    key: index,
                                    kode_toko: res.data[index].kode_toko,
                                    toko: res.data[index].toko,
                                    qty: res.data[index].qty,
                                    alamat: res.data[index].alamat,
                                    status: "SUDAH BAYAR",
                                    bulan: res.data[index].bulan,
                                    email: res.data[index].email,
                                    harga: res.data[index].harga,
                                    product: res.data[index].product,
                                    telepon: res.data[index].telepon,
                                    tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
                                    total_harga: res.data[index].total_harga,
                                    created_at: res.data[index].created_at,
                                    kode_cabang: res.data[index].kode_cabang,
                                    tipe_program: res.data[index].tipe_program,
                                    _id: res.data[index]._id,
                                    __v: res.data[index].__v
                                }
                            } else if (res.data[index].status === 'CLOSE') {
                                obj = {
                                    key: index,
                                    kode_toko: res.data[index].kode_toko,
                                    toko: res.data[index].toko,
                                    qty: res.data[index].qty,
                                    alamat: res.data[index].alamat,
                                    status: "TIDAK AKTIF",
                                    bulan: res.data[index].bulan,
                                    email: res.data[index].email,
                                    harga: res.data[index].harga,
                                    product: res.data[index].product,
                                    telepon: res.data[index].telepon,
                                    tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
                                    total_harga: res.data[index].total_harga,
                                    created_at: res.data[index].created_at,
                                    kode_cabang: res.data[index].kode_cabang,
                                    tipe_program: res.data[index].tipe_program,
                                    _id: res.data[index]._id,
                                    __v: res.data[index].__v
                                }
                            } else {
                                obj = {
                                    key: index,
                                    kode_toko: res.data[index].kode_toko,
                                    toko: res.data[index].toko,
                                    qty: res.data[index].qty,
                                    alamat: res.data[index].alamat,
                                    status: "JATUH TEMPO",
                                    bulan: res.data[index].bulan,
                                    email: res.data[index].email,
                                    harga: res.data[index].harga,
                                    product: res.data[index].product,
                                    telepon: res.data[index].telepon,
                                    tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
                                    total_harga: res.data[index].total_harga,
                                    created_at: res.data[index].created_at,
                                    kode_cabang: res.data[index].kode_cabang,
                                    tipe_program: res.data[index].tipe_program,
                                    _id: res.data[index]._id,
                                    __v: res.data[index].__v
                                }
                            }
                            newarrdata.push(obj)
                        }
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
                                created_at: res.data[index].created_at,
                                kode_cabang: res.data[index].kode_cabang,
                                tipe_program: res.data[index].tipe_program,
                                __v: res.data[index].__v,
                                _id: res.data[index]._id
                            }
                            newarrdata.push(obj)
                        }
                    }
                    dispatch({ type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: { feedback: newarrdata } });
                    PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Melihat Laporan !')
                    dispatch(stopLoading())
                }
                await saveLocal('headLaporan', { tgl_awal: tgl_awal, tgl_akhir: tgl_akhir })
            }).catch((error: any) => {
                console.log(error);
                PopUpAlert.default.AlertError('Gagal Melihat Laporan !')
                dispatch(stopLoading())
            })
        } else {
            const tgl_awal = moment(data.tgl_awal).format('YYYY-MM-DD')
            const tgl_akhir = moment(data.tgl_akhir).format('YYYY-MM-DD')
            AxiosGet(`${REPORT_CUSTOMER_API}startDate=${tgl_awal}&endDate=${tgl_akhir}&kode_toko=${data.kode_toko.value !== undefined ? data.kode_toko.value : data.kode_toko}&product=${data.product.value}&status=${data.status.value}`).then(async (res: any) => {
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
                            created_at: res.data[index].created_at,
                            kode_cabang: res.data[index].kode_cabang,
                            tipe_program: res.data[index].tipe_program,
                            __v: res.data[index].__v,
                            _id: res.data[index]._id
                        }
                        newarrdata.push(obj)
                    }
                    dispatch({ type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: { feedback: newarrdata } });
                    PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Melihat Laporan !')
                    dispatch(stopLoading())
                }
                await saveLocal('headLaporan', { tgl_awal: tgl_awal, tgl_akhir: tgl_akhir })
            }).catch((error: any) => {
                console.log(error);
                PopUpAlert.default.AlertError('Gagal Melihat Laporan !')
                dispatch(stopLoading())
            })
        }
    };
};

export const SetCheckAllAction = (value: any) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch({ type: SET_ALL_CHECKBOX, payload: { all: value } })
    };
};


