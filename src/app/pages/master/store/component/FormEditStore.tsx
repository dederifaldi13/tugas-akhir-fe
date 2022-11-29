import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../../setup'
import FormEditStoreValidate from '../../../../../setup/validate/FormAddNewProduct'
import {ReanderField} from '../../../../modules/redux-form/BasicInput'
import TableAlamatEdit from './TableAlamatEdit'

interface Props {}

const mapState = (state: RootState) => {
  if (state.masterstore.feedbackID !== undefined) {
    return {
      initialValues: {
        id: state.masterstore.feedbackID._id,
        kode_toko: state.masterstore.feedbackID.kode_toko,
        toko: state.masterstore.feedbackID.toko,
        toko_prev: state.masterstore.feedbackID.toko,
      },
    }
  }
}

const FormEditStore: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, submitting, pristine} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='id'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='ID'
              placeholder='Masukan ID'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              name='toko_prev'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Toko'
              placeholder='Masukan Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='kode_toko'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Kode Toko'
              placeholder='Masukan Kode Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='toko'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Toko'
              placeholder='Masukan Toko'
            />
          </div>
          <div className='col-lg-12'>
            <div className='separator mt-3 mb-3 opacity-100'></div>
          </div>
          <div className='col-lg-12'>
            <TableAlamatEdit />
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
  form: 'FormEditStore',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormEditStoreValidate,
})(FormEditStore)
export default connect(mapState, null)(form)
