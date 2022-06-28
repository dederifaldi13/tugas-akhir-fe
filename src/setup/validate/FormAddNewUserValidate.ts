import { FormErrors } from 'redux-form'
import { IFormAddNewUser } from '../model/FormAddNewUser'

const FormAddNewUserValidate = (values: IFormAddNewUser): FormErrors<IFormAddNewUser> => {
    const errors: FormErrors<IFormAddNewUser> = {}

    if (!values.user_id) {
        errors.user_id = 'User ID required'
    }

    if (!values.user_name) {
        errors.user_name = 'User Name required'
    }

    if (!values.password) {
        errors.password = 'Password required'
    }

    return errors
}
export default FormAddNewUserValidate
