import {FormErrors} from 'redux-form'
import {IFormAddNewProduct} from '../model/ModelValidation'

const FormAddNewProduct = (values: IFormAddNewProduct): FormErrors<IFormAddNewProduct> => {
  const errors: FormErrors<IFormAddNewProduct> = {}

  if (!values.product) {
    errors.product = 'Product required'
  }

  if (!values.qty && values.tipe_program === 'ONLINE') {
    errors.qty = 'Qty required'
  }

  if (!values.harga && values.tipe_program === 'ONLINE') {
    errors.harga = 'Harga required'
  }

  if (!values.total_harga && values.tipe_program === 'ONLINE') {
    errors.total_harga = 'Total Harga required'
  }

  return errors
}
export default FormAddNewProduct
