import { Dispatch } from "redux";
import { AxiosGet, getImage } from "../../../../../setup";
import { setLoading, stopLoading } from "../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../setup/redux/Store";
import {
  HIDE_MODAL_BUKTI_BAYAR_CUSTOMER,
  PAYMENT_CUSTOMER_DATA_SUCCESS,
  DATA_CUSTOMER_SUCCESS,
  SHOW_MODAL_BUKTI_BAYAR_CUSTOMER,
  TableDataType,
  TablePaymentDataType
} from "./DashboardCustomerActionTypes";

export const GetDataCustomer = (toko: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableDataType[] = []
    AxiosGet('customer/by-kode/' + toko).then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        let obj: TableDataType = {
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
          tipe_program: ''
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
            _id: res.data[index]._id
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
            _id: res.data[index]._id
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
            _id: res.data[index]._id
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
            _id: res.data[index]._id
          }
        }
        // const obj: TableDataType = {
        //   key: index,
        //   kode_toko: res.data[index].kode_toko,
        //   toko: res.data[index].toko,
        //   qty: res.data[index].qty,
        //   alamat: res.data[index].alamat,
        //   status: res.data[index].status,
        //   bulan: res.data[index].bulan,
        //   email: res.data[index].email,
        //   harga: res.data[index].harga,
        //   product: res.data[index].product,
        //   telepon: res.data[index].telepon,
        //   tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
        //   total_harga: res.data[index].total_harga,
        //   created_at: res.data[index].created_at,
        //   kode_cabang: res.data[index].kode_cabang,
        //   tipe_program: res.data[index].tipe_program,
        //   _id: res.data[index]._id
        // }
        newarrdata.push(obj)
      }
      dispatch({
        type: DATA_CUSTOMER_SUCCESS, payload: { feedback: newarrdata },
      });
    })
  };
};

export const GetPayment = (toko: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TablePaymentDataType[] = []
    AxiosGet('payment/active').then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        const obj: TablePaymentDataType = {
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
          tanggal_bayar: res.data[index].tanggal_bayar,
          status: res.data[index].status,
          tipe_pembayaran: res.data[index].tipe_pembayaran,
          created_at: res.data[index].created_at
        }
        newarrdata.push(obj)
      }
      dispatch({
        type: PAYMENT_CUSTOMER_DATA_SUCCESS, payload: { paymentData: newarrdata },
      });
    })
  };
};

export const GetGambarByNoBayar = (no_bayar: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    getImage(no_bayar).then((res: any) => {
      dispatch({ type: SHOW_MODAL_BUKTI_BAYAR_CUSTOMER, payload: { noBayar: no_bayar, image: res } })
      dispatch(stopLoading())
    }).catch((error: any) => {
      dispatch({ type: SHOW_MODAL_BUKTI_BAYAR_CUSTOMER, payload: { noBayar: no_bayar, image: '/media/notfound/image-not-found.png' } })
      dispatch(stopLoading())
    })
  };
};

export const CloseModalBuktiBayar = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({ type: HIDE_MODAL_BUKTI_BAYAR_CUSTOMER })
  };
};
