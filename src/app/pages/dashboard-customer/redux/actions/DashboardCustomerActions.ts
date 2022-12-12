import {Dispatch} from 'redux'
import {AxiosGet, getImage} from '../../../../../setup'
import {doDecrypt} from '../../../../../setup/helper/encrypt'
import {
  setLoading,
  stopLoading,
} from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../setup/redux/Store'
import {
  HIDE_MODAL_BUKTI_BAYAR_CUSTOMER,
  PAYMENT_CUSTOMER_DATA_SUCCESS,
  DATA_CUSTOMER_SUCCESS,
  SHOW_MODAL_BUKTI_BAYAR_CUSTOMER,
  TableDataType,
  TablePaymentDataType,
} from './DashboardCustomerActionTypes'

export const GetDataCustomer = (toko: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableDataType[] = []
    AxiosGet('invoice/by-toko/' + toko).then((res: any) => {
      const decryptData = doDecrypt(res.data, [
        '_id',
        '__v',
        'created_at',
        'key',
        'kode_toko',
        'product',
        'bulan',
        'status',
        'tgl_jatuh_tempo',
        'harga',
        'qty',
        'total_harga',
        'kode_cabang',
        'tipe_program',
        'no_invoice',
      ])
      for (let index = 0; index < decryptData.length; index++) {
        let obj: TableDataType = {
          key: 0,
          _id: '',
          no_invoice: '',
          tgl_jatuh_tempo: '',
          kode_toko: '',
          kode_cabang: '',
          email: '',
          telepon: '',
          bulan: '',
          total_harga: 0,
          total_diskon: 0,
          status: '',
          input_date: '',
          __v: 0,
          customer: [],
          grand_total: 0,
        }
        if (decryptData[index].status === 'OPEN') {
          obj = {
            key: index,
            kode_toko: decryptData[index].kode_toko,
            status: 'BELUM BAYAR',
            bulan: decryptData[index].bulan,
            email: decryptData[index].email,
            telepon: decryptData[index].telepon,
            tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
            total_harga: decryptData[index].total_harga,
            kode_cabang: decryptData[index].kode_cabang,
            _id: decryptData[index]._id,
            __v: decryptData[index].__v,
            customer: decryptData[index].customer,
            grand_total: decryptData[index].grand_total,
            input_date: decryptData[index].input_date,
            no_invoice: decryptData[index].no_invoice,
            total_diskon: decryptData[index].total_diskon,
          }
        } else if (decryptData[index].status === 'PAID') {
          obj = {
            key: index,
            kode_toko: decryptData[index].kode_toko,
            status: 'SUDAH BAYAR',
            bulan: decryptData[index].bulan,
            email: decryptData[index].email,
            telepon: decryptData[index].telepon,
            tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
            total_harga: decryptData[index].total_harga,
            kode_cabang: decryptData[index].kode_cabang,
            _id: decryptData[index]._id,
            __v: decryptData[index].__v,
            customer: decryptData[index].customer,
            grand_total: decryptData[index].grand_total,
            input_date: decryptData[index].input_date,
            no_invoice: decryptData[index].no_invoice,
            total_diskon: decryptData[index].total_diskon,
          }
        } else if (decryptData[index].status === 'CLOSE') {
          obj = {
            key: index,
            kode_toko: decryptData[index].kode_toko,
            status: 'TIDAK AKTIF',
            bulan: decryptData[index].bulan,
            email: decryptData[index].email,
            telepon: decryptData[index].telepon,
            tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
            total_harga: decryptData[index].total_harga,
            kode_cabang: decryptData[index].kode_cabang,
            _id: decryptData[index]._id,
            __v: decryptData[index].__v,
            customer: decryptData[index].customer,
            grand_total: decryptData[index].grand_total,
            input_date: decryptData[index].input_date,
            no_invoice: decryptData[index].no_invoice,
            total_diskon: decryptData[index].total_diskon,
          }
        } else {
          obj = {
            key: index,
            kode_toko: decryptData[index].kode_toko,
            status: 'JATUH TEMPO',
            bulan: decryptData[index].bulan,
            email: decryptData[index].email,
            telepon: decryptData[index].telepon,
            tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
            total_harga: decryptData[index].total_harga,
            kode_cabang: decryptData[index].kode_cabang,
            _id: decryptData[index]._id,
            __v: decryptData[index].__v,
            customer: decryptData[index].customer,
            grand_total: decryptData[index].grand_total,
            input_date: decryptData[index].input_date,
            no_invoice: decryptData[index].no_invoice,
            total_diskon: decryptData[index].total_diskon,
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
        type: DATA_CUSTOMER_SUCCESS,
        payload: {feedback: newarrdata},
      })
    })
  }
}

export const GetPayment = (toko: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TablePaymentDataType[] = []
    AxiosGet('payment/by-kode-toko/' + toko).then((res: any) => {
      const dataDecrypt = doDecrypt(res.data, [
        'no_bayar',
        'tanggal_bayar',
        'no_invoice',
        'status',
        'total_harga',
        '_id',
        'input_date',
        'product',
        'harga',
        'kode_toko',
      ])

      for (let index = 0; index < dataDecrypt.length; index++) {
        const obj: TablePaymentDataType = {
          key: index,
          kode_toko: dataDecrypt[index].kode_toko,
          toko: dataDecrypt[index].toko,
          qty: dataDecrypt[index].qty,
          bulan: dataDecrypt[index].bulan,
          harga: dataDecrypt[index].harga,
          product: dataDecrypt[index].product,
          total_harga: dataDecrypt[index].total_harga,
          __v: dataDecrypt[index].__v,
          _id: dataDecrypt[index]._id,
          no_bayar: dataDecrypt[index].no_bayar,
          no_invoice: dataDecrypt[index].no_invoice,
          tanggal_bayar: dataDecrypt[index].tanggal_bayar,
          status: dataDecrypt[index].status,
          tipe_pembayaran: dataDecrypt[index].tipe_pembayaran,
          created_at: dataDecrypt[index].created_at,
          detail_customer: dataDecrypt[index].detail_customer,
        }
        newarrdata.push(obj)
      }
      dispatch({
        type: PAYMENT_CUSTOMER_DATA_SUCCESS,
        payload: {paymentData: newarrdata},
      })
    })
  }
}

export const GetGambarByNoBayar = (no_bayar: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    getImage(no_bayar)
      .then((res: any) => {
        dispatch({type: SHOW_MODAL_BUKTI_BAYAR_CUSTOMER, payload: {noBayar: no_bayar, image: res}})
        dispatch(stopLoading())
      })
      .catch((error: any) => {
        dispatch({
          type: SHOW_MODAL_BUKTI_BAYAR_CUSTOMER,
          payload: {noBayar: no_bayar, image: '/media/notfound/image-not-found.png'},
        })
        dispatch(stopLoading())
      })
  }
}

export const CloseModalBuktiBayar = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL_BUKTI_BAYAR_CUSTOMER})
  }
}
