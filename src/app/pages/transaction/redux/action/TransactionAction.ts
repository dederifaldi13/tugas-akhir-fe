import {Dispatch} from 'redux'
import {AxiosGet, AxiosPost, PopUpAlert, postImage, postKwitansiPDF} from '../../../../../setup'
import {doDecrypt} from '../../../../../setup/helper/encrypt'
import {dataURLtoFile, dataURLtoPDFFile} from '../../../../../setup/helper/function'
import {
  setLoading,
  stopLoading,
} from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../setup/redux/Store'
import KwitansiPDF from '../../../dashboard/pdf/KwitansiPDF'
import {
  FormPayType,
  GET_TRANSACTION_SUCCESS,
  ParamsGetTransactionType,
  PostPayType,
  SET_CAMERA_SUCCESS,
} from './TransactionActionTypes'

export const TRANSACTION_URL_FILTER = `invoice`

export const GetTransactionFilter = (params: ParamsGetTransactionType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(
      TRANSACTION_URL_FILTER +
        '/filter?kode_toko=' +
        params.kode_toko +
        '&no_invoice=' +
        params.no_invoice +
        '&kode_cabang=' +
        params.kode_cabang
    )
      .then((res: any) => {
        const decryptData = doDecrypt(res.data[0], [
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
        dispatch({type: GET_TRANSACTION_SUCCESS, payload: {feedback: decryptData}})
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const setCameraAction = (data: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_CAMERA_SUCCESS, payload: {setCameraVal: data}})
  }
}

export const ConfirmPaymentAction = (data: FormPayType, params: ParamsGetTransactionType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const sendData: PostPayType = {
      no_invoice: params.no_invoice,
      kode_cabang: params.kode_cabang,
      kode_toko: data.kode_toko,
      total_harga: data.total_harga,
    }
    AxiosPost('payment/pay', sendData)
      .then((res: any) => {
        const file = dataURLtoFile(data.foto)
        postImage(file, res.no_bayar).finally(() => {
          AxiosGet(
            `invoice/filter?kode_toko=${params.kode_toko}&no_invoice=${params.no_invoice}&kode_cabang=${params.kode_cabang}`
          ).then((response: any) => {
            const decryptData = doDecrypt(response.data[0], [
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
            const dataInvoice = decryptData
            const pdfkwitansi64 = KwitansiPDF(dataInvoice, res.no_bayar)
            const filekwitansi = dataURLtoPDFFile(
              pdfkwitansi64,
              `${dataInvoice.no_invoice}-${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-ONLINE`
            )
            postKwitansiPDF(
              filekwitansi,
              `${dataInvoice.no_invoice}-${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-ONLINE`
            ).finally(() => {
              dispatch(stopLoading())
              PopUpAlert.default.AlertSuccessPayment('Berhasil Melakukan Pembayaran')
            })
          })
        })
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError('Gagal Melakukan Pembayaran !')
      })
  }
}
