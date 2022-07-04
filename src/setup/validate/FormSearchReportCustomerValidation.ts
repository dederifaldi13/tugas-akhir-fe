import { FormErrors } from 'redux-form'
import { IFormReportCustomer } from '../model/FormSearchReportCustomerModel'

const FormSearchReportCustomerValidation = (values: IFormReportCustomer): FormErrors<IFormReportCustomer> => {
    const errors: FormErrors<IFormReportCustomer> = {}

    if (!values.kode_toko) {
        errors.kode_toko = 'Kode Toko required'
    }


    return errors
}
export default FormSearchReportCustomerValidation
