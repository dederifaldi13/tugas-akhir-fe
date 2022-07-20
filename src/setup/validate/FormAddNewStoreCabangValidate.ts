import { FormErrors } from 'redux-form'
import { IFormCabangStoreType } from '../model/ModelValidation'

const FormAddNewStoreCabangValidate = (values: IFormCabangStoreType): FormErrors<IFormCabangStoreType> => {
    const errors: FormErrors<IFormCabangStoreType> = {}

    if (!values.cabang) {
        errors.cabang = 'Cabang required'
    }

    if (!values.alamat) {
        errors.alamat = 'Alamat required'
    }

    if (!values.email) {
        errors.email = 'Email required'
    }

    if (!values.telepon) {
        errors.telepon = 'Email required'
    }


    return errors
}
export default FormAddNewStoreCabangValidate
