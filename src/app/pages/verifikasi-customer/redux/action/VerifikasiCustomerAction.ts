import {Dispatch} from 'redux'
import {AxiosGet} from '../../../../../setup'
import {doDecrypt} from '../../../../../setup/helper/encrypt'
import {IAppState} from '../../../../../setup/redux/Store'
import {
  GET_TRANSACTION_SUCCESS,
  ParamsVerifType,
  VERIFIKASI_SUCCESS,
} from './VerifikasiCustomerActionTypes'

export const TRANSACTION_URL_FILTER = `invoice`

export const GetTransactionFilter = (params: ParamsVerifType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(
      TRANSACTION_URL_FILTER +
        '/filter?kode_toko=' +
        params.kode_toko +
        '&no_invoice=' +
        params.no_invoice +
        '&kode_cabang=' +
        params.kode_cabang +
        '&tipe_program=' +
        params.tipe_program
    )
      .then((res: any) => {
        const dataDecrypt = doDecrypt(res.data[0], [
          '_id',
          'created_at',
          'no_invoice',
          'kode_toko',
          'product',
          'qty',
          'harga',
          'bulan',
          'total_harga',
          'tgl_jatuh_tempo',
          'kode_cabang',
          'tipe_program',
          'status',
          'input_date',
          '__v',
          'edit_by',
          'edit_date',
          'alamat',
        ])
        dispatch({type: GET_TRANSACTION_SUCCESS, payload: {feedback: dataDecrypt}})
        dispatch(handleVerifikasi(params))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const handleVerifikasi = (params: ParamsVerifType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const dataCustomer = getState().verifikasicustomerreducer.feedback
    const datakirim = {
      user_id: dataCustomer?.telepon,
      kode_verifikasi: params.kode_verif,
    }
    AxiosGet(`user/verify/${datakirim.user_id}/${datakirim.kode_verifikasi}`)
      .then((res: any) => {
        console.log(res)
        dispatch({type: VERIFIKASI_SUCCESS, payload: {feedbackVerif: res}})
      })
      .catch((err) => {
        dispatch({type: VERIFIKASI_SUCCESS, payload: {feedbackVerif: err.response}})
      })
  }
}
