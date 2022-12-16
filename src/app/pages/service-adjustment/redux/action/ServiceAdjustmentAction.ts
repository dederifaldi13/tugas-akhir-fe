import {Dispatch} from 'redux'
import {destroy} from 'redux-form'
import Swal from 'sweetalert2'
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
  COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT_EDIT,
  COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN_EDIT,
  COUNT_TOTAL_HARGA_EDIT,
  COUNT_TOTAL_QTY_EDIT,
  EditFormCustomer,
  GET_ACTIVE_CUSTOMER,
  GET_ACTIVE_CUSTOMER_BY_ID,
  HIDE_MODAL,
  SET_DATA_PRODUCT,
  SET_ID_FOR_DELETE,
  SET_ONE_DATA_PRODUCT_CUSTOMER,
  SET_PRODUCT_EDIT,
  SET_TOTAL_HARGA,
  SHOW_MODAL,
  SHOW_MODAL_EDIT,
  TableActivateCustomerType,
} from './ServiceAdjustmentActionTypes'

export const ACTIVE_CUSTOMER_API = `customer`
export const ACTIVE_INVOICE_API = `invoice`

export const GetActiveCustomerAction = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    let newarrdata: TableActivateCustomerType[] = []
    AxiosGet(ACTIVE_INVOICE_API + '/service-adjustment')
      .then((res: any) => {
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
          'diskon_tambahan',
        ])
        for (let index = 0; index < decryptData.length; index++) {
          const obj: TableActivateCustomerType = {
            key: index,
            kode_toko: decryptData[index].kode_toko,
            status: decryptData[index].status,
            bulan: decryptData[index].bulan,
            email: decryptData[index].email,
            telepon: decryptData[index].telepon,
            tgl_jatuh_tempo: decryptData[index].tgl_jatuh_tempo,
            total_harga: decryptData[index].total_harga,
            kode_cabang: decryptData[index].kode_cabang,
            no_invoice: decryptData[index].no_invoice,
            _id: decryptData[index]._id,
            __v: decryptData[index].__v,
            customer: decryptData[index].customer,
            grand_total: decryptData[index].grand_total,
            input_date: decryptData[index].input_date,
            total_diskon: decryptData[index].total_diskon,
            diskon_tambahan: decryptData[index].diskon_tambahan,
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

export const PostDeactivateData = (namaproduct: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const kode = getState().form.FormEditTransaction.values?.kode_toko
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

export const PostActivateData = (namaproduct: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    const kode = getState().form.FormEditTransaction.values?.kode_toko
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

export const PostDeactivateDataInvoice = (invoice: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const senddata = {
      no_invoice: invoice,
    }
    AxiosPost(`${ACTIVE_INVOICE_API}/deactivate`, senddata)
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

export const PostActivateDataInvoice = (invoice: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    const senddata = {
      no_invoice: invoice,
    }
    AxiosPost(`${ACTIVE_INVOICE_API}/activate`, senddata)
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
        AxiosDelete('invoice/' + id)
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

export const getDataByIDTrx = (data: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(
      `invoice/filter-service-adjusment?no_invoice=${data.no_invoice}&kode_toko=${data.kode_toko}&kode_cabang=${data.kode_cabang}`
    ).then((res: any) => {
      if (res.data.length !== 0) {
        const dataDec = doDecrypt(res.data[0], [
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
        dispatch({type: SET_DATA_PRODUCT, payload: {dataProduct: dataDec.customer}})
        dispatch({type: GET_ACTIVE_CUSTOMER_BY_ID, payload: {feedbackID: dataDec}})
        dispatch({type: SET_TOTAL_HARGA, payload: {feedbackID: dataDec.total_harga}})
        dispatch({
          type: SET_PRODUCT_EDIT,
          payload: {product: dataDec.product, tipe_program: dataDec.tipe_program},
        })
        dispatch({
          type: COUNT_TOTAL_QTY_EDIT,
          payload: {totalHarga: 0, qty: dataDec.bulan},
        })
        dispatch({
          type: COUNT_TOTAL_HARGA_EDIT,
          payload: {totalHarga: 0, harga: dataDec.harga},
        })
        dispatch({type: SHOW_MODAL_EDIT, payload: {isShow: true}})
        dispatch({
          type: COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN_EDIT,
          payload: {
            diskon_tambahan: dataDec.diskon_tambahan,
            total_harga_jual: dataDec.grand_total,
          },
        })
      } else {
        PopUpAlert.default.AlertError('Data Tidak Ditemukan !')
      }
    })
  }
}

export const DeleteProductEdit = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    // const data = getState().form.FormEditTransaction.values
    AxiosDelete(`customer/${id}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil Menambahkan Data !',
        }).then(() => {
          window.location.reload()
          // dispatch(getDataByIDTrx(data))
        })
      })
      .catch((err) => {
        console.log(err)
        PopUpAlert.default.AlertError('Gagal Menghapus Data !')
      })
  }
}

export const SetIDForDelete = (id: String) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SET_ID_FOR_DELETE, payload: {ID: id}})
  }
}

export const CountTotalHargaFinal = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const grand_total = getState().form.FormEditTransaction.values?.grand_total || 0
    const diskon = parseInt(NumberOnly(value))
    const total = (grand_total || 0) - (diskon || 0)
    dispatch({
      type: COUNT_TOTAL_HARGA_DISCOUNT_TAMBAHAN_EDIT,
      payload: {diskon_tambahan: diskon, total_harga_jual: total},
    })
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
    const discount = getState().form.FormAddProductEdit.values?.diskon_produk || 0
    const harga = parseInt(NumberOnly(value) || 0)
    const hargadiscount = harga - (discount / 100) * harga
    const totalharga = qty * hargadiscount
    dispatch({
      type: COUNT_TOTAL_HARGA_EDIT,
      payload: {totalHarga: totalharga, harga: harga, diskon_produk: discount},
    })
  }
}

export const CountTotalHargaDiscountProduct = (value: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const bulan = getState().form.FormEditTransaction.values?.bulan || 0
    const harga = getState().form.FormAddProductEdit.values?.harga || 0
    const discount = parseFloat(NumberOnly(value) || 0)
    const hargadiscount = harga - (discount / 100) * harga
    const total_harga = hargadiscount * bulan
    dispatch({
      type: COUNT_TOTAL_HARGA_DISCOUNT_PRODUCT_EDIT,
      payload: {totalHarga: total_harga, harga: harga, diskon_produk: discount},
    })
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
      tanggal_jatuh_tempo: data.tgl_jatuh_tempo,
      bulan: data.bulan,
      total_diskon: parseFloat(data.total_diskon) / 100,
      diskon_tambahan: parseInt(data.diskon_tambahan),
    }
    AxiosPut(`invoice/${data.id}`, dataKirim)
      .then(() => {
        AxiosGet(
          `invoice/filter?kode_toko=${data.kode_toko}&no_invoice=${data.no_invoice}&kode_cabang=${data.kode_cabang}`
        )
          .then((resGet: any) => {
            const decryptData = doDecrypt(resGet.data[0], [
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

export const ShowModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch({type: SHOW_MODAL})
  }
}

export const getDataProductCustomer = (id: string) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(`customer/by-id-2/${id}`)
      .then((res) => {
        const decryptData = doDecrypt(res.data, [
          'bulan',
          'created_at',
          'harga',
          'input_date',
          'kode_cabang',
          'kode_toko',
          'no_invoice',
          'product',
          'qty',
          'status',
          'tgl_jatuh_tempo',
          'tipe_program',
          'total_harga',
          '_id',
          '__v',
        ])
        dispatch({type: SET_ONE_DATA_PRODUCT_CUSTOMER, payload: {productID: decryptData}})
        dispatch({
          type: SET_PRODUCT_EDIT,
          payload: {product: decryptData.product, tipe_program: 'ONLINE'},
        })
        dispatch({
          type: COUNT_TOTAL_HARGA_EDIT,
          payload: {
            totalHarga: decryptData.total_harga,
            harga: decryptData.harga,
            diskon_produk: decryptData.diskon_produk * 100 || 0,
          },
        })
        dispatch(ShowModal())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const HideModal = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(destroy('FormAddProductEdit'))
    dispatch({type: SET_ONE_DATA_PRODUCT_CUSTOMER, payload: {productID: undefined}})
    dispatch({type: COUNT_TOTAL_HARGA_EDIT, payload: {totalHarga: 0, harga: 0}})
    dispatch({type: SET_PRODUCT_EDIT, payload: {product: '', tipe_program: 'ONLINE'}})
    dispatch({type: HIDE_MODAL})
  }
}

export const PostDataProductCustomer = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const data = getState().form.FormAddProductEdit.values
    const dataHead = getState().form.FormEditTransaction.values
    const sendData = {
      no_invoice: dataHead?.no_invoice,
      product: data?.product.value,
      tipe_program: data?.tipe_program,
      qty: 1,
      harga: data?.harga,
      total_harga_product: data?.total_harga_product,
    }
    AxiosPost('customer/add-product', sendData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil Menambahkan Data !',
        }).then(() => {
          window.location.reload()
          // dispatch(getDataByIDTrx(data))
        })
      })
      .catch(() => {
        PopUpAlert.default.AlertError('Gagal Menambahkan Data !')
      })
  }
}

export const PutDataProductCustomer = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const dataHead = getState().form.FormEditTransaction.values
    const data = getState().form.FormAddProductEdit.values
    const sendData = {
      kode_toko: dataHead?.kode_toko,
      toko: dataHead?.toko,
      product: data?.product.value,
      email: dataHead?.email,
      telepon: dataHead?.telepon,
      qty: data?.qty,
      harga: data?.harga,
      bulan: dataHead?.bulan,
      diskon_produk: parseFloat(data?.diskon_produk) / 100,
      total_harga: data?.total_harga_product,
      tgl_jatuh_tempo: dataHead?.tgl_jatuh_tempo,
      kode_cabang: dataHead?.kode_cabang,
      tipe_program: data?.tipe_program,
      status: dataHead?.status,
    }
    AxiosPut(`customer/${data?.id}`, sendData)
      .then((res) => {
        console.log(res)
        PopUpAlert.default.AlertSuccess('Berhasil Merubah Data !')
      })
      .catch((err) => {
        console.log(err)
        PopUpAlert.default.AlertError('Gagal Merubah Data !')
      })
  }
}
