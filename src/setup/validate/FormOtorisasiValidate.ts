import { FormErrors } from 'redux-form'
import { IOtorisasiForm } from '../model/ModelValidation'

const FormOtorisasiValidate = (values: IOtorisasiForm): FormErrors<IOtorisasiForm> => {
    const errors: FormErrors<IOtorisasiForm> = {}

    if (!values.user_id) {
        errors.user_id = 'User ID required'
    }

    if (!values.password) {
        errors.password = 'Password required'
    }


    return errors
}
export default FormOtorisasiValidate
