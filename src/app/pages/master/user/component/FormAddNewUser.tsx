import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormAddNewUserValidate from '../../../../../setup/validate/FormAddNewUserValidate'
import {ReanderField, ReanderSelect2} from '../../../../modules/redux-form/BasicInput'

interface Props {}

const FormAddNewUser: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const datalevel = [
    {
      value: 'OWNER',
      label: 'OWNER',
    },
    {
      value: 'ADMIN',
      label: 'ADMIN',
    },
    {
      value: 'CUSTOMER',
      label: 'CUSTOMER',
    },
  ]

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='user_id'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='User ID'
              placeholder='Masukan User ID'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='user_name'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='User Name'
              placeholder='Masukan User Name'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='password'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Password'
              placeholder='Masukan Password'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='level'
              component={ReanderSelect2}
              options={datalevel}
              label='Pilih Level'
              placeholder='Silahkan Pilih Level'
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button className='btn btn-primary' disabled={pristine || submitting || isSending}>
              {!isSending && <span className='indicator-label'>Simpan</span>}
              {isSending && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

const form = reduxForm<{}, Props>({
  form: 'FormAddNewUser',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  validate: FormAddNewUserValidate,
})(FormAddNewUser)
export default connect()(form)
