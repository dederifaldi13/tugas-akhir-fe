import moment from 'moment'
import {Dispatch} from 'redux'
import {AxiosGet, getImage, PopUpAlert} from '../../../../../../setup'
import {saveLocal} from '../../../../../../setup/encrypt'
import {doDecrypt} from '../../../../../../setup/helper/encrypt'
import {
  setLoading,
  setLoadingApprove,
  stopLoading,
  stopLoadingApprove,
} from '../../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../../setup/redux/Store'
import {
  GET_HISTORY_PAYMENT_SUCCESS,
  HIDE_MODAL_BUKTI_BAYAR_SUCCESS,
  SET_INVOICE_BY_TOKO,
  SET_NO_BAYAR,
  SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
  TableHistoryPaymentReportType,
} from './RerportHistoryPaymentActionTypes'

export const REPORT_HISTORY_PAYMENT_API = `payment/report?`

export const GetHistoryPaymentReport = (data: {
  kode_toko: any
  no_invoice: {value: string; label: string}
  tgl_akhir: string
  tgl_awal: string
}) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableHistoryPaymentReportType[] = []
    dispatch(setLoading())
    const tgl_awal = moment(data.tgl_awal, 'DD-MM-YYYY').format('YYYY-MM-DD')
    const tgl_akhir = moment(data.tgl_akhir, 'DD-MM-YYYY').format('YYYY-MM-DD')
    const kode_toko = data.kode_toko.value !== undefined ? data.kode_toko.value : data.kode_toko
    const no_invoice = data.no_invoice.value
    AxiosGet(
      `${REPORT_HISTORY_PAYMENT_API}startDate=${tgl_awal}&endDate=${tgl_akhir}&kode_toko=${kode_toko}&no_invoice=${no_invoice}`
    )
      .then(async (res: any) => {
        const dataDecrypt = doDecrypt(res.data, [
          'input_date',
          'kode_cabang',
          'kode_toko',
          'no_bayar',
          'no_invoice',
          'status',
          'tanggal_bayar',
          'total_harga',
          '__v',
          '_id',
        ])
        if (dataDecrypt.length === 0) {
          PopUpAlert.default.AlertError('Data Laporan Kosong !')
          dispatch({type: GET_HISTORY_PAYMENT_SUCCESS, payload: {feedback: []}})
          dispatch(stopLoading())
        } else {
          for (let index = 0; index < dataDecrypt.length; index++) {
            const obj: TableHistoryPaymentReportType = {
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
              created_at: dataDecrypt[index].created_at,
              kode_cabang: dataDecrypt[index].kode_cabang,
              status: dataDecrypt[index].status,
              tipe_pembayaran: dataDecrypt[index].tipe_pembayaran,
            }
            newarrdata.push(obj)
          }
          dispatch({type: GET_HISTORY_PAYMENT_SUCCESS, payload: {feedback: newarrdata}})
          PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Melihat Laporan !')
          dispatch(stopLoading())
        }
        await saveLocal('headLaporan', {tgl_awal: tgl_awal, tgl_akhir: tgl_akhir})
      })
      .catch((error: any) => {
        console.log(error)
        PopUpAlert.default.AlertError('Gagal Melihat Laporan !')
        dispatch(stopLoading())
      })
  }
}

export const GetGambarByNoBayar = (no_bayar: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    dispatch({type: SET_NO_BAYAR, payload: {noBayar: no_bayar}})
    getImage(no_bayar)
      .then((res: any) => {
        dispatch({type: SHOW_MODAL_BUKTI_BAYAR_SUCCESS, payload: {noBayar: no_bayar, image: res}})
        dispatch(stopLoadingApprove())
      })
      .catch((error: any) => {
        dispatch({
          type: SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
          payload: {noBayar: no_bayar, image: '/media/notfound/image-not-found.png'},
        })
        dispatch(stopLoadingApprove())
      })
  }
}

export const CloseModalBuktiBayar = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL_BUKTI_BAYAR_SUCCESS})
  }
}

export const getInvoiceByToko = (toko: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    if (toko === 'ALL') {
      AxiosGet('invoice')
        .then((res) => {
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
          dispatch({type: SET_INVOICE_BY_TOKO, payload: {feedbackNoInvoice: decryptData}})
        })
        .catch((err) => {
          console.log(err)
          dispatch({type: SET_INVOICE_BY_TOKO, payload: {feedbackNoInvoice: []}})
        })
    } else {
      AxiosGet('invoice/by-toko/' + toko)
        .then((res) => {
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
          dispatch({type: SET_INVOICE_BY_TOKO, payload: {feedbackNoInvoice: decryptData}})
        })
        .catch((err) => {
          console.log(err)
          dispatch({type: SET_INVOICE_BY_TOKO, payload: {feedbackNoInvoice: []}})
        })
    }
  }
}
