import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../setup'
import FormAddNewTransactionValidate from '../../../setup/validate/FormAddNewTransactionValidate'
import {ReanderField, ReanderTextArea} from '../../modules/redux-form/BasicInput'

interface Props {}

const FormAddNewTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, pristine, submitting} = props
  const isSending = useSelector<RootState>(({loader}) => loader.loading)

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
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
              name='nama_toko'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Nama Toko'
              placeholder='Masukan Nama Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='alamat'
              type='text'
              component={ReanderTextArea}
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
              label='No Telepon'
              placeholder='Masukan No Telepon'
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
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='product'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Product'
              placeholder='Masukan Product'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='qty'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Qty'
              placeholder='Masukan Qty'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='harga'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Harga'
              placeholder='Masukan Harga'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='bulan'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Bulan'
              placeholder='Masukan Bulan'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='total_harga'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Total Harga'
              placeholder='Masukan Total Harga'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='tgl_jatuh_tempo'
              type='date'
              component={ReanderField}
              nouperCase={true}
              label='Tanggal Jatuh Tempo'
              placeholder='Masukan Tanggal Jatuh Tempo'
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
  form: 'FormAddNewTransaction',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  validate: FormAddNewTransactionValidate,
})(FormAddNewTransaction)
export default connect()(form)
