import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../setup'
import FormOtorisasiValidation from '../../../setup/validate/FormOtorisasiValidate'
import {ReanderField} from '../../modules/redux-form/BasicInput'
interface Props {}

const mapState = (state: RootState) => {
  return {
    initialValues: {},
  }
}

const FormOtorisasi: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)

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
              name='password'
              type='password'
              component={ReanderField}
              nouperCase={true}
              label='Password'
              placeholder='Masukan Password'
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button className='btn btn-primary' disabled={submitting || isSending || pristine}>
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
  form: 'FormOtorisasi',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormOtorisasiValidation,
})(FormOtorisasi)
export default connect(mapState, null)(form)
