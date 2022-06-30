import { FormErrors } from 'redux-form'
import { PopUpAlert } from '..'
import { IFormConfirmPayment } from '../model/FormConfirmPaymentModel'

const FormConfirmPaymentValidation = (values: IFormConfirmPayment): FormErrors<IFormConfirmPayment> => {
    const errors: FormErrors<IFormConfirmPayment> = {}

    if (!values.foto) {
        PopUpAlert.default.AlertError('Masukkan Bukti Bayar Terlebih Dahulu !')
    }

    return errors
}
export default FormConfirmPaymentValidation
