import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormAddNewStoreCabangValidate from '../../../../../setup/validate/FormAddNewStoreCabangValidate'
import {ReanderField} from '../../../../modules/redux-form/BasicInput'
import {PostLocalCabang} from '../redux/action/StoreAction'

interface Props {}

const FormAddNewCabang: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const handleClick = () => {
    props.dispatch(PostLocalCabang())
  }

  return (
    <>
      <form className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='alamat'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Alamat'
              placeholder='Masukan Alamat'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='telepon'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Telepon'
              placeholder='Masukan Telepon'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='email'
              type='email'
              component={ReanderField}
              nouperCase={true}
              label='Email'
              placeholder='Masukan Email'
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button
              className='btn btn-primary'
              disabled={pristine || submitting || isSending}
              type='button'
              onClick={(e) => {
                e.preventDefault()
                handleClick()
              }}
            >
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
  form: 'FormAddNewCabang',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  validate: FormAddNewStoreCabangValidate,
})(FormAddNewCabang)
export default connect()(form)
