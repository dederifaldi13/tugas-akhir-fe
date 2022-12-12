import moment from 'moment'
import {Dispatch} from 'redux'
import {AxiosGet, PopUpAlert} from '../../../../../../setup'
import {saveLocal} from '../../../../../../setup/encrypt'
import {doDecrypt} from '../../../../../../setup/helper/encrypt'
import {
  setLoading,
  stopLoading,
} from '../../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../../setup/redux/Store'
import {
  GET_DATA_CUSTOMER_REPORT_SUCCESS,
  SET_ALL_CHECKBOX,
  SET_INVOICE_BY_TOKO,
  TableCustomerReportType,
} from './RerportCustomerActionTypes'

export const REPORT_INVOICE_API = `invoice/report?`

export const GetCustomerReportAction = (data: {
  no_invoice: {value: string; label: string}
  kode_toko: any
  status: {value: string; label: string}
  tgl_akhir: string
  tgl_awal: string
  all: boolean
}) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableCustomerReportType[] = []
    dispatch({type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: {feedback: []}})
    dispatch(setLoading())
    if (data.all) {
      const tgl_awal = 'all'
      const tgl_akhir = 'all'
      AxiosGet(
        `${REPORT_INVOICE_API}no_invoice=${
          data.no_invoice.value
        }&start_date=${tgl_awal}&end_date=${tgl_akhir}&kode_toko=${
          data.kode_toko.value !== undefined ? data.kode_toko.value : data.kode_toko
        }&status=${data.status.value}`
      )
        .then(async (res: any) => {
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
          if (decryptData.length === 0) {
            PopUpAlert.default.AlertError('Data Laporan Kosong !')
            dispatch({type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: {feedback: []}})
            dispatch(stopLoading())
          } else {
            if (getState().auth.user?.level === 'CUSTOMER') {
              for (let index = 0; index < decryptData.length; index++) {
                let obj: TableCustomerReportType = {
                  key: 0,
                  _id: '',
                  kode_toko: '',
                  toko: '',
                  telepon: '',
                  email: '',
                  bulan: '',
                  total_harga: 0,
                  tgl_jatuh_tempo: '',
                  status: '',
                  kode_cabang: '',
                  __v: 0,
                  alamat_cabang: '',
                  alamat_korespondensi: '',
                  customer: [],
                  grand_total: 0,
                  input_date: '',
                  no_invoice: '',
                  total_diskon: 0,
                }
                if (decryptData[index].status === 'OPEN') {
                  obj = {
                    key: index,
                    kode_toko: decryptData[index].kode_toko,
                    toko: decryptData[index].toko,
                    status: 'BELUM BAYAR',
                    bulan: decryptData[index].bulan,
                    email: decryptData[index].email,
                    telepon: decryptData[index].telepon,
                    tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
                    total_harga: decryptData[index].total_harga,
                    kode_cabang: decryptData[index].kode_cabang,
                    _id: decryptData[index]._id,
                    __v: decryptData[index].__v,
                    alamat_cabang: decryptData[index].alamat_cabang,
                    alamat_korespondensi: decryptData[index].alamat_korespondensi,
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
                    toko: decryptData[index].toko,
                    status: 'SUDAH BAYAR',
                    bulan: decryptData[index].bulan,
                    email: decryptData[index].email,
                    telepon: decryptData[index].telepon,
                    tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
                    total_harga: decryptData[index].total_harga,
                    kode_cabang: decryptData[index].kode_cabang,
                    _id: decryptData[index]._id,
                    __v: decryptData[index].__v,
                    alamat_cabang: decryptData[index].alamat_cabang,
                    alamat_korespondensi: decryptData[index].alamat_korespondensi,
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
                    toko: decryptData[index].toko,

                    status: 'TIDAK AKTIF',
                    bulan: decryptData[index].bulan,
                    email: decryptData[index].email,
                    telepon: decryptData[index].telepon,
                    tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
                    total_harga: decryptData[index].total_harga,
                    kode_cabang: decryptData[index].kode_cabang,
                    _id: decryptData[index]._id,
                    __v: decryptData[index].__v,
                    alamat_cabang: decryptData[index].alamat_cabang,
                    alamat_korespondensi: decryptData[index].alamat_korespondensi,
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
                    toko: decryptData[index].toko,

                    status: 'JATUH TEMPO',
                    bulan: decryptData[index].bulan,
                    email: decryptData[index].email,
                    telepon: decryptData[index].telepon,
                    tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
                    total_harga: decryptData[index].total_harga,
                    kode_cabang: decryptData[index].kode_cabang,
                    _id: decryptData[index]._id,
                    __v: decryptData[index].__v,
                    alamat_cabang: decryptData[index].alamat_cabang,
                    alamat_korespondensi: decryptData[index].alamat_korespondensi,
                    customer: decryptData[index].customer,
                    grand_total: decryptData[index].grand_total,
                    input_date: decryptData[index].input_date,
                    no_invoice: decryptData[index].no_invoice,
                    total_diskon: decryptData[index].total_diskon,
                  }
                }
                newarrdata.push(obj)
              }
            } else {
              for (let index = 0; index < decryptData.length; index++) {
                const obj: TableCustomerReportType = {
                  key: index,
                  kode_toko: decryptData[index].kode_toko,
                  toko: decryptData[index].toko,
                  status: decryptData[index].status,
                  bulan: decryptData[index].bulan,
                  email: decryptData[index].email,
                  telepon: decryptData[index].telepon,
                  tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
                  total_harga: decryptData[index].total_harga,
                  kode_cabang: decryptData[index].kode_cabang,
                  __v: decryptData[index].__v,
                  _id: decryptData[index]._id,
                  alamat_cabang: decryptData[index].alamat_cabang,
                  alamat_korespondensi: decryptData[index].alamat_korespondensi,
                  customer: decryptData[index].customer,
                  grand_total: decryptData[index].grand_total,
                  input_date: decryptData[index].input_date,
                  no_invoice: decryptData[index].no_invoice,
                  total_diskon: decryptData[index].total_diskon,
                }
                newarrdata.push(obj)
              }
            }
            dispatch({type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: {feedback: newarrdata}})
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
    } else {
      const tgl_awal = moment(data.tgl_awal, 'DD-MM-YYYY').format('YYYY-MM-DD')
      const tgl_akhir = moment(data.tgl_akhir, 'DD-MM-YYYY').format('YYYY-MM-DD')

      AxiosGet(
        `${REPORT_INVOICE_API}no_invoice=${
          data.no_invoice
        }&start_date=${tgl_awal}&end_date=${tgl_akhir}&kode_toko=${
          data.kode_toko.value !== undefined ? data.kode_toko.value : data.kode_toko
        }&status=${data.status.value}`
      )
        .then(async (res: any) => {
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
          if (decryptData.length === 0) {
            PopUpAlert.default.AlertError('Data Laporan Kosong !')
            dispatch({type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: {feedback: []}})
            dispatch(stopLoading())
          } else {
            for (let index = 0; index < decryptData.length; index++) {
              const obj: TableCustomerReportType = {
                key: index,
                kode_toko: decryptData[index].kode_toko,
                toko: decryptData[index].toko,
                status: decryptData[index].status,
                bulan: decryptData[index].bulan,
                email: decryptData[index].email,
                telepon: decryptData[index].telepon,
                tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
                total_harga: decryptData[index].total_harga,
                kode_cabang: decryptData[index].kode_cabang,
                __v: decryptData[index].__v,
                _id: decryptData[index]._id,
                alamat_cabang: decryptData[index].alamat_cabang,
                alamat_korespondensi: decryptData[index].alamat_korespondensi,
                customer: decryptData[index].customer,
                grand_total: decryptData[index].grand_total,
                input_date: decryptData[index].input_date,
                no_invoice: decryptData[index].no_invoice,
                total_diskon: decryptData[index].total_diskon,
              }
              newarrdata.push(obj)
            }
            dispatch({type: GET_DATA_CUSTOMER_REPORT_SUCCESS, payload: {feedback: newarrdata}})
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
}

export const SetCheckAllAction = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_ALL_CHECKBOX, payload: {all: value}})
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
