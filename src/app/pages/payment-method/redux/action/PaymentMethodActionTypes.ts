export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS'
export const TRX_QRIS_SUCCESS = 'TRX_QRIS_SUCCESS'

export type IPaymuType = {
  product: Array<String>
  qty: Array<String>
  price: Array<String>
  description: Array<String>
  returnUrl: String
  notifyUrl: String
  cancelUrl: String
  referenceId?: String
  weight?: Array<String>
  dimension?: Array<String>
  buyerName?: String
  buyerEmail?: String
  buyerPhone?: String
  pickupArea?: String
  pickupAddress?: String
  paymentMethod?: String
}

export type IPaymuTypeQR = {
  name: String
  phone: String
  email: String
  amount: String
  notifyUrl: String
  expired?: String
  expiredType?: String
  comments?: String
  referenceId?: String
  paymentMethod: String
  paymentChannel: String
  product: Array<String>
  qty: Array<String>
  price: Array<String>
  weight?: Array<String>
  width?: Array<String>
  height?: Array<String>
  length?: Array<String>
  deliveryArea?: String
  deliveryAddress?: String
}

export type GetTransactionType = {
  _id: String
  created_at: String
  kode_toko: String
  toko: String
  alamat: String
  telepon: String
  email: String
  product: String
  qty: Number
  harga: Number
  bulan: String
  total_harga: Number
  grand_total: any
  diskon_tambahan: any
  no_invoice: String
  tgl_jatuh_tempo: String
  status: String
  customer: Array<any>
  __v: Number
}

export type QRTrxFeedback = {
  Status: Number
  Message: String
  Data: {
    SessionId: String
    TransactionId: Number
    ReferenceId: String
    Via: String
    Channel: String
    PaymentNo: String
    QrString: String
    PaymentName: String
    SubTotal: Number
    Total: Number
    Fee: Number
    Expired: String
    QrImage: String
    QrTemplate: String
  }
}

export type ParamsGetTransactionType = {
  kode_toko: string
  no_invoice: string
  kode_cabang: string
  tipe_program: string
}
