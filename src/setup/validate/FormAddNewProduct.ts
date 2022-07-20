import { FormErrors } from 'redux-form'
import { IFormAddNewProduct } from '../model/ModelValidation'

const FormAddNewProduct = (values: IFormAddNewProduct): FormErrors<IFormAddNewProduct> => {
    const errors: FormErrors<IFormAddNewProduct> = {}

    if (!values.product) {
        errors.product = 'Product required'
    }


    return errors
}
export default FormAddNewProduct
