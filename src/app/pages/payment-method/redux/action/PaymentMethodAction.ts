import { Dispatch } from "redux";
import { AxiosGet, AxiosPostiPayMu, postKwitansiPDF } from "../../../../../setup";
import { dataURLtoPDFFile } from "../../../../../setup/helper/function";
import { setLoading, setLoadingApprove, stopLoading, stopLoadingApprove } from "../../../../../setup/redux/reducers/redux-loading/action/redux-loading";
import { IAppState } from "../../../../../setup/redux/Store";
import KwitansiPDF from "../../../dashboard/pdf/KwitansiPDF";
import { GetTransactionType, GET_TRANSACTION_SUCCESS, IPaymuType, IPaymuTypeQR, ParamsGetTransactionType, TRX_QRIS_SUCCESS } from "./PaymentMethodActionTypes";

export const TRANSACTION_URL_FILTER = `customer`

export const GetTransactionFilter = (params: ParamsGetTransactionType) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        AxiosGet(TRANSACTION_URL_FILTER + '/filter?kode_toko=' + params.kode_toko + '&product=' + params.product.replaceAll(/\+/g, '_') + '&kode_cabang=' + params.kode_cabang + '&tipe_program=' + params.tipe_program).then((res: any) => {
            dispatch({ type: GET_TRANSACTION_SUCCESS, payload: { feedback: res.data[0] } });
        }).catch((error: any) => {
            console.log(error);

        })
    };
};

export const handleIPayMu = (data: GetTransactionType, params: any) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch(setLoading())
        const baseUrl = process.env.REACT_APP_API_URL
        const url = baseUrl + "payment/ipay/" + data.kode_toko.replaceAll(' ', '%20') + "/" + data.toko.replaceAll(' ', '%20') + "/" + data.product.replaceAll(' ', '%20') + "/" + params.kode_cabang.replaceAll(' ', '%20') + "/" + data.qty + "/" + data.harga + "/" + data.bulan + "/" + data.total_harga + "/iPaymu"

        const dataKirim: IPaymuType = {
            product: [data.product],
            qty: [data.bulan.toString()],
            price: [(data.harga).toString()],
            description: [`Pembayaran`],
            returnUrl: "https://nagatech-vps.netlify.app/success-payment",
            notifyUrl: url,
            cancelUrl: "http://103.119.55.28:1993/api/customer/deactivate",
            referenceId: data._id,
            buyerName: data.toko,
            buyerEmail: data.email,
            buyerPhone: data.telepon,
            paymentMethod: "banktransfer",
        }
        
        AxiosPostiPayMu('payment', dataKirim).then((res: any) => {
            AxiosGet(`customer/filter?kode_toko=${params.kode_toko}&product=${params.product.replaceAll(/\+/g, '_')}&kode_cabang=${params.kode_cabang}&tipe_program=${params.tipe_program}`).then((response: any) => {
                const dataInvoice = response.data[0]
                const pdfkwitansi64 = KwitansiPDF(dataInvoice, '-')
                const filekwitansi = dataURLtoPDFFile(pdfkwitansi64, `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`)
                postKwitansiPDF(filekwitansi, `${dataInvoice.kode_toko}-${dataInvoice.kode_cabang}-${dataInvoice.product}-${dataInvoice.tipe_program}`).finally(() => {
                    dispatch(stopLoading());
                    window.open(res.Data.Url, '_self', '')
                })
            })
        })
    };
};

export const handleIPayMuQR = (data: GetTransactionType) => {
    return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
        dispatch(setLoadingApprove())
        const baseUrl = process.env.REACT_APP_API_URL
        const url = baseUrl + "payment/ipay/" + data.kode_toko.replaceAll(' ', '%20') + "/" + data.toko.replaceAll(' ', '%20') + "/" + data.product.replaceAll(' ', '%20') + "/" + data.qty + "/" + data.harga + "/" + data.bulan + "/" + data.total_harga + "/iPaymu"
        const dataKirim: IPaymuTypeQR = {
            product: [data.product],
            qty: [data.qty.toString()],
            price: [(data.harga).toString()],
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
            expiredType: 'hours'
        }
        AxiosPostiPayMu('payment/direct', dataKirim).then((res: any) => {
            dispatch({ type: TRX_QRIS_SUCCESS, payload: { feedbackQR: res.Data } });
            window.open(res.Data.QrTemplate, '_blank', '')
        }).finally(() => dispatch(stopLoadingApprove()))
    };
};

