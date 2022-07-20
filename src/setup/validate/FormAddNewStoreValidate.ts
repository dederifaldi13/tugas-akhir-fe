import { FormErrors } from 'redux-form'
import { IFormStoreType } from '../model/ModelValidation'

const FormAddNewStoreValidate = (values: IFormStoreType): FormErrors<IFormStoreType> => {
    const errors: FormErrors<IFormStoreType> = {}

    if (!values.kode_toko) {
        errors.kode_toko = 'Kode Toko required'
    }

    if (!values.toko) {
        errors.toko = 'Toko required'
    }

    return errors
}
export default FormAddNewStoreValidate
