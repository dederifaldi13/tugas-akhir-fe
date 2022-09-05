import {Dispatch} from 'redux'
import {AxiosGet, AxiosPost} from '../../../../../setup'
import {IAppState} from '../../../../../setup/redux/Store'
import {
  GET_TRANSACTION_SUCCESS,
  ParamsVerifType,
  VERIFIKASI_SUCCESS,
} from './VerifikasiCustomerActionTypes'

export const TRANSACTION_URL_FILTER = `customer`

export const GetTransactionFilter = (params: ParamsVerifType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(
      TRANSACTION_URL_FILTER +
        '/filter?kode_toko=' +
        params.kode_toko +
        '&product=' +
        params.product.replaceAll(/\+/g, '_') +
        '&kode_cabang=' +
        params.kode_cabang +
        '&tipe_program=' +
        params.tipe_program
    )
      .then((res: any) => {
        dispatch({type: GET_TRANSACTION_SUCCESS, payload: {feedback: res.data[0]}})
        dispatch(handleVerifikasi(params))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const handleVerifikasi = (params: ParamsVerifType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const datakirim = {
      kode_toko: params.kode_toko,
      kode_cabang: params.kode_cabang,
      product: params.product,
      kode_verifikasi: params.kode_verif,
    }
    AxiosPost(TRANSACTION_URL_FILTER + '/verify', datakirim)
      .then((res: any) => {
        console.log(res);
        dispatch({type: VERIFIKASI_SUCCESS, payload: {feedbackVerif: res}})
      })
      .catch((err) => {
        dispatch({type: VERIFIKASI_SUCCESS, payload: {feedbackVerif: err.response}})
      })
  }
}
