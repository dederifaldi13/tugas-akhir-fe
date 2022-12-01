import {Dispatch} from 'redux'
import {
  AxiosDelete,
  AxiosGet,
  AxiosPost,
  getImage,
  PopUpAlert,
  postKwitansiPDF,
  postPDF,
} from '../../../../../setup'
import {doDecrypt} from '../../../../../setup/helper/encrypt'
import {dataURLtoPDFFile, NumberOnly} from '../../../../../setup/helper/function'
import {
  setLoading,
  setLoadingApprove,
  stopLoading,
  stopLoadingApprove,
} from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../setup/redux/Store'
import InvoicePDF from '../../pdf/InvoicePDF'
import KwitansiPDF from '../../pdf/KwitansiPDF'
import {
  // CabangType,
  COUNT_TOTAL_HARGA,
  COUNT_TOTAL_QTY,
  FormPostType,
  GET_TOKO_BY_KODE,
  HIDE_MODAL,
  HIDE_MODAL_BUKTI_BAYAR_SUCCESS,
  PAYMENT_DATA_SUCCESS,
  PostType,
  POST_SUCCESS,
  RequestValidationType,
  SET_CABANG,
  SET_CABANG_BY_ID,
  SET_PRODUCT,
  SHOW_MODAL,
  SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
  TableDataType,
  TablePaymentDataType,
} from './PostActionTypes'

export const GetPost = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableDataType[] = []
    AxiosGet('customer').then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        const obj: TableDataType = {
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
          _id: res.data[index]._id,
        }
        newarrdata.push(obj)
      }
      const decryptData = doDecrypt(newarrdata, [
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
      ])
      dispatch({
        type: POST_SUCCESS,
        payload: {post: decryptData},
      })
    })
  }
}

export const GetPayment = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TablePaymentDataType[] = []
    AxiosGet('payment/active').then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        const obj: TablePaymentDataType = {
          key: index,
          kode_toko: res.data[index].kode_toko,
          kode_cabang: res.data[index].kode_cabang,
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
          created_at: res.data[index].created_at,
        }
        newarrdata.push(obj)
      }
      const decryptData = doDecrypt(newarrdata, [
        'key',
        'kode_toko',
        'kode_cabang',
        'qty',
        'bulan',
        'harga',
        'product',
        'total_harga',
        '__v',
        '_id',
        'no_bayar',
        'tanggal_bayar',
        'status',
        'created_at',
      ])
      dispatch({
        type: PAYMENT_DATA_SUCCESS,
        payload: {paymentData: decryptData},
      })
    })
  }
}

export const SetProduct = (data: {value: string; label: string}) => {
  return async (dispatch: Dispatch<any>) => {
    if (data.label.includes('OFFLINE')) {
      dispatch({type: SET_PRODUCT, payload: {product: data.value, tipe_program: 'OFFLINE'}})
    } else {
      dispatch({type: SET_PRODUCT, payload: {product: data.value, tipe_program: 'ONLINE'}})
    }
  }
}

export const GetGambarByNoBayar = (no_bayar: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    getImage(no_bayar)
      .then((res: any) => {
        dispatch({type: SHOW_MODAL_BUKTI_BAYAR_SUCCESS, payload: {noBayar: no_bayar, image: res}})
        dispatch(stopLoading())
      })
      .catch((error: any) => {
        dispatch({
          type: SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
          payload: {noBayar: no_bayar, image: '/media/notfound/image-not-found.png'},
        })
        dispatch(stopLoading())
      })
  }
}

export const CloseModalBuktiBayar = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL_BUKTI_BAYAR_SUCCESS})
  }
}

export const GetMasterStoreByKodeToko = (kode: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_CABANG_BY_ID, payload: {cabangTokoByID: undefined}})
    dispatch({type: SET_CABANG, payload: {cabangToko: []}})
    dispatch({type: GET_TOKO_BY_KODE, payload: {dataTokoByKode: undefined}})
    AxiosGet('store/by-kode/' + kode)
      .then((res: any) => {
        const decryptData = doDecrypt(res.data[0], [
          '_id',
          '__v',
          'created_at',
          'input_data',
          'status',
          'kode_toko',
          'kode_cabang',
        ])

        AxiosGet('cabang/by-kode-toko/' + decryptData.kode_toko)
          .then((rescabang) => {
            const decryptDataCabang =
              doDecrypt(rescabang.data, [
                '_id',
                '__v',
                'created_at',
                'kode_toko',
                'kode_cabang',
                'status',
                'input_date',
              ]) || []

            dispatch({type: GET_TOKO_BY_KODE, payload: {dataTokoByKode: decryptData}})
            dispatch({type: SET_CABANG, payload: {cabangToko: decryptDataCabang}})
          })
          .catch((err) => {
            dispatch({type: GET_TOKO_BY_KODE, payload: {dataTokoByKode: decryptData}})
            dispatch({type: SET_CABANG, payload: {cabangToko: []}})
          })
      })
      .catch((error: any) => {
        console.log(error)
        dispatch({type: GET_TOKO_BY_KODE, payload: {dataTokoByKode: undefined}})
        dispatch({type: SET_CABANG, payload: {cabangToko: []}})
      })
  }
}

export const SetCabangByID = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    // const dataCabang = getState().dashboard.cabangToko
    AxiosGet('cabang/by-kode-cabang/' + id)
      .then((res: any) => {
        const dataCabangfillter = doDecrypt(res.data[0], [
          '_id',
          '__v',
          'created_at',
          'kode_toko',
          'kode_cabang',
          'status',
          'input_date',
        ])
        dispatch({type: SET_CABANG_BY_ID, payload: {cabangTokoByID: dataCabangfillter}})
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const CountTotalHargaQty = (value: number) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const harga = getState().form.FormAddNewTransaction.values?.harga || 0
    const totalharga = value * harga
    dispatch({type: COUNT_TOTAL_QTY, payload: {totalHarga: totalharga, qty: value}})
  }
}

export const CountTotalHarga = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const qty = getState().form.FormAddNewTransaction.values?.bulan || 0
    const harga = parseInt(NumberOnly(value) || 0)
    const totalharga = qty * harga
    dispatch({type: COUNT_TOTAL_HARGA, payload: {totalHarga: totalharga, harga: harga}})
  }
}

export const PostCustomer = (data: FormPostType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let senddata: PostType = {
      kode_toko: '',
      toko: '',
      product: '',
      email: '',
      telepon: '',
      qty: 0,
      harga: 0,
      bulan: '',
      total_harga: 0,
      tgl_jatuh_tempo: '',
      kode_cabang: '',
      tipe_program: '',
    }
    dispatch(setLoading())
    if (data.tipe_program === 'OFFLINE') {
      senddata = {
        kode_toko: data.kode_toko.value,
        toko: data.toko,
        kode_cabang: data.kode_cabang.label,
        product: data.product.value,
        email: data.email,
        telepon: data.telepon,
        tipe_program: data.tipe_program,
        qty: 1,
        harga: 0,
        bulan: '-',
        total_harga: 0,
        tgl_jatuh_tempo: '-',
      }
    } else {
      senddata = {
        kode_toko: data.kode_toko.value,
        toko: data.toko,
        kode_cabang: data.kode_cabang.value,
        product: data.product.value,
        email: data.email,
        telepon: data.telepon,
        tipe_program: data.tipe_program,
        qty: parseInt(data.qty.toString()),
        harga: parseInt(data.harga.toString()),
        bulan: data.bulan.toString(),
        total_harga: parseInt(data.total_harga.toString()),
        tgl_jatuh_tempo: data.tgl_jatuh_tempo,
      }
    }

    AxiosPost('customer', senddata)
      .then((res: any) => {
        AxiosGet(
          `customer/filter?kode_toko=${res.kode_toko}&product=${res.product.replaceAll(
            /\+/g,
            '_'
          )}&kode_cabang=${res.kode_cabang}&tipe_program=${res.tipe_program}`
        ).then((resget: any) => {
          const dataInvoice = resget.data[0]
          const pdf64 = InvoicePDF(dataInvoice)
          const file = dataURLtoPDFFile(
            pdf64,
            `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`
          )
          postPDF(
            file,
            `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`
          ).finally(() => {
            const userData = {
              user_name: senddata.kode_toko,
              user_id: data.telepon,
              password: '12345678',
              level: 'CUSTOMER',
            }
            AxiosPost('auth/register', userData).finally(() => {
              PopUpAlert.default.AlertSuccessAdd()
              dispatch(stopLoading())
            })
          })
        })
      })
      .catch((error: any) => {
        console.log(error)
        dispatch(stopLoading())
        PopUpAlert.default.AlertError(error.response.data.message)
      })
  }
}

export const ValidationPayment = (kode: string, product: string, nobyr: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    const senddata: RequestValidationType = {
      kode_toko: kode,
      product: product,
    }
    AxiosPost('payment/validation', senddata)
      .then((res: any) => {
        AxiosGet(
          `customer/filter?kode_toko=${res.kode_toko}&product=${res.product.replaceAll(
            /\+/g,
            '_'
          )}&kode_cabang=${res.kode_cabang}&tipe_program=${res.tipe_program}`
        )
          .then((res: any) => {
            const dataInvoice = res.data[0]
            const pdf64 = InvoicePDF(dataInvoice)
            const file = dataURLtoPDFFile(
              pdf64,
              `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`
            )
            postPDF(
              file,
              `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`
            ).finally(() => {
              PopUpAlert.default.AlertSuccess('Berhasil Melakukan Validasi')
              dispatch(stopLoadingApprove())
            })
          })
          .catch((error: any) => {
            console.log(error)
            dispatch(stopLoadingApprove())
          })
      })
      .catch((error: any) => {
        // console.log(error.response.data.message);
        PopUpAlert.default.AlertError(
          error.response.data.message || 'Gagal Melakukan Validasi Data'
        )
        dispatch(stopLoadingApprove())
      })
  }
}

export const deleteValidationPayment = (id: string, nobyr: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    AxiosDelete('payment/' + id)
      .then(() => {
        PopUpAlert.default.AlertSuccess('Berhasil Melakukan Penolakan')
        dispatch(stopLoadingApprove())
      })
      .catch(() => {
        PopUpAlert.default.AlertError('Gagal Melakukan Penolakan')
        dispatch(stopLoadingApprove())
      })
  }
}

export const SendEmailAndWhatsApp = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    AxiosGet('customer/check-due')
      .then(() => {
        PopUpAlert.default.AlertSuccessWithoutReload('Berhasil Mengirim Email dan WhatsApp')
      })
      .catch((error: any) => {
        console.log(error)
        PopUpAlert.default.AlertError('Gagal Mengirim Email dan WhatsApp')
      })
      .finally(() => {
        dispatch(stopLoading())
      })
  }
}

export const CreateAndSendPDFWithLoop = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    let newarrdata: TableDataType[] = []
    AxiosGet('customer').then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        const obj: TableDataType = {
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
          _id: res.data[index]._id,
        }
        newarrdata.push(obj)
      }
      newarrdata.forEach((element) => {
        const pdf64 = KwitansiPDF(element, '-')
        const file = dataURLtoPDFFile(
          pdf64,
          `${element.kode_toko}-${element.kode_cabang}-${element.product}-${element.tipe_program}`
        )
        postKwitansiPDF(
          file,
          `${element.kode_toko}-${element.kode_cabang}-${element.product}-${element.tipe_program}`
        )
          .then((res: any) => {
            console.log(res)
          })
          .finally(() => {
            dispatch(stopLoading())
          })
      })
    })
  }
}

export const ShowModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_MODAL})
  }
}

export const HideModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: HIDE_MODAL})
  }
}
