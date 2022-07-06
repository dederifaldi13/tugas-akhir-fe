import { FormErrors } from 'redux-form'
import { IFormReportCustomer } from '../model/FormSearchReportCustomerModel'

const FormSearchReportCustomerValidation = (values: IFormReportCustomer): FormErrors<IFormReportCustomer> => {
    const errors: FormErrors<IFormReportCustomer> = {}

    if (!values.tgl_awal) {
        errors.tgl_awal = 'Tanggal Awal required'
    }

    if (!values.tgl_akhir) {
        errors.tgl_akhir = 'Tanggal Akhir required'
    }

    if (!values.kode_toko) {
        errors.kode_toko = 'Kode Toko required'
    }

    if (!values.product) {
        errors.product = 'Product required'
    }

    if (!values.status) {
        errors.status = 'Status required'
    }


    return errors
}
export default FormSearchReportCustomerValidation
