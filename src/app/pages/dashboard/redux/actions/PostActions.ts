import {Dispatch} from 'redux'
import {destroy} from 'redux-form'
import Swal from 'sweetalert2'
import {
  AxiosDelete,
  AxiosGet,
  AxiosPost,
  getImage,
  PopUpAlert,
  // postKwitansiPDF,
  postPDF,
} from '../../../../../setup'
import {getLocal, saveLocal} from '../../../../../setup/encrypt'
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
  COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT,
  COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN,
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
  SET_DATA_PRODUCT,
  SET_DISKON_KHUSUS,
  SET_PRODUCT,
  SET_TANGGAL_JATUH_TEMPO,
  SHOW_MODAL,
  SHOW_MODAL_BUKTI_BAYAR_SUCCESS,
  TableDataType,
  TablePaymentDataType,
} from './PostActionTypes'

export const GetPost = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableDataType[] = []
    AxiosGet('invoice').then((res: any) => {
      for (let index = 0; index < res.data.length; index++) {
        const obj: TableDataType = {
          key: index,
          kode_toko: res.data[index].kode_toko,
          status: res.data[index].status,
          bulan: res.data[index].bulan,
          email: res.data[index].email,
          telepon: res.data[index].telepon,
          tgl_jatuh_tempo: res.data[index].tgl_jatuh_tempo,
          total_harga: res.data[index].total_harga,
          kode_cabang: res.data[index].kode_cabang,
          no_invoice: res.data[index].no_invoice,
          _id: res.data[index]._id,
          __v: res.data[index].__v,
          customer: res.data[index].customer,
          grand_total: res.data[index].grand_total,
          input_date: res.data[index].input_date,
          total_diskon: res.data[index].total_diskon,
          diskon_tambahan: res.data[index].diskon_tambahan,
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
        'no_invoice',
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
          no_invoice: res.data[index].no_invoice,
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
        'no_invoice',
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
    dispatch({type: COUNT_TOTAL_HARGA, payload: {totalHarga: 0, harga: 0}})
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

export const SetDiskonKhusus = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_DISKON_KHUSUS, payload: {diskon_khusus: value}})
  }
}

export const SetTanggalJatuhTempo = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_TANGGAL_JATUH_TEMPO, payload: {tgl_jatuh_tempo: value}})
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
    const discount = getState().form.FormAddProduct.values?.diskon_produk || 0
    const harga = parseInt(NumberOnly(value) || 0)
    const hargadiscount = harga - (discount / 100) * harga
    const totalharga = qty * hargadiscount
    dispatch({
      type: COUNT_TOTAL_HARGA,
      payload: {totalHarga: totalharga, harga: harga, diskon_produk: discount},
    })
  }
}

export const CountTotalHargaDiscountProduct = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const bulan = getState().form.FormAddNewTransaction.values?.bulan || 0
    const harga = getState().form.FormAddProduct.values?.harga || 0
    const discount = parseFloat(NumberOnly(value) || 0)
    const hargadiscount = harga - (discount / 100) * harga
    const total_harga = hargadiscount * bulan
    dispatch({
      type: COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT,
      payload: {totalHarga: total_harga, harga: harga, diskon_produk: discount},
    })
  }
}

export const CountTotalHargaFinal = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const grand_total = getState().form.FormAddNewTransaction.values?.grand_total || 0
    const diskon = parseInt(NumberOnly(value))
    const total = grand_total - diskon
    dispatch({
      type: COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN,
      payload: {diskon_tambahan: diskon, total_harga_jual: total},
    })
  }
}

export const PostCustomer = (data: FormPostType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const dataProduct = getState().dashboard.dataProduct
    const total = dataProduct?.reduce((a, b) => a + b.total_harga_product, 0)
    let senddata: PostType = {
      kode_toko: data.kode_toko.value,
      toko: data.toko,
      email: data.email,
      telepon: data.telepon,
      bulan: data.bulan.toString(),
      total_harga: total,
      tgl_jatuh_tempo: data.tgl_jatuh_tempo,
      kode_cabang: data.kode_cabang.value,
      total_diskon: parseFloat(data.total_diskon.toString()) / 100,
      diskon_tambahan: parseInt(data.diskon_tambahan),
      product_detail: dataProduct,
    }
    dispatch(setLoading())
    AxiosPost('customer', senddata)
      .then((res: any) => {
        AxiosGet(
          `invoice/filter?kode_toko=${res.kode_toko}&no_invoice=${res.no_invoice}&kode_cabang=${res.kode_cabang}`
        ).then((resget: any) => {
          const decryptData = doDecrypt(resget.data[0], [
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
          const dataInvoice = decryptData
          const pdf64 = InvoicePDF(dataInvoice)
          const file = dataURLtoPDFFile(
            pdf64,
            `${dataInvoice.no_invoice}-${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-ONLINE`
          )
          postPDF(
            file,
            `${dataInvoice.no_invoice}-${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-ONLINE`
          ).finally(() => {
            const userData = {
              user_name: senddata.kode_toko,
              user_id: data.telepon.toString() + '-' + senddata.kode_toko,
              password: '12345678',
            }
            AxiosPost('auth/register/customer', userData).finally(() => {
              localStorage.removeItem('productData')
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

export const ValidationPayment = (
  kode: string,
  kode_cabang: string,
  nobyr: string,
  nooinvoice: string
) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    const senddata: RequestValidationType = {
      no_invoice: nooinvoice,
      kode_toko: kode,
      kode_cabang: kode_cabang,
    }

    AxiosPost('payment/validation', senddata)
      .then((res: any) => {
        AxiosGet(
          `invoice/filter?kode_toko=${res.kode_toko}&no_invoice=${res.no_invoice}&kode_cabang=${res.kode_cabang}`
        )
          .then((res: any) => {
            const decryptData = doDecrypt(res.data[0], [
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
            const dataInvoice = decryptData
            const pdf64 = InvoicePDF(dataInvoice)
            const file = dataURLtoPDFFile(
              pdf64,
              `${dataInvoice.no_invoice}-${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-ONLINE`
            )
            postPDF(
              file,
              `${dataInvoice.no_invoice}-${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-ONLINE`
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

export const ShowModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_MODAL})
  }
}

export const HideModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(destroy('FormAddProduct'))
    dispatch({type: COUNT_TOTAL_HARGA, payload: {totalHarga: 0, harga: 0}})
    dispatch({type: SET_PRODUCT, payload: {product: '', tipe_program: 'ONLINE'}})
    dispatch({type: HIDE_MODAL})
  }
}

export const HideModalTrx = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(destroy('FormAddNewTransaction'))
    localStorage.removeItem('productData')
    dispatch({type: SET_DATA_PRODUCT, payload: {dataProduct: []}})
    dispatch({type: SET_CABANG_BY_ID, payload: {cabangTokoByID: undefined}})
    dispatch({type: GET_TOKO_BY_KODE, payload: {dataTokoByKode: undefined}})
    dispatch(HideModal())
  }
}

export const GetDataProductLocal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('productData').then((res) => {
      dispatch({type: SET_DATA_PRODUCT, payload: {dataProduct: res}})
    })
  }
}

export const AddProductToLocal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const data: any = getState().form.FormAddProduct.values
    getLocal('productData').then((res) => {
      const find = res.find((val: any) => val.product === data.product.value)
      if (find === undefined) {
        if (data.product.value === '') {
          PopUpAlert.default.AlertError('Mohon Lengkapi Form Terlebih Dahulu !')
        } else {
          if (res.length === 0) {
            const product = []
            product.push({
              product: data.product.value,
              harga: data.harga,
              total_harga_product: data.total_harga_product,
              diskon_produk: parseFloat(data.diskon_produk || 0) / 100,
              qty: data.qty,
              tipe_program: data.tipe_program,
            })
            saveLocal('productData', product).then((res) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Menambahkan Data !',
              }).then(() => {
                dispatch(GetDataProductLocal())
                dispatch(destroy('FormAddProduct'))
                dispatch(HideModal())
              })
            })
          } else {
            const product = res
            product.push({
              product: data.product.value,
              harga: data.harga,
              total_harga_product: data.total_harga_product,
              diskon_produk: parseFloat(data.diskon_produk || 0) / 100,
              qty: data.qty,
              tipe_program: data.tipe_program,
            })
            saveLocal('productData', product).then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Menambahkan Data !',
              }).then(() => {
                dispatch(GetDataProductLocal())
                dispatch(destroy('FormAddProduct'))
                dispatch(HideModal())
              })
            })
          }
        }
      } else {
        PopUpAlert.default.AlertError('Product Tidak Boleh Sama !')
      }
    })
  }
}

export const DeleteProductLocal = (product: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    getLocal('productData').then((res) => {
      const productFill = res.filter((val: any) => val.product !== product)
      saveLocal('productData', productFill).then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil Menghapus Data !',
        }).then(() => {
          dispatch(GetDataProductLocal())
        })
      })
    })
  }
}

export const generatePDF = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(`invoice/filter?kode_toko=AB&no_invoice=INV-151222-0001&kode_cabang=CA`)
      .then((res: any) => {
        const decryptData = doDecrypt(res.data[0], [
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
        ])
        const dataInvoice = decryptData
        KwitansiPDF(dataInvoice)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}
