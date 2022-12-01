import {Dispatch} from 'redux'
import {AxiosDelete, AxiosGet, AxiosPost, AxiosPut, PopUpAlert, postPDF} from '../../../../../setup'
import {doDecrypt} from '../../../../../setup/helper/encrypt'
import {dataURLtoPDFFile, NumberOnly} from '../../../../../setup/helper/function'
import {
  setLoading,
  setLoadingApprove,
  stopLoading,
  stopLoadingApprove,
} from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../setup/redux/Store'
import InvoicePDF from '../../../dashboard/pdf/InvoicePDF'
import {
  COUNT_TOTAL_HARGA_EDIT,
  COUNT_TOTAL_QTY_EDIT,
  EditFormCustomer,
  GET_ACTIVE_CUSTOMER,
  GET_ACTIVE_CUSTOMER_BY_ID,
  SET_ID_FOR_DELETE,
  SET_PRODUCT_EDIT,
  SET_TOTAL_HARGA,
  SHOW_MODAL_EDIT,
  TableActivateCustomerType,
} from './ServiceAdjustmentActionTypes'

export const ACTIVE_CUSTOMER_API = `customer`

export const GetActiveCustomerAction = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableActivateCustomerType[] = []
    AxiosGet(ACTIVE_CUSTOMER_API)
      .then((res: any) => {
        for (let index = 0; index < res.data.length; index++) {
          const obj: TableActivateCustomerType = {
            key: index,
            kode_toko: res.data[index].kode_toko,
            toko: doDecrypt(res.data[index].toko, []),
            qty: res.data[index].qty,
            alamat: res.data[index].alamat,
            status: res.data[index].status,
            bulan: res.data[index].bulan,
            email: doDecrypt(res.data[index].email, []),
            harga: res.data[index].harga,
            product: res.data[index].product,
            telepon: doDecrypt(res.data[index].telepon, []),
            tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
            total_harga: res.data[index].total_harga,
            created_at: res.data[index].created_at,
            kode_cabang: res.data[index].kode_cabang,
            tipe_program: res.data[index].tipe_program,
            _id: res.data[index]._id,
          }
          newarrdata.push(obj)
        }
        dispatch({type: GET_ACTIVE_CUSTOMER, payload: {feedback: newarrdata}})
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const PostDeactivateData = (kode: string, namaproduct: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const senddata = {
      kode_toko: kode,
      product: namaproduct,
    }
    AxiosPost(`${ACTIVE_CUSTOMER_API}/deactivate`, senddata)
      .then(() => {
        dispatch(stopLoading())
        PopUpAlert.default.AlertSuccess('Berhasil Menonaktifkan Data Customer')
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError('Gagal Menonaktifkan Data !')
      })
  }
}

export const PostActivateData = (kode: string, namaproduct: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    const senddata = {
      kode_toko: kode,
      product: namaproduct,
    }
    AxiosPost(`${ACTIVE_CUSTOMER_API}/activate`, senddata)
      .then(() => {
        dispatch(stopLoadingApprove())
        PopUpAlert.default.AlertSuccess('Berhasil Mengaktifkan Data Customer')
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoadingApprove())
        PopUpAlert.default.AlertError('Gagal Mengaktifkan Data !')
      })
  }
}

export const deleteTransaction = (data: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    AxiosGet(`user/authorize/delete?user_id=${data.user_id}&password=${data.password}`)
      .then(() => {
        const id = getState().serviceAdjustment.ID
        AxiosDelete('customer/' + id)
          .then(() => {
            dispatch(stopLoading())
            PopUpAlert.default.AlertSuccessDelete()
          })
          .catch((error: any) => {
            console.log(error)
            dispatch(stopLoading())
            PopUpAlert.default.AlertError('Gagal Menghapus Data !')
          })
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError(error.response.data.message || 'User / Password Salah !')
      })
  }
}

export const getDataByIDTrx = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(ACTIVE_CUSTOMER_API + '/by-id/' + id).then((res: any) => {
      if (res.data.length !== 0) {
        const dataDec = doDecrypt(res.data[0], [
          'product',
          'harga',
          'bulan',
          'total_harga',
          'status',
          'tipe_program',
          'kode_toko',
          '_id',
          'created_at',
          'tgl_jatuh_tempo',
          'kode_cabang',
          'input_date',
        ])
        dispatch({type: GET_ACTIVE_CUSTOMER_BY_ID, payload: {feedbackID: dataDec}})
        dispatch({type: SET_TOTAL_HARGA, payload: {feedbackID: dataDec.total_harga}})
        dispatch({
          type: SET_PRODUCT_EDIT,
          payload: {product: dataDec.product, tipe_program: dataDec.tipe_program},
        })
        dispatch({
          type: COUNT_TOTAL_QTY_EDIT,
          payload: {totalHarga: dataDec.total_harga, qty: dataDec.bulan},
        })
        dispatch({
          type: COUNT_TOTAL_HARGA_EDIT,
          payload: {totalHarga: dataDec.total_harga, harga: dataDec.harga},
        })
        dispatch({type: SHOW_MODAL_EDIT, payload: {isShow: true}})
      } else {
        PopUpAlert.default.AlertError('Data Tidak Ditemukan !')
      }
    })
  }
}

export const SetIDForDelete = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_ID_FOR_DELETE, payload: {ID: id}})
  }
}

export const CountTotalHargaQty = (value: number) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const harga = getState().form.FormEditTransaction.values?.harga || 0
    const totalharga = value * harga
    dispatch({type: COUNT_TOTAL_QTY_EDIT, payload: {totalHarga: totalharga, qty: value}})
  }
}

export const CountTotalHarga = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const qty = getState().form.FormEditTransaction.values?.bulan || 0
    const harga = parseInt(NumberOnly(value) || 0)
    const totalharga = qty * harga
    dispatch({type: COUNT_TOTAL_HARGA_EDIT, payload: {totalHarga: totalharga, harga: harga}})
  }
}

export const SetProduct = (data: {value: string; label: string}) => {
  return async (dispatch: Dispatch<any>) => {
    if (data.label.includes('OFFLINE')) {
      dispatch({type: SET_PRODUCT_EDIT, payload: {product: data.value, tipe_program: 'OFFLINE'}})
    } else {
      dispatch({type: SET_PRODUCT_EDIT, payload: {product: data.value, tipe_program: 'ONLINE'}})
    }
  }
}

export const setShowAction = (value: boolean) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({type: SHOW_MODAL_EDIT, payload: {isShow: value}})
  }
}

export const editTransaction = (data: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const dataKirim: EditFormCustomer = {
      toko: data.toko,
      bulan: data.bulan,
      email: data.email,
      harga: data.harga,
      kode_cabang: data.kode_cabang,
      kode_toko: data.kode_toko,
      product: data.product.value,
      qty: data.qty,
      status: data.status,
      telepon: data.telepon,
      tgl_jatuh_tempo: data.tgl_jatuh_tempo,
      tipe_program: data.tipe_program,
      total_harga: data.total_harga,
    }
    AxiosPut(`customer/${data.id}`, dataKirim)
      .then(() => {
        AxiosGet(
          `customer/filter?kode_toko=${dataKirim.kode_toko}&product=${dataKirim.product.replaceAll(
            /\+/g,
            '_'
          )}&kode_cabang=${dataKirim.kode_cabang}&tipe_program=${dataKirim.tipe_program}`
        )
          .then((resGet: any) => {
            const dataInvoice = resGet.data[0]
            const pdf64 = InvoicePDF(dataInvoice)
            const file = dataURLtoPDFFile(
              pdf64,
              `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`
            )
            postPDF(
              file,
              `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`
            ).finally(() => {
              PopUpAlert.default.AlertSuccessEdit()
              dispatch(stopLoading())
            })
          })
          .catch((error: any) => {
            console.log(error)
            PopUpAlert.default.AlertSuccessEdit()
            dispatch(stopLoading())
          })
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError(error.response.data.message)
      })
  }
}
