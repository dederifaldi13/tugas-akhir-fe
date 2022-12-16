import {Dispatch} from 'redux'
import {AxiosGet, AxiosPostiPayMu, postKwitansiPDF} from '../../../../../setup'
import {doDecrypt} from '../../../../../setup/helper/encrypt'
import {dataURLtoPDFFile} from '../../../../../setup/helper/function'
import {
  setLoading,
  setLoadingApprove,
  stopLoading,
  stopLoadingApprove,
} from '../../../../../setup/redux/reducers/redux-loading/action/redux-loading'
import {IAppState} from '../../../../../setup/redux/Store'
import KwitansiPDF from '../../../dashboard/pdf/KwitansiPDF'
import {
  GetTransactionType,
  GET_TRANSACTION_SUCCESS,
  IPaymuType,
  IPaymuTypeQR,
  ParamsGetTransactionType,
  TRX_QRIS_SUCCESS,
} from './PaymentMethodActionTypes'

export const TRANSACTION_URL_FILTER = `customer`

export const GetTransactionFilter = (params: ParamsGetTransactionType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    AxiosGet(
      'invoice/filter?kode_toko=' +
        params.kode_toko +
        '&no_invoice=' +
        params.no_invoice +
        '&kode_cabang=' +
        params.kode_cabang
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
        dispatch({type: GET_TRANSACTION_SUCCESS, payload: {feedback: decryptData}})
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}

export const handleIPayMu = (data: GetTransactionType, params: any) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoading())
    const baseUrl = process.env.REACT_APP_API_URL
    const total = data.grand_total - (data.diskon_tambahan || 0)
    const url =
      baseUrl +
      'payment/ipay/' +
      data.no_invoice.replaceAll(' ', '%20') +
      '/' +
      data.kode_toko.replaceAll(' ', '%20') +
      '/' +
      data.toko.replaceAll(' ', '%20') +
      '/' +
      params.kode_cabang.replaceAll(' ', '%20') +
      '/' +
      data.customer.length +
      '/' +
      data.total_harga +
      '/' +
      data.bulan +
      '/' +
      total +
      '/iPaymu'

    const dataProduct: Array<String> = []
    data.customer.forEach((element: any) => {
      dataProduct.push(element.product)
    })

    const dataKirim: IPaymuType = {
      product: dataProduct,
      qty: ['1'],
      price: [total.toString()],
      description: [`Pembayaran`],
      returnUrl: 'https://nagatech-vps.netlify.app/success-payment',
      notifyUrl: url,
      cancelUrl: 'http://103.119.55.28:1993/api/customer/deactivate',
      referenceId: data._id,
      buyerName: data.toko,
      buyerEmail: data.email,
      buyerPhone: data.telepon,
      paymentMethod: 'banktransfer',
    }

    AxiosPostiPayMu('payment', dataKirim).then((res: any) => {
      AxiosGet(
        'invoice/filter?kode_toko=' +
          params.kode_toko +
          '&no_invoice=' +
          params.no_invoice +
          '&kode_cabang=' +
          params.kode_cabang
      ).then((response: any) => {
        const decryptData = doDecrypt(response.data[0], [
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
        const pdfkwitansi64 = KwitansiPDF(dataInvoice, '-')
        const filekwitansi = dataURLtoPDFFile(
          pdfkwitansi64,
          `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-ONLINE`
        )
        postKwitansiPDF(
          filekwitansi,
          `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-ONLINE`
        ).finally(() => {
          dispatch(stopLoading())
          window.open(res.Data.Url, '_self', '')
        })
      })
    })
  }
}

export const handleIPayMuQR = (data: GetTransactionType) => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    dispatch(setLoadingApprove())
    const baseUrl = process.env.REACT_APP_API_URL
    const url =
      baseUrl +
      'payment/ipay/' +
      data.kode_toko.replaceAll(' ', '%20') +
      '/' +
      data.toko.replaceAll(' ', '%20') +
      '/' +
      data.product.replaceAll(' ', '%20') +
      '/' +
      data.qty +
      '/' +
      data.harga +
      '/' +
      data.bulan +
      '/' +
      data.total_harga +
      '/iPaymu'
    const dataKirim: IPaymuTypeQR = {
      product: [data.product],
      qty: [data.qty.toString()],
      price: [data.harga.toString()],
      notifyUrl: url,
      referenceId: data._id,
      amount: data.total_harga.toString(),
      email: data.email,
      name: data.toko,
      paymentChannel: 'qris',
      paymentMethod: 'qris',
      phone: data.telepon,
      comments: 'Pembayaran',
      expired: '24',
      expiredType: 'hours',
    }
    AxiosPostiPayMu('payment/direct', dataKirim)
      .then((res: any) => {
        dispatch({type: TRX_QRIS_SUCCESS, payload: {feedbackQR: res.Data}})
        window.open(res.Data.QrTemplate, '_blank', '')
      })
      .finally(() => dispatch(stopLoadingApprove()))
  }
}
